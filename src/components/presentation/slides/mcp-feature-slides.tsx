import type { ComponentType } from "react"

import {
  debuggingCapabilitiesSlide,
  debuggingVideoSlide,
  networkCapabilitiesSlide,
  networkVideoSlide,
  performanceCapabilitiesSlide,
  performanceVideoSlide,
} from "@/data/presentation"

import { BulletList } from "../bullet-list"
import {
  DevToolsDebuggingMock,
  DevToolsNetworkMock,
  DevToolsPerformanceMock,
} from "../devtools-feature-mocks"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideVideo } from "../slide-video"

type CapabilitiesData = {
  label: string
  title: string
  subtitle: string
  explain: readonly string[]
  footnote?: string
  demoPrompt?: string
}

type VideoData = {
  label: string
  title: string
  subtitle: string
  steps: readonly string[]
  video: { src: string; poster: string; caption: string }
}

function FeatureCapabilitiesSlide({
  data,
  Mock,
}: {
  data: CapabilitiesData
  Mock: ComponentType<{ className?: string }>
}) {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 grid-cols-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
          <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
            <SlideLabel>{data.label}</SlideLabel>
            <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
              {data.title}
            </h1>
            <p className="slide-body text-white/50">{data.subtitle}</p>
            <BulletList items={data.explain} />
            {data.demoPrompt ? (
              <div className="rounded-xl border border-wad-purple/25 bg-wad-purple/10 p-[clamp(0.75rem,1.8cqw,1.25rem)]">
                <p className="mb-2 text-[clamp(0.55rem,1cqw,0.7rem)] font-semibold tracking-[0.18em] text-wad-purple uppercase">
                  Try in Cursor
                </p>
                <p className="font-mono text-[clamp(0.68rem,1.15cqw,0.82rem)] leading-relaxed text-white/70">
                  {data.demoPrompt}
                </p>
              </div>
            ) : null}
            {data.footnote ? (
              <p className="slide-body-sm border-t border-white/10 pt-4 text-white/40">
                {data.footnote}
              </p>
            ) : null}
          </div>
          <div className="flex min-h-0 min-w-0 items-center justify-center lg:h-full">
            <Mock className="w-full max-w-full" />
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}

function FeatureVideoSlide({ data }: { data: VideoData }) {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>{data.label}</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {data.title}
          </h1>
          <p className="slide-body text-white/50">{data.subtitle}</p>
          <BulletList items={data.steps} />
        </div>
        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={data.video.src}
            poster={data.video.poster}
            caption={data.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}

export function PerformanceCapabilitiesSlide() {
  return (
    <FeatureCapabilitiesSlide data={performanceCapabilitiesSlide} Mock={DevToolsPerformanceMock} />
  )
}

export function PerformanceVideoSlide() {
  return <FeatureVideoSlide data={performanceVideoSlide} />
}

export function NetworkCapabilitiesSlide() {
  return <FeatureCapabilitiesSlide data={networkCapabilitiesSlide} Mock={DevToolsNetworkMock} />
}

export function NetworkVideoSlide() {
  return <FeatureVideoSlide data={networkVideoSlide} />
}

export function DebuggingCapabilitiesSlide() {
  return (
    <FeatureCapabilitiesSlide data={debuggingCapabilitiesSlide} Mock={DevToolsDebuggingMock} />
  )
}

export function DebuggingVideoSlide() {
  return <FeatureVideoSlide data={debuggingVideoSlide} />
}
