import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    console.log("[NEWSLETTER_SIGNUP]", JSON.stringify({ email, ts: new Date().toISOString() }));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
