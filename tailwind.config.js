/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#03040a",
          900: "#05060f",
          800: "#080b16",
          700: "#0c1020",
          600: "#12172b",
          500: "#1b2138",
          400: "#2a3352",
        },
        neon: {
          cyan: "#00e5ff",
          ice: "#7df9ff",
          magenta: "#ff2bd6",
          rose: "#ff5c8a",
          violet: "#9d5cff",
          lime: "#c6ff3d",
          amber: "#ffb52e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        hud: "0.32em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(0,229,255,0.35), 0 0 24px -6px rgba(0,229,255,0.45)",
        "neon-magenta":
          "0 0 0 1px rgba(255,43,214,0.35), 0 0 24px -6px rgba(255,43,214,0.45)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.72" },
          "43%": { opacity: "1" },
          "78%": { opacity: "1" },
          "79%": { opacity: "0.85" },
          "80%": { opacity: "1" },
        },
        "glitch-a": {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-2px,1px)" },
          "40%": { transform: "translate(2px,-1px)" },
          "60%": { transform: "translate(-1px,-1px)" },
          "80%": { transform: "translate(1px,1px)" },
        },
        "glitch-b": {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(2px,-1px)" },
          "40%": { transform: "translate(-2px,1px)" },
          "60%": { transform: "translate(1px,1px)" },
          "80%": { transform: "translate(-1px,-1px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "grid-drift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(60px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        spin_slow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        scanline: "scanline 7s linear infinite",
        flicker: "flicker 6s linear infinite",
        "glitch-a": "glitch-a 2.4s steps(2, end) infinite",
        "glitch-b": "glitch-b 2.9s steps(2, end) infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "grid-drift": "grid-drift 3.5s linear infinite",
        blink: "blink 1.1s step-end infinite",
        float: "float 5s ease-in-out infinite",
        sweep: "sweep 2.6s ease-in-out infinite",
        spin_slow: "spin_slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
