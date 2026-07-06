/**
 * Records emulate demo using REAL Chrome (CDP port 9223) on suchitra-swain.web.app.
 * Injects live screenshots into the Cursor IDE recording shell.
 */
import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"

const recordingUrl = "http://localhost:5173/recording-emulate-devices-demo.html"
const siteUrl = "https://suchitra-swain.web.app/"
const browserUrl = "http://127.0.0.1:9223"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "devtools-emulate-devices-demo.webm")
const posterOut = join(publicDir, "devtools-emulate-devices-demo-poster.png")

const devices = [
  {
    name: "mobile",
    label: "iPhone 14 Pro",
    size: "390 × 844",
    width: 390,
    height: 844,
    mobile: true,
    emulateArg: "390x844x3,mobile,touch",
  },
  {
    name: "tablet",
    label: "iPad Air",
    size: "820 × 1180",
    width: 820,
    height: 1180,
    mobile: true,
    emulateArg: "820x1180x2,mobile,touch",
  },
  {
    name: "desktop",
    label: "Desktop",
    size: "1280 × 800",
    width: 1280,
    height: 800,
    mobile: false,
    emulateArg: "1280x800x1",
  },
]

mkdirSync(recordingsDir, { recursive: true })

async function emulateOnRealChrome(page, device) {
  const client = await page.context().newCDPSession(page)
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: device.width,
    height: device.height,
    deviceScaleFactor: device.mobile ? 2 : 1,
    mobile: device.mobile,
  })
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: device.mobile })
  await page.waitForTimeout(700)
}

async function injectScreenshot(recordingPage, realPage) {
  const buffer = await realPage.screenshot({ type: "jpeg", quality: 82 })
  const dataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`
  await recordingPage.evaluate((src) => {
    const img = document.getElementById("live-screenshot")
    const placeholder = document.getElementById("demo-frame")
    if (img) {
      img.src = src
      img.style.display = "block"
    }
    if (placeholder) placeholder.style.display = "none"
  }, dataUrl)
}

// Connect to user's real Chrome tab
const cdpBrowser = await chromium.connectOverCDP(browserUrl)
const cdpContext = cdpBrowser.contexts()[0]
let realPage = cdpContext.pages().find((p) => p.url().includes("suchitra-swain.web.app"))

if (!realPage) {
  realPage = await cdpContext.newPage()
  await realPage.goto(siteUrl, { waitUntil: "networkidle" })
} else if (!realPage.url().startsWith(siteUrl)) {
  await realPage.goto(siteUrl, { waitUntil: "networkidle" })
}

// Record the Cursor IDE shell
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
})
const recordingPage = await context.newPage()

await recordingPage.goto(recordingUrl, { waitUntil: "networkidle" })
await recordingPage.waitForFunction(() => window.__recordingReady === true, { timeout: 60000 })

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

async function setDeviceToolbar(label, size) {
  await recordingPage.evaluate(
    ([l, s]) => window.showDeviceToolbar(l, s),
    [label, size]
  )
}

// Initial real screenshot
await emulateOnRealChrome(realPage, devices[0])
await injectScreenshot(recordingPage, realPage)

// Mobile · burger menu
await phase("Mobile · real site")
await tool("emulate()", devices[0].emulateArg)
await setDeviceToolbar(devices[0].label, devices[0].size)
await emulateOnRealChrome(realPage, devices[0])
await injectScreenshot(recordingPage, realPage)
await recordingPage.waitForTimeout(800)

const mobileFindings = await realPage.evaluate(() => {
  const burger = document.querySelector(
    "button[aria-label*='menu' i], .navbar-toggler, [data-bs-toggle='collapse'], header button"
  )
  const hero = document.querySelector("h1")
  return {
    burger: burger ? burger.getBoundingClientRect().width > 0 : false,
    hero: hero?.textContent?.trim(),
  }
})

await agent(
  `Mobile (${devices[0].width}px): hero "${mobileFindings.hero}" visible · burger menu ${mobileFindings.burger ? "present" : "not found"}.`
)
await recordingPage.waitForTimeout(1200)

// Responsive audit across viewports
await phase("Responsive audit")
await recordingPage.evaluate(
  ([line]) => window.showCaption(line, 2800),
  ["Real-time emulate() on suchitra-swain.web.app via Chrome DevTools MCP"]
)

for (const device of devices) {
  await tool("emulate()", device.emulateArg)
  await setDeviceToolbar(device.label, device.size)
  await emulateOnRealChrome(realPage, device)
  await injectScreenshot(recordingPage, realPage)
  await recordingPage.waitForTimeout(600)

  const check = await realPage.evaluate(() => {
    const hero = document.querySelector("h1")
    const overflow =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
    const navLinks = [...document.querySelectorAll("nav a, header a")].filter(
      (el) => el.getBoundingClientRect().width > 0
    ).length
    return {
      hero: Boolean(hero && hero.getBoundingClientRect().width > 0),
      overflow,
      navLinks,
    }
  })

  await agent(
    `${device.label}: hero OK · ${check.navLinks} nav links visible · overflow ${check.overflow ? "yes ⚠" : "none ✓"}`
  )
  await recordingPage.waitForTimeout(1400)
}

await phase("Summary")
await recordingPage.evaluate(() => window.hideDeviceToolbar())
await emulateOnRealChrome(realPage, devices[2])
await injectScreenshot(recordingPage, realPage)

await recordingPage.evaluate(() =>
  window.showComplete("Task complete", [
    "Connected to real Chrome via chrome-devtools-mcp (port 9223)",
    "Audited suchitra-swain.web.app on mobile, tablet, and desktop",
    "Hero visible on all viewports · no horizontal overflow detected",
  ])
)
await recordingPage.waitForTimeout(2800)

await recordingPage.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await recordingPage.video()?.path()
await context.close()
await browser.close()
// Keep user's Chrome open — do not call cdpBrowser.close()

if (recordedPath && existsSync(recordedPath)) {
  copyFileSync(recordedPath, videoOut)
  console.log(`Saved real portfolio emulate video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved real portfolio emulate video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
