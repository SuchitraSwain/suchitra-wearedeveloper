import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"

const feature = process.argv[2]
if (!feature || !["performance", "network", "debugging"].includes(feature)) {
  console.error("Usage: node scripts/record-mcp-feature-demo.mjs <performance|network|debugging>")
  process.exit(1)
}

const configs = {
  performance: {
    url: "http://localhost:5173/recording-performance-demo.html",
    videoOut: "devtools-performance-demo.webm",
    posterOut: "devtools-performance-demo-poster.png",
    async run(page, frame, helpers) {
      const { tool, agent, phase, caption } = helpers
      await phase("Performance trace")
      await caption("Recording CPU profile on form interaction…")
      await tool("performance_trace()", "Recording DevTools performance profile · 847 ms")
      await page.evaluate(() => window.showDevToolsDrawer())
      await page.evaluate(() => window.flashDrawerMetric("#metric-trace"))
      await page.waitForTimeout(1200)

      await phase("Memory snapshot")
      await tool("take_memory_snapshot()", "Heap snapshot captured · 24.3 MB retained")
      await page.evaluate(() => window.flashDrawerMetric("#metric-heap"))
      await page.waitForTimeout(1000)
      await agent("Main thread busy during submit — 24 MB heap, no major leaks detected.")
      await page.waitForTimeout(800)
      await page.evaluate(() => window.hideDevToolsDrawer())

      await page.evaluate(() =>
        window.showComplete("Task complete", [
          "performance_trace recorded on demo form submit",
          "take_memory_snapshot · 24.3 MB heap",
          "Agent summarized CPU timeline and memory findings",
        ])
      )
      await page.waitForTimeout(2200)
    },
  },
  network: {
    url: "http://localhost:5173/recording-network-demo.html",
    videoOut: "devtools-network-demo.webm",
    posterOut: "devtools-network-demo-poster.png",
    async run(page, frame, helpers) {
      const { tool, agent, phase } = helpers
      await phase("Submit form")
      await tool("click(#register-btn)", "Submitting registration form")
      try {
        await frame.locator('button[type="submit"]').click({ timeout: 5000 })
      } catch {
        await frame.locator("button").first().click({ timeout: 3000 }).catch(() => {})
      }
      await page.waitForTimeout(1000)

      await phase("Network audit")
      await tool("get_network_requests()", "Reading Network panel · 3 requests captured")
      await page.evaluate(() => window.showDevToolsDrawer())
      await page.evaluate(() => document.getElementById("network-register")?.classList.add("flash"))
      await page.waitForTimeout(1400)
      await agent("register fetch · 89 ms — document and assets loaded normally.")
      await page.waitForTimeout(700)
      await page.evaluate(() => window.hideDevToolsDrawer())

      await page.evaluate(() =>
        window.showComplete("Task complete", [
          "Form submitted on localhost demo",
          "get_network_requests returned document + fetch rows",
          "No failed requests · register API within budget",
        ])
      )
      await page.waitForTimeout(2200)
    },
  },
  debugging: {
    url: "http://localhost:5173/recording-debugging-demo.html",
    videoOut: "devtools-debugging-demo.webm",
    posterOut: "devtools-debugging-demo-poster.png",
    async run(page, frame, helpers) {
      const { tool, agent, phase, caption } = helpers
      await phase("Lighthouse audit")
      await caption("Running Lighthouse on live portfolio…")
      await tool("lighthouse_audit()", "Performance 92 · Accessibility 96 · Best Practices 88 · SEO 91")
      await page.evaluate(() => window.showDevToolsDrawer())
      await page.evaluate(() => window.flashDrawerMetric("#lh-perf"))
      await page.waitForTimeout(1400)

      await phase("Screenshot")
      await tool("take_screenshot()", "Viewport captured · viewport.png")
      await page.evaluate(() => window.flashDrawerMetric("#metric-screenshot"))
      await page.waitForTimeout(1000)
      await agent("Lighthouse scores strong — screenshot saved for the audit report.")
      await page.waitForTimeout(700)
      await page.evaluate(() => window.hideDevToolsDrawer())

      await page.evaluate(() =>
        window.showComplete("Task complete", [
          "lighthouse_audit on suchitra-swain.web.app",
          "take_screenshot · viewport captured",
          "Agent summarized scores and recommendations",
        ])
      )
      await page.waitForTimeout(2200)
    },
  },
}

const config = configs[feature]
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, config.videoOut)
const posterOut = join(publicDir, config.posterOut)

mkdirSync(recordingsDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  recordVideo: { dir: recordingsDir, size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
})
const page = await context.newPage()

await page.goto(config.url, { waitUntil: "networkidle" })
await page.waitForFunction(() => window.__recordingReady === true, { timeout: 60000 })

const frame = page.frameLocator("#demo-frame")
await frame.locator("body").waitFor({ state: "visible", timeout: 20000 }).catch(() => {})

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

async function caption(text, ms = 2200) {
  await page.evaluate(([line, duration]) => window.showCaption(line, duration), [text, ms])
}

await config.run(page, frame, { tool, agent, phase, caption })

await page.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await page.video()?.path()
await context.close()
await browser.close()

if (recordedPath && existsSync(recordedPath)) {
  copyFileSync(recordedPath, videoOut)
  console.log(`Saved ${feature} demo video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved ${feature} demo video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
