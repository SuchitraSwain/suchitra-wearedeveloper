import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"

const recordingUrl = "http://localhost:5173/recording-emulate-demo.html"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "devtools-emulate-demo.webm")
const posterOut = join(publicDir, "devtools-emulate-demo-poster.png")

mkdirSync(recordingsDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
  deviceScaleFactor: 1,
})
const page = await context.newPage()

await page.goto(recordingUrl, { waitUntil: "networkidle" })
await page.waitForFunction(() => window.__recordingReady === true, { timeout: 60000 })

const frame = page.frameLocator("#demo-frame")
await frame.locator("#store-search").waitFor({ state: "visible", timeout: 15000 })

async function highlight(selector) {
  await frame.locator(selector).evaluate((el) => {
    el.style.outline = "3px solid #4285f4"
    el.style.outlineOffset = "2px"
    el.style.boxShadow = "0 0 20px rgba(66, 133, 244, 0.35)"
  })
}

async function tool(name, detail) {
  await page.evaluate(
    ([toolName, toolDetail]) => window.showToolCall(toolName, toolDetail),
    [name, detail]
  )
}

async function agent(text) {
  await page.evaluate((message) => window.showAgentMessage(message), text)
}

async function phase(text) {
  await page.evaluate((label) => window.setRecordingPhase(label), text)
}

async function caption(text, ms = 2400) {
  await page.evaluate(([line, duration]) => window.showCaption(line, duration), [text, ms])
}

await phase("Search Berlin")
await tool("take_snapshot()", "Reading store locator search UI…")
await tool("click(#store-search)", "Focusing the city search field")
await highlight("#store-search")
await frame.locator("#store-search").click()
await frame.locator("#store-search").fill("")
await frame.locator("#store-search").pressSequentially("Berlin", { delay: 80 })
await page.waitForTimeout(400)

await tool("click(#store-search-btn)", "Submitting Berlin search")
await highlight("#store-search-btn")
await frame.locator("#store-search-btn").click()
await page.waitForTimeout(1200)
await agent("Berlin store confirmed — Friedrichstraße location is listed.")

await phase("Verify Washington")
await tool("fill(#store-search, 'Washington')", "Searching for Washington stores")
await frame.locator("#store-search").click()
await frame.locator("#store-search").fill("")
await frame.locator("#store-search").pressSequentially("Washington", { delay: 70 })
await page.waitForTimeout(400)
await frame.locator("#store-search-btn").click()
await page.waitForTimeout(1400)
await agent("Washington returns no stores — expected empty result confirmed.")

await phase("Emulate Paris")
await caption("With the Sensors panel in Chrome DevTools,")
await tool(
  "emulate({ geolocation: { latitude: 48.8566, longitude: 2.3522 } })",
  "DevTools Sensors · override device location to Paris"
)
await page.evaluate(() => window.showSensorsPanel())
await page.waitForTimeout(900)

await frame.locator("body").evaluate(() => {
  window.__emulateLocation("Paris")
})
await page.waitForTimeout(1600)

await caption("verify the UI updates accordingly.")
await page.evaluate(() => window.hideSensorsPanel())
await page.waitForTimeout(400)
await agent(
  "Map pin moved to Paris · location card updated · near-me stores listed."
)
await page.waitForTimeout(1800)

await page.evaluate(() =>
  window.showComplete("Task complete", [
    "Cursor Agent connected to Chrome via chrome-devtools-mcp",
    "Berlin store found · Washington empty · Paris emulated in Sensors",
    "Near-me UI updated with Paris store listings",
  ])
)
await page.waitForTimeout(2800)

await page.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await page.video()?.path()
await context.close()
await browser.close()

if (recordedPath && existsSync(recordedPath)) {
  copyFileSync(recordedPath, videoOut)
  console.log(`Saved emulate demo video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved emulate demo video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
