import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

const isProd = process.env.NODE_ENV === "production";
const site = process.env.PUBLIC_SITE_URL || "http://localhost:4321";
const base = process.env.PUBLIC_BASE_PATH || "/";

export default defineConfig({
  site,
  base: isProd ? base : "/",
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
