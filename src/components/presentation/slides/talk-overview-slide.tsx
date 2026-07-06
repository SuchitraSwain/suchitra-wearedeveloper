import { ArrowRight, Bug, Layers, MessageSquare } from "lucide-react"

import { speaker, talkPillars } from "@/data/presentation"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

const pillarIcons = {
  Prompt: MessageSquare,
  Render: Layers,
  Debug: Bug,
} as const

export function TalkOverviewSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-[clamp(1rem,2.2cqw,1.75rem)] py-1">
          <div className="shrink-0 space-y-[clamp(0.5rem,1.2cqw,0.85rem)] text-center">
            <SlideLabel>What you&apos;ll see</SlideLabel>
            <h1 className="slide-heading text-balance font-bold text-white">
              {speaker.topic}
            </h1>
            <p className="slide-body mx-auto max-w-3xl text-white/50">
              {speaker.tagline}
            </p>
          </div>

          <div className="grid gap-[clamp(0.5rem,1.2cqw,0.85rem)] lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {talkPillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.title]

              return (
                <div key={pillar.title} className="contents">
                  <div className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-[clamp(0.85rem,1.8cqw,1.25rem)]">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="slide-label-text font-semibold text-wad-pink uppercase">
                        {pillar.step}
                      </span>
                      <div className="flex size-[clamp(2rem,4.5cqw,2.5rem)] items-center justify-center rounded-xl border border-white/10 bg-wad-purple/10">
                        <Icon className="size-[clamp(0.9rem,1.8cqw,1.1rem)] text-wad-purple" />
                      </div>
                    </div>

                    <h2 className="slide-heading font-bold text-white">{pillar.title}</h2>
                    <p className="slide-subheading mt-1.5 font-medium text-wad-pink">
                      {pillar.summary}
                    </p>
                    <p className="slide-body-sm mt-3 text-white/45">{pillar.description}</p>
                  </div>

                  {index < talkPillars.length - 1 && (
                    <div className="hidden items-center justify-center lg:flex">
                      <ArrowRight className="size-[clamp(0.9rem,1.8cqw,1.1rem)] text-white/25" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="slide-body-sm flex shrink-0 flex-wrap items-center justify-center gap-3 text-white/40">
            {talkPillars.map((pillar, index) => (
              <div key={pillar.title} className="flex items-center gap-3">
                <span className="font-medium text-white/70">{pillar.title}</span>
                {index < talkPillars.length - 1 && (
                  <ArrowRight className="size-[clamp(0.75rem,1.5cqw,0.9rem)] text-wad-pink/70" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
