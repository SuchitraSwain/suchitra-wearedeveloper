import { devToolsMcpIntro, devToolsMcpIntroSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
import { SlideTalkTrack } from "../slide-talk-track"
import { SlideVideo } from "../slide-video"
import { DevToolsMcpFeaturesSlide } from "./devtools-mcp-features-slide"

export function DevToolsMcpIntroSlide() {
  return (
    <PresentationSlide>
      <div className="slide-split-video">
        <div className="slide-split-video-copy">
          <h1 className="slide-heading leading-tight font-bold tracking-tight text-white">
            <span className="text-white">DevTools </span>
            <span className="text-[#4285f4]">MCP</span>
          </h1>
          <BulletList items={devToolsMcpIntro} />
          <SlideTalkTrack lines={devToolsMcpIntroSlide.talkTrack} />
        </div>

        <div className="slide-split-video-panel">
          <SlideVideo
            layout="split"
            src={devToolsMcpIntroSlide.video.src}
            poster={devToolsMcpIntroSlide.video.poster}
            caption={devToolsMcpIntroSlide.video.caption}
          />
        </div>
      </div>
    </PresentationSlide>
  )
}

export function DevToolsMcpCapabilitiesSlide() {
  return <DevToolsMcpFeaturesSlide />
}
