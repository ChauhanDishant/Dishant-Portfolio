/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Corporate Futurism Palette
        border: "hsl(215 20% 65%)",
        "neon-cyan": "#06b6d4",
        "neon-indigo": "#6366f1",
        "electric-indigo": "#818cf8",
        "deep-slate": "#0a0a0a",
        "glass-white": "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(6, 182, 212, 0.5)",
        "neon-indigo": "0 0 20px rgba(99, 102, 241, 0.5)",
        glass: "0 8px 32px 0 rgba(6, 182, 212, 0.1)",
      },
      animation: {
        scan: "scan 3s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
    },
  },
  plugins: [],
};
