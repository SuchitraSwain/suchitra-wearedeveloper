import { devToolsMcpConfigOptions } from "@/data/presentation"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

export function DevToolsMcpConfigSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div>
        <div className="mb-[clamp(0.75rem,1.8cqw,1.25rem)] shrink-0">
          <SlideLabel>Reference</SlideLabel>
          <h1 className="slide-heading mt-2 font-bold text-white">Configuration options</h1>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(1rem,2.5cqw,2rem)] sm:grid-cols-2">
          {[devToolsMcpConfigOptions.left, devToolsMcpConfigOptions.right].map(
            (column, index) => (
              <ul
                key={index}
                className="flex min-h-0 flex-col justify-center gap-[clamp(0.35rem,0.9cqw,0.6rem)] rounded-xl border border-white/8 bg-white/[0.03] p-[clamp(0.85rem,2cqw,1.5rem)]"
              >
                {column.map((flag) => (
                  <li
                    key={flag}
                    className="font-mono text-[clamp(0.75rem,1.5cqw,1rem)] leading-snug text-white/85"
                  >
                    {flag}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
