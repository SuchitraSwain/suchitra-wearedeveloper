import { devToolsMcpIntro, devToolsMcpIntroSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"
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

          <div className="rounded-xl border border-wad-pink/25 bg-wad-pink/10 p-[clamp(0.65rem,1.5cqw,1rem)]">
            <ul className="space-y-[clamp(0.45rem,1cqw,0.65rem)]">
              {devToolsMcpIntroSlide.talkTrack.map((line) => (
                <li
                  key={line}
                  className="slide-body-sm leading-snug text-white/75 before:mr-2 before:text-wad-pink before:content-['→']"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
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
