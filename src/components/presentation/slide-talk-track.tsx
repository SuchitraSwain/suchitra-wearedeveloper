type SlideTalkTrackProps = {
  lines: readonly string[]
}

export function SlideTalkTrack({ lines }: SlideTalkTrackProps) {
  return (
    <div className="rounded-xl border border-wad-pink/25 bg-wad-pink/10 p-[clamp(0.65rem,1.5cqw,1rem)]">
      <ul className="space-y-[clamp(0.45rem,1cqw,0.65rem)]">
        {lines.map((line) => (
          <li
            key={line}
            className="slide-body-sm leading-snug text-white/75 before:mr-2 before:text-wad-pink before:content-['→']"
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}
