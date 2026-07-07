export const presentationMeta = {
  event: "WeAreDevelopers World Congress",
  year: "2026",
  location: "Berlin, Germany",
  dates: "8–10 July 2026",
  venue: "CityCube Berlin",
}

export const openerMemes = [
  {
    src: "/memes/ai-everywhere.png",
    alt: "Buzz Lightyear pointing — Look Woody, AI everywhere",
    caption: "Look, Woody… AI everywhere",
  },
] as const

export const evolutionSlide = {
  title: "Then vs Now · frontend evolution",
  subtitle:
    "We used to type every line ourselves. Today we prompt an AI agent — and ship faster.",
  points: [
    "Then: manual typing, docs, Stack Overflow, hours per component",
    "Now: natural-language prompt → Agent scaffolds React + TypeScript",
    "You still own the code — Prompt, Render, Debug is the new loop",
  ],
  video: {
    src: "/frontend-evolution-demo.webm",
    poster: "/frontend-evolution-demo-poster.png",
    caption: "Line-by-line coding vs Cursor Agent — the shift in frontend development.",
  },
} as const

export const debugEvolutionSlide = {
  title: "Then vs Now · debugging",
  subtitle:
    "We used to debug blind with console.log. Now the agent inspects your live Chrome runtime via DevTools MCP.",
  points: [
    "Then: console.log spam, manual DevTools tabs, reproduce & guess",
    "Now: take_snapshot · list_console_messages · interact with live DOM",
    "Debug runtime behavior — the same browser your users actually hit",
  ],
  video: {
    src: "/debug-evolution-demo.webm",
    poster: "/debug-evolution-demo-poster.png",
    caption:
      "printf debugging vs Cursor Agent + chrome-devtools-mcp on a live registration form.",
  },
} as const

export const speaker = {
  name: "Suchitra Swain",
  title: "Sr Software Engineer & Sr Full Stack Web Developer",
  location: "Berlin",
  topic:
    "Prompt, Render, Debug: AI-Powered React Development with Chrome DevTools",
  tagline:
    "A live demo of the modern React workflow — from AI prompt to production-ready UI.",
  image: "/speaker-photo.png",
  highlights: ["React", "Chrome DevTools", "AI-powered development"],
  social: {
    github: "github.com/suchitraswain",
    linkedin: "linkedin.com/in/suchitraswain",
  },
}

export const talkPillars = [
  {
    step: "01",
    title: "Prompt",
    summary: "AI generates UI",
    description:
      "Start with a clear prompt and let AI scaffold components, layout, and interaction patterns.",
    bullets: [
      "Describe the UI in natural language",
      "AI scaffolds React + shadcn/ui components",
      "Iterate on layout, state, and interactions in seconds",
    ],
    demoNote: "Live demo: prompt → component scaffold",
  },
  {
    step: "02",
    title: "Render",
    summary: "React builds it",
    description:
      "Turn generated ideas into real React code — components, state, and a working interface.",
    bullets: [
      "Vite + React renders the generated code instantly",
      "Compose pages with real components you own",
      "Hot reload keeps the feedback loop tight",
    ],
    demoNote: "Live demo: run dev server → see UI on screen",
  },
  {
    step: "03",
    title: "Debug",
    summary: "Chrome DevTools AI optimizes it",
    description:
      "Inspect, refine, and ship with Chrome DevTools AI — performance, accessibility, and quality.",
    bullets: [
      "Inspect runtime DOM, network, and console",
      "Use DevTools AI to diagnose issues faster",
      "Optimize performance and accessibility before shipping",
    ],
    demoNote: "Live demo: DevTools MCP + AI assistant",
  },
] as const

export const devToolsMcpIntro = [
  "Uses a real Chrome browser, with DevTools",
  "Allows your AI to debug your runtime, instead of static code",
  "Running on your local machine",
] as const

export const devToolsMcpIntroSlide = {
  talkTrack: [
    "Chrome DevTools MCP is an open-source MCP server — it gives your AI agent the same browser powers you have in DevTools.",
    "Your agent can open pages, read console logs, run performance traces, and inspect network requests — all programmatically.",
    "It runs on real Chrome, locally — so you're debugging runtime behavior, not guessing from static code.",
    "Setup is one MCP config in Cursor or VS Code — then your agent gets tools like click, fill_form, emulate, and performance_trace.",
  ],
  video: {
    src: "/devtools-mcp-intro-demo.webm",
    poster: "/devtools-mcp-intro-demo-poster.png",
    caption:
      "Chrome DevTools MCP — what it is & how to set it up (0:25–0:41 · 2:09–2:34)",
  },
} as const

