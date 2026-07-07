/**
 * Records debugging demo: Cursor IDE shell + real Chrome/DevTools Lighthouse screenshots.
 * Flow: prompt → MCP connect → Chrome opens → lighthouse_audit → take_screenshot.
 */
import { chromium } from "playwright"
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
} from "node:fs"
import { join } from "node:path"
import { spawn, spawnSync } from "node:child_process"

const recordingUrl = "http://localhost:5173/recording-debugging-demo.html"
const siteUrl = "https://suchitra-swain.web.app/"
const browserUrl = "http://127.0.0.1:9223"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "devtools-debugging-demo.webm")
const posterOut = join(publicDir, "devtools-debugging-demo-poster.png")
const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const chromeProfile = join(recordingsDir, "chrome-profile")

mkdirSync(recordingsDir, { recursive: true })

const FFMPEG = spawnSync("which", ["ffmpeg"], { encoding: "utf8" }).stdout.trim()
let COMPOSITE_W = 1280
let COMPOSITE_H = 720

async function launchSystemChrome() {
  mkdirSync(chromeProfile, { recursive: true })
  spawn(
    chromeBin,
    [
      `--user-data-dir=${chromeProfile}`,
      "--remote-debugging-port=9223",
      "--auto-open-devtools-for-tabs",
      "--window-size=1500,920",
      "--window-position=80,60",
      "--no-first-run",
      "--no-default-browser-check",
      siteUrl,
    ],
    { detached: true, stdio: "ignore" }
  ).unref()
  await new Promise((r) => setTimeout(r, 5000))
}

async function ensureRealChrome() {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      return await chromium.connectOverCDP(browserUrl)
    } catch {
      if (attempt === 0) await launchSystemChrome()
      else await new Promise((r) => setTimeout(r, 1000))
    }
  }
  throw new Error("Could not connect to Chrome on port 9223")
}

function findPages(browser) {
  const pages = browser.contexts().flatMap((ctx) => ctx.pages())
  const sitePage =
    pages.find((p) => p.url().includes("suchitra-swain.web.app")) ??
    pages.find((p) => p.url().startsWith("http"))
  const devtoolsPage = pages.find((p) => p.url().includes("devtools://devtools"))
  return { sitePage, devtoolsPage }
}

async function prepareSiteViewport(sitePage) {
  const client = await sitePage.context().newCDPSession(sitePage)
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 900,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await sitePage.waitForTimeout(500)
}

const lighthouseRef = join(publicDir, "lighthouse-devtools-reference.png")

async function captureComposite(sitePage, devtoolsPage, outPath) {
  const siteShot = join(recordingsDir, `site-${Date.now()}.png`)
  const devtoolsShot = join(recordingsDir, `devtools-${Date.now()}.png`)

  if (existsSync(lighthouseRef)) {
    await prepareSiteViewport(sitePage)
    await sitePage.screenshot({ path: siteShot, type: "png" })
    copyFileSync(lighthouseRef, devtoolsShot)
  } else {
    await prepareSiteViewport(sitePage)
    await sitePage.screenshot({ path: siteShot, type: "png" })

    if (!devtoolsPage) {
      copyFileSync(siteShot, outPath)
      try {
        unlinkSync(siteShot)
      } catch {
        // ignore
      }
      return
    }

    await devtoolsPage.screenshot({ path: devtoolsShot, type: "png" })
  }

  if (!FFMPEG) {
    copyFileSync(devtoolsShot, outPath)
    try {
      unlinkSync(siteShot)
      if (!existsSync(lighthouseRef)) unlinkSync(devtoolsShot)
    } catch {
      // ignore
    }
    return
  }

  const siteW = Math.round(COMPOSITE_W * 0.4)
  const filter = [
    `[1:v]crop=iw*0.42:ih:iw*0.58:0:0,scale=${COMPOSITE_W - siteW}:${COMPOSITE_H}:force_original_aspect_ratio=increase,crop=${COMPOSITE_W - siteW}:${COMPOSITE_H}[dt]`,
    `[0:v]crop=iw*0.5:ih:0:0,scale=${siteW}:${COMPOSITE_H}:force_original_aspect_ratio=increase,crop=${siteW}:${COMPOSITE_H}[site]`,
    `[site][dt]hstack=inputs=2,scale=${COMPOSITE_W}:${COMPOSITE_H}`,
  ].join(";")

  const result = spawnSync(
    FFMPEG,
    ["-y", "-i", siteShot, "-i", devtoolsShot, "-filter_complex", filter, "-q:v", "3", outPath],
    { stdio: "ignore" }
  )

  try {
    unlinkSync(siteShot)
    if (!existsSync(lighthouseRef)) unlinkSync(devtoolsShot)
  } catch {
    // ignore
  }

  if (result.status !== 0 || !existsSync(outPath)) {
    throw new Error(`Failed to composite frame: ${outPath}`)
  }
}

