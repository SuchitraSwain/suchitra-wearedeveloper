/**
 * Real responsive audit via Chrome DevTools Protocol (same backend as chrome-devtools-mcp emulate).
 * Requires Chrome: --remote-debugging-port=9223
 */
import { chromium } from "playwright"
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const SITE_URL = "https://suchitra-swain.web.app/"
const BROWSER_URL = "http://127.0.0.1:9223"

const devices = [
  {
    name: "mobile",
    label: "iPhone 14 Pro",
    viewport: "390x844x3,mobile,touch",
    width: 390,
    height: 844,
    mobile: true,
  },
  {
    name: "tablet",
    label: "iPad Air",
    viewport: "820x1180x2,mobile,touch",
    width: 820,
    height: 1180,
    mobile: true,
  },
  {
    name: "desktop",
    label: "Desktop",
    viewport: "1280x800x1",
    width: 1280,
    height: 800,
    mobile: false,
  },
]

async function emulateViewport(page, device) {
  const client = await page.context().newCDPSession(page)
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: device.width,
    height: device.height,
    deviceScaleFactor: device.mobile ? 2 : 1,
    mobile: device.mobile,
  })
  await client.send("Emulation.setTouchEmulationEnabled", {
    enabled: device.mobile,
  })
  await page.waitForTimeout(600)
}

async function auditViewport(page, device) {
  await emulateViewport(page, device)

  const findings = await page.evaluate(() => {
    const nav = document.querySelector("nav, header, [role='navigation']")
    const burger =
      document.querySelector(
        "button[aria-label*='menu' i], button[class*='burger' i], .navbar-toggler, [data-bs-toggle='collapse'], .hamburger, .menu-toggle"
      ) ?? document.querySelector("button svg, header button")
    const desktopLinks = [...document.querySelectorAll("nav a, header nav a, header a[href^='#']")]
    const hero = document.querySelector("h1")
    const emailLink = [...document.querySelectorAll("a")].find((a) =>
      a.textContent?.includes("@")
    )
    const scrollWidth = document.documentElement.scrollWidth
    const clientWidth = document.documentElement.clientWidth
    const horizontalOverflow = scrollWidth > clientWidth + 2

    return {
      title: document.title,
      heroVisible: hero ? hero.getBoundingClientRect().width > 0 : false,
      heroText: hero?.textContent?.trim().slice(0, 80) ?? null,
      navPresent: Boolean(nav),
      burgerVisible: burger
        ? burger.getBoundingClientRect().width > 0 &&
          getComputedStyle(burger).display !== "none"
        : false,
      desktopNavLinkCount: desktopLinks.filter(
        (el) => el.getBoundingClientRect().width > 0 && getComputedStyle(el).display !== "none"
      ).length,
      emailLinkVisible: emailLink
        ? emailLink.getBoundingClientRect().width > 0
        : false,
      horizontalOverflow,
      viewport: { w: clientWidth, h: window.innerHeight },
    }
  })

  const screenshotPath = join(
    process.cwd(),
    "public",
    `portfolio-audit-${device.name}.png`
  )
  await page.screenshot({ path: screenshotPath, fullPage: false })

  return { device: device.label, viewport: device.viewport, findings, screenshotPath }
}

const browser = await chromium.connectOverCDP(BROWSER_URL)
const context = browser.contexts()[0]
let page = context.pages().find((p) => p.url().includes("suchitra-swain.web.app"))

if (!page) {
  page = await context.newPage()
  await page.goto(SITE_URL, { waitUntil: "networkidle" })
} else if (!page.url().startsWith(SITE_URL)) {
  await page.goto(SITE_URL, { waitUntil: "networkidle" })
}

const report = {
  url: SITE_URL,
  auditedAt: new Date().toISOString(),
  method: "Chrome DevTools Protocol · Emulation.setDeviceMetricsOverride (chrome-devtools-mcp emulate)",
  results: [],
}

for (const device of devices) {
  console.log(`\n▶ Auditing ${device.label} (${device.viewport})…`)
  const result = await auditViewport(page, device)
  report.results.push(result)
  const f = result.findings
  console.log(`  Hero visible: ${f.heroVisible} · "${f.heroText}"`)
  console.log(`  Burger visible: ${f.burgerVisible} · Desktop nav links: ${f.desktopNavLinkCount}`)
  console.log(`  Email visible: ${f.emailLinkVisible} · Horizontal overflow: ${f.horizontalOverflow}`)
  console.log(`  Screenshot: ${result.screenshotPath}`)
}

const summary = {
  allHeroVisible: report.results.every((r) => r.findings.heroVisible),
  allEmailVisible: report.results.every((r) => r.findings.emailLinkVisible),
  noOverflow: report.results.every((r) => !r.findings.horizontalOverflow),
  mobileHasBurger: report.results.find((r) => r.device.includes("iPhone"))?.findings.burgerVisible,
  desktopHasNav: report.results.find((r) => r.device === "Desktop")?.findings.desktopNavLinkCount > 0,
}

report.summary = summary

const reportPath = join(process.cwd(), "public", "portfolio-responsive-audit.json")
writeFileSync(reportPath, JSON.stringify(report, null, 2))

console.log("\n=== Summary ===")
console.log(JSON.stringify(summary, null, 2))
console.log(`\nFull report: ${reportPath}`)

await browser.close()
