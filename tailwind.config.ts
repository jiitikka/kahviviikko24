import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'beans-bg-image': "url('/bg_beans.jpg')",
        'cups-bg-image': "url('/bg_cups_red_overlay.png')",
      },
      colors: {
        'brand-pink': '#e47174',
        'brand-dark-pink': '#c15357',      
      }
    },
  },
  plugins: [],
};
export default config;
