import {
  siPython,
  siPytorch,
  siNumpy,
  siPandas,
  siScikitlearn,
  siTensorflow,
  siLangchain,
  siFastapi,
  siNextdotjs,
  siReact,
  siTypescript,
  siSupabase,
  siPostgresql,
  siMlflow,
  siOpencv,
  siHuggingface,
  siStreamlit,
  siAnthropic,
  siGooglechrome,
  siTailwindcss,
  siJavascript,
  siGithub,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

// Keyed by the exact `name` used in data/profile.ts techStack entries.
// Tags without a matching brand icon (RAG, LLM Eval, XGBoost, Computer
// Vision, Groq) render as plain text — not every concept has a logo.
export const techIcons: Record<string, SimpleIcon> = {
  Python: siPython,
  PyTorch: siPytorch,
  NumPy: siNumpy,
  pandas: siPandas,
  "scikit-learn": siScikitlearn,
  TensorFlow: siTensorflow,
  LangChain: siLangchain,
  FastAPI: siFastapi,
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  Supabase: siSupabase,
  pgvector: siPostgresql,
  MLflow: siMlflow,
  OpenCV: siOpencv,
  "Hugging Face": siHuggingface,
  Streamlit: siStreamlit,
  "Anthropic API": siAnthropic,
  "Chrome APIs": siGooglechrome,
  "Tailwind CSS": siTailwindcss,
};

// Keyed by the exact `lang` string used on project cards.
export const langIcons: Record<string, SimpleIcon> = {
  PYTHON: siPython,
  JAVASCRIPT: siJavascript,
  "NEXT.JS": siNextdotjs,
};

export const brandIcons = { siGithub };

// Some brand marks (Next.js, Anthropic) are near-black — invisible on our
// dark background — so swap those to the site's text color instead.
export function iconDisplayHex(icon: SimpleIcon): string {
  const r = parseInt(icon.hex.slice(0, 2), 16);
  const g = parseInt(icon.hex.slice(2, 4), 16);
  const b = parseInt(icon.hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.25 ? "dcece2" : icon.hex;
}