export const devToolsMcpFeatures = [
  {
    title: "Input automation",
    tools: ["click", "drag", "fill", "hover", "press_key"],
  },
  {
    title: "Navigation automation",
    tools: ["new_page", "navigate_page", "list_pages"],
  },
  {
    title: "Emulation",
    tools: ["emulate", "resize_page"],
  },
  {
    title: "Performance",
    tools: ["performance_trace", "take_memory_snapshot"],
  },
  {
    title: "Network",
    tools: ["get_network_requests"],
  },
  {
    title: "Debugging",
    tools: ["lighthouse_audit", "take_screenshot"],
  },
] as const

export const devToolsMcpSetup = {
  requirements: ["Node.js 22.12+", "Google Chrome", "Cursor with MCP enabled"],
  configPaths: [
    { tool: "Cursor", path: ".cursor/mcp.json" },
    { tool: "VS Code", path: ".vscode/mcp.json" },
    { tool: "Claude Code", path: ".mcp.json" },
    { tool: "Gemini CLI", path: ".gemini/settings.json" },
  ],
  steps: [
    {
      step: "01",
      title: "Add MCP config",
      description: "Create or update your MCP settings file:",
      code: `{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--autoConnect"
      ]
    }
  }
}`,
      note: "macOS + nvm: use full path to npx · restart Cursor",
    },
    {
      step: "02",
      title: "Enable remote debugging",
      description: "In Chrome, open chrome://inspect/#remote-debugging",
      code: `chrome://inspect/#remote-debugging

☑ Allow remote debugging for this browser
→ Server running at 127.0.0.1:9222`,
      image: "/chrome-remote-debugging.png",
      imageAlt:
        "Chrome DevTools remote debugging panel with Allow remote debugging enabled and server running at 127.0.0.1:9222",
      note: "Turn on the setting · MCP auto-connects to your browser",
    },
    {
      step: "03",
      title: "Or use --browserUrl",
      description: "Launch Chrome with a debug profile, then point MCP at it:",
      code: `open -na "Google Chrome" --args \\
  --remote-debugging-port=9223 \\
  --user-data-dir=/tmp/chrome-devtools-profile

"args": ["-y", "chrome-devtools-mcp@latest",
  "--browser-url=http://127.0.0.1:9223"]`,
      note: "Use when port 9222 is taken · match port in MCP args",
    },
  ],
} as const

export const devToolsMcpConfigOptions = {
  left: [
    {
      flag: "--autoConnect",
      description: "Connect to your already-open Chrome after you allow in the dialog.",
    },
    {
      flag: "--browserUrl",
      description: "Point MCP at a debug port, e.g. http://127.0.0.1:9222.",
    },
    {
      flag: "--wsEndpoint",
      description: "Connect via WebSocket debugger URL instead of HTTP.",
    },
    {
      flag: "--wsHeaders",
      description: "Add auth headers for WebSocket connections (JSON).",
    },
    {
      flag: "--headless",
      description: "Run Chrome without a visible browser window.",
    },
    {
      flag: "--executablePath",
      description: "Use a custom Chrome binary path.",
    },
    {
      flag: "--isolated",
      description: "Temp profile — cleaned up when the browser closes.",
    },
    {
      flag: "--userDataDir",
      description: "Set profile directory — keeps logins and cookies.",
    },
  ],
  right: [
    {
      flag: "--channel",
      description: "Pick Chrome channel: stable, beta, dev, or canary.",
    },
    {
      flag: "--logFile",
      description: "Write MCP debug logs to a file.",
    },
    {
      flag: "--viewport",
      description: "Set starting browser size, e.g. 1280x720.",
    },
    {
      flag: "--categoryEmulation",
      description: "Enable or disable emulate and viewport tools.",
    },
    {
      flag: "--categoryPerformance",
      description: "Enable or disable performance and memory tools.",
    },
    {
      flag: "--categoryNetwork",
      description: "Enable or disable network inspection tools.",
    },
    {
      flag: "--performanceCrux",
      description: "Fetch real-user CrUX data for traced URLs.",
    },
    {
      flag: "--slim",
      description: "Expose only 3 core tools — lighter, faster agents.",
    },
  ],
} as const

