# Yo Digo NO

A local-first educational React website in Spanish, with separate experiences for ages 6–9 and 10–15. The supplied prevention workbooks now provide the original story text, seven worksheets per age, and scanned artwork. No accounts, personal-data forms, analytics, advertising, or backend are included. See [book alignment](docs/book-alignment.md) and [image inventory](docs/book-image-inventory.md).

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
| Shawi's seven original story pages | `src/data/historias6a9.js` |
| Ferina and Fredo's six original story pages | `src/data/historias10a15.js` |
| Fourteen original worksheets and source references | `src/data/activities.js` |
| Verified regional help resources | `src/data/recursosAyuda.js` |
| Palette, typography, responsive layouts | `src/styles/main.css` |

The `site.name` configuration updates the visible branding and browser title. The static fallback title in `index.html` should also be updated for a rename.

### Images

Original book assets live in `public/books/`; there are no remote image dependencies. The old `public/images/` directories are unused legacy placeholders. Original pages can be opened at full resolution from the reader and worksheets.

```text
public/books/
  6-9/
    cover.jpg
    cutouts.jpg
    page-1.jpg              # through page-12.jpg
    song.jpg
  10-15/
    cover.jpg
    title.jpg
    page-1.jpg              # through page-15.jpg
```

The 32 JPEGs are rendered directly from the supplied PDFs, not redrawn. Review the original sensitive scenes, anatomical diagram, reproduction rights and pedagogical suitability before public release. See `scripts/export-book-pages.py` to regenerate them.

### Videos

Each world in `src/data/worlds.js` contains records with `id`, `titulo`, `descripcion`, `tema`, `youtubeId`, and `thumbnail`. Replace an empty `youtubeId` with an 11-character YouTube video ID, not a complete URL. The card then offers playback. No third-party connection occurs until the visitor presses **Reproducir video**. Playback uses YouTube's privacy-enhanced domain, but it is still an external service and its privacy practices apply. Review every video for suitability before adding it.

### Add an activity

Original worksheets use `type: 'workbook'`, literal `text`, `source` metadata and `pages` image references. All fourteen can be completed in the browser. `src/data/workbookPlans.js` maps each source task to controls in `DigitalWorkbook.jsx`: original choices, face stamps, painting, cutouts, connections, phrase slots, body circles and a word search. See [interactive workbook details](docs/interactive-workbooks.md). Do not replace the original exercises with invented quizzes.

For separately labeled supplemental activities, the engine still supports:

- `choice` / `classify`: `questions` containing `prompt`, `options`, zero-based `answer`, and `explanation`.
- `select`: `prompt`, `options`, zero-based `answers`, and `explanation`.
- `order`: a correctly ordered `steps` array; the component initially reverses it.
- `network`: private reflection using adult-role cards, never names or free text.

The list and detail route are generated automatically. Add behavioral tests when introducing a new interaction type. Do not collect worksheet answers or personal names.

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

The only persisted values are visited page IDs and completed activity IDs, namespaced under `yo-digo-no:v3-interactive-books` in localStorage. Visited chapters migrate from the previous book edition, but reviewed worksheets do not count as completed games. Reset removes both book-edition keys, not unrelated browser data. Answers and drawings remain in React state only and are discarded when leaving the activity. Learning remains available if storage is blocked or corrupted; persistence is best-effort.

Stories are manual transcriptions of the original wording, including dialogue and faith references. Original page images provide a direct fidelity reference. Editorial **No es tu culpa** guidance is labeled separately; it is not inserted into quotations. Navigation, safeguarding guidance and video placeholders are website copy. Regional resources remain empty until independently verified. The product is educational, not an emergency service. Review `docs/book-alignment.md` before changing sensitive copy; `docs/source-analysis.md` records the historical adaptation rationale.

## Deploy later to Vercel

1. Run `npm test` and `npm run build`.
2. Upload the project to your own Git repository, excluding `node_modules`, `dist`, `tmp`, and `.npm-cache`.
3. Import that repository into Vercel, select the **Vite** preset, use build command `npm run build` and output directory `dist`.
4. The included `vercel.json` supplies SPA route rewrites while preserving image/font/asset paths. Verify a direct chapter URL after deployment.

No environment variables or backend are required. Website hosting is configured separately; pushing this repository does not deploy it.
