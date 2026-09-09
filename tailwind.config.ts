import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "var(--coffee-cream)",
        coffee: "var(--coffee-black)",
        coral: {
          DEFAULT: "var(--coffee-coral)",
          text: "var(--coffee-coral-text)",
          deep: "var(--coffee-coral-deep)",
          pale: "var(--coffee-coral-pale)",
        },
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      borderWidth: {
        rule: "1.5px",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
    },
  },
  plugins: [],
};
export default config;
