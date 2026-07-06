import { cn } from "@/lib/utils"

type SpeakerPortraitProps = {
  name: string
  image?: string
  className?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function SpeakerPortrait({ name, image, className }: SpeakerPortraitProps) {
  const initials = getInitials(name)

  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-wad-pink/40 via-wad-purple/20 to-transparent blur-2xl" />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-wad-navy/80 shadow-2xl shadow-black/50">
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-wad-pink via-wad-purple to-wad-pink" />

        {image ? (
          <>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-[center_22%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
          </>
        ) : (
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1030] via-[#12081f] to-[#0b0e14]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none bg-gradient-to-br from-white via-white/80 to-white/40 bg-clip-text text-[clamp(3rem,8cqw,5rem)] font-bold tracking-tight text-transparent">
                {initials}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 p-[clamp(0.85rem,1.8cqw,1.25rem)] pt-[clamp(2.5rem,6cqh,3.5rem)]">
          <p className="slide-label-text font-semibold text-wad-pink uppercase">
            Speaker
          </p>
          <p className="slide-subheading mt-1 font-semibold text-white">{name}</p>
        </div>
      </div>
    </div>
  )
}
