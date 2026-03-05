// Demo data for Vercel deployment (no persistent SQLite in serverless)
// Used when DEMO_MODE=true or DB is unavailable

const now = new Date();
const day = 86400000;

export const demoPractice = {
  id: "demo-practice",
  name: "Smile Dental — Sandton",
  type: "dental",
  address: "45 Rivonia Rd, Sandton, 2196",
  phone: "+27 11 783 4500",
  hours: "Mon-Fri 8:00-17:00, Sat 8:00-13:00",
  aiPersonality: "friendly",
  createdAt: new Date(now.getTime() - 30 * day),
};

export const demoUser = {
  id: "demo-user",
  name: "Dr. Sarah Mitchell",
  email: "demo@smiledental.co.za",
  practice: demoPractice,
};

export const demoPatients = [
  { id: "p1", name: "Maria Santos", phone: "+27 82 345 6789", email: "maria@email.com", practiceId: "demo-practice" },
  { id: "p2", name: "James Khumalo", phone: "+27 83 456 7890", email: "james@email.com", practiceId: "demo-practice" },
  { id: "p3", name: "Thandi Mokoena", phone: "+27 84 567 8901", email: "thandi@email.com", practiceId: "demo-practice" },
  { id: "p4", name: "David Robinson", phone: "+27 85 678 9012", email: "david@email.com", practiceId: "demo-practice" },
  { id: "p5", name: "Lerato Phiri", phone: "+27 86 789 0123", email: "lerato@email.com", practiceId: "demo-practice" },
];

export const demoConversations = [
  {
    id: "c1",
    patientId: "p1",
    patient: demoPatients[0],
    practiceId: "demo-practice",
    status: "active",
    createdAt: new Date(now.getTime() - 2 * day),
    updatedAt: new Date(now.getTime() - 120000),
    messages: [
      { id: "m1", conversationId: "c1", role: "patient", content: "Hi, I'd like to reschedule my cleaning appointment from Thursday to next week.", approved: true, createdAt: new Date(now.getTime() - 3600000) },
      { id: "m2", conversationId: "c1", role: "practice", content: "Hi Maria! Of course, we can reschedule. Would Monday or Wednesday next week work for you? We have slots at 9:00 and 14:00 on both days.", approved: true, createdAt: new Date(now.getTime() - 3000000) },
      { id: "m3", conversationId: "c1", role: "patient", content: "Wednesday at 14:00 would be perfect, thank you!", approved: true, createdAt: new Date(now.getTime() - 2400000) },
    ],
  },
  {
    id: "c2",
    patientId: "p2",
    patient: demoPatients[1],
    practiceId: "demo-practice",
    status: "active",
    createdAt: new Date(now.getTime() - day),
    updatedAt: new Date(now.getTime() - 480000),
    messages: [
      { id: "m4", conversationId: "c2", role: "patient", content: "What are your prices for teeth whitening?", approved: true, createdAt: new Date(now.getTime() - 600000) },
      { id: "m5", conversationId: "c2", role: "ai_suggestion", content: "Hi James! Great question. Our teeth whitening treatments start from R2,500 for in-office whitening, which gives you results in about an hour. We also offer take-home kits from R1,200. Would you like to book a consultation to discuss which option would work best for you?", approved: false, createdAt: new Date(now.getTime() - 540000) },
    ],
  },
  {
    id: "c3",
    patientId: "p5",
    patient: demoPatients[4],
    practiceId: "demo-practice",
    status: "active",
    createdAt: new Date(now.getTime() - 3600000),
    updatedAt: new Date(now.getTime() - 300000),
    messages: [
      { id: "m6", conversationId: "c3", role: "patient", content: "I need an emergency appointment please. I have severe pain in my back tooth.", approved: true, createdAt: new Date(now.getTime() - 900000) },
      { id: "m7", conversationId: "c3", role: "ai_suggestion", content: "Hi Lerato, I'm sorry to hear you're in pain. We always prioritise emergency cases. Can you come in today? We have an opening at 15:30. If the pain is severe, please take an anti-inflammatory in the meantime. If it worsens, please call us directly at +27 11 783 4500.", approved: false, createdAt: new Date(now.getTime() - 840000) },
    ],
  },
];

