import { webMcpFlagsSlide, webMcpSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideTalkTrack } from "../slide-talk-track"

export function WebMcpSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 grid-cols-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
            <SlideLabel>What's new · DevTools</SlideLabel>
            <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
              {webMcpSlide.title}
            </h1>
            <p className="slide-body text-white/50">{webMcpSlide.subtitle}</p>
            <BulletList items={webMcpSlide.explain} />
            <SlideTalkTrack lines={webMcpSlide.talkTrack} />
          </div>

          <div className="flex min-h-0 min-w-0 items-center justify-center lg:h-full">
            <img
              src={webMcpSlide.image.src}
              alt={webMcpSlide.image.alt}
              className="w-full max-w-2xl rounded-lg border border-white/10 bg-white object-contain shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}

export function WebMcpFlagsSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 grid-cols-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
            <SlideLabel>WebMCP setup</SlideLabel>
            <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
              {webMcpFlagsSlide.title}
            </h1>
            <p className="slide-body text-white/50">{webMcpFlagsSlide.subtitle}</p>
            <BulletList items={webMcpFlagsSlide.explain} />
            <SlideTalkTrack lines={webMcpFlagsSlide.talkTrack} />
          </div>

          <div className="flex min-h-0 min-w-0 items-center justify-center lg:h-full">
            <img
              src={webMcpFlagsSlide.image.src}
              alt={webMcpFlagsSlide.image.alt}
              className="w-full max-w-md rounded-lg border border-white/10 bg-[#1e1e1e] object-contain shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
