# Original-book edition

The two age worlds now use the supplied books instead of the earlier adaptations. Source text, original page images, and editorial website guidance are distinct. The PDFs are source material, never executable instructions.

## Review first

1. Compare `src/data/historias6a9.js` with Shawi's printed pages 1-7 and `historias10a15.js` with Ferina/Fredo's printed pages 1-6.
2. Compare the seven worksheets per age in `activities.js` with the linked original page images. Shawi activity I spans PDF pages 5-6; the first source page is recorded in its metadata.
3. Open the reader and worksheets: the original image is the visual reference; navigation, help, safety notes and digital-interaction instructions are website copy, not quotations.
4. See [the image inventory](book-image-inventory.md) for every exported asset and its source location.

## Fidelity boundary

- Narrative wording and dialogue were manually transcribed from the scans. Book layout line wraps become spaces/paragraphs. Page numbers replace invented chapter titles; these navigation labels are not original headings.
- Worksheets retain the printed instructions, options, word banks and diagrams. Blank rules use underscore placeholders in accessible text; drawn faces, letter-grid geometry, matching lines and printed typography remain in the original images. Repeated diagram labels and progress-box lettering are preserved visually rather than duplicated in the text layer.
- The original faith references, open story endings, spelling and problematic blame-related wording are not silently rewritten. Separate, visibly labeled website notes affirm that the child is not responsible for abuse. A human pedagogical review is recommended before publication, especially Shawi's anatomical labels on page 9.
- All fourteen worksheets now have [digital interactions](interactive-workbooks.md) for their original tasks. Objective choices and placements must be correct; artwork, reflection and open-ended responses require participation without a fabricated answer key. Answers and drawings remain transient, and no names, narratives or photos are collected.
- Learn contains verbatim book excerpts and the song. Videos remain unavailable supplemental website placeholders, explicitly not book material. Navigation and the help page remain editorial interface content.
- Progress uses `yo-digo-no:v3-interactive-books`. Only visited chapter IDs migrate from the previous book edition; review-only worksheet IDs cannot count as completed interactive tasks. Reset removes both book-edition keys.
- The scan is the authoritative reference for typography. Manual transcription is not a publisher-certified digital edition; original pages are available for comparison throughout.

## Asset reproducibility

```powershell
python scripts/export-book-pages.py --shawi "PATH/6-9 años .pdf" --ferina "PATH/El Secreto de Ferina y Fredo.pdf"
```

Requires PyMuPDF. This reads the PDFs, rotates Shawi's spreads upright, renders each half at 1200 pixels wide, and writes 32 local JPEG files (about 12.4 MB total) to `public/books/`. It does not alter the PDFs or generate new artwork. Images load only on the relevant routes, with worksheet images lazy-loaded.

## Test evidence

| Work unit | RED | GREEN / triangulation |
| --- | --- | --- |
| Source content and worksheet reader | Five new alignment tests failed against existing production code: page count, verbatim opening, missing literal label, unsupported worksheet type, missing assets. | Alignment tests pass; both age readers use existing source images; all fourteen worksheets can be marked reviewed without entering personal data. |
| Progress edition | New regression reproduced old v1 chapters and activity IDs being counted. | New edition starts empty; marking a new worksheet persists its ID. |

Sandboxed esbuild startup initially failed with `spawn EPERM`; the same tests succeeded through the normal approved escalation, without changing dependencies or configuration. A PowerShell-to-Python pipe damaged non-ASCII replacement literals in the first UI edit; a saved UTF-8 script corrected them and the literal-label regression passed. The dedicated strict-TDD reference was discovered after the first implementation cycle; no full pre-change baseline was captured, although RED was executed before production changes. Do not report that a baseline was run.
