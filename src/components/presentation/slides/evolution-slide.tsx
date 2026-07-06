import { evolutionSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideVideo } from "../slide-video"

export function EvolutionSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>Then → Now</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {evolutionSlide.title}
          </h1>
          <p className="slide-body text-white/50">{evolutionSlide.subtitle}</p>
          <BulletList items={evolutionSlide.points} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={evolutionSlide.video.src}
            poster={evolutionSlide.video.poster}
            caption={evolutionSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
