import { devToolsMcpSetup } from "@/data/presentation"

import { CodeBlock } from "../code-block"
import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

export function DevToolsMcpSetupSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div>
        <div className="mb-[clamp(0.5rem,1.2cqw,0.85rem)] shrink-0 space-y-2">
          <SlideLabel>Setup</SlideLabel>
          <h1 className="slide-heading font-bold tracking-tight text-white">
            <span className="text-white">DevTools </span>
            <span className="text-[#4285f4]">MCP</span>
            <span className="text-white/70"> — connect to Chrome</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            {devToolsMcpSetup.requirements.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[clamp(0.6rem,1.1cqw,0.75rem)] text-white/40">
            {devToolsMcpSetup.configPaths.map(({ tool, path }) => (
              <span key={tool}>
                <span className="text-white/55">{tool}:</span>{" "}
                <code className="text-white/70">{path}</code>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-[clamp(0.5rem,1.2cqw,0.85rem)] md:grid-cols-2 lg:grid-cols-3">
          {devToolsMcpSetup.steps.map((step) => (
            <div
              key={step.step}
              className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="border-b border-white/8 px-[clamp(0.65rem,1.4cqw,1rem)] py-[clamp(0.55rem,1.2cqw,0.75rem)]">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-wad-pink uppercase">
                  Step {step.step}
                </p>
                <h2 className="mt-1 text-[clamp(0.85rem,1.6cqw,1.05rem)] font-semibold text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-[clamp(0.65rem,1.2cqw,0.8rem)] leading-relaxed text-white/45">
                  {step.description}
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-[clamp(0.55rem,1.2cqw,0.75rem)]">
                {"image" in step && step.image ? (
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] object-contain"
                  />
                ) : null}
                {"code" in step && step.code ? (
                  <CodeBlock
                    code={step.code}
                    className={"image" in step && step.image ? "mt-2" : undefined}
                  />
                ) : null}
                <p className="mt-2 text-[clamp(0.6rem,1.05cqw,0.7rem)] leading-relaxed text-white/40">
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
