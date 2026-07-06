import { cn } from "@/lib/utils"

type DevToolsDeviceToolbarMockProps = {
  className?: string
  device?: "mobile" | "tablet" | "desktop"
}

const devices = {
  mobile: { label: "iPhone 14 Pro", size: "390 × 844", zoom: "100%" },
  tablet: { label: "iPad Air", size: "820 × 1180", zoom: "100%" },
  desktop: { label: "Responsive", size: "1280 × 800", zoom: "100%" },
} as const

export function DevToolsDeviceToolbarMock({
  className,
  device = "mobile",
}: DevToolsDeviceToolbarMockProps) {
  const data = devices[device]

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[#3c4043] bg-[#202124] text-[#e8eaed] shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
        className
      )}
      aria-label="Chrome DevTools device toolbar"
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-[#3c4043] bg-[#292a2d] px-3 py-2">
        <span className="inline-flex items-center gap-2 rounded border border-[#5f6368] bg-[#202124] px-2.5 py-1 text-[11px]">
          <span className="text-[#8ab4f8]">▣</span>
          {data.label}
        </span>
        <span className="rounded border border-[#5f6368] bg-[#202124] px-2.5 py-1 font-mono text-[11px] text-[#9aa0a6]">
          {data.size}
        </span>
        <span className="rounded border border-[#5f6368] bg-[#202124] px-2.5 py-1 text-[11px] text-[#9aa0a6]">
          {data.zoom}
        </span>
        <span className="ml-auto text-[10px] text-[#9aa0a6]">Device emulation active</span>
      </div>
      <div className="grid grid-cols-3 gap-px bg-[#3c4043]">
        {(["mobile", "tablet", "desktop"] as const).map((key) => (
          <div
            key={key}
            className={cn(
              "bg-[#202124] px-3 py-2.5 text-center text-[11px] capitalize",
              key === device ? "text-[#8ab4f8] font-medium" : "text-[#9aa0a6]"
            )}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="px-3 py-2.5 text-[11px] leading-relaxed text-[#9aa0a6]">
        emulate() sets viewport, user agent, and touch — same as toggling device mode in DevTools.
      </div>
    </div>
  )
}
