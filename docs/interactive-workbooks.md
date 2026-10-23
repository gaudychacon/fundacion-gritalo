# Complete the original workbook activities in the browser

All fourteen source activities now support touch, mouse and keyboard interaction. The source transcript and full scanned pages remain available separately from website guidance. No source images were replaced or generated for this change.

## Source-to-interaction map

| Age | Activity | Digital actions |
| --- | --- | --- |
| 6-9 | I | Four original multiple-choice questions |
| 6-9 | II | Place happy/sad face stamps on five original scenes |
| 6-9 | III | Color both original swimsuit cutouts and select clothing to cover each character |
| 6-9 | IV | Classify eight original scenes with X or coloring; color the three protective scenes |
| 6-9 | V | Connect five original questions to SI/NO and color all five drawings |
| 6-9 | VI | Fill the five original phrase blanks from its word bank |
| 6-9 | VII | Place all five original building cutouts in matching named destinations |
| 10-15 | 1 | Four original questions, two explicit yes/no blanks, six phrase blanks |
| 10-15 | 2 | Find four words in the original 8-by-10 grid, then fill four phrase blanks |
| 10-15 | 3 | Place eight circles on the original body diagram using the printed signals |
| 10-15 | 4 | Classify twelve original actions and privately reflect on three trusted adults |
| 10-15 | 5 | Connect four original scenes to chosen printed responses; color all four |
| 10-15 | 6 | Answer four yes/no questions and their four original decisions |
| 10-15 | 7 | Fill five phrase blanks and place five original building cutouts |

## Completion and privacy

- Every required subtask gates completion. Incorrect objective responses can be changed; **Revisar mis respuestas** identifies pending steps. Completion is not a personal safety assessment.
- Coloring is free-form participation, not machine-graded artwork. One or more marks on each required drawing count as participation. **Deshacer trazo** removes marks and revokes that subtask when empty.
- Teen activity 5 explicitly asks for the response the learner would give. No invented unique answer key is imposed. Separate guidance affirms that silence or inability to say NO is never the child's fault.
- The trusted-adult exercise uses a private reflection instead of requesting names. Lack of three trusted adults does not block someone from thinking about seeking support.
- Answers and artwork stay in component memory. Reset, leaving the page or changing age/activity clears them. Only completion IDs persist. Printing/exporting artwork is not implemented.

## Keyboard and source fidelity

Native radios, checkboxes and selects work without dragging. Coloring uses arrow keys to position the brush and Space/Enter to paint. Word search uses first/last letter buttons; its 44-pixel cells scroll horizontally on narrow screens instead of shrinking touch targets. Source cutouts are SVG viewports into local JPEGs, not redrawn replacements.

The teen word-search scan prints **ACTUAA** in the intended **ACTUAR** path (column 9, rows 2-7). The digital grid preserves that apparent typo, accepts that printed path, and explains it visibly as site guidance. A publisher/pedagogical check is recommended before release, including the book's anatomical labeling and sensitive scenarios.

## Verification

`tests/digital-workbook.test.jsx` exercises every complete activity and reset with accessible controls, completion guards, source-grid paths, retry, pointer/keyboard drawing, navigation state isolation and reflection privacy. `tests/progress.test.js` proves review-only records cannot complete games and chapter visits survive migration. The tests were written and run RED before their implementation; Vite's esbuild required the normal approved sandbox escalation, without dependency or configuration changes.

GitHub synchronization and restoration of previous video IDs are separate pending work; this feature does not invent video links or claim the remote branch was fetched.
