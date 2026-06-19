// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, cloudflare (build-only inside Lovable sandbox),
// componentTagger (dev-only), VITE_* env injection, @ path alias, dedupe, etc.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside the Lovable sandbox (e.g. when deploying from GitHub to Vercel), force
// Nitro on with the Vercel preset so SSR routes are served by Vercel functions.
// Inside the Lovable sandbox this is ignored — the Cloudflare preset is used.
export default defineConfig({
  nitro: { preset: "vercel" },
});