export const demoBookings = [
  { id: "b1", patientName: "Maria Santos", service: "Cleaning", scheduledAt: new Date(now.getTime() + 2 * day), status: "confirmed", notes: "", practiceId: "demo-practice", createdAt: new Date(now.getTime() - day) },
  { id: "b2", patientName: "James Khumalo", service: "Whitening Consultation", scheduledAt: new Date(now.getTime() + 3 * day), status: "pending", notes: "", practiceId: "demo-practice", createdAt: new Date(now.getTime() - day) },
  { id: "b3", patientName: "Thandi Mokoena", service: "Check-up", scheduledAt: new Date(now.getTime() + day), status: "confirmed", notes: "", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 2 * day) },
  { id: "b4", patientName: "David Robinson", service: "Filling", scheduledAt: new Date(now.getTime() + 5 * day), status: "pending", notes: "Nervous patient — needs extra care", practiceId: "demo-practice", createdAt: new Date(now.getTime() - day) },
  { id: "b5", patientName: "Lerato Phiri", service: "Emergency — Toothache", scheduledAt: new Date(now.getTime() + 3600000), status: "confirmed", notes: "", practiceId: "demo-practice", createdAt: now },
];

export const demoReviews = [
  { id: "r1", rating: 5, comment: "Dr. Mitchell is amazing! Painless filling and the staff were so friendly.", source: "google", authorName: "James K.", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 3 * day) },
  { id: "r2", rating: 5, comment: "Best dental experience I've had. Modern clinic and great communication via WhatsApp.", source: "google", authorName: "Thandi M.", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 7 * day) },
  { id: "r3", rating: 4, comment: "Good service overall. Waiting time was a bit long but treatment was excellent.", source: "facebook", authorName: "David R.", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 10 * day) },
  { id: "r4", rating: 5, comment: "Love the appointment reminders! Never miss a check-up anymore.", source: "whatsapp", authorName: "Maria S.", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 14 * day) },
];

export const demoRecallItems = [
  { id: "rc1", patientName: "Maria Santos", reason: "6-month check-up", dueDate: new Date(now.getTime() + 7 * day), contacted: false, phone: "+27 82 345 6789", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 5 * day) },
  { id: "rc2", patientName: "David Robinson", reason: "Follow-up: filling", dueDate: new Date(now.getTime() - 3 * day), contacted: false, phone: "+27 85 678 9012", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 10 * day) },
  { id: "rc3", patientName: "Thandi Mokoena", reason: "Annual X-rays due", dueDate: new Date(now.getTime() + 14 * day), contacted: false, phone: "+27 84 567 8901", practiceId: "demo-practice", createdAt: new Date(now.getTime() - 7 * day) },
];

// In-memory mutable store for demo mode interactivity
let _conversations = [...demoConversations.map(c => ({ ...c, messages: [...c.messages] }))];
let _bookings = [...demoBookings];
let _reviews = [...demoReviews];
let _recallItems = [...demoRecallItems];
let _msgCounter = 100;

