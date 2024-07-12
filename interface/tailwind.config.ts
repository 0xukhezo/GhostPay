import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { main: "#1b1d1f", secondary: "#242526", greenMatrix: "#4aba4c" },
      borderWidth: { 1: "1px" },
    },
  },
  plugins: [],
};
export default config;
