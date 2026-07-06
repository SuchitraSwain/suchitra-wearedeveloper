import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type DevToolsSensorsMockProps = {
  className?: string
  preset?: "explain" | "demo"
}

const presets = {
  explain: {
    locationOverride: "No override",
    latitude: "0",
    longitude: "0",
    timezone: "",
    locale: "",
    accuracy: "150",
    fieldsDisabled: true,
  },
  demo: {
    locationOverride: "Paris, France",
    latitude: "48.857",
    longitude: "2.352",
    timezone: "Europe/Paris",
    locale: "fr-FR",
    accuracy: "150",
    fieldsDisabled: false,
  },
} as const

function DevToolsSelect({
  value,
  disabled,
  className,
}: {
  value: string
  disabled?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[7.5rem] items-center justify-between gap-2 rounded border border-[#5f6368] bg-[#292a2d] px-2 py-1 text-[11px] text-[#e8eaed]",
        disabled && "opacity-55",
        className
      )}
    >
      <span className="truncate">{value}</span>
      <ChevronDown className="size-3 shrink-0 text-[#9aa0a6]" aria-hidden="true" />
    </span>
  )
}

function DevToolsInput({
  label,
  value,
  disabled,
}: {
  label: string
  value: string
  disabled?: boolean
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[11px] text-[#9aa0a6]">{label}</span>
      <span
        className={cn(
          "block min-h-[1.65rem] rounded border border-[#5f6368] bg-[#1e1e1e] px-2 py-1 text-[11px] text-[#e8eaed]",
          disabled && "text-[#9aa0a6]"
        )}
      >
        {value || "\u00A0"}
      </span>
    </label>
  )
}

function DevToolsButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded border border-[#8ab4f8] px-2.5 py-1 text-[11px] text-[#8ab4f8]">
      {children}
    </span>
  )
}

function DevToolsSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-[minmax(5.5rem,22%)_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-[#3c4043] py-3 last:border-b-0",
        className
      )}
    >
      <h3 className="pt-0.5 text-[12px] font-normal text-[#e8eaed]">{title}</h3>
      <div className="min-w-0 space-y-2">{children}</div>
    </section>
  )
}

function DevToolsSubsection({
  description,
  children,
}: {
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      {description ? (
        <p className="text-[11px] leading-snug text-[#9aa0a6]">{description}</p>
      ) : null}
      {children}
    </div>
  )
}

export function DevToolsSensorsMock({
  className,
  preset = "explain",
}: DevToolsSensorsMockProps) {
  const data = presets[preset]

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[#3c4043] bg-[#202124] text-[#e8eaed] shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
        className
      )}
      aria-label="Chrome DevTools Sensors panel"
    >
      <div className="flex items-end gap-4 overflow-x-auto border-b border-[#3c4043] bg-[#202124] px-3 pt-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {["Console", "AI assistance", "What's new"].map((tab) => (
          <span
            key={tab}
            className="shrink-0 border-b-2 border-transparent pb-2 text-[11px] text-[#9aa0a6]"
          >
            {tab}
          </span>
        ))}
        <span className="flex shrink-0 items-center gap-1 border-b-2 border-[#8ab4f8] pb-2 text-[11px] text-[#e8eaed]">
          Sensors
          <span className="text-[10px] text-[#9aa0a6]" aria-hidden="true">
            ×
          </span>
        </span>
      </div>

      <div className="max-h-[min(52vh,28rem)] overflow-y-auto px-3 pb-3 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <DevToolsSection title="Location">
          <div className="flex flex-wrap items-center gap-2">
            <DevToolsSelect value={data.locationOverride} />
            <DevToolsButton>Manage</DevToolsButton>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <DevToolsInput
              label="Latitude"
              value={data.latitude}
              disabled={data.fieldsDisabled}
            />
            <DevToolsInput
              label="Longitude"
              value={data.longitude}
              disabled={data.fieldsDisabled}
            />
            <DevToolsInput
              label="Timezone ID"
              value={data.timezone}
              disabled={data.fieldsDisabled}
            />
            <DevToolsInput label="Locale" value={data.locale} disabled={data.fieldsDisabled} />
            <DevToolsInput
              label="Accuracy"
              value={data.accuracy}
              disabled={data.fieldsDisabled}
            />
          </div>
        </DevToolsSection>

        <DevToolsSection title="Orientation">
          <DevToolsSelect value="Off" disabled />
          <div className="flex flex-wrap items-end gap-3">
            <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
              <DevToolsInput label="α (alpha)" value="0" disabled />
              <DevToolsInput label="β (beta)" value="0" disabled />
              <DevToolsInput label="γ (gamma)" value="0" disabled />
            </div>
            <div
              aria-hidden="true"
              className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-sm bg-[#131314]"
            >
              <div className="relative h-10 w-5 rotate-[-28deg] rounded-[3px] border border-[#5f6368] bg-[linear-gradient(145deg,#6b6b6b_0%,#4a4a4a_45%,#3a3a3a_100%)] shadow-[2px_3px_6px_rgba(0,0,0,0.5)]">
                <div className="absolute top-1 right-0.5 size-1 rounded-full bg-[#2d2d2d]" />
              </div>
            </div>
          </div>
          <div>
            <DevToolsButton>Reset</DevToolsButton>
          </div>
        </DevToolsSection>

        <DevToolsSection title="Touch">
          <DevToolsSubsection description="Forces touch instead of click">
            <DevToolsSelect value="Device-based" />
          </DevToolsSubsection>
        </DevToolsSection>

        <DevToolsSection title="Emulate Idle Detector state">
          <DevToolsSubsection description="Forces selected idle state emulation">
            <DevToolsSelect value="No idle emulation" />
          </DevToolsSubsection>
        </DevToolsSection>

        <DevToolsSection title="Hardware concurrency">
          <DevToolsSubsection description="Override the value reported by navigator.hardwareConcurrency">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block size-3.5 rounded-sm border border-[#5f6368] bg-[#292a2d]"
              />
              <span className="inline-flex min-w-[2.5rem] items-center rounded border border-[#5f6368] bg-[#1e1e1e] px-2 py-1 text-[11px] text-[#e8eaed]">
                10
              </span>
            </div>
          </DevToolsSubsection>
        </DevToolsSection>

        <DevToolsSection title="CPU Pressure">
          <DevToolsSubsection description="Forces selected pressure state emulation">
            <DevToolsSelect value="No override" />
          </DevToolsSubsection>
        </DevToolsSection>
      </div>
    </div>
  )
}
