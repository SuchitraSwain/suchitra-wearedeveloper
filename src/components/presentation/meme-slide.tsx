import type { openerMemes } from "@/data/presentation"

import { PresentationSlide } from "./presentation-slide"

type MemeSlideProps = {
  meme: (typeof openerMemes)[number]
}

export function MemeSlide({ meme }: MemeSlideProps) {
  return (
    <PresentationSlide className="items-center justify-center">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(0.75rem,2cqw,1.25rem)] px-2">
        <figure className="flex max-h-[min(72vh,720px)] w-full max-w-4xl flex-col items-center gap-4">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <img
              src={meme.src}
              alt={meme.alt}
              width={720}
              height={720}
              fetchPriority="high"
              decoding="async"
              className="mx-auto max-h-[min(68vh,680px)] w-full object-contain"
            />
          </div>
          {meme.caption ? (
            <figcaption className="slide-subheading text-center font-semibold tracking-tight text-white/90">
              {meme.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </PresentationSlide>
  )
}
