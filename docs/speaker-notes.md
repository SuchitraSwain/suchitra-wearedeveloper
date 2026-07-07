# Speaker Notes — Prompt, Render, Debug

**Suchitra Swain · WeAreDevelopers World Congress 2026 · ~30 min (slow pace)**

---

## Before you start

| Action | Detail |
|--------|--------|
| Run deck | `npm run dev` → `http://localhost:5173` |
| Fullscreen | Press **F** |
| Navigate | **→** / **Space** next · **←** prev · **Home** / **End** · click footer dots |
| Jump to slide | `?slide=<id>` e.g. `?slide=demo-form` |
| Chrome | Remote debugging on · `chrome://inspect/#remote-debugging` |
| Backup | Cursor + chrome-devtools MCP configured · videos play if live demo fails |

**Spine (repeat often):** *Prompt → Render → Debug · real Chrome, not static code.*

---

## Slide 1 · About Me · `about-me` · ~1:30

**Say:**
- Hi, I'm Suchitra Swain — Sr Software Engineer & Full Stack Web Developer, Berlin.
- Talk: **Prompt, Render, Debug: AI-Powered React Development with Chrome DevTools**
- Tagline: *A live demo of the modern React workflow — from AI prompt to production-ready UI.*
- Three pillars preview: **Prompt** (AI generates UI) · **Render** (React builds it) · **Debug** (Chrome DevTools AI optimizes it)

**Bridge:** *"Today isn't about replacing developers — it's about a new loop where you still own every line of code."*

---

## Slide 2 · Opener Meme · `opener-meme-0` · ~0:30

**Caption on slide:** *Look, Woody… AI everywhere*

**Say:** Light laugh. *"We've all seen this. The question isn't whether AI is in our workflow — it's how we use it without losing control."*

---

## Slide 3 · Then vs Now · Frontend · `evolution` · ~1:30

**Subtitle:** *We used to type every line ourselves. Today we prompt an AI agent — and ship faster.*

**Bullets (read or paraphrase):**
- Then: manual typing, docs, Stack Overflow, hours per component
- Now: natural-language prompt → Agent scaffolds React + TypeScript
- You still own the code — **Prompt, Render, Debug** is the new loop

**▶ Play video** `/frontend-evolution-demo.webm`

**After video:** *"Line-by-line coding vs Cursor Agent — that's the shift. Generation got fast first."*

---

## Slide 4 · Then vs Now · Debugging · `debug-evolution` · ~1:30

**Subtitle:** *We used to debug blind with console.log. Now the agent inspects your live Chrome runtime via DevTools MCP.*

**Bullets:**
- Then: console.log spam, manual DevTools tabs, reproduce & guess
- Now: take_snapshot · list_console_messages · interact with live DOM
- Debug runtime behavior — the same browser your users actually hit

**▶ Play video** `/debug-evolution-demo.webm`

**Bridge:** *"That's the gap this talk closes — debugging used to be blind. Now the agent sees your real browser."*

---

## Slide 5 · Talk Overview · `talk-overview` · ~1:00

**Title:** Prompt, Render, Debug: AI-Powered React Development with Chrome DevTools

**Walk each pillar slowly:**

| Step | Title | Summary | Key bullets |
|------|-------|---------|---------------|
| 01 | **Prompt** | AI generates UI | Describe UI in natural language · AI scaffolds React + shadcn/ui · Iterate in seconds |
| 02 | **Render** | React builds it | Vite + React renders instantly · Compose pages you own · Hot reload |
| 03 | **Debug** | Chrome DevTools AI optimizes it | Inspect DOM, network, console · DevTools AI diagnoses faster · Optimize perf & a11y |

**Say:** *"We'll spend most of our time on Debug — because that's where AI agents used to be blind."*

---

## Slide 6 · DevTools MCP Intro · `devtools-mcp-intro` · ~2:00

**Bullets on slide:**
- Uses a real Chrome browser, with DevTools
- Allows your AI to debug your runtime, instead of static code
- Running on your local machine

**Talk track (pink box — read these):**
1. Chrome DevTools MCP is an open-source MCP server — it gives your AI agent the same browser powers you have in DevTools.
2. Your agent can open pages, read console logs, run performance traces, and inspect network requests — all programmatically.
3. It runs on real Chrome, locally — so you're debugging runtime behavior, not guessing from static code.
4. Setup is one MCP config in Cursor or VS Code — then your agent gets tools like click, fill_form, emulate, and performance_trace.

**▶ Play video** `/devtools-mcp-intro-demo.webm`  
*(Caption notes key timestamps: 0:25–0:41 · 2:09–2:34)*

---

## Slide 7 · MCP Tools · `devtools-mcp-capabilities` · ~1:30

**Group the tool categories — don't read every tool name:**

| Category | Tools |
|----------|-------|
| Input automation | click, drag, fill, hover, press_key |
| Navigation | new_page, navigate_page, list_pages |
| Emulation | emulate, resize_page |
| Performance | performance_trace, take_memory_snapshot |
| Network | get_network_requests |
| Debugging | lighthouse_audit, take_screenshot |

