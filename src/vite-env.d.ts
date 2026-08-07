/// <reference types="vite/client" />

/* Declaring the variable here is not just for types. tsconfig sets
   `noPropertyAccessFromIndexSignature`, which bans `import.meta.env.VITE_FOO`
   against vite/client's catch-all index signature and pushes you toward
   `import.meta.env["VITE_FOO"]` instead.

   That bracket form type-checks but defeats the build: Vite only substitutes
   the literal value for the dotted form. With brackets it inlines the entire
   env object into the bundle and does the lookup at runtime, so the dead
   analytics branch in __root.tsx can no longer be tree-shaken away.

   Naming the property makes it a real declared member rather than an index
   signature hit, so dot access is allowed and the static replacement happens.
   Add a line here for every new VITE_* variable. */
interface ImportMetaEnv {
  /** GA4 measurement ID. Set in netlify.toml; undefined in local dev. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
