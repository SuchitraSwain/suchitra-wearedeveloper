export const talkConfig = {
  id: "template",
  name: "My Talk Title",
  event: "Conference Name · Year",
  slides: [
    "about-me",
    "talk-overview",
    "opener-memes",
    "thank-you",
  ],
} as const

export type TalkSlideId = (typeof talkConfig.slides)[number]
