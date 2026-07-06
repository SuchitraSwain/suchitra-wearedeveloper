import type { ComponentType } from "react"

import { openerMemes } from "@/data/presentation"

import { MemeSlide } from "../meme-slide"

export function createMemeSlideComponent(meme: (typeof openerMemes)[number]): ComponentType {
  return function MemeSlideInstance() {
    return <MemeSlide meme={meme} />
  }
}
