import { profile } from "@/data/profile";
import SkillsSphere from "@/components/SkillsSphere";

export default function Skills() {
  return (
    <section id="skills" className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]">
      <h2 className="section-heading text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[38px] before:content-['//_'] before:text-dimmer">
        cat stack.txt
      </h2>

      <SkillsSphere />
      <div className="text-dimmer text-[11px] uppercase tracking-[1.5px] mt-3 mb-10">
        click + drag to rotate
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-[640px]">
        {profile.skills.map((s) => (
          <div
            key={s.name}
            className="flex justify-between py-[7px] text-[13.5px] border-b border-dotted border-border"
          >
            <span className="text-text">{s.name}</span>
            <span className="text-dim">{s.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
