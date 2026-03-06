import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#3B1F0E",
          light: "#5C3317",
          dark: "#1E0D05",
          50: "#FDF6F0",
          100: "#F5E6D3",
        },
        cream: {
          DEFAULT: "#F5EDD6",
          dark: "#E8D9BA",
          light: "#FAF6ED",
        },
        terracotta: {
          DEFAULT: "#C4622D",
          light: "#D4734E",
          dark: "#A34E22",
        },
        sand: "#D9C9A8",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
