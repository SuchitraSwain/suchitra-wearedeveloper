import { cn } from "@/lib/utils"

type SlideScreenshotProps = {
  src: string
  alt: string
  caption?: string
  className?: string
  layout?: "default" | "split"
}

export function SlideScreenshot({
  src,
  alt,
  caption,
  className,
  layout = "default",
}: SlideScreenshotProps) {
  const isSplit = layout === "split"

  return (
    <figure
      className={cn(
        "flex w-full flex-col gap-2",
        isSplit ? "slide-video-split min-h-0 flex-1" : "min-h-0",
        className
      )}
    >
      {isSplit ? (
        <div className="slide-screenshot-split-player">
          <div className="slide-screenshot-split-inner">
            <img src={src} alt={alt} />
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-contain" />
        </div>
      )}
      {caption ? (
        <figcaption className="shrink-0 text-[clamp(0.6rem,1.1cqw,0.75rem)] leading-relaxed text-white/40">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
