import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07090a",
        panel: "#0d100e",
        panel2: "#111512",
        border: "#20281f",
        borderSoft: "#171d16",
        text: "#dcece2",
        dim: "#71856a",
        dimmer: "#3d4a3a",
        amber: "#ffb454",
        amberDim: "#8a6a3a",
        cyan: "#7fdbca",
        cyanDim: "#3f6a62",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
