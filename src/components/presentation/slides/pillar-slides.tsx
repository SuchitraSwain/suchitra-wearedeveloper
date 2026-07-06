import { talkPillars } from "@/data/presentation"

import { PillarSlide } from "./pillar-slide"

export function PromptSlide() {
  return <PillarSlide pillar={talkPillars[0]} />
}

export function RenderSlide() {
  return <PillarSlide pillar={talkPillars[1]} />
}

export function DebugSlide() {
  return <PillarSlide pillar={talkPillars[2]} />
}
