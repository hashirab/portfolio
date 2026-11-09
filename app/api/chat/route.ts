import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/data/profile";

const MODEL = "openai/gpt-oss-120b";
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 500;

function buildSystemPrompt() {
  const projectLines = profile.projects
    .map(
      (p) =>
        `- ${p.name} (${p.lang}, ${p.tag}). Problem: ${p.problem} Solution: ${p.solution} Stack: ${p.stack.join(
          ", "
        )}. Results: ${p.results.join("; ")}`
    )
    .join("\n");

  const experienceLines = profile.experience
    .map((e) => `- ${e.role} @ ${e.org} (${e.period}): ${e.desc}`)
    .join("\n");

  const skillLines = profile.skills.map((s) => `${s.name} (${s.level})`).join(", ");

  return `You are the portfolio assistant for ${profile.name}, ${profile.role}.
Speak ABOUT ${profile.name} in the third person — you are an assistant representing him, not him speaking directly.
Answer only using the facts below. If asked something not covered here, say you don't have that
detail and suggest the visitor reach out directly via email. Keep answers concise: 2-4 sentences,
plain text, no markdown headers. Be friendly and professional.

BIO: ${profile.bio}
LOCATION: ${profile.location}
STATUS: ${profile.status}

ABOUT:
- Education: ${profile.about.education}
- Background: ${profile.about.background}
- Current role: ${profile.about.current_role}
- Founder of: ${profile.about.founder_of}
- Based in: ${profile.about.based_in}
- Looking for: ${profile.about.looking_for}

EXPERIENCE:
${experienceLines}

PROJECTS:
${projectLines}

SKILLS: ${skillLines}

CONTACT: GitHub ${profile.links.github}, LinkedIn ${profile.links.linkedin}, email ${profile.links.email}`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant isn't configured yet — set GROQ_API_KEY on the server." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
  }));

  const last = trimmed[trimmed.length - 1];
  if (!last || last.role !== "user" || !last.content.trim()) {
    return NextResponse.json({ error: "Last message must be a non-empty user message." }, { status: 400 });
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: 400,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...trimmed],
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    return NextResponse.json({ reply: reply || "Sorry, I couldn't generate a response." });
  } catch (err) {
    console.error("chat api error", err);
    return NextResponse.json({ error: "Something went wrong talking to the AI assistant." }, { status: 500 });
  }
}
