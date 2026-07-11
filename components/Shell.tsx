"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TitleBar from "@/components/TitleBar";
import Rail from "@/components/Rail";
import StatusBar from "@/components/StatusBar";

const BOOT_LINES = [
  "> initializing session...",
  "> loading buffers...",
  "> connection established",
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (bootStep < BOOT_LINES.length) {
      const t = setTimeout(() => setBootStep((s) => s + 1), 260);
      return () => clearTimeout(t);
    }
    const done = setTimeout(() => setBooting(false), 500);
    return () => clearTimeout(done);
  }, [bootStep]);

  return (
    <div className="h-screen w-screen flex flex-col relative z-10">
      {/* animated circuit-grid background */}
      <div className="circuit-grid" />
      <div
        className="glow-orb"
        style={{ width: 420, height: 420, top: "-10%", left: "8%", background: "rgba(255,180,84,0.10)" }}
      />
      <div
        className="glow-orb"
        style={{
          width: 380,
          height: 380,
          bottom: "-12%",
          right: "5%",
          background: "rgba(127,219,202,0.10)",
          animationDelay: "3s",
        }}
      />
      <div className="vignette" />

      {/* one-time boot overlay */}
      {booting && (
        <div className="boot-overlay fixed inset-0 z-50 flex items-center justify-center bg-bg">
          <div className="font-mono text-sm text-cyan space-y-1.5">
            {BOOT_LINES.slice(0, bootStep).map((line, i) => (
              <div key={i} className="opacity-90">
                {line}
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-amber align-middle ml-0.5 cursor-blink" />
          </div>
        </div>
      )}

      <TitleBar />
      <div className="flex-1 flex min-h-0">
        <Rail />
        <div className="flex-1 overflow-y-auto scroll-smooth content-scroll">
          <div key={pathname} className="page-transition max-w-[820px] mx-auto px-6 md:px-10">
            {children}
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
