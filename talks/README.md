# Talk packs

Each folder under `talks/` is one conference deck.

## Active talk

Set with env var (default: `wearedevelopers-2026`):

```bash
VITE_TALK=wearedevelopers-2026 npm run dev
VITE_TALK=wearedevelopers-2026 npm run deploy
```

## Create a new talk

```bash
cp -R talks/_template talks/my-conference-2026
```

Then edit:

1. `talks/my-conference-2026/config.ts` — name, event, **slide order**
2. `talks/my-conference-2026/content.ts` — speaker, bullets, prompts, videos
3. Add any new assets under `public/`

Run:

```bash
VITE_TALK=my-conference-2026 npm run dev
```

## Available slide IDs

Reuse any ID from the shared registry in `src/talks/slide-registry.tsx`:

- `about-me`, `talk-overview`, `opener-memes`, `thank-you`
- `evolution`, `debug-evolution`
- `devtools-mcp-intro`, `devtools-mcp-capabilities`, `devtools-mcp-setup`, `devtools-mcp-config`
- `demo-form`, `demo-video`
- `emulate-capabilities`, `emulate-video`, `emulate-devices`, `emulate-devices-video`
- `performance-capabilities`, `performance-video`
- `debugging-capabilities`, `debugging-video`
- `webmcp`, `webmcp-flags`

Only include the slides you need in `config.ts` — unused modules stay out of the deck.