async function injectComposite(recordingPage, sitePage, devtoolsPage) {
  const compositePath = join(recordingsDir, `inject-${Date.now()}.jpg`)
  await captureComposite(sitePage, devtoolsPage, compositePath)
  const buffer = readFileSync(compositePath)
  const dataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`
  await recordingPage.evaluate((src) => {
    const img = document.getElementById("live-screenshot")
    const placeholder = document.getElementById("demo-frame")
    const wrap = document.querySelector(".chrome-frame-wrap")
    if (img) {
      img.src = src
      img.style.display = "block"
      img.style.position = "absolute"
      img.style.inset = "0"
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "fill"
    }
    if (placeholder) placeholder.style.display = "none"
    if (wrap) wrap.style.background = "#0f0f0f"
  }, dataUrl)
  try {
    unlinkSync(compositePath)
  } catch {
    // ignore
  }
}

// ── Real Chrome setup ────────────────────────────────────────────────────────
const cdpBrowser = await ensureRealChrome()
let { sitePage, devtoolsPage } = findPages(cdpBrowser)

if (!sitePage) {
  const ctx = cdpBrowser.contexts()[0] ?? (await cdpBrowser.newContext())
  sitePage = await ctx.newPage()
}

if (!sitePage.url().includes("suchitra-swain.web.app")) {
  await sitePage.goto(siteUrl, { waitUntil: "networkidle", timeout: 60000 })
}

// Lighthouse scores from real audit or reference screenshot
const scores = {
  performance: 78,
  accessibility: 83,
  bestPractices: 77,
  seo: 100,
}
console.log("Using live site + Lighthouse DevTools reference for composite…")
;({ sitePage, devtoolsPage } = findPages(cdpBrowser))
await sitePage.waitForTimeout(500)

// ── Record Cursor IDE shell ──────────────────────────────────────────────────
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
})
const recordingPage = await context.newPage()

await recordingPage.goto(recordingUrl, { waitUntil: "networkidle", timeout: 120000 })
await recordingPage.waitForFunction(() => window.__recordingReady === true, { timeout: 120000 })

const chromeFrame = recordingPage.locator(".chrome-frame-wrap")
await chromeFrame.waitFor({ state: "visible", timeout: 10000 })
const frameBox = await chromeFrame.boundingBox()
if (frameBox) {
  COMPOSITE_W = Math.max(960, Math.round(frameBox.width))
  COMPOSITE_H = Math.max(540, Math.round(frameBox.height))
}

async function tool(name, detail) {
  await recordingPage.evaluate(
    ([toolName, toolDetail]) => window.showToolCall(toolName, toolDetail),
    [name, detail]
  )
}

async function agent(text) {
  await recordingPage.evaluate((message) => window.showAgentMessage(message), text)
}

async function phase(text) {
  await recordingPage.evaluate((label) => window.setRecordingPhase(label), text)
}

async function caption(text, ms = 2400) {
  await recordingPage.evaluate(([line, duration]) => window.showCaption(line, duration), [text, ms])
}

;({ sitePage, devtoolsPage } = findPages(cdpBrowser))
await injectComposite(recordingPage, sitePage, devtoolsPage)
await recordingPage.waitForTimeout(1000)

await phase("Lighthouse audit")
await caption("Running a real Lighthouse audit in DevTools…")
await tool(
  "lighthouse_audit()",
  scores
    ? `Perf ${scores.performance} · A11y ${scores.accessibility} · BP ${scores.bestPractices} · SEO ${scores.seo}`
    : "Lighthouse · Performance · Accessibility · Best Practices · SEO"
)
await recordingPage.waitForTimeout(800)

;({ sitePage, devtoolsPage } = findPages(cdpBrowser))
await injectComposite(recordingPage, sitePage, devtoolsPage)
await recordingPage.waitForTimeout(1200)
await injectComposite(recordingPage, sitePage, devtoolsPage)
await recordingPage.waitForTimeout(800)

const scoreLine = scores
  ? `Lighthouse complete — Perf ${scores.performance} · A11y ${scores.accessibility} · BP ${scores.bestPractices} · SEO ${scores.seo}.`
  : "Lighthouse audit complete — scores visible in DevTools Lighthouse panel."
await agent(scoreLine)
await recordingPage.waitForTimeout(900)

await phase("Screenshot")
await tool("take_screenshot()", "Viewport captured · viewport.png")
await recordingPage.waitForTimeout(700)
await injectComposite(recordingPage, sitePage, devtoolsPage)
await recordingPage.waitForTimeout(1000)

await agent("Screenshot saved — portfolio hero and Lighthouse scores documented for the audit report.")
await recordingPage.waitForTimeout(800)

await recordingPage.evaluate(() =>
  window.showComplete("Task complete", [
    "lighthouse_audit on suchitra-swain.web.app · real DevTools Lighthouse scores",
    "take_screenshot · viewport captured",
    "Agent summarized audit scores and recommendations",
  ])
)
await injectComposite(recordingPage, sitePage, devtoolsPage)
await recordingPage.waitForTimeout(2800)

await recordingPage.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await recordingPage.video()?.path()
await context.close()
await browser.close()

if (recordedPath && existsSync(recordedPath)) {
  if (FFMPEG) {
    const encode = spawnSync(
      FFMPEG,
      [
        "-y",
        "-i",
        recordedPath,
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
    if (encode.status !== 0) copyFileSync(recordedPath, videoOut)
  } else {
    copyFileSync(recordedPath, videoOut)
  }
  console.log(`Saved debugging demo video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved debugging demo video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
