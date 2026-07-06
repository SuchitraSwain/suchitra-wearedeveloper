import { cn } from "@/lib/utils"

function DevToolsShell({
  className,
  activeTab,
  tabs,
  children,
}: {
  className?: string
  activeTab: string
  tabs: string[]
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[#3c4043] bg-[#202124] text-[#e8eaed] shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div className="flex items-end gap-4 overflow-x-auto border-b border-[#3c4043] bg-[#202124] px-3 pt-2">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={cn(
              "shrink-0 border-b-2 pb-2 text-[11px]",
              tab === activeTab
                ? "border-[#8ab4f8] text-[#e8eaed]"
                : "border-transparent text-[#9aa0a6]"
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

export function DevToolsPerformanceMock({ className }: { className?: string }) {
  return (
    <DevToolsShell
      className={className}
      activeTab="Performance"
      tabs={["Elements", "Console", "Sources", "Network", "Performance"]}
    >
      <div className="mb-2 flex items-center gap-2 text-[10px] text-[#9aa0a6]">
        <span className="rounded border border-[#5f6368] px-2 py-0.5">⏺ Record</span>
        <span className="rounded border border-[#5f6368] px-2 py-0.5">↻ Reload</span>
        <span className="ml-auto text-[#8ab4f8]">Main — 1.2 s</span>
      </div>
      <div className="mb-3 h-16 rounded border border-[#3c4043] bg-[#131314]">
        <div className="flex h-full items-end gap-px px-1 pb-1">
          {[28, 42, 35, 58, 44, 72, 38, 52, 46, 64, 40, 55].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-[#34a853]/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-1.5 font-mono text-[10px]">
        <div className="flex justify-between rounded bg-[#292a2d] px-2 py-1">
          <span className="text-[#e8eaed]">performance_trace()</span>
          <span className="text-[#9aa0a6]">CPU · 847 ms</span>
        </div>
        <div className="flex justify-between rounded bg-[#292a2d] px-2 py-1">
          <span className="text-[#e8eaed]">take_memory_snapshot()</span>
          <span className="text-[#9aa0a6]">Heap · 24.3 MB</span>
        </div>
      </div>
    </DevToolsShell>
  )
}

export function DevToolsNetworkMock({ className }: { className?: string }) {
  const rows = [
    { name: "demo-form", type: "document", size: "12.4 kB", time: "142 ms" },
    { name: "index.css", type: "stylesheet", size: "8.1 kB", time: "38 ms" },
    { name: "register", type: "fetch", size: "1.2 kB", time: "89 ms", highlight: true },
  ]

  return (
    <DevToolsShell
      className={className}
      activeTab="Network"
      tabs={["Elements", "Console", "Sources", "Network"]}
    >
      <div className="mb-2 grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-[#3c4043] pb-1 text-[9px] font-medium tracking-wide text-[#9aa0a6] uppercase">
        <span>Name</span>
        <span>Type</span>
        <span>Size</span>
        <span>Time</span>
      </div>
      <div className="space-y-1 font-mono text-[10px]">
        {rows.map((row) => (
          <div
            key={row.name}
            className={cn(
              "grid grid-cols-[1fr_auto_auto_auto] gap-2 rounded px-1 py-1",
              row.highlight && "bg-[#8ab4f8]/10"
            )}
          >
            <span className="truncate text-[#e8eaed]">{row.name}</span>
            <span className="text-[#9aa0a6]">{row.type}</span>
            <span className="text-[#9aa0a6]">{row.size}</span>
            <span className={row.highlight ? "text-[#fdd663]" : "text-[#9aa0a6]"}>
              {row.time}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#8ab4f8]">get_network_requests() · 3 captured</p>
    </DevToolsShell>
  )
}

export function DevToolsDebuggingMock({ className }: { className?: string }) {
  const scores = [
    { label: "Performance", value: 92, color: "#34a853" },
    { label: "Accessibility", value: 96, color: "#34a853" },
    { label: "Best Practices", value: 88, color: "#fdd663" },
    { label: "SEO", value: 91, color: "#34a853" },
  ]

  return (
    <DevToolsShell
      className={className}
      activeTab="Lighthouse"
      tabs={["Elements", "Console", "Lighthouse"]}
    >
      <div className="mb-3 grid grid-cols-4 gap-2">
        {scores.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="mx-auto mb-1 flex size-10 items-center justify-center rounded-full border-2 text-[11px] font-bold"
              style={{ borderColor: s.color, color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-[9px] text-[#9aa0a6]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-1.5 font-mono text-[10px]">
        <div className="rounded bg-[#292a2d] px-2 py-1 text-[#e8eaed]">lighthouse_audit()</div>
        <div className="rounded bg-[#292a2d] px-2 py-1 text-[#e8eaed]">take_screenshot()</div>
      </div>
    </DevToolsShell>
  )
}
