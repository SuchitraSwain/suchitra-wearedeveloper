import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

function findBinary(name, fallbacks) {
  const fromPath = spawnSync("which", [name], { encoding: "utf8" })
  if (fromPath.status === 0 && fromPath.stdout.trim()) {
    return fromPath.stdout.trim()
  }

  for (const candidate of fallbacks) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  throw new Error(`Could not find ${name}`)
}

const YT_DLP = findBinary("yt-dlp", [
  "/opt/homebrew/bin/yt-dlp",
  "/Users/suchitraswain/Library/Python/3.9/bin/yt-dlp",
])
const FFMPEG = findBinary("ffmpeg", ["/opt/homebrew/bin/ffmpeg"])

const videoUrl = "https://www.youtube.com/watch?v=wBNCPp5gdqg"
const publicDir = join(process.cwd(), "public")
const workDir = join(publicDir, ".recordings", "webmcp")
const sourceVideo = join(workDir, "source.mp4")
const framesDir = join(workDir, "frames")

const captures = [
  {
    timestamp: 285,
    frame: "frame-285.png",
    out: "webmcp-application-panel.png",
  },
  {
    timestamp: 300,
    frame: "frame-300.png",
    out: "webmcp-chrome-flags.png",
  },
]

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" })
  if (result.status !== 0) {
    throw new Error(`${command} failed`)
  }
}

mkdirSync(framesDir, { recursive: true })

if (!existsSync(sourceVideo)) {
  console.log("Downloading source video…")
  run(YT_DLP, [
    "-f",
    "best[ext=mp4]/best",
    "--extractor-args",
    "youtube:player_client=android",
    "-o",
    sourceVideo,
    videoUrl,
  ])
}

for (const capture of captures) {
  const mm = Math.floor(capture.timestamp / 60)
  const ss = capture.timestamp % 60
  const time = `00:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
  const framePath = join(framesDir, capture.frame)

  console.log(`Extracting frame at ${time}`)
  run(FFMPEG, [
    "-y",
    "-ss",
    time,
    "-i",
    sourceVideo,
    "-frames:v",
    "1",
    "-update",
    "1",
    framePath,
  ])

  run(FFMPEG, [
    "-y",
    "-i",
    framePath,
    "-vf",
    "crop=372:360:0:0,scale=1920:-1:flags=lanczos",
    "-update",
    "1",
    join(publicDir, capture.out),
  ])

  console.log(`Saved ${capture.out}`)
}
