import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"

const recordingUrl = "http://localhost:5173/evolution-demo.html"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "frontend-evolution-demo.webm")
const posterOut = join(publicDir, "frontend-evolution-demo-poster.png")

mkdirSync(recordingsDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
})
const page = await context.newPage()

await page.goto(recordingUrl, { waitUntil: "networkidle" })
await page.waitForFunction(() => window.__evolutionReady === true, { timeout: 45000 })
await page.waitForTimeout(1500)

await page.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await page.video()?.path()
await context.close()
await browser.close()

if (recordedPath && existsSync(recordedPath)) {
  copyFileSync(recordedPath, videoOut)
  console.log(`Saved evolution video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved evolution video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
