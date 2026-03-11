// Resend email integration
// Docs: https://resend.com/docs

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const fromEmail = process.env.RESEND_FROM_EMAIL || "VisioHealth Ops <noreply@healthops.co.za>";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/** Send a single email */
export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  const result = await resend.emails.send({
    from: fromEmail,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    replyTo,
  });
  return result;
}

// ─── Email Templates ───────────────────────────────────

function baseTemplate(practiceName: string, primaryColor: string, content: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:20px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:${primaryColor};padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:600;">${practiceName}</h1>
    </div>
    <div style="padding:32px;">
      ${content}
    </div>
    <div style="padding:16px 32px;background:#fafafa;border-top:1px solid #eee;text-align:center;">
      <p style="margin:0;color:#999;font-size:11px;">Powered by VisioHealth Ops</p>
    </div>
  </div>
</body>
</html>`;
}

/** Appointment confirmation email */
export function appointmentConfirmationEmail(opts: {
  practiceName: string;
  primaryColor: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  address: string;
}) {
  const content = `
    <h2 style="margin:0 0 16px;color:#333;font-size:20px;">Appointment Confirmed</h2>
    <p style="color:#555;font-size:14px;line-height:1.6;">Hi ${opts.patientName},</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">Your appointment has been confirmed:</p>
    <div style="background:#f8f8f8;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Service:</strong> ${opts.service}</p>
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Date:</strong> ${opts.date}</p>
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Time:</strong> ${opts.time}</p>
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Location:</strong> ${opts.address}</p>
    </div>
    <p style="color:#555;font-size:14px;line-height:1.6;">Please arrive 10 minutes early. If you need to reschedule, reply to this email or WhatsApp us.</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">See you soon!<br/><strong>${opts.practiceName}</strong></p>`;
  return {
    subject: `Appointment Confirmed — ${opts.date} at ${opts.time}`,
    html: baseTemplate(opts.practiceName, opts.primaryColor, content),
  };
}

/** Appointment reminder email */
export function appointmentReminderEmail(opts: {
  practiceName: string;
  primaryColor: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  hoursUntil: number;
}) {
  const content = `
    <h2 style="margin:0 0 16px;color:#333;font-size:20px;">Appointment Reminder</h2>
    <p style="color:#555;font-size:14px;line-height:1.6;">Hi ${opts.patientName},</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">This is a friendly reminder that your appointment is in <strong>${opts.hoursUntil} hours</strong>.</p>
    <div style="background:#f8f8f8;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Service:</strong> ${opts.service}</p>
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Date:</strong> ${opts.date}</p>
      <p style="margin:4px 0;color:#333;font-size:14px;"><strong>Time:</strong> ${opts.time}</p>
    </div>
    <p style="color:#555;font-size:14px;line-height:1.6;">Need to reschedule? Just reply to this email.</p>`;
  return {
    subject: `Reminder: ${opts.service} tomorrow at ${opts.time}`,
    html: baseTemplate(opts.practiceName, opts.primaryColor, content),
  };
}

/** Invoice/receipt email */
export function invoiceEmail(opts: {
  practiceName: string;
  primaryColor: string;
  patientName: string;
  invoiceNumber: string;
  total: number;
  items: { description: string; amount: number }[];
  dueDate?: string;
}) {
  const itemsHtml = opts.items.map(item =>
    `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555;font-size:14px;">${item.description}</td><td style="padding:8px 0;border-bottom:1px solid #eee;color:#333;font-size:14px;text-align:right;">R${item.amount.toLocaleString()}</td></tr>`
  ).join("");

  const content = `
    <h2 style="margin:0 0 16px;color:#333;font-size:20px;">Invoice #${opts.invoiceNumber}</h2>
    <p style="color:#555;font-size:14px;line-height:1.6;">Hi ${opts.patientName},</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">Please find your invoice below:</p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <thead><tr><th style="text-align:left;padding:8px 0;border-bottom:2px solid #eee;color:#999;font-size:12px;text-transform:uppercase;">Description</th><th style="text-align:right;padding:8px 0;border-bottom:2px solid #eee;color:#999;font-size:12px;text-transform:uppercase;">Amount</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
      <tfoot><tr><td style="padding:12px 0;font-weight:bold;color:#333;font-size:16px;">Total</td><td style="padding:12px 0;font-weight:bold;color:#333;font-size:16px;text-align:right;">R${opts.total.toLocaleString()}</td></tr></tfoot>
    </table>
    ${opts.dueDate ? `<p style="color:#555;font-size:14px;">Payment due by: <strong>${opts.dueDate}</strong></p>` : ""}
    <p style="color:#555;font-size:14px;line-height:1.6;">Payment methods: EFT, Credit Card, or Cash at reception.</p>`;
  return {
    subject: `Invoice #${opts.invoiceNumber} — R${opts.total.toLocaleString()}`,
    html: baseTemplate(opts.practiceName, opts.primaryColor, content),
  };
}

/** Follow-up email after appointment */
export function followUpEmail(opts: {
  practiceName: string;
  primaryColor: string;
  patientName: string;
  service: string;
  message: string;
}) {
  const content = `
    <h2 style="margin:0 0 16px;color:#333;font-size:20px;">How are you feeling?</h2>
    <p style="color:#555;font-size:14px;line-height:1.6;">Hi ${opts.patientName},</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">${opts.message}</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">If you have any concerns, don't hesitate to reach out.</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">Kind regards,<br/><strong>${opts.practiceName}</strong></p>`;
  return {
    subject: `Follow-up: Your recent ${opts.service}`,
    html: baseTemplate(opts.practiceName, opts.primaryColor, content),
  };
}
