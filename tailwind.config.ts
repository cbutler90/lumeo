import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "dark"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
    },
  },
  plugins: [],
} satisfies Config

export default config