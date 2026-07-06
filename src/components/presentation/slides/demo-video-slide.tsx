import { demoVideoSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideVideo } from "../slide-video"

export function DemoVideoSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>Demo replay</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {demoVideoSlide.title}
          </h1>
          <p className="slide-body text-white/50">{demoVideoSlide.subtitle}</p>
          <BulletList items={demoVideoSlide.steps} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={demoVideoSlide.video.src}
            poster={demoVideoSlide.video.poster}
            caption={demoVideoSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
