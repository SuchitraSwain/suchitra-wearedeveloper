import {
  devToolsMcpIntro,
} from "@/data/presentation"

import { DevToolsMcpFeaturesSlide } from "./devtools-mcp-features-slide"
import { DevToolsMcpSlide } from "./devtools-mcp-slide"

export function DevToolsMcpIntroSlide() {
  return <DevToolsMcpSlide bullets={devToolsMcpIntro} />
}

export function DevToolsMcpCapabilitiesSlide() {
  return <DevToolsMcpFeaturesSlide />
}
