"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Volume2 } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", content: "Hello! Welcome to Smile Dental Sandton. I can help you with bookings, pricing, practice info, or answer any questions. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  let counter = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: counter.current++, role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: counter.current++, role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { id: counter.current++, role: "assistant", content: "Sorry, something went wrong. Please call us at +27 11 783 4500." }]);
    }
    setLoading(false);
  }

  async function playVoice(text: string) {
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.headers.get("content-type")?.includes("audio")) {
        const blob = await res.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
      }
    } catch { /* voice not configured */ }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--gold)] shadow-lg shadow-[var(--gold)]/20 flex items-center justify-center hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow z-50"
          >
            <MessageCircle className="w-6 h-6 text-[var(--obsidian)]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] h-[520px] rounded-2xl glass-panel-strong shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--ivory)]">VisioHealth Assistant</div>
                  <div className="text-[10px] text-[var(--teal)] flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-[var(--text-tertiary)] hover:text-[var(--gold)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--gold)] text-[var(--obsidian)] rounded-br-md"
                      : "bg-[var(--charcoal)]/50 text-[var(--ivory)] rounded-bl-md"
                  }`}>
                    {msg.content}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => playVoice(msg.content)}
                        className="ml-2 inline-flex opacity-40 hover:opacity-100 transition-opacity"
                        title="Listen"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[var(--charcoal)]/50">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--gold)]" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-xl text-[13px] text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-[var(--gold)] rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4 text-[var(--obsidian)]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
