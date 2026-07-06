import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { SlideBackdrop } from "./slide-backdrop"

type PresentationSlideProps = {
  children: ReactNode
  className?: string
  variant?: "dark" | "light"
}

export function PresentationSlide({
  children,
  className,
  variant = "dark",
}: PresentationSlideProps) {
  const isLight = variant === "light"

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden",
        isLight ? "bg-white text-[#202124]" : "bg-[#0b0e14]",
        className
      )}
    >
      {!isLight ? <SlideBackdrop /> : null}
      <div
        className={cn(
          "slide-content relative z-10 flex min-h-0 flex-1 flex-col",
          isLight && "slide-canvas"
        )}
      >
        {children}
      </div>
    </div>
  )
}
