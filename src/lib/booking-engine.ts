// Booking Engine — Core logic for the booking suite
// Handles: availability, approval workflow, reminders, follow-ups, notifications

import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/twilio";

// ─── Types ────────────────────────────────────────────

export interface BookingService {
  name: string;
  duration: number; // minutes
  price: number;    // ZAR
}

export interface TimeSlot {
  time: string;  // HH:MM
  available: boolean;
}

// ─── Practice Hours Parser ────────────────────────────

const DEFAULT_HOURS: Record<number, [string, string] | null> = {
  0: null,                    // Sun closed
  1: ["08:00", "17:00"],
  2: ["08:00", "17:00"],
  3: ["08:00", "17:00"],
  4: ["08:00", "17:00"],
  5: ["08:00", "17:00"],
  6: ["08:00", "13:00"],      // Sat half day
};

function getPracticeHours(hours: string, dayOfWeek: number): [string, string] | null {
  // If practice has custom hours string, parse it; otherwise use defaults
  if (!hours || !hours.trim()) return DEFAULT_HOURS[dayOfWeek] ?? null;

  const DAY_NAMES: Record<string, number> = {
    sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
  };

  // Parse segments like "Mon-Fri 08:00-17:00" or "Sat 08:00-13:00"
  const segments = hours.split(",").map((s) => s.trim());

  for (const segment of segments) {
    // Match: "DayA-DayB HH:MM-HH:MM" or "Day HH:MM-HH:MM"
    const match = segment.match(
      /^([A-Za-z]{3})(?:\s*-\s*([A-Za-z]{3}))?\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/
    );
    if (!match) continue;

    const startDay = DAY_NAMES[match[1].toLowerCase()];
    const endDay = match[2] ? DAY_NAMES[match[2].toLowerCase()] : startDay;
    const openTime = match[3];
    const closeTime = match[4];

    if (startDay === undefined || endDay === undefined) continue;

    // Normalize the open/close times to HH:MM with zero-padding
    const normalizeTime = (t: string) => {
      const [h, m] = t.split(":");
      return `${h.padStart(2, "0")}:${m}`;
    };

    // Check if dayOfWeek falls within the range (handles wrap-around e.g. Fri-Mon)
    let inRange: boolean;
    if (startDay <= endDay) {
      inRange = dayOfWeek >= startDay && dayOfWeek <= endDay;
    } else {
      inRange = dayOfWeek >= startDay || dayOfWeek <= endDay;
    }

    if (inRange) {
      return [normalizeTime(openTime), normalizeTime(closeTime)];
    }
  }

  // No segment matched this day — practice is closed
  return null;
}

// ─── Availability ─────────────────────────────────────

/** Get available time slots for a date at a practice */
export async function getAvailability(practiceId: string, date: string, serviceDuration = 30): Promise<TimeSlot[]> {
  const d = new Date(date + "T00:00:00");
  const dayOfWeek = d.getDay();

  const practice = await prisma.practice.findUnique({ where: { id: practiceId } });
  const dayHours = getPracticeHours(practice?.hours || "", dayOfWeek);

  if (!dayHours) return []; // Closed

  const [startStr, endStr] = dayHours;
  const [startH, startM] = startStr.split(":").map(Number);
  const [endH, endM] = endStr.split(":").map(Number);

  // Generate all possible slots
  const slots: TimeSlot[] = [];
  let h = startH, m = startM;
  while (h < endH || (h === endH && m < endM)) {
    slots.push({
      time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      available: true,
    });
    m += serviceDuration;
    if (m >= 60) { h += Math.floor(m / 60); m = m % 60; }
  }

  // Get existing bookings for this date
  const dayStart = new Date(date + "T00:00:00");
  const dayEnd = new Date(date + "T23:59:59");
  const bookings = await prisma.booking.findMany({
    where: {
      practiceId,
      scheduledAt: { gte: dayStart, lte: dayEnd },
      status: { in: ["pending", "confirmed"] },
    },
  });

  // Mark booked slots as unavailable
  for (const booking of bookings) {
    const bTime = new Date(booking.scheduledAt);
    const bSlot = `${String(bTime.getHours()).padStart(2, "0")}:${String(bTime.getMinutes()).padStart(2, "0")}`;
    const slot = slots.find(s => s.time === bSlot);
    if (slot) slot.available = false;
  }

  return slots;
}

