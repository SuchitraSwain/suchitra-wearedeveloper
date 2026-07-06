import { cn } from "@/lib/utils"

type BulletListProps = {
  items: readonly string[]
  className?: string
  itemClassName?: string
}

export function BulletList({ items, className, itemClassName }: BulletListProps) {
  return (
    <ul className={cn("space-y-[clamp(0.65rem,1.4cqw,1rem)]", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "slide-body flex items-start gap-4 text-white/90",
            itemClassName
          )}
        >
          <span
            aria-hidden="true"
            className="mt-[0.55em] size-[clamp(0.45rem,0.9cqw,0.6rem)] shrink-0 rounded-full bg-white"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
