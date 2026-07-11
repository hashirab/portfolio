# Portfolio — Next.js

Terminal/tmux-styled portfolio. Buffer rail on the left, live status bar at the
bottom, a token-streaming hero, and a Groq-backed AI chat assistant on the
home page.

## Setup

```bash
npm install
cp .env.example .env.local   # add your GROQ_API_KEY to enable the chat widget
npm run dev
```

Open http://localhost:3000

The AI assistant on the home page (`/api/chat`) calls the Groq API (Llama 3.3
70B). Without `GROQ_API_KEY` set, the widget stays up but replies with a
friendly "not configured yet" message instead of erroring. Get a free key at
https://console.groq.com.

## Edit your content

Everything text-based lives in one place: `data/profile.ts`. Update your bio,
links, projects, skills, and about-cards there — no need to touch the
components.

## Structure

```
app/
  layout.tsx        - loads JetBrains Mono, wraps the page
  page.tsx           - Hero + AI chat widget
  api/chat/route.ts  - Groq-backed chat endpoint for the assistant
  about/, experience/, projects/, skills/, links/
                     - one route per buffer, each rendering its component
  globals.css        - color tokens, background glow, scanline texture
components/
  TitleBar.tsx    - top bar with live clock
  Rail.tsx        - left-side buffer tabs (data-driven from `buffers`)
  StatusBar.tsx   - bottom tmux-style status line
  Hero.tsx        - name + token-streaming bio + view work / ask anything CTAs
  ChatWidget.tsx  - "ask --about hashir" AI assistant, terminal-styled chat log
  About.tsx       - "cat profile.json" card grid (mindset/education/work/status)
  Projects.tsx    - "ls -la projects/" numbered problem/solution/results cards
  Skills.tsx      - "cat stack.txt" skills list + 3D tag sphere
  SkillsSphere.tsx- draggable three.js tag-cloud sphere (CSS2DRenderer)
  Links.tsx       - "cat links.txt" contact links
data/
  profile.ts      - all your content (name, bio, links, projects, skills, about)
```

## Deploy

Push to GitHub, then import the repo at vercel.com/new — zero config needed,
Next.js is auto-detected. Add `GROQ_API_KEY` as an environment variable
in the Vercel project settings so the chat widget works in production.
