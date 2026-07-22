export const talkConfig = {
  id: "wearedevelopers-2026",
  name: "Prompt, Render, Debug",
  event: "WeAreDevelopers World Congress 2026",
  /** Ordered list of slide IDs from the shared slide registry */
  slides: [
    "about-me",
    "talk-overview",
    "opener-memes",
    "evolution",
    "debug-evolution",
    "devtools-mcp-intro",
    "devtools-mcp-capabilities",
    "devtools-mcp-setup",
    "devtools-mcp-config",
    "demo-form",
    "demo-video",
    "emulate-capabilities",
    "emulate-video",
    "emulate-devices",
    "emulate-devices-video",
    "performance-capabilities",
    "performance-video",
    "debugging-capabilities",
    "debugging-video",
    "webmcp",
    "webmcp-flags",
    "thank-you",
  ],
} as const

export type TalkSlideId = (typeof talkConfig.slides)[number]
