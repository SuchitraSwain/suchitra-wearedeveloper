import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SlideLabelProps = {
  children: ReactNode
  className?: string
}

export function SlideLabel({ children, className }: SlideLabelProps) {
  return (
    <p
      className={cn(
        "slide-label-text font-semibold text-wad-purple uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}
