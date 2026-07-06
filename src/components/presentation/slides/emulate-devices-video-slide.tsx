import { emulateDevicesVideoSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideTalkTrack } from "../slide-talk-track"
import { SlideVideo } from "../slide-video"

export function EmulateDevicesVideoSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <SlideLabel>Responsive demo</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {emulateDevicesVideoSlide.title}
          </h1>
          <p className="slide-body text-white/50">{emulateDevicesVideoSlide.subtitle}</p>
          <BulletList items={emulateDevicesVideoSlide.steps} />
          <SlideTalkTrack lines={emulateDevicesVideoSlide.talkTrack} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={emulateDevicesVideoSlide.video.src}
            poster={emulateDevicesVideoSlide.video.poster}
            caption={emulateDevicesVideoSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}
