# Rehearsal Checklist — 30-Minute Run-Through

Use this with a timer. Target: **28–30 min** content + **2–5 min** Q&A buffer.

**Start command:** `npm run dev` → fullscreen (**F**) → slide 1

---

## One-page quick reference (print this section)

| # | Slide ID | Label | Target | Key line |
|---|----------|-------|--------|----------|
| 1 | `about-me` | About | 0:00–1:30 | "Prompt, Render, Debug — you still own the code." |
| 2 | `opener-meme-0` | Opener | 1:30–2:00 | "AI everywhere — how do we keep control?" |
| 3 | `evolution` | Evolution | 2:00–3:30 | ▶ Video · "Generation got fast first." |
| 4 | `debug-evolution` | Debug Evolution | 3:30–5:00 | ▶ Video · "Agent sees real Chrome." |
| 5 | `talk-overview` | Overview | 5:00–6:00 | Walk 3 pillars · "Most time on Debug." |
| 6 | `devtools-mcp-intro` | DevTools MCP | 6:00–8:00 | ▶ Video · read pink talk track |
| 7 | `devtools-mcp-capabilities` | MCP Tools | 8:00–9:30 | "Hands and eyes inside Chrome." |
| 8 | `devtools-mcp-setup` | Setup | 9:30–12:00 | 3 steps · remote debugging |
| 9 | `devtools-mcp-config` | Config | 12:00–13:00 | Skip deep · `--autoConnect` only |
| 10 | `demo-form` | Demo Form | 13:00–13:30 | "Live target on localhost." |
| 11 | `demo-video` | Demo Video | 13:30–16:00 | ▶ Video · "Real DOM, not hallucination." |
| 12 | `emulate-capabilities` | Location | 16:00–18:00 | Near Me · emulate() · Paris prompt |
| 13 | `emulate-video` | Location Demo | 18:00–20:00 | ▶ Video · geolocation API live |
| 14 | `emulate-devices` | Emulate | 20:00–21:30 | Responsive · search bar bug story |
| 15 | `emulate-devices-video` | Emulate Demo | 21:30–23:30 | ▶ Video · "Observes, doesn't speculate." |
| 16 | `performance-capabilities` | Performance | 23:30–24:30 | performance_trace · memory snapshot |
| 17 | `performance-video` | Performance Demo | 24:30–26:30 | ▶ Video · LCP on portfolio |
| 18 | `debugging-capabilities` | Debugging | 26:30–27:30 | Lighthouse + screenshot |
| 19 | `debugging-video` | Debugging Demo | 27:30–29:30 | ▶ Video · audit scores |
| 20 | `webmcp` | WebMCP | 29:30–30:30 | Sites expose tools to agents |
| 21 | `webmcp-flags` | WebMCP Flags | 30:30–31:00 | Two chrome://flags · experimental |
| 22 | `thank-you` | Thank you | 31:00–33:00 | Links · QR · Q&A |

*If strict 30 min: trim slides 9 + 21 to 30 sec each → finish ~30:00 at slide 22.*

---

## Pre-rehearsal setup (15 min before)

- [ ] `npm run dev` running · deck loads at `localhost:5173`
- [ ] Presenter display: deck fullscreen on projector
- [ ] Chrome: remote debugging enabled (`chrome://inspect/#remote-debugging`)
- [ ] Cursor: MCP config present · chrome-devtools server connects (green dot)
- [ ] All videos play (slides 3, 4, 6, 11, 13, 15, 17, 19)
- [ ] Phone on silent · water nearby
- [ ] Backup: recorded videos if live demo fails

---

## Timed run-through (check each box)

### Block A — Hook & context (0:00 – 6:00)

- [ ] **0:00** Slide 1 — Introduce yourself, topic, three pillars
- [ ] **1:30** Slide 2 — Meme · 30 sec max
- [ ] **2:00** Slide 3 — ▶ Evolution video plays · narrate Then vs Now
- [ ] **3:30** Slide 4 — ▶ Debug evolution video · bridge to MCP
- [ ] **5:00** Slide 5 — Overview · Prompt → Render → Debug

**Checkpoint @ 6:00:** Audience knows the problem and the three-step loop.

---

### Block B — DevTools MCP (6:00 – 13:00)

- [ ] **6:00** Slide 6 — What is MCP · read talk track · ▶ intro video
- [ ] **8:00** Slide 7 — Tool categories (don't read every tool)
- [ ] **9:30** Slide 8 — Setup 3 steps · MCP json · remote debugging
- [ ] **12:00** Slide 9 — Config options · keep brief

**Checkpoint @ 13:00:** Audience could set up MCP tonight.

---

### Block C — Core demo (13:00 – 16:00)

- [ ] **13:00** Slide 10 — Show demo form · read prompt
- [ ] **13:30** Slide 11 — ▶ Demo video · recap 4 steps

**Checkpoint @ 16:00:** "Wow" moment landed — agent + real browser.

---

### Block D — Emulation (16:00 – 23:30)

- [ ] **16:00** Slide 12 — Near Me use case · emulate() · Paris prompt
- [ ] **18:00** Slide 13 — ▶ Location demo video
- [ ] **20:00** Slide 14 — Responsive audit · portfolio · search bar bug
- [ ] **21:30** Slide 15 — ▶ Responsive demo video

**Checkpoint @ 23:30:** Two emulation stories clear (location + viewport).

---

### Block E — Performance & Lighthouse (23:30 – 29:30)

- [ ] **23:30** Slide 16 — performance_trace · memory snapshot
- [ ] **24:30** Slide 17 — ▶ Performance video
- [ ] **26:30** Slide 18 — lighthouse_audit · take_screenshot
- [ ] **27:30** Slide 19 — ▶ Debugging video

**Checkpoint @ 29:30:** Agent reads real traces and audit scores.

---

### Block F — Future & close (29:30 – 33:00)

- [ ] **29:30** Slide 20 — WebMCP standard · Application panel
- [ ] **30:30** Slide 21 — chrome://flags · 30 sec
- [ ] **31:00** Slide 22 — Thank you · links · LinkedIn QR · Q&A

**Checkpoint @ 33:00:** Done. Buffer used for questions.

---

## Post-rehearsal notes

| Run # | Date | Actual time | Slides to trim | Slides to expand |
|-------|------|-------------|----------------|------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## Export to PDF

**Quick ref (one page):** Print this file from VS Code / browser — select only the table section above.

**Full speaker notes:** Open `docs/speaker-notes.md` → Print to PDF (Cmd+P).

**Or from terminal** (if you have `npx md-to-pdf`):
```bash
npx md-to-pdf docs/speaker-notes.md docs/rehearsal-checklist.md
```

---

## Day-of reminder card

```
F = fullscreen    → = next    ← = back
Spine: Prompt → Render → Debug
Real Chrome, not static code
Backup: videos on slides 3,4,6,11,13,15,17,19
GitHub: github.com/ChromeDevTools/chrome-devtools-mcp
```
