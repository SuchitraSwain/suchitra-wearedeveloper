import { emulateDevicesSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { DevToolsDeviceToolbarMock } from "../devtools-device-toolbar-mock"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"
import { SlideTalkTrack } from "../slide-talk-track"

export function EmulateDevicesSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 grid-cols-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
          <SlideLabel>Emulate</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {emulateDevicesSlide.title}
          </h1>
          <p className="slide-body text-white/50">{emulateDevicesSlide.subtitle}</p>
          <BulletList items={emulateDevicesSlide.explain} />
          <SlideTalkTrack lines={emulateDevicesSlide.talkTrack} />

          <div className="space-y-3 border-t border-white/10 pt-4">
            {emulateDevicesSlide.prompts.map((prompt) => (
              <div
                key={prompt.label}
                className="rounded-xl border border-white/10 bg-white/3 p-[clamp(0.65rem,1.4cqw,0.9rem)]"
              >
                <p className="mb-1.5 text-[clamp(0.55rem,1cqw,0.7rem)] font-semibold tracking-[0.14em] text-wad-purple uppercase">
                  {prompt.label}
                </p>
                <p className="font-mono text-[clamp(0.68rem,1.15cqw,0.82rem)] leading-relaxed text-white/65">
                  {prompt.text}
                </p>
              </div>
            ))}
            <p className="slide-body-sm text-white/40">
              Live site:{" "}
              <a
                href={emulateDevicesSlide.siteUrl}
                className="text-wad-purple underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {emulateDevicesSlide.siteUrl}
              </a>
            </p>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 items-center justify-center lg:h-full">
          <DevToolsDeviceToolbarMock device="mobile" className="w-full max-w-full" />
        </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
