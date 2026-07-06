import { chromium } from "playwright"

const BASE = process.env.BASE_URL ?? "http://localhost:5173"
const VIEWPORTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1920, height: 1080 },
]

const slides = [
  "about-me",
  "talk-overview",
  "devtools-mcp-intro",
  "devtools-mcp-capabilities",
  "devtools-mcp-setup",
  "devtools-mcp-config",
  "demo-form",
  "demo-video",
  "emulate-capabilities",
  "emulate-video",
  "thank-you",
]

const issues = []

function checkOverflow(page, viewport, slideId, result) {
  if (result.horizontalOverflow) {
    issues.push(
      `[${viewport.name}] ${slideId}: horizontal overflow ${result.horizontalOverflow}px`
    )
  }

  if (result.hiddenPrimaryText) {
    issues.push(
      `[${viewport.name}] ${slideId}: primary heading not visible (${result.hiddenPrimaryText})`
    )
  }

  if (result.footerClipped) {
    issues.push(`[${viewport.name}] ${slideId}: footer navigation clipped`)
  }
}

const browser = await chromium.launch()
const page = await browser.newPage()

for (const viewport of VIEWPORTS) {
  await page.setViewportSize(viewport)

  for (const slideId of slides) {
    await page.goto(`${BASE}/?slide=${slideId}`, { waitUntil: "networkidle" })
    await page.waitForTimeout(450)

    const result = await page.evaluate(() => {
      const doc = document.documentElement
      const horizontalOverflow = Math.max(
        0,
        doc.scrollWidth - doc.clientWidth
      )

      const heading =
        document.querySelector("h1") ??
        document.querySelector('[class*="slide-title"]')

      let hiddenPrimaryText = null
      if (heading) {
        const rect = heading.getBoundingClientRect()
        const style = window.getComputedStyle(heading)
        if (
          rect.width === 0 ||
          rect.height === 0 ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          rect.bottom < 0 ||
          rect.top > window.innerHeight
        ) {
          hiddenPrimaryText = `${Math.round(rect.top)}px top, ${Math.round(rect.height)}px tall`
        }
      }

      const footer = document.querySelector("footer")
      let footerClipped = false
      if (footer) {
        const rect = footer.getBoundingClientRect()
        footerClipped =
          rect.bottom > window.innerHeight + 1 || rect.top < 0 || rect.height < 20
      }

      return { horizontalOverflow, hiddenPrimaryText, footerClipped }
    })

    checkOverflow(page, viewport, slideId, result)
  }
}

await browser.close()

if (issues.length) {
  console.error("Responsive audit found issues:\n")
  for (const issue of issues) {
    console.error(`  - ${issue}`)
  }
  process.exit(1)
}

console.log(`Responsive audit passed for ${slides.length} slides × ${VIEWPORTS.length} viewports.`)