// ─── Booking Approval ─────────────────────────────────

/** Approve a pending booking — sends confirmation to patient */
export async function approveBooking(bookingId: string, approvedBy: string) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "confirmed",
      confirmedAt: new Date(),
      confirmedBy: approvedBy,
    },
    include: { practice: true },
  });

  // Send confirmation notifications
  await sendBookingConfirmation(booking, booking.practice);
  return booking;
}

/** Reject a pending booking — notifies patient */
export async function rejectBooking(bookingId: string, reason: string) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "cancelled",
      rejectedAt: new Date(),
      rejectionReason: reason,
    },
    include: { practice: true },
  });

  // Notify patient
  if (booking.patientPhone) {
    const msg = `Hi ${booking.patientName}, unfortunately your booking at ${booking.practice.name} for ${formatDate(booking.scheduledAt)} could not be confirmed. ${reason ? `Reason: ${reason}. ` : ""}Please call us at ${booking.practice.phone} to reschedule.`;
    await trySendWhatsApp(booking.patientPhone, msg, booking.practiceId, booking.patientName);
  }

  return booking;
}

// ─── Send Notifications ───────────────────────────────

/** Send booking confirmation via WhatsApp + Email */
async function sendBookingConfirmation(
  booking: { id: string; patientName: string; patientPhone: string; patientEmail: string; service: string; scheduledAt: Date; depositAmount: number; depositPaid: boolean; practiceId: string },
  practice: { name: string; address: string; phone: string; primaryColor: string; hours: string }
) {
  const dateStr = formatDate(booking.scheduledAt);
  const timeStr = formatTime(booking.scheduledAt);

  // WhatsApp confirmation + address
  if (booking.patientPhone) {
    const msg = `Hi ${booking.patientName}! Your appointment at ${practice.name} has been confirmed.\n\n` +
      `Service: ${booking.service}\n` +
      `Date: ${dateStr}\n` +
      `Time: ${timeStr}\n` +
      `Address: ${practice.address}\n\n` +
      `Please arrive 10 minutes early.` +
      (booking.depositAmount > 0 && !booking.depositPaid ? `\n\nDeposit of R${booking.depositAmount} is required.` : "") +
      `\n\nNeed to reschedule? Reply to this message or call ${practice.phone}.`;

    await trySendWhatsApp(booking.patientPhone, msg, booking.practiceId, booking.patientName);
  }

  // Email confirmation
  if (booking.patientEmail) {
    try {
      const { sendEmail, appointmentConfirmationEmail } = await import("@/lib/resend");
      const email = appointmentConfirmationEmail({
        practiceName: practice.name,
        primaryColor: practice.primaryColor || "#D4AF37",
        patientName: booking.patientName,
        service: booking.service,
        date: dateStr,
        time: timeStr,
        address: practice.address,
      });
      await sendEmail({ to: booking.patientEmail, ...email });
    } catch (err) {
      console.error("Email confirmation error:", err);
    }
  }
}

/** Send 24h reminder for upcoming confirmed bookings */
export async function sendDueReminders() {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  // Find confirmed bookings 24h away that haven't been reminded
  const bookings = await prisma.booking.findMany({
    where: {
      status: "confirmed",
      scheduledAt: { gte: in24h, lte: in25h },
      reminderSentAt: null,
    },
    include: { practice: true },
  });

  const results: { bookingId: string; sent: boolean; error?: string }[] = [];

  for (const booking of bookings) {
    try {
      const dateStr = formatDate(booking.scheduledAt);
      const timeStr = formatTime(booking.scheduledAt);

      // WhatsApp reminder
      if (booking.patientPhone) {
        const msg = `Reminder: You have an appointment tomorrow at ${booking.practice.name}.\n\n` +
          `Service: ${booking.service}\n` +
          `Time: ${timeStr}\n` +
          `Address: ${booking.practice.address}\n\n` +
          `Need to reschedule? Reply here or call ${booking.practice.phone}.`;

        await trySendWhatsApp(booking.patientPhone, msg, booking.practiceId, booking.patientName);
      }

      // Email reminder
      if (booking.patientEmail) {
        const { sendEmail, appointmentReminderEmail } = await import("@/lib/resend");
        const email = appointmentReminderEmail({
          practiceName: booking.practice.name,
          primaryColor: booking.practice.primaryColor || "#D4AF37",
          patientName: booking.patientName,
          service: booking.service,
          date: dateStr,
          time: timeStr,
          hoursUntil: 24,
        });
        await sendEmail({ to: booking.patientEmail, ...email }).catch(() => {});
      }

      // Mark as reminded
      await prisma.booking.update({ where: { id: booking.id }, data: { reminderSentAt: new Date() } });
      results.push({ bookingId: booking.id, sent: true });
    } catch (err) {
      results.push({ bookingId: booking.id, sent: false, error: String(err) });
    }
  }

  return results;
}