export const demoStore = {
  getConversations: () => _conversations,
  getConversation: (id: string) => _conversations.find(c => c.id === id),
  addMessage: (convoId: string, role: string, content: string) => {
    const convo = _conversations.find(c => c.id === convoId);
    if (!convo) return null;
    const msg = { id: `dm${_msgCounter++}`, conversationId: convoId, role, content, approved: role !== "ai_suggestion", createdAt: new Date() };
    convo.messages.push(msg);
    convo.updatedAt = new Date();
    return msg;
  },
  approveMessage: (convoId: string, msgId: string, newContent?: string) => {
    const convo = _conversations.find(c => c.id === convoId);
    const msg = convo?.messages.find(m => m.id === msgId);
    if (!msg) return false;
    if (newContent) msg.content = newContent;
    msg.role = "practice";
    msg.approved = true;
    return true;
  },
  simulatePatient: () => {
    const messages = [
      "Hi, I'd like to reschedule my appointment for next week",
      "What are your prices for teeth whitening?",
      "Do you have availability this Thursday afternoon?",
      "I have a toothache, can I come in today?",
      "Do you accept medical aid?",
      "Can I book a cleaning for my daughter too?",
    ];
    const patient = demoPatients[Math.floor(Math.random() * demoPatients.length)];
    const content = messages[Math.floor(Math.random() * messages.length)];

    // Find or create conversation
    let convo = _conversations.find(c => c.patientId === patient.id);
    if (!convo) {
      convo = {
        id: `c${_msgCounter++}`,
        patientId: patient.id,
        patient,
        practiceId: "demo-practice",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
      };
      _conversations.unshift(convo);
    }

    const msg = { id: `dm${_msgCounter++}`, conversationId: convo.id, role: "patient", content, approved: true, createdAt: new Date() };
    convo.messages.push(msg);
    convo.updatedAt = new Date();

    // Auto-generate AI suggestion
    const aiContent = generateMockAIReply(content, patient.name);
    const aiMsg = { id: `dm${_msgCounter++}`, conversationId: convo.id, role: "ai_suggestion", content: aiContent, approved: false, createdAt: new Date() };
    convo.messages.push(aiMsg);

    return { conversationId: convo.id, message: content };
  },

  getBookings: () => _bookings,
  addBooking: (data: { patientName: string; service: string; scheduledAt: string; notes?: string }) => {
    const b = { id: `b${_msgCounter++}`, ...data, scheduledAt: new Date(data.scheduledAt), status: "pending", notes: data.notes || "", practiceId: "demo-practice", createdAt: new Date() };
    _bookings.push(b);
    return b;
  },
  updateBooking: (id: string, data: { status?: string }) => {
    const b = _bookings.find(x => x.id === id);
    if (b && data.status) b.status = data.status;
    return b;
  },
  deleteBooking: (id: string) => { _bookings = _bookings.filter(x => x.id !== id); },

  getReviews: () => _reviews,
  addReview: (data: { rating: number; comment?: string; source?: string; authorName?: string }) => {
    const r = { id: `r${_msgCounter++}`, rating: data.rating, comment: data.comment || "", source: data.source || "google", authorName: data.authorName || "", practiceId: "demo-practice", createdAt: new Date() };
    _reviews.unshift(r);
    return r;
  },
  deleteReview: (id: string) => { _reviews = _reviews.filter(x => x.id !== id); },

  getRecallItems: () => _recallItems,
  addRecallItem: (data: { patientName: string; reason: string; dueDate: string; phone?: string }) => {
    const item = { id: `rc${_msgCounter++}`, ...data, dueDate: new Date(data.dueDate), contacted: false, phone: data.phone || "", practiceId: "demo-practice", createdAt: new Date() };
    _recallItems.push(item);
    return item;
  },
  updateRecallItem: (id: string, data: { contacted?: boolean }) => {
    const item = _recallItems.find(x => x.id === id);
    if (item && data.contacted !== undefined) item.contacted = data.contacted;
    return item;
  },
  deleteRecallItem: (id: string) => { _recallItems = _recallItems.filter(x => x.id !== id); },
};

function generateMockAIReply(patientMessage: string, patientName: string): string {
  const lower = patientMessage.toLowerCase();
  const firstName = patientName.split(" ")[0];

  if (lower.includes("reschedule") || lower.includes("appointment")) {
    return `Hi ${firstName}! Of course, we can help with that. We have availability on Monday at 10:00, Wednesday at 14:00, and Friday at 9:00. Which works best for you?`;
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("whitening")) {
    return `Hi ${firstName}! Great question. Our teeth whitening starts from R2,500 for in-office treatment (1 hour) or R1,200 for take-home kits. Would you like to book a free consultation?`;
  }
  if (lower.includes("availability") || lower.includes("thursday") || lower.includes("book")) {
    return `Hi ${firstName}! Let me check our schedule. We have openings at 14:00 and 15:30. Shall I book one of those for you?`;
  }
  if (lower.includes("pain") || lower.includes("emergency") || lower.includes("toothache")) {
    return `Hi ${firstName}, I'm sorry to hear that. We prioritise emergencies — can you come in today at 15:30? Please take an anti-inflammatory in the meantime. If pain worsens, call us at +27 11 783 4500.`;
  }
  if (lower.includes("medical aid") || lower.includes("insurance")) {
    return `Hi ${firstName}! Yes, we accept all major medical aids including Discovery, Bonitas, Momentum, and Medihelp. We can also do a benefits check before your appointment.`;
  }
  if (lower.includes("cancel")) {
    return `Hi ${firstName}, no problem! I've noted the cancellation. Would you like to rebook for another day?`;
  }
  return `Hi ${firstName}! Thanks for reaching out. Let me connect you with our team who can assist. Is there anything specific I can help with in the meantime?`;
}
