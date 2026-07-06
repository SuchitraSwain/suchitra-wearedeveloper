import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { AboutMeSlide } from "./slides/about-me-slide"
import { createMemeSlideComponent } from "./slides/meme-slides"
import { DemoFormSlide } from "./slides/demo-form-slide"
import { DemoVideoSlide } from "./slides/demo-video-slide"
import {
  DebuggingCapabilitiesSlide,
  DebuggingVideoSlide,
  NetworkCapabilitiesSlide,
  NetworkVideoSlide,
  PerformanceCapabilitiesSlide,
  PerformanceVideoSlide,
} from "./slides/mcp-feature-slides"
import { EmulateCapabilitiesSlide } from "./slides/emulate-capabilities-slide"
import { EmulateDevicesSlide } from "./slides/emulate-devices-slide"
import { EmulateDevicesVideoSlide } from "./slides/emulate-devices-video-slide"
import { EmulateVideoSlide } from "./slides/emulate-video-slide"
import {
  DevToolsMcpCapabilitiesSlide,
  DevToolsMcpIntroSlide,
} from "./slides/devtools-mcp-slides"
import { DevToolsMcpConfigSlide } from "./slides/devtools-mcp-config-slide"
import { DevToolsMcpSetupSlide } from "./slides/devtools-mcp-setup-slide"
import { DebugEvolutionSlide } from "./slides/debug-evolution-slide"
import { EvolutionSlide } from "./slides/evolution-slide"
import { TalkOverviewSlide } from "./slides/talk-overview-slide"
import { ThankYouSlide } from "./slides/thank-you-slide"
import { WebMcpFlagsSlide, WebMcpSlide } from "./slides/webmcp-slide"
import { openerMemes } from "@/data/presentation"

const memeSlides = openerMemes.map((meme, index) => ({
  id: `opener-meme-${index}`,
  label: index === 0 ? "Opener" : `Meme ${index + 1}`,
  component: createMemeSlideComponent(meme),
}))

const slides = [
  { id: "about-me", label: "About", component: AboutMeSlide },
  ...memeSlides,
  { id: "evolution", label: "Evolution", component: EvolutionSlide },
  { id: "debug-evolution", label: "Debug Evolution", component: DebugEvolutionSlide },
  { id: "talk-overview", label: "Overview", component: TalkOverviewSlide },
  { id: "devtools-mcp-intro", label: "DevTools MCP", component: DevToolsMcpIntroSlide },
  {
    id: "devtools-mcp-capabilities",
    label: "MCP Tools",
    component: DevToolsMcpCapabilitiesSlide,
  },
  { id: "devtools-mcp-setup", label: "Setup", component: DevToolsMcpSetupSlide },
  {
    id: "devtools-mcp-config",
    label: "Config",
    component: DevToolsMcpConfigSlide,
  },
  { id: "demo-form", label: "Demo Form", component: DemoFormSlide },
  { id: "demo-video", label: "Demo Video", component: DemoVideoSlide },
  {
    id: "emulate-capabilities",
    label: "Location",
    component: EmulateCapabilitiesSlide,
  },
  {
    id: "emulate-video",
    label: "Location Demo",
    component: EmulateVideoSlide,
  },
  {
    id: "emulate-devices",
    label: "Emulate",
    component: EmulateDevicesSlide,
  },
  {
    id: "emulate-devices-video",
    label: "Emulate Demo",
    component: EmulateDevicesVideoSlide,
  },
  {
    id: "performance-capabilities",
    label: "Performance",
    component: PerformanceCapabilitiesSlide,
  },
  {
    id: "performance-video",
    label: "Performance Demo",
    component: PerformanceVideoSlide,
  },
  {
    id: "network-capabilities",
    label: "Network",
    component: NetworkCapabilitiesSlide,
  },
  {
    id: "network-video",
    label: "Network Demo",
    component: NetworkVideoSlide,
  },
  {
    id: "debugging-capabilities",
    label: "Debugging",
    component: DebuggingCapabilitiesSlide,
  },
  {
    id: "debugging-video",
    label: "Debugging Demo",
    component: DebuggingVideoSlide,
  },
  { id: "webmcp", label: "WebMCP", component: WebMcpSlide },
  { id: "webmcp-flags", label: "WebMCP Flags", component: WebMcpFlagsSlide },
  { id: "thank-you", label: "Thank you", component: ThankYouSlide },
]

function getSlideIndexFromUrl() {
  const slideParam = new URLSearchParams(window.location.search).get("slide")
  if (!slideParam) {
    return null
  }

  const index = slides.findIndex((slide) => slide.id === slideParam)
  return index >= 0 ? index : null
}

