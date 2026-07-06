import { ExternalLink, Heart } from "lucide-react"
import QRCode from "react-qr-code"

import { presentationMeta, speaker, thankYouSlide } from "@/data/presentation"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

export function ThankYouSlide() {
  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-2 py-2 text-center">
          <SlideLabel className="mb-4">
            WeAreDevelopers World Congress {presentationMeta.year}
          </SlideLabel>

          <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold tracking-tight text-white">
            {thankYouSlide.headline}
          </h1>

          <p className="mt-3 text-[clamp(1.35rem,4vw,1.875rem)] font-medium text-wad-pink">
            {thankYouSlide.subheadline}
          </p>

          <p className="mt-4 max-w-2xl text-[clamp(0.95rem,2.5vw,1.125rem)] leading-relaxed text-white/50 sm:mt-6">
            {thankYouSlide.cta}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {thankYouSlide.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-wad-purple/40 hover:bg-wad-purple/10 hover:text-white"
              >
                {link.label}
                <ExternalLink className="size-3.5" />
              </a>
            ))}
          </div>

          <a
            href={thankYouSlide.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Connect on LinkedIn"
            className="mt-8 flex flex-col items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-[0_0_40px_rgba(138,43,226,0.12)]">
              <QRCode
                value={thankYouSlide.linkedin}
                size={180}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
              />
            </div>
            <span className="text-[clamp(0.75rem,1.4cqw,0.875rem)] text-white/45">
              Scan to connect on LinkedIn
            </span>
          </a>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/40">
            <Heart className="size-4 text-wad-pink" />
            <span>
              {speaker.name} · {speaker.location}
            </span>
          </div>
        </div>
      </div>
    </PresentationSlide>
  )
}
