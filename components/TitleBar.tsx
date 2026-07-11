"use client";

import { useEffect, useState } from "react";

export default function TitleBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex items-center gap-2.5 px-5 py-[11px] bg-panel2/90 backdrop-blur-sm text-[12.5px] text-dim shadow-[0_1px_0_0_rgba(127,219,202,0.18),0_6px_24px_-12px_rgba(127,219,202,0.35)]">
      <span className="w-[9px] h-[9px] rounded-full bg-[#5a3535] shadow-[0_0_6px_rgba(90,53,53,0.6)]" />
      <span className="w-[9px] h-[9px] rounded-full bg-[#5a5335] shadow-[0_0_6px_rgba(90,83,53,0.6)]" />
      <span className="w-[9px] h-[9px] rounded-full bg-[#355a3d] shadow-[0_0_6px_rgba(53,90,61,0.6)]" />
      <span className="ml-1.5">hashir@portfolio: ~/site</span>
      <span className="flex-1" />
      <span className="w-[6px] h-[6px] rounded-full bg-cyan pulse-dot-cyan" />
      <span className="text-dimmer text-xs">{time}</span>
    </div>
  );
}
