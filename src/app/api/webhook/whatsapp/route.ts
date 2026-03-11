import { NextResponse } from "next/server";
import { rateLimitByIp } from "@/lib/rate-limit";

const WEBHOOK_SECRET = process.env.WHATSAPP_WEBHOOK_SECRET || "";

/** GET /api/webhook/whatsapp — Verification endpoint for WhatsApp webhook */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WEBHOOK_SECRET) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/** POST /api/webhook/whatsapp — Receive WhatsApp messages */
export async function POST(request: Request) {
  const rl = rateLimitByIp(request, "webhook-whatsapp", { limit: 100, windowMs: 60_000 });
  if (!rl.allowed) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  try {
    const body = await request.json();

    // WhatsApp Cloud API webhook payload structure
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      // Status update or other non-message event
      return NextResponse.json({ status: "ok" });
    }

    const msg = value.messages[0];
    const contact = value.contacts?.[0];

    const incomingMessage = {
      from: msg.from, // phone number
      name: contact?.profile?.name || "Unknown",
      text: msg.text?.body || "",
      type: msg.type, // text, image, audio, etc.
      timestamp: msg.timestamp,
      messageId: msg.id,
    };

    // Log the incoming message
    console.log("[WhatsApp Webhook]", JSON.stringify(incomingMessage));

    // TODO: Connect to conversation system
    // 1. Find or create patient by phone number
    // 2. Find or create conversation
    // 3. Add message to conversation
    // 4. Run triage agent
    // 5. Generate AI reply
    // 6. Send reply via WhatsApp API

    // For now, acknowledge receipt
    return NextResponse.json({
      status: "received",
      message: incomingMessage,
    });
  } catch (err) {
    console.error("[WhatsApp Webhook Error]", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
