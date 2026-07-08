import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, rmSync } from "node:fs"
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

  throw new Error(`Could not find ${name}. Install it and retry.`)
}

const YT_DLP = findBinary("yt-dlp", [
  "/opt/homebrew/bin/yt-dlp",
  "/Users/suchitraswain/Library/Python/3.9/bin/yt-dlp",
])
const FFMPEG = findBinary("ffmpeg", ["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"])

const videoUrl = "https://www.youtube.com/watch?v=vZPc4hKxIGA"
const publicDir = join(process.cwd(), "public")
const workDir = join(publicDir, ".recordings", "devtools-mcp-intro")
const sourceVideo = join(workDir, "source.mp4")
const segment1 = join(workDir, "segment-1.mp4")
const videoOut = join(publicDir, "devtools-mcp-intro-demo.webm")
const posterOut = join(publicDir, "devtools-mcp-intro-demo-poster.png")

const segments = [{ start: "00:00:25", end: "00:00:41", out: segment1 }]

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" })
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed`)
  }
}

mkdirSync(workDir, { recursive: true })

if (process.argv.includes("--force-download") && existsSync(sourceVideo)) {
  rmSync(sourceVideo)
}

if (!existsSync(sourceVideo)) {
  console.log("Downloading source video…")
  run(YT_DLP, [
    "-f",
    "96/bestvideo[height<=1080]+bestaudio/best",
    "--cookies-from-browser",
    "chrome",
    "-o",
    sourceVideo,
    videoUrl,
  ])
}

for (const segment of segments) {
  console.log(`Clipping ${segment.start} → ${segment.end}`)
  run(FFMPEG, [
    "-y",
    "-ss",
    segment.start,
    "-to",
    segment.end,
    "-i",
    sourceVideo,
    "-c:v",
    "libx264",
    "-crf",
    "18",
    "-preset",
    "fast",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    segment.out,
  ])
}

console.log("Encoding webm…")
run(FFMPEG, [
  "-y",
  "-i",
  segment1,
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "24",
  "-b:v",
  "0",
  "-row-mt",
  "1",
  "-c:a",
  "libopus",
  "-b:a",
  "128k",
  videoOut,
])

console.log("Creating poster…")
run(FFMPEG, [
  "-y",
  "-i",
  videoOut,
  "-frames:v",
  "1",
  "-update",
  "1",
  posterOut,
])

console.log(`Saved clip to ${videoOut}`)
console.log(`Saved poster to ${posterOut}`)
