import { cn } from "@/lib/utils"

type SlideBackdropProps = {
  className?: string
}

export function SlideBackdrop({ className }: SlideBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -top-32 -left-32 size-[520px] rounded-full bg-wad-pink/15 blur-[120px]" />
      <div className="absolute -right-24 top-1/3 size-[480px] rounded-full bg-wad-purple/20 blur-[130px]" />
      <div className="absolute -bottom-40 left-1/3 size-[400px] rounded-full bg-wad-pink/10 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  )
}