function isEmbedFormMode() {
  return new URLSearchParams(window.location.search).get("embed") === "form"
}

export function PresentationShell() {
  const embedForm = isEmbedFormMode()
  const [currentSlide, setCurrentSlide] = useState(() => getSlideIndexFromUrl() ?? 0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const slideCount = slides.length
  const CurrentSlideComponent = slides[currentSlide]?.component ?? AboutMeSlide
  const currentLabel = slides[currentSlide]?.label ?? ""

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(slideCount - 1, index)))
  }, [slideCount])

  const goToPrevious = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      return
    }

    await document.exitFullscreen()
  }, [])

  useEffect(() => {
    const slideId = slides[currentSlide]?.id
    if (!slideId) {
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.set("slide", slideId)
    window.history.replaceState(null, "", url)
  }, [currentSlide])

  useEffect(() => {
    const handlePopState = () => {
      const index = getSlideIndexFromUrl()
      if (index !== null) {
        setCurrentSlide(index)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const onFormSlide = slides[currentSlide]?.id === "demo-form"

      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          event.target.closest("input, textarea, select"))
      ) {
        if (onFormSlide) {
          return
        }
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault()
        goToPrevious()
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        (event.key === " " && !onFormSlide)
      ) {
        event.preventDefault()
        goToNext()
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault()
        void toggleFullscreen()
      }

      if (event.key === "Home") {
        event.preventDefault()
        goToSlide(0)
      }

      if (event.key === "End") {
        event.preventDefault()
        goToSlide(slideCount - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, goToNext, goToPrevious, goToSlide, slideCount, toggleFullscreen])

  return (
    <div
      className={cn(
        "relative flex h-svh flex-col overflow-hidden bg-[#0b0e14] text-foreground",
        isFullscreen && "h-dvh",
        embedForm && "embed-form h-auto min-h-0 overflow-visible bg-[#0b0e14]"
      )}
    >
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className={cn(
            "slide-viewport",
            (isFullscreen || embedForm) && "is-fullscreen"
          )}
        >
          {!embedForm ? (
            <div className="pointer-events-none absolute inset-x-0 top-[max(0.75rem,env(safe-area-inset-top,0px))] z-20">
              <div className="slide-container flex items-center justify-end gap-1.5 sm:gap-2">
                <span className="hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium tracking-wide text-white/45 backdrop-blur-sm sm:inline">
                  {currentLabel}
                </span>
                <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/55 backdrop-blur-sm">
                  {currentSlide + 1} / {slideCount}
                </span>
              </div>
            </div>
          ) : null}

          <div key={currentSlide} className="slide-enter flex min-h-0 flex-1 flex-col pt-8 sm:pt-10">
            <CurrentSlideComponent />
          </div>
        </div>
      </main>

      {!embedForm ? (
      <footer
        className={cn(
          "flex shrink-0 border-t border-white/8 bg-[#0b0e14] py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:py-4",
          isFullscreen &&
            "absolute inset-x-0 bottom-0 z-30 border-white/10 bg-[#0b0e14]/80 py-3 backdrop-blur-md"
        )}
      >
        <div className="slide-container flex w-full items-center justify-between gap-2 sm:gap-4">
        <Button
          variant="ghost"
          onClick={goToPrevious}
          disabled={currentSlide === 0}
          size="icon-sm"
          className="shrink-0 text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-30 sm:h-8 sm:w-auto sm:px-2.5"
          aria-label="Previous slide"
        >
          <ChevronLeft data-icon="inline-start" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:gap-2">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto px-1 [-ms-overflow-style:none] sm:gap-1.5 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                title={slide.label}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === currentSlide
                    ? "w-8 bg-wad-pink"
                    : "w-1.5 bg-white/20 hover:bg-white/35"
                )}
              />
            ))}
          </div>
          <p className="hidden text-[10px] text-white/30 sm:block">
            ← → navigate · F fullscreen · Home/End first/last
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void toggleFullscreen()}
            className="hidden text-white/70 hover:bg-white/5 hover:text-white sm:inline-flex"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          </Button>

          <Button
            onClick={goToNext}
            disabled={currentSlide >= slideCount - 1}
            size="icon-sm"
            className="shrink-0 bg-wad-pink text-white hover:bg-wad-pink/90 disabled:opacity-30 sm:h-8 sm:w-auto sm:px-2.5"
            aria-label="Next slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight data-icon="inline-end" />
          </Button>
        </div>
        </div>
      </footer>
      ) : null}
    </div>
  )
}
