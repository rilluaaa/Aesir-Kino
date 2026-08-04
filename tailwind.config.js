/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "dark-base": "#0D0D11",
        "dark-panel": "#12131A",
        "accent-neon-cyan": "#00F2FE",
        "accent-neon-purple": "#8A2BE2",
        "report-muted": "#9FB0C1",
        "report-line": "rgba(255,255,255,0.08)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "neon-cyan": "0 0 48px rgba(0, 242, 254, 0.28)",
        "neon-purple": "0 0 64px rgba(138, 43, 226, 0.3)",
        "glass-panel": "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 50% 20%, rgba(0,242,254,0.16), transparent 34%), radial-gradient(circle at 72% 60%, rgba(138,43,226,0.18), transparent 36%), linear-gradient(180deg, #0D0D11 0%, #07080B 100%)",
        "neon-button": "linear-gradient(90deg, #00F2FE 0%, #8A2BE2 100%)"
      },
      animation: {
        "slow-pulse": "slowPulse 7s ease-in-out infinite"
      },
      keyframes: {
        slowPulse: {
          "0%, 100%": { opacity: "0.62", transform: "scale(1)" },
          "50%": { opacity: "0.94", transform: "scale(1.04)" }
        }
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".glass-panel": {
          "background": "rgba(18,19,26,0.86)",
          "border": "1px solid rgba(255,255,255,0.08)",
          "boxShadow": "inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 56px rgba(0,0,0,0.32)"
        }
      });
    }
  ]
};
