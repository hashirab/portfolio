"use client";

import { useEffect, useState } from "react";
import { buffers } from "@/data/profile";

export function useActiveSection() {
  const [active, setActive] = useState<string>(buffers[0].id);

  useEffect(() => {
    const sections = buffers
      .map((b) => document.getElementById(b.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
