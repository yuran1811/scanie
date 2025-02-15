/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ct: {
          bg: { ...colors.gray },
          color: "#f1f5f9",
          theme: {
            default: { bg: "#0f172a", color: "white" },
            red: { bg: "#5c2b29", color: "#fee2e2" },
            teal: { bg: "#2d555e", color: "#ccfbf1" },
            blue: { bg: "#1e3a5f", color: "#bfdbfe" },
            purple: { bg: "#42275e", color: "#e9d5ff" },
            fuchsia: { bg: "#701a75", color: "#f5d0fe" },
            pink: { bg: "#5b2245", color: "#fbcfe8" },
            rose: { bg: "#9f1239", color: "#fecdd3" },
          },
          gold: { light: "#fde68a", dard: "#ca8a04", bgLight: "#ca8a04", bgDark: "#fde68a" },
          link: { color: "#38bdf8", bg: "#075985" },
        },
        good: { color: "#86efac", bg: "#065f46" },
        need: { color: "#d9f99d", bg: "#15803d" },
        normal: { color: "#cbd5e1", bg: "#1e293b" },
        caution: { color: "#fbbf24", bg: "#92400e" },
        danger: { color: "#ef4444", bg: "#991b1b" },
        vintage1: { 1: "#f8d195", 2: "#f67280", 3: "#c06cb4", 4: "#6c5b7b", 5: "#355c7d" },
        vintage2: { 1: "#addcc8", 2: "#dcebc2", 3: "#fdd2b5", 4: "#f8a6a8", 5: "#f48a94" },
        vintage3: { 1: "#aba7a7", 2: "#cc527a", 3: "#e8175d", 4: "#474747", 5: "#363636" },
      }),
      keyframes: {
        flatLoadingFlip: {
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(180deg) rotateX(180deg)" },
        },
        threeDotsFade: { from: { opacity: 1 }, to: { opacity: 0 } },
      },
      animation: {
        flatLoading: "flatLoadingFlip 0.8s infinite",
        threeDots: "threeDotsFade 0.8s ease-in-out alternate infinite",
      },
    },
  },
};
