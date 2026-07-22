import { Bug, Layers, MessageSquare, Mic2 } from "lucide-react"

import { presentationMeta, speaker, talkPillars } from "@/data/presentation"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SpeakerPortrait } from "../speaker-portrait"

const pillarIcons = {
  Prompt: MessageSquare,
  Render: Layers,
  Debug: Bug,
} as const

export function AboutMeSlide() {
  return (
    <PresentationSlide>
      {presentationMeta.banner ? (
        <div className="mb-[clamp(0.75rem,1.5cqw,1.25rem)] flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2">
          {presentationMeta.banner.logo ? (
            <>
              <img
                src={presentationMeta.banner.logo}
                alt={presentationMeta.banner.logoAlt ?? presentationMeta.event}
                className="h-[clamp(1.25rem,2.5cqw,1.75rem)] w-auto"
              />
              <div className="hidden h-4 w-px bg-white/15 sm:block" />
            </>
          ) : null}
          {presentationMeta.banner.label ? (
            <span className="slide-label-text font-medium text-white/45 sm:tracking-[0.2em]">
              {presentationMeta.banner.label}
            </span>
          ) : null}
          {presentationMeta.banner.location ? (
            <span className="slide-body-sm rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-white/55 sm:px-3 sm:py-1 md:inline">
              {presentationMeta.banner.location}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="grid min-h-0 flex-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex min-h-0 flex-col justify-center gap-[clamp(0.85rem,1.8cqw,1.35rem)]">
          <div className="space-y-[clamp(0.5rem,1.2cqw,0.85rem)]">
            <SlideLabel className="inline-flex items-center gap-2">
              <Mic2 className="size-[clamp(0.85rem,1.5cqw,1.1rem)]" />
              Speaker Introduction
            </SlideLabel>

            <h1 className="slide-title max-w-3xl font-bold text-white">
              {speaker.name}
            </h1>

            <p className="slide-subheading max-w-2xl text-white/60">
              {speaker.title}
              <span className="text-white/30"> · </span>
              {speaker.location}
            </p>
          </div>

          <div className="max-w-2xl border-l-2 border-wad-pink pl-[clamp(0.85rem,1.8cqw,1.25rem)]">
            <SlideLabel className="mb-2 text-wad-pink">Talk</SlideLabel>
            <p className="slide-heading text-balance font-semibold text-white">
              {speaker.topic}
            </p>
            <p className="slide-body-sm mt-2 text-white/50">{speaker.tagline}</p>
          </div>

          <div className="grid gap-[clamp(0.5rem,1cqw,0.75rem)] sm:grid-cols-3">
            {talkPillars.map((pillar) => {
              const Icon = pillarIcons[pillar.title]
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-white/10 bg-white/3 p-[clamp(0.65rem,1.2cqw,0.9rem)]"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Icon className="size-[clamp(0.85rem,1.4cqw,1.05rem)] text-wad-pink" />
                    <span className="slide-chip font-semibold text-white">
                      {pillar.title}
                    </span>
                  </div>
                  <p className="slide-body-sm text-white/50">{pillar.summary}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <SpeakerPortrait
            name={speaker.name}
            image={speaker.image || undefined}
            className="aspect-[4/5] w-full max-w-[min(100%,14rem)] max-h-[36vh] sm:max-w-[min(100%,18rem)] sm:max-h-[42vh] lg:max-h-[72cqh] lg:max-w-[34cqw]"
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
