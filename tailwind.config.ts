import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#213555",
        secondary: "#3E5879",
        tertiary:"#D8C4B6",
        contrast: "#F5EFE7"
      },
      screens: {
        'minimum': '300px'
      }
    },
  },
  plugins: [],
} satisfies Config;
