# Suchitra Presentation Kit

Reusable React slide-deck engine for conference talks. One shell, many talk packs.

**Live:** https://suchitra-presentation.web.app

## Quick start

```bash
npm install
npm run dev
```

Fullscreen: **F** · Navigate: **← →** · Jump: `?slide=thank-you`

## Talks (global / multi-conference)

Each talk lives under `talks/<id>/`:

| File | Purpose |
|------|---------|
| `config.ts` | Talk id, name, **ordered slide list** |
| `content.ts` | Speaker, bullets, prompts, video paths |

**Active talk** (default `wearedevelopers-2026`):

```bash
VITE_TALK=wearedevelopers-2026 npm run dev
VITE_TALK=wearedevelopers-2026 npm run deploy
```

### New talk

```bash
cp -R talks/_template talks/my-meetup-2026
# edit talks/my-meetup-2026/config.ts + content.ts
VITE_TALK=my-meetup-2026 npm run dev
```

See [talks/README.md](talks/README.md) for slide IDs you can mix and match.

## Deploy (Firebase)

Project: `suchitra-presentation` → https://suchitra-presentation.web.app

```bash
npm run deploy
```

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Local deck |
| `npm run build` | Production build |
| `npm run deploy` | Build + Firebase Hosting |
| `npm run record:*` | Record demo videos (Playwright) |

## Stack

React 19 · Vite 8 · TypeScript · Tailwind v4 · Firebase Hosting
