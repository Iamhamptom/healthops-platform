import { NextResponse } from "next/server";
import { guardInvestor, isErrorResponse } from "@/lib/api-helpers";
import { isDemoMode } from "@/lib/is-demo";

// In-memory store for demo mode
const demoNotes: Array<{
  id: string;
  userId: string;
  section: string;
  content: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}> = [];

export async function GET(request: Request) {
  const guard = await guardInvestor(request, "investor-notes");
  if (isErrorResponse(guard)) return guard;

  if (isDemoMode) {
    return NextResponse.json({
      notes: demoNotes
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((n) => ({ ...n, createdAt: n.createdAt.toISOString(), updatedAt: n.updatedAt.toISOString() })),
    });
  }

  const { prisma } = await import("@/lib/prisma");
  const notes = await prisma.investorNote.findMany({
    where: { userId: guard.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const guard = await guardInvestor(request, "investor-notes");
  if (isErrorResponse(guard)) return guard;

  const body = await request.json();
  const { content, section } = body;

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  if (isDemoMode) {
    const note = {
      id: `note-${Date.now()}`,
      userId: guard.user.id,
      section: section || "general",
      content: content.trim(),
      pinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    demoNotes.unshift(note);
    return NextResponse.json({
      note: { ...note, createdAt: note.createdAt.toISOString(), updatedAt: note.updatedAt.toISOString() },
    });
  }

  const { prisma } = await import("@/lib/prisma");
  const note = await prisma.investorNote.create({
    data: {
      userId: guard.user.id,
      section: section || "general",
      content: content.trim(),
    },
  });

  return NextResponse.json({ note });
}

export async function PATCH(request: Request) {
  const guard = await guardInvestor(request, "investor-notes");
  if (isErrorResponse(guard)) return guard;

  const body = await request.json();
  const { id, pinned } = body;

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
  }

  if (isDemoMode) {
    const note = demoNotes.find((n) => n.id === id);
    if (note) {
      note.pinned = pinned ?? !note.pinned;
      note.updatedAt = new Date();
    }
    return NextResponse.json({ ok: true });
  }

  const { prisma } = await import("@/lib/prisma");
  await prisma.investorNote.update({
    where: { id },
    data: { pinned: pinned ?? false },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const guard = await guardInvestor(request, "investor-notes");
  if (isErrorResponse(guard)) return guard;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
  }

  if (isDemoMode) {
    const idx = demoNotes.findIndex((n) => n.id === id);
    if (idx !== -1) demoNotes.splice(idx, 1);
    return NextResponse.json({ ok: true });
  }

  const { prisma } = await import("@/lib/prisma");
  await prisma.investorNote.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
