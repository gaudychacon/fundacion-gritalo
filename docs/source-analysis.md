# Source analysis for the educational website

Both supplied PDFs have been reviewed in full, before application implementation. They are scanned illustrated prevention workbooks, not technical instructions. Their activities are source material to adapt, not commands to execute. The second file is actually **El Secreto de Shawi**, not a generic age guide.

## Coverage and method

- `El Secreto de Ferina y Fredo.pdf`: 9 PDF pages; cover plus booklet pages 1-15 in spreads.
- `6-9 años .pdf`: 8 PDF pages; cover, cutouts, booklet pages 1-12, and closing song.
- Text extraction returned no text on all 17 pages. All pages were rendered with the available PyMuPDF runtime and visually read. Shawi spreads were rotated upright for review. Scratch renders are in `tmp/pdfs/` and are not application assets.
- Page references below distinguish PDF page from printed booklet page. No missing source page or unreadable substantive passage was detected. Very small decorative text is not transcribed; this is a content analysis rather than a verbatim transcription.

## Ferina and Fredo: complete content map

| PDF page | Printed pages | Content and educational purpose |
| --- | --- | --- |
| 1 | Cover | Birthday-party illustration, title, children together. |
| 2 | Title + 1 | Ferina's birthday is different this year: she feels unhappy. Her stepfather, previously loved and trusted, secretly watches her bathing. Privacy violations can involve familiar people. |
| 3 | 2-3 | She recalls her mother's advice about private parts. She freezes, fears another intrusion, and struggles to say no. The stepfather touches her, demands secrecy and obedience, claims affection, and threatens loss of home, food and maternal love. Fredo is also harmed; a neighbor is involved in exchange for money. This is abuse, coercion and exploitation, not a child's fault. |
| 4 | 4-5 | Distress affects eating, studying and schoolwork. Ferina feels shame and guilt. A teacher notices, asks gently, and offers help. Ferina fears being disbelieved. Fredo supports telling their teacher. |
| 5 | 6-7 | Open story decision: children need help despite fear of separation and harm. Workbook introduces teams of three, cutout character progress markers, and seven activities. Activity 1 asks whether the situation is dangerous, whether spying is acceptable, whom to tell, and whether the adults' behavior is abusive/exploitative. A word-bank sentence teaches privacy using swimwear as a reference and respecting other people's privacy. |
| 6 | 8-9 | Activity 2: word search and sentence with PENSAR, DECIDIR, ACTUAR, PELIGROSAS. Activity 3: identify bodily warning signals: crying, inability to speak or move, racing heart, trembling legs, stomach pain, sweating, flushed face. |
| 7 | 10-11 | Activity 4: classify behaviors, not simply people: respectful affection, protection, listening and valuing a child versus secret demands, isolating, coercion, threats, touching and silencing. Lists three trusted people. Activity 5: match assertive responses to unsafe touching, an offer of money, and online stranger contact. Responses include refusing touch, saying stop, declining an invitation, and not engaging with strangers. |
| 8 | 12-13 | Activity 6: choose immediate help from a nearer trusted adult rather than waiting for mother; tell the worried teacher; peers can help find an adult but cannot solve abuse alone; do not keep harmful secrets. Activity 7: assemble a body-as-treasure affirmation with an explicit reference to God. Match institutions: hospital, police, prosecutor's office, church, school. Reaching the goal symbolically represents getting help, not a factual completed rescue in the story. |
| 9 | 14-15 | Song titled `¡Yo digo no!` reinforces refusal, help-seeking, respect and protection. Final page supplies institution cutouts and character progress tokens. No recorded audio or musical score is supplied. |

## Shawi and Aledis: complete content map

| PDF page | Printed pages | Content and educational purpose |
| --- | --- | --- |
| 1 | Cover | Title `El Secreto de Shawi`; uncle and two children with sweets. |
| 2 | Cutouts + 1 | Swimwear and institution cutouts. Shawi cleans his room while parents shop on Saturdays. His cousin and classmate Aledis helps him. |
| 3 | 2-3 | Parents permit only Aledis to enter while absent. Uncle Zigor gains entry with sweets and help; Aledis later withdraws and seems sad at school. Zigor offers Shawi a present for a secret game. |
| 4 | 4-5 | Shawi experiences racing heart and sweaty hands. Zigor abuses him, forces reciprocal touching, takes intimate photographs and sends them to others for payment. Zigor threatens blame, punishment and disbelief. Shawi fears telling his parents. The source unfortunately describes the child's response as a bad decision; adaptation must not repeat victim-blaming. |
| 5 | 6-7 | At a family meal, Shawi tells Aledis, who reveals that Zigor also harmed her. They decide to seek help and refuse manipulation. Activity I begins: recognize that gifts and family status do not make boundary violations safe; identify manipulation through secrecy, deception and gifts. |
| 6 | 8-9 | Activity I continues: recognize abuse/exploitation and refuse unsupervised entry. Activity II: mark illustrated situations with happy/sad faces. Activity III: cover illustrated private parts with swimwear cutouts; source labels breasts, vagina, vulva, buttocks, testicles and penis. The diagram's external `vagina` arrow is anatomically imprecise; do not reproduce that labeling error. |
| 7 | 10-11 | Activity IV: distinguish protective adults (believe, defend, respect) from manipulating behaviors. Activity V: match yes/no to demands to lie, secret gifts, keeping secrets, private-part access, and telling a trusted adult. Source uses green NO and red YES; do not rely on color alone in a web version. |
| 8 | 12 + song | Activity VI: same body-as-treasure affirmation with God reference. Activity VII: institution matching for school, church, hospital, police and prosecutor. Closing `¡Yo digo no!` song has the same protective themes as the first workbook. |