export const demoForm = {
  title: "WeAreDevelopers Congress — Session Interest",
  subtitle: "Live target for Chrome DevTools MCP · fill_in_form demo",
  demoPrompt:
    "Navigate to http://localhost:5173/?slide=demo-form and fill the registration form with: Suchitra Swain, suchitra@example.com, Cursor, Full Stack Developer, AI & Frontend track, and a message about Chrome DevTools MCP.",
  sampleData: {
    fullName: "Suchitra Swain",
    email: "suchitra@example.com",
    company: "Cursor",
    role: "full-stack",
    track: "ai-frontend",
    message: "Excited to demo AI-powered debugging with Chrome DevTools MCP!",
    newsletter: true,
  },
  roles: [
    { value: "frontend", label: "Frontend Developer" },
    { value: "full-stack", label: "Full Stack Developer" },
    { value: "platform", label: "Platform Engineer" },
    { value: "lead", label: "Tech Lead" },
  ],
  tracks: [
    { value: "ai-frontend", label: "AI & Frontend" },
    { value: "devtools", label: "Chrome DevTools" },
    { value: "react", label: "React & Performance" },
    { value: "accessibility", label: "Accessibility" },
  ],
} as const

export const demoVideoSlide = {
  title: "Chrome DevTools MCP in action",
  subtitle: "Prompt → launch Chrome → fill_form → submit",
  steps: [
    "1 · Type the prompt in Cursor Agent",
    "2 · Agent thinks · MCP tool calls appear in chat",
    "3 · Google Chrome opens to the demo form",
    "4 · fill_form + submit · task complete in Agent",
  ],
  video: {
    src: "/devtools-mcp-demo.webm",
    poster: "/devtools-mcp-demo-poster.png",
    caption:
      "Cursor Agent → thinking → MCP fill_form → Chrome demo form submitted · task complete summary.",
  },
} as const

export const performanceCapabilitiesSlide = {
  label: "Performance",
  title: "Trace runtime performance",
  subtitle:
    "Profile CPU and memory on your live page — the agent reads real traces, not static guesses.",
  explain: [
    "performance_trace records a DevTools performance profile while users interact.",
    "take_memory_snapshot captures heap state to spot leaks and retained objects.",
    "Cursor Agent summarizes bottlenecks and suggests fixes from live data.",
  ],
  footnote: "MCP tools: performance_trace · take_memory_snapshot",
  demoPrompt:
    "Profile the demo registration form — run performance_trace while I submit, then take_memory_snapshot and summarize bottlenecks.",
} as const

export const performanceVideoSlide = {
  label: "Performance demo",
  title: "Performance trace · live replay",
  subtitle:
    "Real Chrome DevTools Performance panel on suchitra-swain.web.app — record, reload, inspect LCP.",
  steps: [
    "1 · MCP connects to Chrome on port 9223",
    "2 · performance_trace() · record + reload in DevTools",
    "3 · CPU timeline + LCP insights in Performance panel",
    "4 · take_memory_snapshot() · heap captured from live tab",
  ],
  video: {
    src: "/devtools-performance-demo.webm",
    poster: "/devtools-performance-demo-poster.png",
    caption:
      "Real Chrome DevTools Performance trace on suchitra-swain.web.app — not a mock UI.",
  },
} as const

export const networkCapabilitiesSlide = {
  label: "Network",
  title: "Inspect network requests",
  subtitle:
    "See every fetch, document, and API call your page makes — from the browser your users hit.",
  explain: [
    "get_network_requests returns the Network panel log from live Chrome.",
    "Debug slow APIs, failed submissions, and missing assets without manual tab switching.",
    "Agent correlates console errors with the request that caused them.",
  ],
  footnote: "MCP tool: get_network_requests",
  demoPrompt:
    "Open the demo registration form, submit it, then use get_network_requests to list all requests and flag anything slow or failing.",
} as const

