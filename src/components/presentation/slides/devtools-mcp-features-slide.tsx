import { devToolsMcpFeatures } from "@/data/presentation"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

export function DevToolsMcpFeaturesSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div>
        <div className="mb-[clamp(0.75rem,1.8cqw,1.25rem)] shrink-0">
          <SlideLabel>MCP Tools</SlideLabel>
          <h1 className="slide-title mt-2 font-bold">
            <span className="text-white">DevTools </span>
            <span className="text-[#4285f4]">MCP</span>
            <span className="text-white/70"> features</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(0.5rem,1.2cqw,0.85rem)] sm:grid-cols-2 lg:grid-cols-3">
          {devToolsMcpFeatures.map((group) => (
            <div
              key={group.title}
              className="flex min-h-0 flex-col rounded-xl border border-white/8 bg-white/[0.03] p-[clamp(0.65rem,1.4cqw,1rem)]"
            >
              <h2 className="mb-[clamp(0.35rem,0.8cqw,0.55rem)] text-[clamp(0.75rem,1.5cqw,0.95rem)] font-semibold text-[#4285f4]">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-[clamp(0.15rem,0.4cqw,0.3rem)]">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="font-mono text-[clamp(0.65rem,1.25cqw,0.85rem)] leading-snug text-white/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
