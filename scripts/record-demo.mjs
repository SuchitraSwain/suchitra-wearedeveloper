import { chromium } from "playwright"
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs"
import { join } from "node:path"

const recordingUrl = "http://localhost:5173/recording-demo.html"
const publicDir = join(process.cwd(), "public")
const recordingsDir = join(publicDir, ".recordings")
const videoOut = join(publicDir, "devtools-mcp-demo.webm")
const posterOut = join(publicDir, "devtools-mcp-demo-poster.png")

const message =
  "Excited to demo how Chrome DevTools MCP lets AI agents inspect, debug, and interact with live browser pages — perfect for the Prompt, Render, Debug workflow."

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
await frame.locator("#demo-full-name").waitFor({ state: "visible", timeout: 15000 })

async function highlight(selector) {
  await frame.locator(selector).evaluate((el) => {
    el.style.outline = "3px solid #ff174d"
    el.style.outlineOffset = "2px"
    el.style.boxShadow = "0 0 20px rgba(255, 23, 77, 0.35)"
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

// Auto-fill form
await phase("Fill form")
await tool("take_snapshot()", "Reading registration form fields…")
await page.waitForTimeout(600)

await highlight("#demo-full-name")
await tool("fill_form · fullName", "Suchitra Swain")
await frame.locator("#demo-full-name").click()
await frame.locator("#demo-full-name").pressSequentially("Suchitra Swain", { delay: 65 })
await page.waitForTimeout(500)

await highlight("#demo-email")
await tool("fill_form · email", "suchitra@example.com")
await frame.locator("#demo-email").click()
await frame.locator("#demo-email").pressSequentially("suchitra@example.com", { delay: 45 })
await page.waitForTimeout(500)

await highlight("#demo-company")
await tool("fill_form · company", "Cursor")
await frame.locator("#demo-company").click()
await frame.locator("#demo-company").pressSequentially("Cursor", { delay: 70 })
await page.waitForTimeout(500)

await highlight("#demo-role")
await tool("fill_form · role", "Full Stack Developer")
await frame.locator("#demo-role").selectOption("full-stack")
await page.waitForTimeout(600)

await highlight("#demo-track")
await tool("fill_form · track", "AI & Frontend")
await frame.locator("#demo-track").selectOption("ai-frontend")
await page.waitForTimeout(600)

await highlight("#demo-message")
await tool("fill_form · message", "Congress registration message")
await frame.locator("#demo-message").click()
await frame.locator("#demo-message").pressSequentially(message, { delay: 18 })
await page.waitForTimeout(700)

await tool("click(#demo-submit)", "Submitting registration form")
await page.waitForTimeout(400)
await frame.locator("#devtools-demo-form").evaluate((form) => form.requestSubmit())
await page.waitForTimeout(900)
await agent("Form submitted successfully — all fields filled via DevTools MCP.")

await page.evaluate(() =>
  window.showComplete("Task complete", [
    "Opened demo form in Chrome via navigate_page()",
    "fill_form populated every registration field",
    "Form submitted · success state confirmed",
  ])
)
await page.waitForTimeout(2800)

await page.screenshot({ path: posterOut, fullPage: false })

const recordedPath = await page.video()?.path()
await context.close()
await browser.close()

if (recordedPath && existsSync(recordedPath)) {
  copyFileSync(recordedPath, videoOut)
  console.log(`Saved demo video to ${videoOut}`)
} else {
  const fallback = readdirSync(recordingsDir).find((name) => name.endsWith(".webm"))
  if (fallback) {
    copyFileSync(join(recordingsDir, fallback), videoOut)
    console.log(`Saved demo video to ${videoOut}`)
  } else {
    throw new Error("No recording was produced.")
  }
}

console.log(`Saved poster to ${posterOut}`)
