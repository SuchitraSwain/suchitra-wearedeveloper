import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { spawnSync } from "node:child_process"

const recordingUrl = "http://localhost:5173/recording-devtools-mcp-intro.html"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "devtools-mcp-intro-demo.webm")
const posterOut = join(publicDir, "devtools-mcp-intro-demo-poster.png")

const SEGMENT_ONE_MS = 16_500
const SEGMENT_TWO_MS = 25_500
const RECORDING_MS = SEGMENT_ONE_MS + SEGMENT_TWO_MS + 1_000

const FFMPEG = spawnSync("which", ["ffmpeg"], { encoding: "utf8" }).stdout.trim()

mkdirSync(recordingsDir, { recursive: true })

const browser = await chromium.launch({
  channel: "chrome",
  headless: false,
  args: ["--autoplay-policy=no-user-gesture-required", "--start-fullscreen"],
})
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
  deviceScaleFactor: 1,
})
const page = await context.newPage()

await page.goto(recordingUrl, { waitUntil: "domcontentloaded", timeout: 120000 })
await page.waitForFunction(() => window.__recordingReady === true, { timeout: 120000 })
await page.waitForTimeout(RECORDING_MS)

await page.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await page.video()?.path()
await context.close()
await browser.close()

let rawPath = recordedPath
if (!rawPath || !existsSync(rawPath)) {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (!fallback) {
    throw new Error("No recording was produced.")
  }
  rawPath = join(recordingsDir, fallback)
}

const encode = spawnSync(
  FFMPEG,
  [
    "-y",
    "-i",
    rawPath,
    "-vf",
    "crop=1920:920:0:95,scale=1920:1080:flags=lanczos",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "20",
    "-b:v",
    "0",
    "-row-mt",
    "1",
    videoOut,
  ],
  { stdio: "inherit" }
)

if (encode.status !== 0) {
  copyFileSync(rawPath, videoOut)
}

console.log(`Saved intro clip to ${videoOut}`)
console.log(`Saved poster to ${posterOut}`)
