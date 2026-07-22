import fs from "node:fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const talkId = process.env.VITE_TALK || "wearedevelopers-2026"
const talkDir = path.resolve(__dirname, "talks", talkId)

if (!fs.existsSync(talkDir)) {
  throw new Error(
    `Talk pack not found: talks/${talkId}\n` +
      `Create it with: cp -R talks/_template talks/${talkId}`
  )
}

console.info(`[vite] Active talk: ${talkId}`)

/** Playwright temp files live under public/.recordings but must not ship in dist. */
function excludePublicRecordings(): Plugin {
  const recordingsPath = path.resolve(__dirname, "public/.recordings")
  const tempPath = path.resolve(__dirname, ".recordings-build-temp")
  let moved = false

  return {
    name: "exclude-public-recordings",
    apply: "build",
    buildStart() {
      if (fs.existsSync(recordingsPath)) {
        if (fs.existsSync(tempPath)) {
          fs.rmSync(tempPath, { recursive: true, force: true })
        }
        fs.renameSync(recordingsPath, tempPath)
        moved = true
      }
    },
    closeBundle() {
      if (moved && fs.existsSync(tempPath)) {
        if (fs.existsSync(recordingsPath)) {
          fs.rmSync(recordingsPath, { recursive: true, force: true })
        }
        fs.renameSync(tempPath, recordingsPath)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), excludePublicRecordings()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@talk": talkDir,
    },
  },
})
