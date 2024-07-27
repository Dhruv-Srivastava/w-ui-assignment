/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    transitionDuration: {
      DEFAULT: "250ms",
    },
    transitionTimingFunction: {
      DEFAULT: "ease-in-out",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('assets/hero-pattern.svg')",
      },
    },
  },
  plugins: [],
};
