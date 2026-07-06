import { emulateVideoSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideTalkTrack } from "../slide-talk-track"
import { SlideVideo } from "../slide-video"

export function EmulateVideoSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>Location demo</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {emulateVideoSlide.title}
          </h1>
          <p className="slide-body text-white/50">{emulateVideoSlide.subtitle}</p>
          <BulletList items={emulateVideoSlide.steps} />
          <SlideTalkTrack lines={emulateVideoSlide.talkTrack} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={emulateVideoSlide.video.src}
            poster={emulateVideoSlide.video.poster}
            caption={emulateVideoSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
