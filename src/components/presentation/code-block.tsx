import { cn } from "@/lib/utils"

type CodeBlockProps = {
  title?: string
  code: string
  className?: string
}

export function CodeBlock({ title, code, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-black/40",
        className
      )}
    >
      {title ? (
        <div className="border-b border-white/10 px-3 py-2 text-[10px] font-semibold tracking-[0.16em] text-wad-pink uppercase">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-relaxed text-white/85 sm:p-4 sm:text-xs">
        <code>{code}</code>
      </pre>
    </div>
  )
}