export const networkVideoSlide = {
  label: "Network demo",
  title: "Network audit · live replay",
  subtitle: "Agent reads network requests after form submit on the demo page.",
  steps: [
    "1 · navigate_page to demo form · MCP connected",
    "2 · User submits registration · fetch fired",
    "3 · get_network_requests() · document + API rows",
    "4 · Agent flags slow register call · task complete",
  ],
  video: {
    src: "/devtools-network-demo.webm",
    poster: "/devtools-network-demo-poster.png",
    caption: "Cursor Agent → get_network_requests after form submit on localhost demo.",
  },
} as const

export const debuggingCapabilitiesSlide = {
  label: "Debugging",
  title: "Lighthouse & screenshots",
  subtitle:
    "Run audits and capture visual proof — Lighthouse scores and screenshots from live Chrome.",
  explain: [
    "lighthouse_audit runs Performance, Accessibility, Best Practices, and SEO checks.",
    "take_screenshot captures the current viewport for bug reports and PRs.",
    "Agent uses both to verify fixes and document before/after states.",
  ],
  footnote: "MCP tools: lighthouse_audit · take_screenshot",
  demoPrompt:
    "Audit https://suchitra-swain.web.app/ — run lighthouse_audit and take_screenshot, then summarize scores and issues.",
} as const

export const debuggingVideoSlide = {
  label: "Debugging demo",
  title: "Lighthouse audit · live replay",
  subtitle:
    "Real Chrome DevTools Lighthouse on suchitra-swain.web.app — audit scores and screenshot.",
  steps: [
    "1 · MCP connects to Chrome on port 9223",
    "2 · lighthouse_audit() · Perf · A11y · BP · SEO in DevTools",
    "3 · take_screenshot() · viewport captured",
    "4 · Agent summarizes scores and recommendations",
  ],
  video: {
    src: "/devtools-debugging-demo.webm",
    poster: "/devtools-debugging-demo-poster.png",
    caption:
      "Real Chrome DevTools Lighthouse audit on suchitra-swain.web.app — not a mock UI.",
  },
} as const

export const emulateCapabilitiesSlide = {
  title: "Near me features",
  subtitle:
    "If you've built store locators, delivery apps, or local search — you need to test device location reliably.",
  explain: [
    "These features read geolocation APIs and show results based on the user's coordinates.",
    "Developers manually override location in the Sensors panel in Chrome DevTools.",
    "With Cursor Agent + chrome-devtools-mcp, the agent calls emulate() on your real Chrome.",
  ],
  talkTrack: [
    "Emulation in DevTools MCP covers viewport, user agent, location, CPU throttling, and network speed — so your agent tests like a real user.",
    "Use case one: Near Me — delivery zones, store locators, local currency. Same as the Sensors panel, but your agent drives it.",
    "Prompt: search Berlin, confirm no store in Washington, emulate Paris, verify stores appear — all autonomously.",
    "Add 'fix all bugs you encounter' for a closed feedback loop — test and fix without manual resizing.",
  ],
  sensorsNote:
    "With the Sensors panel in Chrome DevTools — then Cursor Agent automates the same via emulate().",
} as const

export const emulateVideoSlide = {
  title: "Device location · live replay",
  subtitle: "Cursor Agent connects to Chrome, searches cities, then emulates Paris.",
  steps: [
    "1 · Prompt in Cursor Agent · MCP connects to Chrome",
    "2 · Berlin store found · Washington returns empty",
    "3 · emulate(Paris) in DevTools Sensors panel",
    "4 · Map pin & near-me list update · task complete",
  ],
  talkTrack: [
    "Watch the agent open real Chrome, run the city searches, then call emulate() to set Paris in Sensors.",
    "The map pin and store list update live — same geolocation API your users hit, not a mock.",
    "One prompt, one real browser, zero manual DevTools tab switching.",
  ],
  video: {
    src: "/devtools-emulate-demo.webm",
    poster: "/devtools-emulate-demo-poster.png",
    caption:
      "Cursor Agent → emulate Paris in DevTools Sensors → store locator map & near-me UI updates.",
  },
} as const

