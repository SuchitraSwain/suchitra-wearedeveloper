import type { openerMemes } from "@/data/presentation"

import { PresentationSlide } from "./presentation-slide"

type MemeSlideProps = {
  meme: (typeof openerMemes)[number]
}

export function MemeSlide({ meme }: MemeSlideProps) {
  return (
    <PresentationSlide className="items-center justify-center">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(0.75rem,2cqw,1.25rem)] px-2">
        <figure className="flex w-full max-w-[min(100%,28rem)] flex-col items-center gap-4">
          <img
            src={meme.src}
            alt={meme.alt}
            width={1491}
            height={1485}
            fetchPriority="high"
            decoding="async"
            className="mx-auto max-h-[min(75vh,820px)] w-auto rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          />
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