**Say:** *"Think of this as giving your agent hands and eyes inside Chrome."*

---

## Slide 8 · Setup · `devtools-mcp-setup` · ~2:30

**Requirements:** Node.js 22.12+ · Google Chrome · Cursor with MCP enabled

**Config paths:** `.cursor/mcp.json` · `.vscode/mcp.json` · `.mcp.json` · `.gemini/settings.json`

**Step 01 — Add MCP config:**
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--autoConnect"]
    }
  }
}
```
*Note: macOS + nvm — use full path to npx · restart Cursor*

**Step 02 — Enable remote debugging:**  
`chrome://inspect/#remote-debugging` → ☑ Allow remote debugging → Server at `127.0.0.1:9222`

**Step 03 — Or use --browserUrl:**  
Launch Chrome with `--remote-debugging-port=9223` and point MCP at that port.

---

## Slide 9 · Config Options · `devtools-mcp-config` · ~1:00

**Say:** *"You don't need all of these today."*

Mention only if asked: `--autoConnect`, `--browserUrl`, `--headless`, `--slim` (fewer tools = faster).

**Skip deep detail** — save time for demos.

---

## Slide 10 · Demo Form · `demo-form` · ~0:30

**Title:** WeAreDevelopers Congress — Session Interest

**Say:** *"This is our live target — a registration form on localhost."*

**Demo prompt on slide:**
> Navigate to http://localhost:5173/?slide=demo-form and fill the registration form with: Suchitra Swain, suchitra@example.com, Cursor, Full Stack Developer, AI & Frontend track, and a message about Chrome DevTools MCP.

**Optional:** Run live in Cursor now, or say *"I recorded this so we don't fight Wi‑Fi"* → next slide.

---

## Slide 11 · Demo Video · `demo-video` · ~2:30

**Subtitle:** Prompt → launch Chrome → fill_form → submit

**Steps (narrate after video):**
1. Type the prompt in Cursor Agent
2. Agent thinks · MCP tool calls appear in chat
3. Google Chrome opens to the demo form
4. fill_form + submit · task complete in Agent

**▶ Play video** `/devtools-mcp-demo.webm`

**Key line:** *"The agent didn't hallucinate the form — it interacted with the real DOM."*

---

## Slide 12 · Near Me / Location · `emulate-capabilities` · ~2:00

**Subtitle:** If you've built store locators, delivery apps, or local search — you need to test device location reliably.

**Explain bullets:**
- These features read geolocation APIs and show results based on coordinates
- Developers manually override location in the Sensors panel in Chrome DevTools
- With Cursor Agent + chrome-devtools-mcp, the agent calls `emulate()` on your real Chrome

**Talk track:**
1. Emulation in DevTools MCP covers viewport, user agent, location, CPU throttling, and network speed — so your agent tests like a real user.
2. Use case one: **Near Me** — delivery zones, store locators, local currency. Same as the Sensors panel, but your agent drives it.
3. Prompt: search Berlin, confirm no store in Washington, emulate Paris, verify stores appear — all autonomously.
4. Add *"fix all bugs you encounter"* for a closed feedback loop — test and fix without manual resizing.

**Sensors note:** *With the Sensors panel in Chrome DevTools — then Cursor Agent automates the same via emulate().*

---

## Slide 13 · Location Demo · `emulate-video` · ~2:00

**Steps:**
1. Prompt in Cursor Agent · MCP connects to Chrome
2. Berlin store found · Washington returns empty
3. emulate(Paris) in DevTools Sensors panel
4. Map pin & near-me list update · task complete

**Talk track:**
1. Watch the agent open real Chrome, run the city searches, then call emulate() to set Paris in Sensors.
2. The map pin and store list update live — same geolocation API your users hit, not a mock.
3. One prompt, one real browser, zero manual DevTools tab switching.

**▶ Play video** `/devtools-emulate-demo.webm`

---

## Slide 14 · Emulate Devices · `emulate-devices` · ~1:30

**Subtitle:** Test responsive UI on mobile, tablet, and desktop — on your real site in Chrome via MCP.

**Explain:**
- DevTools MCP emulate() sets viewport, user agent, and touch — same as the device toolbar
- Cursor Agent audits your live site across breakpoints: nav, hero, overflow, key CTAs
- Live example: suchitra-swain.web.app audited in real Chrome on port 9223

**Talk track:**
1. Use case two: responsive navigation — burger menu on mobile, full nav on desktop.
2. Use case three: interaction bugs — things break only when you actually use them.
3. Example: on mobile, tablet, desktop — type in search and check Sign in stays visible. On tablet/mobile, expanding search bar hid it.
4. Navigation + input automation + emulation + screenshots — fully automated cross-viewport testing.

**Sample prompt (read if time):**
> Using Chrome DevTools MCP, emulate mobile, tablet, and desktop on https://suchitra-swain.web.app/ and run a responsive audit. Check hero visibility, navigation, and horizontal overflow on each viewport. Summarize findings.

---

## Slide 15 · Responsive Demo · `emulate-devices-video` · ~2:00

