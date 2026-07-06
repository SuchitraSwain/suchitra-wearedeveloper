import { emulateCapabilitiesSlide } from "@/data/presentation"

import { BulletList } from "../bullet-list"
import { DevToolsSensorsMock } from "../devtools-sensors-mock"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

export function EmulateCapabilitiesSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 grid-cols-1 items-start gap-[clamp(1rem,2.5cqw,2rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
          <SlideLabel>Device location</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {emulateCapabilitiesSlide.title}
          </h1>
          <p className="slide-body text-white/50">{emulateCapabilitiesSlide.subtitle}</p>
          <BulletList items={emulateCapabilitiesSlide.explain} />

          <p className="slide-body-sm border-t border-white/10 pt-4 text-white/40">
            {emulateCapabilitiesSlide.sensorsNote}
          </p>
        </div>

        <div className="flex min-h-0 min-w-0 items-center justify-center lg:h-full">
          <DevToolsSensorsMock preset="explain" className="w-full max-w-full" />
        </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
