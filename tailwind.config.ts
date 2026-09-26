import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#020617", // slate-950
        surface: {
          50: "#f8fafc",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        velocity: {
          DEFAULT: "#10b981", // emerald-500
          light: "#34d399",
          dark: "#059669",
        },
        blindspot: {
          DEFAULT: "#fbbf24", // amber-400
          light: "#fde68a",
          dark: "#d97706",
        }
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "wave": "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 15px -3px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 25px 5px rgba(99, 102, 241, 0.6)" },
        },
        wave: {
          "0%, 100%": { height: "8px" },
          "50%": { height: "28px" },
        }
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
        "radial-emerald": "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)",
        "radial-amber": "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)",
      }
    },
  },
  plugins: [],
};

export default config;
