import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]">
      <h2 className="text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[26px] before:content-['//_'] before:text-dimmer">
        tail -f experience.log
      </h2>

      <div className="space-y-6 max-w-[640px]">
        {profile.experience.map((e) => (
          <div key={`${e.org}-${e.role}`} className="border-l-2 border-border pl-5">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="text-cyan font-semibold text-[15px]">
                {e.role} <span className="text-dim font-normal">@ {e.org}</span>
              </span>
              <span className="text-dimmer text-xs">{e.period}</span>
            </div>
            <div className="text-text text-sm mt-1.5 opacity-90">{e.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
