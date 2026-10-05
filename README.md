# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Deploying (Railway)

The site calls the API at `VITE_API_URL`, which is baked in when the site is **built**, so changing it needs a rebuild/redeploy.

- Set `VITE_API_URL` on the website service to the API's **public** address, e.g. `https://<your-api>.up.railway.app` (no trailing slash). The private `*.railway.internal` address does not work from a browser.
- A production build (`npm run build`) fails with a clear message if the variable is missing or malformed (see `vite.config.ts`), so the live site can't accidentally fall back to `http://localhost:4000`.
- For local builds, put `VITE_API_URL=http://localhost:4000` in `.env.local` (gitignored). `npm run dev` doesn't need it.
