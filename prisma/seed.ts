import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const passwordHash = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@smiledental.co.za" },
    update: {},
    create: {
      email: "demo@smiledental.co.za",
      name: "Dr. Sarah Mitchell",
      passwordHash,
    },
  });

  // Create practice
  let practice = await prisma.practice.findFirst({ where: { users: { some: { id: user.id } } } });
  if (!practice) {
    practice = await prisma.practice.create({
      data: {
        name: "Smile Dental — Sandton",
        type: "dental",
        address: "45 Rivonia Rd, Sandton, 2196",
        phone: "+27 11 783 4500",
        hours: "Mon-Fri 8:00-17:00, Sat 8:00-13:00",
        aiPersonality: "friendly",
      },
    });
    await prisma.user.update({ where: { id: user.id }, data: { practiceId: practice.id } });
  }

  // Create patients
  const patientsData = [
    { name: "Maria Santos", phone: "+27 82 345 6789", email: "maria@email.com" },
    { name: "James Khumalo", phone: "+27 83 456 7890", email: "james@email.com" },
    { name: "Thandi Mokoena", phone: "+27 84 567 8901", email: "thandi@email.com" },
    { name: "David Robinson", phone: "+27 85 678 9012", email: "david@email.com" },
    { name: "Lerato Phiri", phone: "+27 86 789 0123", email: "lerato@email.com" },
  ];

  const patients = [];
  for (const p of patientsData) {
    const patient = await prisma.patient.create({
      data: { ...p, practiceId: practice.id, lastVisit: new Date(Date.now() - Math.random() * 90 * 86400000) },
    });
    patients.push(patient);
  }

  // Create conversations with messages
  const convoData = [
    {
      patientIdx: 0,
      messages: [
        { role: "patient", content: "Hi, I'd like to reschedule my cleaning appointment from Thursday to next week." },
        { role: "practice", content: "Hi Maria! Of course, we can reschedule. Would Monday or Wednesday next week work for you? We have slots at 9:00 and 14:00 on both days." },
        { role: "patient", content: "Wednesday at 14:00 would be perfect, thank you!" },
      ],
    },
    {
      patientIdx: 1,
      messages: [
        { role: "patient", content: "What are your prices for teeth whitening?" },
        { role: "ai_suggestion", content: "Hi James! Great question. Our teeth whitening treatments start from R2,500 for in-office whitening, which gives you results in about an hour. We also offer take-home kits from R1,200. Would you like to book a consultation to discuss which option would work best for you?" },
      ],
    },
    {
      patientIdx: 4,
      messages: [
        { role: "patient", content: "I need an emergency appointment please. I have severe pain in my back tooth." },
        { role: "ai_suggestion", content: "Hi Lerato, I'm sorry to hear you're in pain. We always prioritise emergency cases. Can you come in today? We have an opening at 15:30. If the pain is severe, please take an anti-inflammatory in the meantime. If it worsens, please call us directly at +27 11 783 4500." },
      ],
    },
  ];

  for (const c of convoData) {
    const conversation = await prisma.conversation.create({
      data: { patientId: patients[c.patientIdx].id, practiceId: practice.id },
    });
    for (const msg of c.messages) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: msg.role,
          content: msg.content,
          approved: msg.role !== "ai_suggestion",
        },
      });
    }
  }

  // Create bookings
  const now = new Date();
  const bookingsData = [
    { patientName: "Maria Santos", service: "Cleaning", scheduledAt: new Date(now.getTime() + 2 * 86400000), status: "confirmed" },
    { patientName: "James Khumalo", service: "Whitening Consultation", scheduledAt: new Date(now.getTime() + 3 * 86400000), status: "pending" },
    { patientName: "Thandi Mokoena", service: "Check-up", scheduledAt: new Date(now.getTime() + 86400000), status: "confirmed" },
    { patientName: "David Robinson", service: "Filling", scheduledAt: new Date(now.getTime() + 5 * 86400000), status: "pending" },
    { patientName: "Lerato Phiri", service: "Emergency — Toothache", scheduledAt: new Date(now.getTime() + 3600000), status: "confirmed" },
  ];

  for (const b of bookingsData) {
    await prisma.booking.create({ data: { ...b, practiceId: practice.id } });
  }

  // Create reviews
  const reviewsData = [
    { rating: 5, comment: "Dr. Mitchell is amazing! Painless filling and the staff were so friendly.", source: "google", authorName: "James K." },
    { rating: 5, comment: "Best dental experience I've had. Modern clinic and great communication via WhatsApp.", source: "google", authorName: "Thandi M." },
    { rating: 4, comment: "Good service overall. Waiting time was a bit long but treatment was excellent.", source: "facebook", authorName: "David R." },
    { rating: 5, comment: "Love the appointment reminders! Never miss a check-up anymore.", source: "whatsapp", authorName: "Maria S." },
  ];

  for (const r of reviewsData) {
    await prisma.review.create({ data: { ...r, practiceId: practice.id } });
  }

  // Create recall items
  const recallData = [
    { patientName: "Maria Santos", reason: "6-month check-up", dueDate: new Date(now.getTime() + 7 * 86400000), phone: "+27 82 345 6789" },
    { patientName: "David Robinson", reason: "Follow-up: filling", dueDate: new Date(now.getTime() - 3 * 86400000), phone: "+27 85 678 9012" },
    { patientName: "Thandi Mokoena", reason: "Annual X-rays due", dueDate: new Date(now.getTime() + 14 * 86400000), phone: "+27 84 567 8901" },
  ];

  for (const r of recallData) {
    await prisma.recallItem.create({ data: { ...r, practiceId: practice.id } });
  }

  console.log("Seed complete!");
  console.log("Demo login: demo@smiledental.co.za / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