/** Send check-in details (address, what to bring) 2h before */
export async function sendCheckinDetails() {
  const now = new Date();
  const in2h = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const in3h = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const bookings = await prisma.booking.findMany({
    where: {
      status: "confirmed",
      scheduledAt: { gte: in2h, lte: in3h },
      checkinSentAt: null,
    },
    include: { practice: true },
  });

  for (const booking of bookings) {
    if (booking.patientPhone) {
      const msg = `Hi ${booking.patientName}, your appointment at ${booking.practice.name} is in 2 hours!\n\n` +
        `Address: ${booking.practice.address}\n\n` +
        `What to bring:\n` +
        `- Medical aid card\n` +
        `- ID document\n` +
        `- List of current medications\n\n` +
        `See you soon!`;

      await trySendWhatsApp(booking.patientPhone, msg, booking.practiceId, booking.patientName);
    }

    await prisma.booking.update({ where: { id: booking.id }, data: { checkinSentAt: new Date() } });
  }
}

/** Send follow-up messages for completed appointments */
export async function sendFollowups() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  // Find completed bookings from 24-48h ago with no followup sent
  const bookings = await prisma.booking.findMany({
    where: {
      status: "completed",
      scheduledAt: { gte: twoDaysAgo, lte: yesterday },
      followupSentAt: null,
    },
    include: { practice: true },
  });

  for (const booking of bookings) {
    // WhatsApp follow-up
    if (booking.patientPhone) {
      const msg = `Hi ${booking.patientName}, thank you for visiting ${booking.practice.name} for your ${booking.service}.\n\n` +
        `How are you feeling? If you have any questions or concerns, reply here or call us at ${booking.practice.phone}.\n\n` +
        `We'd also love your feedback — it helps us serve you better!`;

      await trySendWhatsApp(booking.patientPhone, msg, booking.practiceId, booking.patientName);
    }

    // Email follow-up
    if (booking.patientEmail) {
      try {
        const { sendEmail, followUpEmail } = await import("@/lib/resend");
        const email = followUpEmail({
          practiceName: booking.practice.name,
          primaryColor: booking.practice.primaryColor || "#D4AF37",
          patientName: booking.patientName,
          service: booking.service,
          message: `Thank you for your recent ${booking.service} appointment. We hope everything went well. If you're experiencing any issues or have questions about your treatment, please don't hesitate to contact us.`,
        });
        await sendEmail({ to: booking.patientEmail, ...email }).catch(() => {});
      } catch {}
    }

    await prisma.booking.update({ where: { id: booking.id }, data: { followupSentAt: new Date() } });
  }
}

// ─── Helpers ──────────────────────────────────────────

async function trySendWhatsApp(to: string, message: string, practiceId: string, patientName: string) {
  try {
    await sendWhatsApp(to, message);
    await prisma.notification.create({
      data: {
        type: "whatsapp",
        recipient: to,
        patientName,
        message,
        status: "sent",
        template: "booking",
        practiceId,
      },
    });
  } catch (err) {
    console.error("WhatsApp send error:", err);
    // Still log the attempt
    await prisma.notification.create({
      data: {
        type: "whatsapp",
        recipient: to,
        patientName,
        message,
        status: "failed",
        template: "booking",
        practiceId,
      },
    }).catch(() => {});
  }
}

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatTime(d: Date): string {
  return new Date(d).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false });
}
