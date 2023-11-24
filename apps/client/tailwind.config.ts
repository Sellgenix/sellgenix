import type { Config } from "tailwindcss";

import baseConfig from "@sellgenix/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
