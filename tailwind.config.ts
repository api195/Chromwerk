import type { Config } from "tailwindcss";

/**
 * Chromwerk Design-System
 * ------------------------------------------------------------------
 * Zentrale Design-Tokens (Farben, Fonts, Schatten).
 * Hier änderst du das gesamte Look & Feel der Seite an einer Stelle.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dunkle Basisflächen
        ink: {
          950: "#050506",
          900: "#0a0a0c",
          800: "#101014",
          700: "#16161b",
          600: "#1d1d23",
        },
        // Chrom / Silber Akzente
        chrome: {
          50: "#f7f8fa",
          100: "#eceef2",
          200: "#d7dae1",
          300: "#b9bec8",
          400: "#8f95a1",
          500: "#6c727e",
          600: "#4d525c",
        },
        // Signalfarbe aus dem Logo (Chromwerk-Rot)
        crimson: {
          DEFAULT: "#e11d2a",
          bright: "#ff2436",
          deep: "#a2121c",
        },
      },
      fontFamily: {
        // Wird über next/font in layout.tsx als CSS-Variable gesetzt
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        chrome: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.9)",
        glow: "0 0 40px -10px rgba(225,29,42,0.55)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "chrome-text":
          "linear-gradient(180deg,#ffffff 0%,#e7e9ee 18%,#a6abb6 46%,#5c616c 55%,#c9ccd3 74%,#ffffff 100%)",
        "chrome-line":
          "linear-gradient(90deg,transparent,rgba(214,218,226,0.6),transparent)",
        "radial-fade":
          "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.10),transparent 60%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Scroll-Hinweis im Hero (früher eine JS-Animation)
        "scroll-hint": {
          "0%,100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(12px)", opacity: "0.2" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
