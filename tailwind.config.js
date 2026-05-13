/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        ivory: "#F7F2EA",
        stone: "#B8AEA3",
        gold: "#C89B5C",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        luxury: "0 35px 120px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
};
