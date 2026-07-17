export const profile = {
  name: "Hashir Abdullah",
  role: "AI Engineer · MSc AI (Essex) · Founder, Hashrem",
  bio: "Aspiring AI engineer who ships end-to-end: RAG pipelines, evaluation frameworks, and products people actually use. Currently building Hashrem while interning at Elythros.",
  location: "London, UK",
  status: "Open to Junior / Graduate AI Engineer roles",
  links: {
    github: "https://github.com/hashirab",
    linkedin: "https://linkedin.com/in/hashirabdullah12",
    email: "hashir.abdullah01@outlook.com",
  },
  about: {
    education: "MSc AI, University of Essex (Merit)",
    background: "BS Bioinformatics, COMSATS University Islamabad",
    current_role: "AI Intern @ Elythros",
    founder_of: "Hashrem Ltd",
    based_in: "London, UK",
    looking_for: "Junior / Graduate AI Engineer roles",
  },
  aboutCards: [
    {
      tag: "mindset",
      title: "Ship end-to-end",
      body: "RAG pipelines, evaluation frameworks, and products people actually use — from architecture through deployment, not just notebooks.",
    },
    {
      tag: "education",
      title: "MSc AI, Essex",
      body: "MSc AI, University of Essex (Merit). BS Bioinformatics, COMSATS University Islamabad.",
    },
    {
      tag: "current work",
      title: "Elythros & Hashrem",
      body: "AI Intern @ Elythros, working on applied AI systems. Founder of Hashrem Ltd, building MatchMD and venue-waiver.",
    },
    {
      tag: "status",
      title: "Based in London",
      body: "Based in London, UK. Looking for Junior / Graduate AI Engineer roles.",
    },
  ],
  projects: [
    {
      name: "matchmd/",
      lang: "PYTHON",
      tag: "RAG · FastAPI · Next.js",
      problem:
        "IMG applicants navigating the USMLE residency match struggle to know which of 1,062 NRMP programs realistically fit their profile, and unmatched applicants have no clear next step.",
      solution:
        "Built a RAG pipeline over 1,062 NRMP programs, an XGBoost match-probability model, and a \"What's My Path\" roadmap generator for unmatched IMGs.",
      stack: ["FastAPI", "Next.js 14", "Groq · Llama 3.3 70B", "Supabase/pgvector", "MLflow"],
      results: [
        "Match-probability model at ROC-AUC 0.96",
        "RAG retrieval over 1,062 NRMP programs",
        "\"What's My Path\" roadmap for unmatched IMGs",
      ],
      links: [
        { label: "live", href: "https://matchmd-hashrem.vercel.app" },
        { label: "source", href: "https://github.com/hashirab" },
      ],
    },
    {
      name: "jobpilot-ai/",
      lang: "JAVASCRIPT",
      tag: "Chrome Extension",
      problem:
        "Manually filling out repetitive job application forms across dozens of SPA-based career sites is slow and error-prone.",
      solution:
        "Chrome extension that injects a Shadow DOM sidebar to autofill applications, tracks SPA navigation changes, and plugs into Groq or Anthropic backends for field mapping.",
      stack: ["Chrome APIs", "Shadow DOM", "Anthropic API"],
      results: [
        "Shadow DOM sidebar injection",
        "SPA-aware navigation handling",
        "Pluggable Groq / Anthropic backends",
      ],
      links: [{ label: "source", href: "https://github.com/hashirab" }],
    },
    {
      name: "venue-waiver/",
      lang: "NEXT.JS",
      tag: "SaaS · in progress · by Hashrem",
      problem:
        "Activity and game venues juggle separate tools for bookings, liability waivers, and payments, creating friction for staff and customers.",
      solution:
        "Unified booking, digital waiver signing, and Stripe payments into a single flow, built under Hashrem.",
      stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
      results: [
        "Booking, waiver, and payment in one flow",
        "In progress — building under Hashrem",
      ],
      links: [{ label: "source", href: "https://github.com/hashirab/waivervault" }],
    },
  ],
  skills: [
    { name: "Python / PyTorch", level: "proficient" },
    { name: "LLM eval & RAG", level: "proficient" },
    { name: "FastAPI / Next.js", level: "proficient" },
    { name: "Supabase / pgvector", level: "working" },
    { name: "MLflow / XGBoost", level: "working" },
    { name: "Chrome Ext. APIs", level: "working" },
  ],
  techStack: [
    { name: "Python", level: "primary" },
    { name: "PyTorch", level: "primary" },
    { name: "NumPy", level: "primary" },
    { name: "pandas", level: "primary" },
    { name: "scikit-learn", level: "primary" },
    { name: "TensorFlow", level: "primary" },
    { name: "LangChain", level: "primary" },
    { name: "FastAPI", level: "primary" },
    { name: "Next.js", level: "primary" },
    { name: "RAG", level: "primary" },
    { name: "LLM Eval", level: "primary" },
    { name: "React", level: "secondary" },
    { name: "TypeScript", level: "secondary" },
    { name: "Supabase", level: "secondary" },
    { name: "pgvector", level: "secondary" },
    { name: "MLflow", level: "secondary" },
    { name: "XGBoost", level: "secondary" },
    { name: "Computer Vision", level: "secondary" },
    { name: "OpenCV", level: "secondary" },
    { name: "Hugging Face", level: "secondary" },
    { name: "Streamlit", level: "secondary" },
    { name: "Groq", level: "secondary" },
    { name: "Anthropic API", level: "secondary" },
    { name: "Chrome APIs", level: "secondary" },
    { name: "Tailwind CSS", level: "secondary" },
  ],
  experience: [
    {
      role: "AI Intern",
      org: "Elythros",
      period: "2026 — Present",
      desc: "Working on applied AI systems as part of the core engineering team.",
    },
    {
      role: "Founder",
      org: "Hashrem Ltd",
      period: "2026 — Present",
      desc: "Building AI products end-to-end, including MatchMD and venue-waiver, from architecture through deployment.",
    },
    {
      role: "AI Studentship",
      org: "BT Group",
      period: "2025 — 2026",
      desc: "LLM evaluation work — hallucination-rate measurement and failure-mode analysis across production-adjacent use cases.",
    },
    {
      role: "Data Science Intern",
      org: "Intech Automation Intelligence",
      period: "2023",
      desc: "Built and maintained large-scale data pipelines for industrial automation analytics.",
    },
  ],
};

export const buffers = [
  { id: "home", n: 1, file: "home.md" },
  { id: "about", n: 2, file: "profile.json" },
  { id: "experience", n: 3, file: "experience.log" },
  { id: "projects", n: 4, file: "projects/" },
  { id: "skills", n: 5, file: "stack.txt" },
  { id: "links", n: 6, file: "links.txt" },
] as const;