## Shared lessons to preserve

1. A child's body, boundaries and privacy deserve respect; this applies to familiar people and relatives too.
2. Recognize unsafe behavior: secret demands, threats, isolating, unwanted touching, secret gifts, pressure and intimate-image requests. Judge actions, not appearance or occupation.
3. Feelings and physical signals can prompt seeking help. A child may also freeze, feel confused, or have no obvious warning signal.
4. Practice a simple response: say no if possible, move toward safety if possible, and tell a trusted adult. Continue telling another trusted adult if the first does not help.
5. A protective adult listens, believes, respects boundaries and acts to protect. Peers can accompany a child to help but are not responsible for rescuing them.
6. Receiving gifts, not resisting, waiting to tell, liking the person, or having broken a household rule does not make a child responsible for abuse.

## Adaptation safeguards and source limitations

These are implementation recommendations, clearly distinguished from literal source statements:

- Use gentle, non-graphic retellings. Preserve each story's characters, manipulation pattern, emotional arc and help-seeking lesson without staging abuse interactively or showing intimate photographs.
- Explicitly say `No es tu culpa` and `Nunca es tarde para pedir ayuda`. Never grade children as responsible for preventing abuse; incorrect game answers get supportive explanations and retry, not punishment.
- The source says all secrets are bad and sometimes ties harm to disobedience. Instead explain unsafe secrets (fear, pressure, harm) without implying every private thought or temporary surprise is dangerous.
- Do not imply shouting or saying no is always possible. Do not promise automatic rescue, guaranteed belief by every adult, or require confrontation with an abuser.
- A swimwear outline is a simple privacy teaching aid, not the complete definition of bodily autonomy. Any unwanted contact can matter. Do not reproduce naked child illustrations in the game; use clothed characters or neutral body outlines.
- The original institution list is not a verified current jurisdictional reporting directory. Do not invent helplines, legal processes, mandatory-reporting claims, or emergency contact details. Label educational help destinations appropriately; any real regional contact requires separate verification.
- Both books contain faith-based language. Preserve awareness of that source context; do not silently present a secular paraphrase as a verbatim quote. The user request, not the PDFs, determines whether an explicit religious statement belongs in product copy.
- Do not ask users to disclose personal abuse, names, contact details, photos, or accounts. Trusted-adult planning can use role cards and need not store personal data.
- No source author, publication date, license, verified intended age, answer key, audio recording or tune was established from these scans. The second filename suggests 6-9 years but this alone is not an expert age-suitability assessment.

## Implementation-ready activity mapping

| Website activity | Source grounding | Safe interaction |
| --- | --- | --- |
| Story chapters | Ferina PDF 2-5; Shawi PDF 2-5 | Short narrated text, clothed characters, optional pause/skip, hopeful adult-support ending labeled adaptation. |
| Emotion or body-signal cards | Ferina PDF 6; Shawi PDF 4 | Select feelings and signals; multiple experiences are valid; no diagnostic claims. |
| Safety choices | Ferina PDF 5, 7-8; Shawi PDF 5-7 | Scenario cards with immediate explanatory feedback; actions rather than labeling people bad by appearance. |
| My support circle | Ferina PDF 7-8; Shawi PDF 7-8 | Select trusted-adult behaviors and role cards, no identifying information. |
| Safe-boundary phrases | Ferina PDF 7; Shawi PDF 7 | Match helpful phrases with scenarios; include requesting help when speaking up was impossible. |
| Word puzzle / affirmation | Ferina PDF 6, 8; Shawi PDF 8 | Accessible button-based ordering/matching rather than drag-only mechanics. |
| Help destinations | Ferina PDF 8-9; Shawi PDF 2, 8 | Educational matching; do not confuse a church/school with a verified formal reporting authority. |

## Key Learnings:

1. Both sources are scanned prevention workbooks; all 17 PDF pages required visual reading rather than text extraction.
2. The file named for ages 6-9 contains Shawi and Aledis, a distinct story that should not be collapsed into Ferina and Fredo.
3. Source-faithful educational adaptation must preserve help-seeking while explicitly correcting victim-blaming and avoiding graphic reenactment.
