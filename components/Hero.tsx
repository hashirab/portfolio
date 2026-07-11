"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Hero() {
  const words = profile.bio.split(" ");
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (i < words.length) {
        i++;
        setCount(i);
        timeoutId = setTimeout(typeNext, 55 + Math.random() * 70);
      }
    };
    timeoutId = setTimeout(typeNext, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]"
    >
      <div className="flex items-center gap-2 text-dim text-[11px] uppercase tracking-[2px] mb-5">
        <span className="w-[6px] h-[6px] rounded-full bg-cyan pulse-dot-cyan" />
        {profile.location} — {profile.status}
      </div>

      <div className="text-cyan text-[13.5px] before:content-['➜_'] before:text-dimmer">
        whoami
      </div>
      <h1 className="text-glow text-[clamp(38px,6vw,64px)] font-bold my-[18px] -tracking-[1px] bg-gradient-to-r from-text to-cyan bg-clip-text text-transparent">
        {profile.name}
      </h1>
      <div className="text-amber text-base mb-7">{profile.role}</div>
      <div className="text-cyan text-[13.5px] mt-1.5 before:content-['➜_'] before:text-dimmer">
        generate --bio
      </div>
      <div className="text-text text-[15.5px] max-w-[600px] min-h-[80px] mt-2">
        {words.slice(0, count).join(" ")}
        <span className="inline-block w-2 h-[17px] bg-amber align-middle ml-0.5 cursor-blink shadow-[0_0_8px_rgba(255,180,84,0.6)]" />
      </div>

      <div className="flex items-center gap-4 flex-wrap mt-8 text-[13px]">
        <Link
          href="/projects"
          className="btn-neon-amber px-5 py-[10px] rounded-[3px] text-bg font-semibold tracking-wide"
        >
          view work
        </Link>
        <a
          href="#chat"
          className="btn-neon-cyan px-5 py-[10px] rounded-[3px] border border-cyanDim text-cyan hover:bg-cyan/[0.08]"
        >
          ask me anything
        </a>
      </div>

      <div className="flex gap-6 flex-wrap text-[13px] mt-8">
        <a
          href={profile.links.github}
          target="_blank"
          className="text-dim border-b border-dashed border-border pb-[3px] hover:text-cyan hover:border-cyan transition-colors"
        >
          {profile.links.github.replace("https://", "")}
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          className="text-dim border-b border-dashed border-border pb-[3px] hover:text-cyan hover:border-cyan transition-colors"
        >
          {profile.links.linkedin.replace("https://", "")}
        </a>
        <a
          href={`mailto:${profile.links.email}`}
          className="text-dim border-b border-dashed border-border pb-[3px] hover:text-cyan hover:border-cyan transition-colors"
        >
          {profile.links.email}
        </a>
      </div>

      <div className="text-dimmer text-[11.5px] mt-14">
        use buffers 1–6 on the left to explore →
      </div>
    </section>
  );
}
