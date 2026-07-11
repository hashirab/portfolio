import { profile } from "@/data/profile";
import { brandIcons, iconDisplayHex } from "@/components/techIcons";

type IconType = "github" | "link" | "mail";

const items: { label: string; value: string; href: string; icon: IconType }[] = [
  {
    label: "GitHub",
    value: profile.links.github.replace("https://", ""),
    href: profile.links.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: profile.links.linkedin.replace("https://", ""),
    href: profile.links.linkedin,
    icon: "link",
  },
  {
    label: "Email",
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
    icon: "mail",
  },
];

function RowIcon({ type }: { type: IconType }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill={`#${iconDisplayHex(brandIcons.siGithub)}`} d={brandIcons.siGithub.path} />
      </svg>
    );
  }
  if (type === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22 6 12 13 2 6" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function Links() {
  return (
    <section id="links" className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-[70px]">
      <h2 className="section-heading text-[12.5px] uppercase tracking-[2.5px] text-dim font-semibold mb-[38px] before:content-['//_'] before:text-dimmer">
        cat links.txt
      </h2>

      <div className="space-y-3 max-w-[520px]">
        {items.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            className="card-glow glass-card flex items-center justify-between rounded-lg px-5 py-4"
          >
            <span className="flex items-center gap-2.5 text-cyan text-[13.5px]">
              <RowIcon type={l.icon} />
              {l.label}
            </span>
            <span className="text-dim text-[13px]">{l.value} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
