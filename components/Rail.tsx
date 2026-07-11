"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buffers } from "@/data/profile";

export default function Rail() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col gap-0.5 w-[180px] shrink-0 bg-panel2/90 backdrop-blur-sm border-r border-border py-[22px] shadow-[1px_0_0_0_rgba(127,219,202,0.08)]">
      <div className="text-dimmer text-[10.5px] uppercase tracking-[1.5px] px-5 pb-2.5">
        buffers
      </div>
      {buffers.map((b) => {
        const active = pathname === b.href;
        return (
          <Link
            key={b.id}
            href={b.href}
            className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] border-l-2 transition-all duration-200 ${
              active
                ? "text-amber border-amber bg-gradient-to-r from-amber/[0.1] to-transparent text-glow shadow-[inset_2px_0_8px_-2px_rgba(255,180,84,0.3)]"
                : "text-dim border-transparent hover:text-text hover:bg-white/[0.02]"
            }`}
          >
            {active ? (
              <span className="w-[6px] h-[6px] rounded-full bg-amber pulse-dot" />
            ) : (
              <span className="text-dimmer text-[11.5px]">{b.n}</span>
            )}
            {b.file}
          </Link>
        );
      })}
    </nav>
  );
}
