import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// VITE_API_URL is baked into the site when it is built. If it is missing, the site silently
// falls back to http://localhost:4000, which only works on the developer's own computer
// (the live site then shows that computer's data and logins fail for everyone else).
// So a production build refuses to continue unless it has a usable value.
function apiUrlProblem(value: string | undefined): string | null {
  if (!value) {
    return (
      'VITE_API_URL is not set. Without it the site would call http://localhost:4000, which only works on your own computer.\n' +
      "Set VITE_API_URL to the API's PUBLIC address (https://<your-api>.up.railway.app) on the website service and rebuild.\n" +
      'For local builds, put VITE_API_URL=http://localhost:4000 in ui-web/.env.local.'
    )
  }
  if (value.includes('.railway.internal')) {
    return `VITE_API_URL (${value}) is Railway's private network address. Browsers cannot reach it. Use the API's public https://….up.railway.app address.`
  }
  if (!/^https?:\/\//.test(value)) {
    return `VITE_API_URL (${value}) must start with https:// (or http://).`
  }
  if (value.endsWith('/')) {
    return `VITE_API_URL (${value}) must not end with a slash.`
  }
  return null
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build' && mode === 'production') {
    const problem = apiUrlProblem(loadEnv(mode, process.cwd(), 'VITE_').VITE_API_URL)
    if (problem) throw new Error(`\n\n${problem}\n`)
  }

  return {
    plugins: [react()],
    server: {
      port: 7500,
    },
  }
})
