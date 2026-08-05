// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Without this, nitro falls back to the wrapper's `cloudflare-module` default
  // and a local build emits a Cloudflare Worker into .output/. Netlify's CI would
  // auto-detect the right preset on its own, but pinning it means a local
  // `npm run build` produces exactly what production does, so the output can be
  // verified before pushing. Emits dist/ (static) + .netlify/functions-internal/
  // (SSR function). Lovable sandbox builds force Cloudflare regardless of this,
  // so previews in the Lovable editor are unaffected.
  nitro: { preset: "netlify" },
});