**Steps:**
1. MCP connects to Chrome on port 9223
2. emulate(mobile) · hero + burger menu on live portfolio
3. Tablet → desktop · nav links + overflow check
4. Real screenshots injected · task complete

**Talk track:**
1. Here the agent emulates mobile, tablet, and desktop on my live portfolio — real Chrome, real site.
2. It checks hero visibility, navigation, and horizontal overflow at each breakpoint.
3. Your agent doesn't speculate how responsive code works — it observes it in Chrome.

**▶ Play video** `/devtools-emulate-devices-demo.webm`

---

## Slide 16 · Performance · `performance-capabilities` · ~1:00

**Subtitle:** Profile CPU and memory on your live page — the agent reads real traces, not static guesses.

**Explain:**
- performance_trace records a DevTools performance profile while users interact
- take_memory_snapshot captures heap state to spot leaks and retained objects
- Cursor Agent summarizes bottlenecks and suggests fixes from live data

**Demo prompt:**
> Profile the demo registration form — run performance_trace while I submit, then take_memory_snapshot and summarize bottlenecks.

---

## Slide 17 · Performance Demo · `performance-video` · ~2:00

**Steps:**
1. MCP connects to Chrome on port 9223
2. performance_trace() · record + reload in DevTools
3. CPU timeline + LCP insights in Performance panel
4. take_memory_snapshot() · heap captured from live tab

**▶ Play video** `/devtools-performance-demo.webm`  
*Real Chrome DevTools on suchitra-swain.web.app — not a mock UI.*

---

## Slide 18 · Debugging / Lighthouse · `debugging-capabilities` · ~1:00

**Subtitle:** Run audits and capture visual proof — Lighthouse scores and screenshots from live Chrome.

**Explain:**
- lighthouse_audit runs Performance, Accessibility, Best Practices, and SEO checks
- take_screenshot captures the current viewport for bug reports and PRs
- Agent uses both to verify fixes and document before/after states

**Demo prompt:**
> Audit https://suchitra-swain.web.app/ — run lighthouse_audit and take_screenshot, then summarize scores and issues.

---

## Slide 19 · Debugging Demo · `debugging-video` · ~2:00

**Steps:**
1. MCP connects to Chrome on port 9223
2. lighthouse_audit() · Perf · A11y · BP · SEO in DevTools
3. take_screenshot() · viewport captured
4. Agent summarizes scores and recommendations

**▶ Play video** `/devtools-debugging-demo.webm`

---

## Slide 20 · WebMCP · `webmcp` · ~1:00

**Subtitle:** A proposed web standard — websites expose specialized tools directly to visiting AI agents.

**Explain:**
- Proposed web standard
- Enables agents to use websites through specialized tools
- Experimental support in Chrome
- Debugging support in DevTools

**Talk track:**
1. WebMCP lets your site register tools at runtime — search, book, filter — that visiting AI agents can call directly.
2. Debug them in DevTools → Application panel → WebMCP: list tools, track live agent invocations, and run tools manually.
3. Filter call history by status — Completed, Error, Canceled — and inspect inputs like `{"query":"paris"}`.

---

## Slide 21 · WebMCP Flags · `webmcp-flags` · ~0:30

**Explain:**
- chrome://flags → search WebMCP
- #devtools-webmcp-support — DevTools panel
- #enable-webmcp-testing — WebMCP API

**Talk track:**
1. Enable two flags in chrome://flags before you can debug WebMCP in DevTools.
2. WebMCP support in DevTools — adds the Application panel debugger you just saw.
3. WebMCP for testing — enables the WebMCP API and testing interfaces on your site.

**Say:** *"Experimental — for early adopters. Link on the thank-you slide."*

---

## Slide 22 · Thank You · `thank-you` · ~2:00+ Q&A

**Headline:** Thank you! · **Subheadline:** Questions?

**CTA:** *Let's build smarter with AI + Chrome DevTools*

**Links to mention:**
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [WeAreDevelopers](https://www.wearedevelopers.com/world-congress)
- LinkedIn QR on screen

**Closing script:**
> "The loop is Prompt, Render, Debug. Generation got easy first; runtime debugging was the missing piece. Chrome DevTools MCP closes that gap — your agent sees what your users see. WebMCP is next: sites exposing their own tools to agents. Everything I showed is open source. Thank you — happy to take questions."

---

## If you're running long — cut here

| Slide | Trim to |
|-------|---------|
| 9 Config | 30 sec — mention `--autoConnect` only |
| 21 WebMCP Flags | 30 sec — "two flags in chrome://flags" |
| 16 Performance capabilities | Skip demo prompt read-aloud |

## If you're running short — expand here

| Slide | Add |
|-------|-----|
| 8 Setup | Walk through MCP config live |
| 11 Demo | Pause video to explain each tool call |
| 15 Responsive | Read the full portfolio audit prompt |

---

## Audience engagement (optional)

- After slide 5: *"Who still debugs mainly with console.log?"*
- After slide 11: *"Who's tried MCP with a browser?"*
