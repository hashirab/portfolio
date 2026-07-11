"use client";

import { usePathname } from "next/navigation";
import { buffers } from "@/data/profile";

export default function StatusBar() {
  const pathname = usePathname();
  const active = buffers.find((b) => b.href === pathname) ?? buffers[0];

  return (
    <div className="flex items-center gap-4 bg-panel2/90 backdrop-blur-sm px-5 py-1.5 text-[11.5px] text-dimmer shadow-[0_-1px_0_0_rgba(255,180,84,0.16),0_-6px_20px_-14px_rgba(255,180,84,0.4)]">
      <span className="text-bg bg-amber px-2.5 py-[1px] rounded-[3px] font-bold tracking-wide shadow-[0_0_10px_rgba(255,180,84,0.5)]">
        NORMAL
      </span>
      <span className="hidden sm:inline">~/site/{active.file}</span>
      <span className="flex-1" />
      <span>UTF-8</span>
      <span className="hidden sm:inline">Next.js · Three.js · Groq</span>
    </div>
  );
}