export const emulateDevicesSlide = {
  title: "Emulate devices & viewports",
  subtitle:
    "Test responsive UI on mobile, tablet, and desktop — on your real site in Chrome via MCP.",
  explain: [
    "DevTools MCP emulate() sets viewport, user agent, and touch — same as the device toolbar.",
    "Cursor Agent audits your live site across breakpoints: nav, hero, overflow, key CTAs.",
    "Live example: suchitra-swain.web.app audited in real Chrome on port 9223.",
  ],
  talkTrack: [
    "Use case two: responsive navigation — burger menu on mobile, full nav on desktop. Let the agent compare links across viewports.",
    "Use case three: interaction bugs — things break only when you actually use them, not just by looking.",
    "Example: on mobile, tablet, and desktop — type in search and check Sign in stays visible. On tablet and mobile, the expanding search bar hid it.",
    "Navigation + input automation + emulation + screenshots — fully automated cross-viewport testing.",
  ],
  prompts: [
    {
      label: "Live portfolio audit",
      text: "Using Chrome DevTools MCP, emulate mobile, tablet, and desktop on https://suchitra-swain.web.app/ and run a responsive audit. Check hero visibility, navigation, and horizontal overflow on each viewport. Summarize findings.",
    },
  ],
  siteUrl: "https://suchitra-swain.web.app/",
} as const

export const emulateDevicesVideoSlide = {
  title: "Responsive emulation · live replay",
  subtitle: "Real Chrome + MCP emulate() on suchitra-swain.web.app — not a mock.",
  steps: [
    "1 · MCP connects to Chrome on port 9223",
    "2 · emulate(mobile) · hero + burger menu on live portfolio",
    "3 · Tablet → desktop · nav links + overflow check",
    "4 · Real screenshots injected · task complete",
  ],
  talkTrack: [
    "Here the agent emulates mobile, tablet, and desktop on my live portfolio — real Chrome, real site.",
    "It checks hero visibility, navigation, and horizontal overflow at each breakpoint.",
    "Your agent doesn't speculate how responsive code works — it observes it in Chrome.",
  ],
  video: {
    src: "/devtools-emulate-devices-demo.webm",
    poster: "/devtools-emulate-devices-demo-poster.png",
    caption:
      "Real Chrome tab → emulate viewports via CDP → responsive audit on suchitra-swain.web.app.",
  },
} as const

export const webMcpSlide = {
  title: "WebMCP",
  subtitle:
    "A proposed web standard — websites expose specialized tools directly to visiting AI agents.",
  explain: [
    "Proposed web standard",
    "Enables agents to use websites through specialized tools",
    "Experimental support in Chrome",
    "Debugging support in DevTools",
  ],
  talkTrack: [
    "WebMCP lets your site register tools at runtime — search, book, filter — that visiting AI agents can call directly.",
    "Debug them in DevTools → Application panel → WebMCP: list tools, track live agent invocations, and run tools manually.",
    "Filter call history by status — Completed, Error, Canceled — and inspect inputs like {\"query\":\"paris\"}.",
  ],
  image: {
    src: "/webmcp-application-panel.png",
    alt: "Debug WebMCP in DevTools Application panel — filter by status and inspect tool call inputs",
    caption: "Application → WebMCP · What's New in DevTools 148–150",
  },
} as const

export const webMcpFlagsSlide = {
  title: "Enable WebMCP flags",
  subtitle: "Both WebMCP and its DevTools debugging are still experimental.",
  explain: [
    "chrome://flags → search WebMCP",
    "#devtools-webmcp-support — DevTools panel",
    "#enable-webmcp-testing — WebMCP API",
  ],
  talkTrack: [
    "Enable two flags in chrome://flags before you can debug WebMCP in DevTools.",
    "WebMCP support in DevTools — adds the Application panel debugger you just saw.",
    "WebMCP for testing — enables the WebMCP API and testing interfaces on your site.",
  ],
  image: {
    src: "/webmcp-chrome-flags-hd.png",
    alt: "Enable WebMCP support in DevTools and WebMCP for testing in chrome://flags",
    caption: "chrome://flags · #devtools-webmcp-support · #enable-webmcp-testing",
  },
} as const

export const thankYouSlide = {
  headline: "Thank you!",
  subheadline: "Questions?",
  cta: "Let's build smarter with AI + Chrome DevTools",
  linkedin: "https://www.linkedin.com/in/suchitra-swain-47562ab7/",
  links: [
    { label: "Chrome DevTools MCP", url: "https://github.com/ChromeDevTools/chrome-devtools-mcp" },
    { label: "WeAreDevelopers", url: "https://www.wearedevelopers.com/world-congress" },
  ],
}
