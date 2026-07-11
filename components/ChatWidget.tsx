"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const SUGGESTIONS = [
  "What is Hashir working on right now?",
  "Tell me about MatchMD",
  "What are Hashir's strongest skills?",
];

const GREETING: Message = {
  role: "assistant",
  content: `Hi! I'm ${profile.name.split(" ")[0]}'s portfolio assistant — ask me about his projects, skills, or background.`,
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => m !== GREETING)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error ?? "Something went wrong.", error: true },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error — try again in a moment.", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="py-[70px]">
      <h2 className="section-heading text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[38px] before:content-['//_'] before:text-dimmer">
        ask --about hashir
      </h2>

      <div className="glass-panel rounded-lg max-w-[640px]">
        <div
          ref={logRef}
          className="max-h-[280px] min-h-[140px] overflow-y-auto content-scroll px-5 py-[18px] space-y-3"
        >
          {messages.map((m, idx) => (
            <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`inline-block max-w-[85%] text-[13.5px] whitespace-pre-wrap rounded px-3 py-2 ${
                  m.role === "user"
                    ? "bg-amber/[0.08] text-amber border border-amberDim/40 shadow-[0_0_16px_-6px_rgba(255,180,84,0.5)]"
                    : m.error
                    ? "text-dim border border-border"
                    : "bg-cyan/[0.06] text-text border border-cyanDim/30 shadow-[0_0_16px_-6px_rgba(127,219,202,0.4)]"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-block text-[13.5px] text-dimmer px-3 py-2">
                thinking<span className="cursor-blink">...</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap px-5 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="text-[11.5px] text-dim border border-border px-[9px] py-[4px] rounded bg-panel hover:text-cyan hover:border-cyanDim hover:shadow-[0_0_12px_-4px_rgba(127,219,202,0.6)] transition-all disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(value);
          }}
          className="flex items-center gap-2.5 border-t border-border px-5 py-3"
        >
          <span className="text-cyan">$</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="type your question..."
            disabled={loading}
            className="flex-1 bg-transparent outline-none text-text placeholder:text-dimmer text-[13.5px]"
          />
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="text-amber text-glow text-[12.5px] hover:brightness-125 transition-[filter] disabled:opacity-40 disabled:hover:brightness-100"
          >
            send →
          </button>
        </form>
      </div>
    </section>
  );
}
