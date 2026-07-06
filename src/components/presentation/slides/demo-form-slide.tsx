import { useState } from "react"
import { CheckCircle2, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { demoForm } from "@/data/presentation"
import { cn } from "@/lib/utils"

import { PresentationSlide } from "../presentation-slide"
import { SlideLabel } from "../slide-label"

const fieldClassName =
  "h-[clamp(2.25rem,5cqh,3rem)] text-[clamp(0.9rem,1.75cqw,1.1rem)]"

function isEmbedFormMode() {
  return new URLSearchParams(window.location.search).get("embed") === "form"
}

export function DemoFormSlide() {
  const embedForm = isEmbedFormMode()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    const form = document.getElementById("devtools-demo-form") as HTMLFormElement | null
    form?.reset()
    setSubmitted(false)
  }

  const formPanel = (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-[clamp(0.75rem,2cqw,1.5rem)]",
        embedForm && "h-full rounded-none border-0 bg-[#0b0e14] p-4"
      )}
    >
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <CheckCircle2 className="size-[clamp(2.5rem,6cqw,3.5rem)] text-wad-pink" />
              <div>
                <p className="text-[clamp(1rem,2.2cqw,1.35rem)] font-semibold text-white">
                  Form submitted!
                </p>
                <p className="mt-1 text-[clamp(0.75rem,1.5cqw,0.95rem)] text-white/45">
                  DevTools MCP successfully filled and submitted the form.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                <RotateCcw data-icon="inline-start" />
                Reset demo
              </Button>
            </div>
          ) : (
            <form
              id="devtools-demo-form"
              name="congress-registration"
              className="flex min-h-0 flex-1 flex-col gap-[clamp(0.5rem,1.2cqw,0.85rem)] overflow-y-auto pr-1"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-[clamp(0.5rem,1.2cqw,0.85rem)] sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-full-name" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                    Full name
                  </Label>
                  <Input
                    id="demo-full-name"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Jane Developer"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-email" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                    Email
                  </Label>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-company" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                  Company
                </Label>
                <Input
                  id="demo-company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Acme GmbH"
                  className={fieldClassName}
                  required
                />
              </div>

              <div className="grid gap-[clamp(0.5rem,1.2cqw,0.85rem)] sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-role" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                    Role
                  </Label>
                  <select
                    id="demo-role"
                    name="role"
                    required
                    defaultValue=""
                    className={cn(
                      fieldClassName,
                      "w-full rounded-lg border border-input bg-transparent px-2.5 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    )}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {demoForm.roles.map((role) => (
                      <option key={role.value} value={role.value} className="bg-[#0e1219]">
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-track" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                    Talk track
                  </Label>
                  <select
                    id="demo-track"
                    name="track"
                    required
                    defaultValue=""
                    className={cn(
                      fieldClassName,
                      "w-full rounded-lg border border-input bg-transparent px-2.5 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    )}
                  >
                    <option value="" disabled>
                      Select track
                    </option>
                    {demoForm.tracks.map((track) => (
                      <option key={track.value} value={track.value} className="bg-[#0e1219]">
                        {track.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-message" className="text-[clamp(0.7rem,1.3cqw,0.875rem)]">
                  Message
                </Label>
                <Textarea
                  id="demo-message"
                  name="message"
                  rows={3}
                  placeholder="What would you like to learn at the congress?"
                  className="min-h-[clamp(4.5rem,12cqh,7rem)] text-[clamp(0.8rem,1.6cqw,1rem)]"
                  required
                />
              </div>

              <label
                htmlFor="demo-newsletter"
                className="flex items-center gap-2 text-[clamp(0.75rem,1.4cqw,0.95rem)] text-white/70"
              >
                <input
                  id="demo-newsletter"
                  name="newsletter"
                  type="checkbox"
                  className="size-[clamp(0.9rem,2cqw,1.1rem)] rounded border border-input accent-wad-pink"
                />
                Send me WeAreDevelopers updates
              </label>

              <Button
                id="demo-submit"
                type="submit"
                className="mt-auto h-[clamp(2.25rem,5cqh,3rem)] w-full bg-wad-pink text-[clamp(0.8rem,1.6cqw,1rem)] text-white hover:bg-wad-pink/90"
              >
                Register interest
              </Button>
            </form>
          )}
    </div>
  )

  if (embedForm) {
    return formPanel
  }

  return (
    <PresentationSlide>
      <div className="slide-page-center">
        <div className="grid min-h-0 gap-[clamp(0.75rem,2cqw,1.5rem)] lg:grid-cols-[0.85fr_1.15fr] lg:overflow-hidden">
        <div className="flex min-h-0 flex-col justify-center gap-[clamp(0.75rem,1.8cqw,1.25rem)]">
          <SlideLabel>Live demo</SlideLabel>
          <h1 className="slide-heading font-bold leading-tight tracking-tight text-white">
            {demoForm.title}
          </h1>
          <p className="slide-body text-white/50">{demoForm.subtitle}</p>

          <div className="rounded-xl border border-wad-purple/25 bg-wad-purple/10 p-[clamp(0.75rem,1.8cqw,1.25rem)]">
            <p className="mb-2 text-[clamp(0.55rem,1cqw,0.7rem)] font-semibold tracking-[0.18em] text-wad-purple uppercase">
              Try in Cursor
            </p>
            <p className="text-[clamp(0.7rem,1.4cqw,0.95rem)] leading-relaxed text-white/70">
              {demoForm.demoPrompt}
            </p>
          </div>

          <p className="text-[clamp(0.65rem,1.1cqw,0.8rem)] text-white/35">
            Direct URL:{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-white/55">
              ?slide=demo-form
            </code>
          </p>
        </div>

        {formPanel}
        </div>
      </div>
    </PresentationSlide>
  )
}
