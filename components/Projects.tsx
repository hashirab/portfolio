import { profile } from "@/data/profile";
import { langIcons, iconDisplayHex } from "@/components/techIcons";

export default function Projects() {
  return (
    <section className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]">
      <h2 className="section-heading text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[38px] before:content-['//_'] before:text-dimmer">
        ls -la projects/
      </h2>

      <div className="space-y-5">
        {profile.projects.map((p, idx) => {
          const langIcon = langIcons[p.lang];
          return (
          <div key={p.name} className="card-glow glass-card rounded-lg px-6 py-[26px]">
            <div className="flex items-baseline gap-3 flex-wrap justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-dimmer text-xs">{String(idx + 1).padStart(2, "0")}</span>
                <span className="text-cyan font-semibold text-[16.5px]">{p.name}</span>
              </div>
              <span className="flex items-center gap-1.5 text-amberDim text-[10.5px] uppercase tracking-[1.5px] border border-border rounded px-2 py-[2px]">
                {langIcon && (
                  <svg viewBox="0 0 24 24" width="11" height="11">
                    <path fill={`#${iconDisplayHex(langIcon)}`} d={langIcon.path} />
                  </svg>
                )}
                {p.lang}
              </span>
            </div>
            <div className="text-dimmer text-xs mt-1.5">{p.tag}</div>

            <div className="mt-4">
              <div className="text-dim text-[10.5px] uppercase tracking-[1.5px] mb-1.5">
                problem
              </div>
              <div className="text-text text-sm opacity-90 max-w-[640px]">{p.problem}</div>
            </div>

            <div className="mt-4">
              <div className="text-dim text-[10.5px] uppercase tracking-[1.5px] mb-1.5">
                solution
              </div>
              <div className="text-text text-sm opacity-90 max-w-[640px]">{p.solution}</div>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[11.5px] text-dim border border-border px-[9px] py-[3px] rounded bg-panel"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-dim text-[10.5px] uppercase tracking-[1.5px] mb-1.5">
                key results
              </div>
              <div className="space-y-1">
                {p.results.map((r) => (
                  <div key={r} className="flex gap-2 text-sm text-text opacity-90">
                    <span className="text-amber">→</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {p.links.length > 0 && (
              <div className="flex gap-[18px] mt-4 text-[12.5px]">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    className="text-amber hover:underline"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </div>
    </section>
  );
}
