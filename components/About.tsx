import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]">
      <h2 className="section-heading text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[38px] before:content-['//_'] before:text-dimmer">
        cat profile.json
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px]">
        {profile.aboutCards.map((c) => (
          <div key={c.tag} className="card-glow glass-card rounded-lg px-6 py-[22px]">
            <div className="text-cyan text-glow-cyan text-[10.5px] uppercase tracking-[1.5px] mb-2">
              {c.tag}
            </div>
            <div className="text-text font-semibold text-[15.5px] mb-2">{c.title}</div>
            <div className="text-dim text-[13px] leading-relaxed">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
