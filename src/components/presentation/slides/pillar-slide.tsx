import type { LucideIcon } from "lucide-react"
import { Bug, Layers, MessageSquare } from "lucide-react"

import type { talkPillars } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

const pillarIcons: Record<(typeof talkPillars)[number]["title"], LucideIcon> = {
  Prompt: MessageSquare,
  Render: Layers,
  Debug: Bug,
}

type PillarSlideProps = {
  pillar: (typeof talkPillars)[number]
}

export function PillarSlide({ pillar }: PillarSlideProps) {
  const Icon = pillarIcons[pillar.title]

  return (
    <PresentationSlide>
      <div className="flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <div className="grid min-h-0 flex-1 items-center gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-[clamp(0.85rem,1.8cqw,1.25rem)]">
            <SlideLabel>Phase {pillar.step}</SlideLabel>

            <div className="flex items-center gap-[clamp(0.75rem,1.5cqw,1rem)]">
              <div className="flex size-[clamp(3rem,6.5cqw,4rem)] items-center justify-center rounded-2xl border border-white/10 bg-wad-purple/10">
                <Icon className="size-[clamp(1.25rem,2.8cqw,1.75rem)] text-wad-purple" />
              </div>
              <div>
                <h1 className="slide-title font-bold text-white">{pillar.title}</h1>
                <p className="slide-subheading mt-1 font-medium text-wad-pink">
                  {pillar.summary}
                </p>
              </div>
            </div>

            <p className="slide-body max-w-lg text-white/50">{pillar.description}</p>

            <div className="slide-body-sm inline-flex rounded-full border border-wad-pink/30 bg-wad-pink/10 px-4 py-2 font-medium text-wad-pink">
              {pillar.demoNote}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-[clamp(1rem,2.2cqw,1.75rem)]">
            <SlideLabel className="mb-4 text-wad-pink">In this phase</SlideLabel>
            <BulletList items={pillar.bullets} />
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
