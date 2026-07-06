import { cn } from "@/lib/utils"

type SlideVideoProps = {
  src: string
  poster?: string
  caption?: string
  className?: string
  variant?: "dark" | "light"
  layout?: "default" | "split"
}

export function SlideVideo({
  src,
  poster,
  caption,
  className,
  variant = "dark",
  layout = "default",
}: SlideVideoProps) {
  const isSplit = layout === "split"

  return (
    <figure
      className={cn(
        "flex w-full flex-col gap-2",
        isSplit ? "slide-video-split" : "min-h-0",
        className
      )}
    >
      {isSplit ? (
        <div className="slide-video-split-player">
          <div className="slide-video-split-inner">
            <video
              src={src}
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-[0_8px_30px_rgba(60,64,67,0.18)]",
            variant === "light"
              ? "border border-[#dadce0]"
              : "border border-white/10 shadow-black/30"
          )}
        >
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      )}
      {caption ? (
        <figcaption
          className={cn(
            "shrink-0 text-[clamp(0.6rem,1.1cqw,0.75rem)] leading-relaxed",
            variant === "light" ? "text-[#80868b]" : "text-white/40"
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
