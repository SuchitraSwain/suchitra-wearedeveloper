import { debugEvolutionSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideVideo } from "../slide-video"

export function DebugEvolutionSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>Debug · Then → Now</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {debugEvolutionSlide.title}
          </h1>
          <p className="slide-body text-white/50">{debugEvolutionSlide.subtitle}</p>
          <BulletList items={debugEvolutionSlide.points} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={debugEvolutionSlide.video.src}
            poster={debugEvolutionSlide.video.poster}
            caption={debugEvolutionSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
