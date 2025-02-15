export const averageScore = {
  good: { color: "#86efac", background: "#065f46" },
  need: { color: "#d9f99d", background: "#15803d" },
  normal: { color: "#cbd5e1", background: "#1e293b" },
  caution: { color: "#fbbf24", background: "#92400e" },
  danger: { color: "#ef4444", background: "#991b1b" },
  check: (x: number) => {
    if (x >= 9) return "good";
    if (x >= 8.5) return "need";
    if (x >= 6.5) return "normal";
    if (x >= 6) return "caution";
    return "danger";
  },
};

export const themes: {
  [key: string]: {
    bg: string;
    color: string;
  };
} = {
  default: { bg: "#0f172a", color: "white" },
  red: { bg: "#5c2b29", color: "#fee2e2" },
  teal: { bg: "#2d555e", color: "#ccfbf1" },
  blue: { bg: "#1e3a5f", color: "#bfdbfe" },
  purple: { bg: "#42275e", color: "#e9d5ff" },
  fuchsia: { bg: "#701a75", color: "#f5d0fe" },
  pink: { bg: "#5b2245", color: "#fbcfe8" },
  rose: { bg: "#9f1239", color: "#fecdd3" },
};
