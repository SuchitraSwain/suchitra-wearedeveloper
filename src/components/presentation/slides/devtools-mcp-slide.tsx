import { BulletList } from "../bullet-list"
import { PresentationSlide } from "../presentation-slide"

type DevToolsMcpSlideProps = {
  bullets: readonly string[]
}

export function DevToolsMcpSlide({ bullets }: DevToolsMcpSlideProps) {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div>
        <h1 className="slide-title mb-[clamp(1rem,2.2cqw,1.75rem)] font-bold">
          <span className="text-white">DevTools </span>
          <span className="text-[#4285f4]">MCP</span>
        </h1>

        <BulletList items={bullets} />
        </div>
      </div>
    </PresentationSlide>
  )
}
