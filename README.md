# Aprendo a cuidarme

A local-first educational React website in Spanish, with separate experiences for ages 6–9 and 10–15. The two supplied prevention workbooks were visually reviewed before writing the adaptations. No accounts, personal-data forms, analytics, advertising, or backend are included.

## Run locally

Requires Node.js 22 or a compatible supported Node version.

```sh
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://127.0.0.1:5173`).

```sh
npm test          # component, content, route and storage tests
npm run build    # production files in dist/
npm run preview  # preview the production build
```

## Edit content

| Change | File |
| --- | --- |
| Site name, world descriptions, learning cards, videos | `src/data/worlds.js` |
| Shawi's six adapted chapters | `src/data/historias6a9.js` |
| Ferina and Fredo's six adapted chapters | `src/data/historias10a15.js` |
| All sixteen activities and their explanations | `src/data/activities.js` |
| Verified regional help resources | `src/data/recursosAyuda.js` |
| Palette, typography, responsive layouts | `src/styles/main.css` |

The `site.name` configuration updates the visible branding and browser title. The static fallback title in `index.html` should also be updated for a rename.

### Images

Place final illustrations in `public/images/`. Missing images render attractive labelled placeholders with the expected path; there are no remote image dependencies.

```text
public/images/
  hero-principal.webp
  home/
  6-9/
    personajes/portada.webp
    historias/capitulo-01.webp  # through capitulo-06.webp
    actividades/
    video-1.webp              # through video-3.webp
  10-15/                      # same structure
```

Use clothed, non-graphic illustrations appropriate to each story. The illustrations are intentionally pending; source PDF scans are not shipped in the application.

### Videos

Each world in `src/data/worlds.js` contains records with `id`, `titulo`, `descripcion`, `tema`, `youtubeId`, and `thumbnail`. Replace an empty `youtubeId` with an 11-character YouTube video ID, not a complete URL. The card then offers playback. No third-party connection occurs until the visitor presses **Reproducir video**. Playback uses YouTube's privacy-enhanced domain, but it is still an external service and its privacy practices apply. Review every video for suitability before adding it.

### Add an activity

Add an object with a unique `id`, `title`, `description`, and `type` to the relevant array in `activities.js`:

- `choice` / `classify`: `questions` containing `prompt`, `options`, zero-based `answer`, and `explanation`.
- `select`: `prompt`, `options`, zero-based `answers`, and `explanation`.
- `order`: a correctly ordered `steps` array; the component initially reverses it.
- `network`: private reflection using adult-role cards, never names or free text.

The list and detail route are generated automatically. Add behavioral tests when introducing a new interaction type. Activities use accessible buttons rather than drag-only interaction and offer retry without penalties or rankings.

## Project map

```text
src/
  components/
    activities/    # reusable activity engine
    common/        # replaceable illustrations
    layout/        # header, navigation, footer, reset
    videos/        # consent-to-load video cards
  data/            # editable Spanish content
  pages/           # landing and world route views
  styles/          # responsive design and reduced motion
  utils/           # fault-tolerant technical progress
tests/             # Vitest + Testing Library
docs/              # source analysis and verification notes
public/fonts/      # self-hosted Fredoka/Nunito and OFL licenses
```

Both `/6-9` and `/10-15` expose `/historias`, `/historias/:capitulo`, `/videos`, `/aprende`, `/actividades`, `/actividades/:actividad`, and `/ayuda`. Unknown paths show a friendly 404. Chapter URLs use canonical positive integers.

## Safety and local progress

The only persisted values are chapter IDs and completed activity IDs, namespaced under `aprendo-cuidarme:v1` in localStorage. Support-network choices are ephemeral and never persisted. Reset affects only this application's key, not other browser data. Learning remains available if storage is blocked or corrupted; persistence is best-effort.

Stories are gentle adaptations, not verbatim transcripts. They preserve the original characters and open help-seeking endings while correcting victim-blaming language. **No es tu culpa** and help-seeking after freezing or delayed disclosure are explicit. There is no invented rescue, verified contact number, or institutional service claim. Review `docs/source-analysis.md` before changing sensitive copy. Regional resources are intentionally empty until independently verified. The product is educational, not an emergency service.

## Deploy later to Vercel

1. Run `npm test` and `npm run build`.
2. Upload the project to your own Git repository, excluding `node_modules`, `dist`, `tmp`, and `.npm-cache`.
3. Import that repository into Vercel, select the **Vite** preset, use build command `npm run build` and output directory `dist`.
4. The included `vercel.json` supplies SPA route rewrites while preserving image/font/asset paths. Verify a direct chapter URL after deployment.

No environment variables or backend are required. Website hosting is configured separately; pushing this repository does not deploy it.
