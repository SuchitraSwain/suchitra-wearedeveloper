/**
 * Minimal content pack for a new talk.
 * Copy this folder to talks/<your-talk-id>/ and customize.
 */
export const presentationMeta = {
  event: "Your Conference",
  year: "2026",
  location: "City, Country",
  dates: "Date",
  venue: "Venue",
  // Optional About-slide event chrome (logo / label / city). Leave unset for a global deck.
  // banner: {
  //   logo: "/your-logo.svg",
  //   logoAlt: "Conference",
  //   label: "Conference · 2026",
  //   location: "City, Country",
  // },
}

export const openerMemes = [
  {
    src: "/memes/ai-everywhere.jpg",
    alt: "Opener visual",
    caption: "Your opener caption",
  },
] as const

export const speaker = {
  name: "Suchitra Swain",
  title: "Sr Software Engineer & Sr Full Stack Web Developer",
  location: "Berlin",
  topic: "Your talk title",
  tagline: "One-line description of the talk.",
  image: "/speaker-photo.png",
  highlights: ["React", "AI", "DevTools"],
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
    description: "Start with a clear prompt and let AI scaffold components.",
    bullets: ["Describe the UI", "Iterate fast", "Own the code"],
    demoNote: "Live demo note",
  },
  {
    step: "02",
    title: "Render",
    summary: "React builds it",
    description: "Ship production UI with your stack.",
    bullets: ["Components", "State", "Polish"],
    demoNote: "Live demo note",
  },
  {
    step: "03",
    title: "Debug",
    summary: "Verify in the browser",
    description: "Use real browser tooling with your agent.",
    bullets: ["Runtime checks", "Network", "Performance"],
    demoNote: "Live demo note",
  },
] as const

export const thankYouSlide = {
  headline: "Thank you!",
  subheadline: "Questions?",
  cta: "Let's keep building.",
  linkedin: "https://www.linkedin.com/in/suchitra-swain-47562ab7/",
  links: [
    { label: "GitHub", url: "https://github.com/SuchitraSwain" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/suchitra-swain-47562ab7/" },
  ],
}

/** Stubs so optional slides still typecheck if enabled in config */
export const evolutionSlide = {
  title: "Then vs Now",
  subtitle: "Customize this slide for your talk.",
  points: ["Point one", "Point two", "Point three"],
  video: { src: "", poster: "", caption: "" },
} as const

export const debugEvolutionSlide = evolutionSlide
export const demoForm = {
  title: "Demo form",
  subtitle: "Customize for your live demo.",
  demoPrompt: "Your Cursor prompt here.",
  sampleData: {},
  roles: [] as { value: string; label: string }[],
  tracks: [] as { value: string; label: string }[],
}
export const demoVideoSlide = {
  title: "Demo",
  subtitle: "Customize",
  steps: [] as string[],
  video: { src: "", poster: "", caption: "" },
} as const
export const devToolsMcpIntro = [] as string[]
export const devToolsMcpIntroSlide = {
  talkTrack: [] as string[],
  video: { src: "", poster: "", caption: "" },
} as const
export const devToolsMcpFeatures = [] as { title: string; tools: string[] }[]
export const devToolsMcpSetup = {
  requirements: [] as string[],
  configPaths: [] as { tool: string; path: string }[],
  steps: [] as {
    step: string
    title: string
    description: string
    code?: string
    image?: string
    imageAlt?: string
    note: string
  }[],
}
export const devToolsMcpConfigOptions = { left: [], right: [] } as const
export const emulateCapabilitiesSlide = {
  title: "",
  subtitle: "",
  explain: [] as string[],
  talkTrack: [] as string[],
  sensorsNote: "",
} as const
export const emulateVideoSlide = {
  title: "",
  subtitle: "",
  steps: [] as string[],
  video: { src: "", poster: "", caption: "" },
} as const
export const emulateDevicesSlide = {
  title: "",
  subtitle: "",
  explain: [] as string[],
  talkTrack: [] as string[],
  prompts: [] as { label: string; text: string }[],
  siteUrl: "",
} as const
export const emulateDevicesVideoSlide = {
  title: "",
  subtitle: "",
  steps: [] as string[],
  video: { src: "", poster: "", caption: "" },
} as const
export const performanceCapabilitiesSlide = {
  label: "Performance",
  title: "",
  subtitle: "",
  explain: [] as string[],
  footnote: "",
  demoPrompt: "",
} as const
export const performanceVideoSlide = {
  label: "",
  title: "",
  subtitle: "",
  steps: [] as string[],
  video: { src: "", poster: "", caption: "" },
} as const
export const debuggingCapabilitiesSlide = performanceCapabilitiesSlide
export const debuggingVideoSlide = performanceVideoSlide
export const webMcpSlide = {
  title: "",
  subtitle: "",
  explain: [] as string[],
  talkTrack: [] as string[],
  image: { src: "", alt: "", caption: "" },
} as const
export const webMcpFlagsSlide = webMcpSlide
