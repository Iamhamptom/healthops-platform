"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const counter = useRef(1);

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
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#6EE7B7] shadow-[0_0_20px_rgba(110,231,183,0.3)] flex items-center justify-center hover:bg-[#A7F3D0] hover:shadow-[0_0_30px_rgba(110,231,183,0.4)] transition-all duration-300 z-50"
          >
            <svg className="w-6 h-6 text-[#030F07]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 w-[380px] h-[520px] rounded-2xl bg-[#030F07] border border-[#6EE7B7]/[0.06] shadow-2xl shadow-black/20 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6EE7B7]/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">VisioHealth Assistant</div>
                  <div className="text-[11px] text-[#6EE7B7] flex items-center gap-1 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 text-white/30 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#6EE7B7] text-[#030F07] rounded-2xl rounded-br-md"
                      : "bg-[#071A0E] text-white/70 rounded-2xl rounded-bl-md border border-white/[0.04]"
                  }`}>
                    {msg.content}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => playVoice(msg.content)}
                        className="ml-2 inline-flex opacity-30 hover:opacity-80 transition-opacity"
                        title="Listen"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-3 rounded-2xl rounded-bl-md bg-[#071A0E] border border-white/[0.04] flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/[0.04] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3.5 py-2.5 bg-[#071A0E] border border-white/[0.04] rounded-xl text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#6EE7B7]/20 focus:ring-2 focus:ring-[#6EE7B7]/5 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-[#6EE7B7] rounded-xl hover:bg-[#A7F3D0] disabled:opacity-30 transition-all"
              >
                <svg className="w-4 h-4 text-[#030F07]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
