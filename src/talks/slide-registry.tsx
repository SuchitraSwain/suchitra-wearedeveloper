import type { ComponentType } from "react"

import { AboutMeSlide } from "@/components/presentation/slides/about-me-slide"
import { createMemeSlideComponent } from "@/components/presentation/slides/meme-slides"
import { DemoFormSlide } from "@/components/presentation/slides/demo-form-slide"
import { DemoVideoSlide } from "@/components/presentation/slides/demo-video-slide"
import {
  DebuggingCapabilitiesSlide,
  DebuggingVideoSlide,
  PerformanceCapabilitiesSlide,
  PerformanceVideoSlide,
} from "@/components/presentation/slides/mcp-feature-slides"
import { EmulateCapabilitiesSlide } from "@/components/presentation/slides/emulate-capabilities-slide"
import { EmulateDevicesSlide } from "@/components/presentation/slides/emulate-devices-slide"
import { EmulateDevicesVideoSlide } from "@/components/presentation/slides/emulate-devices-video-slide"
import { EmulateVideoSlide } from "@/components/presentation/slides/emulate-video-slide"
import {
  DevToolsMcpCapabilitiesSlide,
  DevToolsMcpIntroSlide,
} from "@/components/presentation/slides/devtools-mcp-slides"
import { DevToolsMcpConfigSlide } from "@/components/presentation/slides/devtools-mcp-config-slide"
import { DevToolsMcpSetupSlide } from "@/components/presentation/slides/devtools-mcp-setup-slide"
import { DebugEvolutionSlide } from "@/components/presentation/slides/debug-evolution-slide"
import { EvolutionSlide } from "@/components/presentation/slides/evolution-slide"
import { TalkOverviewSlide } from "@/components/presentation/slides/talk-overview-slide"
import { ThankYouSlide } from "@/components/presentation/slides/thank-you-slide"
import { WebMcpFlagsSlide, WebMcpSlide } from "@/components/presentation/slides/webmcp-slide"
import { openerMemes } from "@/data/presentation"

export type SlideDefinition = {
  id: string
  label: string
  component: ComponentType
}

const memeSlides: SlideDefinition[] = openerMemes.map((meme, index) => ({
  id: `opener-meme-${index}`,
  label: index === 0 ? "Opener" : `Meme ${index + 1}`,
  component: createMemeSlideComponent(meme),
}))

/** Shared catalog of slide modules. Talks pick an ordered subset via config.slides. */
export const slideCatalog: Record<string, SlideDefinition | SlideDefinition[]> = {
  "about-me": { id: "about-me", label: "About", component: AboutMeSlide },
  "talk-overview": {
    id: "talk-overview",
    label: "Overview",
    component: TalkOverviewSlide,
  },
  "opener-memes": memeSlides,
  evolution: { id: "evolution", label: "Evolution", component: EvolutionSlide },
  "debug-evolution": {
    id: "debug-evolution",
    label: "Debug Evolution",
    component: DebugEvolutionSlide,
  },
  "devtools-mcp-intro": {
    id: "devtools-mcp-intro",
    label: "DevTools MCP",
    component: DevToolsMcpIntroSlide,
  },
  "devtools-mcp-capabilities": {
    id: "devtools-mcp-capabilities",
    label: "MCP Tools",
    component: DevToolsMcpCapabilitiesSlide,
  },
  "devtools-mcp-setup": {
    id: "devtools-mcp-setup",
    label: "Setup",
    component: DevToolsMcpSetupSlide,
  },
  "devtools-mcp-config": {
    id: "devtools-mcp-config",
    label: "Config",
    component: DevToolsMcpConfigSlide,
  },
  "demo-form": { id: "demo-form", label: "Demo Form", component: DemoFormSlide },
  "demo-video": { id: "demo-video", label: "Demo Video", component: DemoVideoSlide },
  "emulate-capabilities": {
    id: "emulate-capabilities",
    label: "Location",
    component: EmulateCapabilitiesSlide,
  },
  "emulate-video": {
    id: "emulate-video",
    label: "Location Demo",
    component: EmulateVideoSlide,
  },
  "emulate-devices": {
    id: "emulate-devices",
    label: "Emulate",
    component: EmulateDevicesSlide,
  },
  "emulate-devices-video": {
    id: "emulate-devices-video",
    label: "Emulate Demo",
    component: EmulateDevicesVideoSlide,
  },
  "performance-capabilities": {
    id: "performance-capabilities",
    label: "Performance",
    component: PerformanceCapabilitiesSlide,
  },
  "performance-video": {
    id: "performance-video",
    label: "Performance Demo",
    component: PerformanceVideoSlide,
  },
  "debugging-capabilities": {
    id: "debugging-capabilities",
    label: "Debugging",
    component: DebuggingCapabilitiesSlide,
  },
  "debugging-video": {
    id: "debugging-video",
    label: "Debugging Demo",
    component: DebuggingVideoSlide,
  },
  webmcp: { id: "webmcp", label: "WebMCP", component: WebMcpSlide },
  "webmcp-flags": {
    id: "webmcp-flags",
    label: "WebMCP Flags",
    component: WebMcpFlagsSlide,
  },
  "thank-you": { id: "thank-you", label: "Thank you", component: ThankYouSlide },
}

export function buildSlidesFromIds(slideIds: readonly string[]): SlideDefinition[] {
  const slides: SlideDefinition[] = []

  for (const id of slideIds) {
    const entry = slideCatalog[id]
    if (!entry) {
      console.warn(`[talk] Unknown slide id: ${id}`)
      continue
    }
    if (Array.isArray(entry)) {
      slides.push(...entry)
    } else {
      slides.push(entry)
    }
  }

  return slides
}
