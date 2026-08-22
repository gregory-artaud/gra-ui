# gra-ui

React components for interfaces that need a little more personality than strictly necessary.

`gra-ui` is a React 19 component library built by composing shadcn/ui primitives. It ships typed ESM and CommonJS bundles with a standalone compiled stylesheet, so consuming applications do not need Tailwind CSS.

## Installation

```bash
pnpm add gra-ui
```

Import the component styles once in your application:

```tsx
import "gra-ui/styles.css";
```

## MarkupPromotion

`MarkupPromotion` promotes a notice through increasingly official HTML containers one click at a time.

```ts
type MarkupPromotionProps = {
  children: React.ReactNode;
};
```

Press `Promote to section`, `Promote to article`, `Promote to aside` and `Promote to quoted` in order. The child moves through five real block-level containers with distinct structure and styling; `Clear promotions` returns it to a plain block. It could let a reviewer raise a handoff note through five ranks, or let a presenter promote an agenda line until it looks authoritative. Both uses mistake HTML structure for earned status. A reasonable local alternative is choosing the correct element once and adding one nearby status if needed.

## SeparatorBallot

`SeparatorBallot` asks three policies how a readable label should be divided.

```ts
type SeparatorBallotProps = {
  label: string;
};
```

Choose `Dot trail`, `Slash file` or `Column fall`. The actual separators change, and the column choice renders a real numbered list; `Return to spacing` restores the original label. It could let a reviewer vote on how a handoff phrase occupies a board, or let a presenter give an agenda line a punctuation policy. Neither use makes the words more authoritative. A reasonable local alternative is writing the desired separator directly or leaving the sentence in normal flow.

## BeltCollector

`BeltCollector` lets a pickup head collect children from a belt into a separate tray.

```ts
type BeltCollectorProps = {
  children: React.ReactNode;
};
```

Drag the pickup head across the belt, or focus it and use the arrow keys. Each reached child leaves the belt and appears in the real pickup tray; `Reset belt` returns every piece. It could let a reviewer sweep fields from a handoff brief into a tray, or let a presenter physically collect agenda items before advancing. A reasonable local alternative is an ordinary list with selection state or one batch action.

## OperationParade

`OperationParade` makes the order of three arithmetic operations decide the final number.

```ts
type OperationParadeProps = {
  value: number;
};
```

Press `Double`, `Add seven` and `Reverse` in any order, once each. The live value changes after every operation and different orders produce different results; `Restart parade` returns to the supplied value. It could make a reviewer process a handoff estimate as a tiny ceremony, or let a presenter demonstrate order sensitivity on an agenda number. A reasonable local alternative is one explicit expression or named calculation function.

## RedundancyCuller

`RedundancyCuller` removes repeated words from a sentence and files the discarded copies.

```ts
type RedundancyCullerProps = {
  label: string;
};
```

Press `Cull repeats` to keep the first occurrence of each word, remove later case-insensitive repeats from the visible sentence and list the discarded words in a drawer. `Restore repetitions` returns the original label. It could let a reviewer shorten a handoff sentence or let a presenter strip an agenda line to its first mention of every term. A reasonable local alternative is editing the copy deliberately or leaving intentional repetition intact.

## CoilCertification

`CoilCertification` winds four actual loops around a notice before geometry is allowed to call it certified.

```ts
type CoilCertificationProps = {
  children: React.ReactNode;
};
```

Press `Wind another loop` to add a visible perimeter around the child; the chamber changes at every stage and `Uncoil and begin again` returns to the empty coil. It could let a reviewer certify a handoff note once per glance, or let a presenter enclose an agenda line before advancing a slide. Both uses confuse enclosure with evidence. A reasonable local alternative is one status badge or a direct approval action near the notice.

## WitnessChoice

`WitnessChoice` asks an unnecessary witness to lead, stand beside or follow the same notice.

```ts
type WitnessChoiceProps = {
  children: React.ReactNode;
};
```

Choose `Lead`, `Side` or `Tail`. Each option renders a genuinely different arrangement with its own witness slip, and `Return to unwitnessed` clears the choice. It could let a reviewer decide where a handoff note should be chaperoned, or let a presenter give an agenda label a ceremonial escort position. Both uses make layout answer to a vote. A reasonable local alternative is one nearby status label and the intended layout authored directly at the call site.

## ShutterPass

`ShutterPass` reveals only the arbitrary slice of a notice left open by a movable reading shutter.

```ts
type ShutterPassProps = {
  children: React.ReactNode;
};
```

Drag the shutter across the rail, or focus it and use the arrow keys, Home or End. The child is actually clipped to the chosen aperture; `Reset aperture` restores the middle opening. It could let a reviewer reveal a handoff note only as far as attention permits, or let a presenter choose how much of an agenda label an audience deserves to see. A reasonable local alternative is the content itself or one deliberate disclosure control; a draggable clip boundary adds geometry to a visibility decision.

## ReturnProtocol

`ReturnProtocol` makes a notice travel through a borrow, witness and return sequence.

```ts
type ReturnProtocolProps = {
  children: React.ReactNode;
};
```

Press `Borrow notice`, then `Add witness mark`, then `Return notice`. The child moves from Home to a Loan Tray, receives a real visible mark and returns only in that order; `Cancel protocol` restores the opening state. It could make a reviewer borrow a handoff note before annotating it, or let a presenter rehearse taking an agenda line off a slide and returning it with a mark. The sequence creates custody theater instead of accountability. A reasonable local alternative is one edit action with a visible status.

## AcronymForge

`AcronymForge` transforms a readable phrase into its actual opening-letter acronym and keeps a source trail.

```ts
type AcronymForgeProps = {
  label: string;
};
```

Press `Forge acronym` to replace the phrase with the initials of its words and show the source ledger; `Restore phrase` returns the original label. It could let a reviewer compress a handoff sentence into meeting shorthand, or let a presenter forge a slide code from an agenda phrase before restoring it. Both uses reward losing words that were already doing useful work. A reasonable local alternative is keeping the phrase and deriving an acronym locally only where the shortened form is actually needed.

## SpellingPermit

`SpellingPermit` reveals a label one correctly typed character at a time.

```ts
type SpellingPermitProps = {
  label: string;
};
```

Type the exact `label` into the field. Each correct character reveals one actual letter and fills the permit bar; a wrong character is rejected, and `Revoke` returns to the empty state. It could make a reviewer retype a handoff status before admitting it to a board, or let a presenter reveal an agenda phrase as if spelling were security clearance. The use case remains discutable because a readable label gains no authority from being retyped one character at a time. A reasonable local alternative is rendering the label and validating one ordinary input only when validation is actually needed.

## SliceReferendum

`SliceReferendum` lets three editorial cuts decide which actual part of a label survives.

```ts
type SliceReferendumProps = {
  label: string;
};
```

Choose `Opening`, `Middle` or `Closing`. The full label is replaced by a genuinely different excerpt, and `Reopen the whole label` restores it. It could let a reviewer decide whether a handoff note deserves its opening request or closing deadline, or let a presenter reduce an agenda sentence to whichever clause feels most official. The use case remains discutable because a deterministic substring is not improved by a governance ritual. A reasonable local alternative is choosing a substring near the data or authoring the intended excerpt directly.

## CompassHinge

`CompassHinge` rotates content around an imaginary north.

```ts
type CompassHingeProps = {
  children: React.ReactNode;
};
```

Drag the dial knob, or focus it and use the arrow keys. The child rotates to the knob's real angle; `Face north` returns it to zero degrees. It could let a reviewer turn a warning toward the side of a room where discussion is happening, or let a presenter orient an agenda label toward its speaker. The use case remains discutable because direction can be stated without physically pivoting a readable label. A reasonable local alternative is normal text flow with one alignment or orientation choice.

## EventRelay

`EventRelay` delivers content through three browser events in an exact order.

```ts
type EventRelayProps = {
  children: React.ReactNode;
};
```

Focus the relay panel, scroll once, then press Space. The child moves through the Focus, Wheel and Space stations; an event out of order returns it to the first station, and `Recall cargo` resets it. It could make a reviewer focus, scroll and confirm before delivering a handoff field, or let a presenter rehearse three different browser gestures before releasing an agenda label. The use case remains discutable because one explicit button would communicate delivery more reliably. A reasonable local alternative is one button with an ordinary handler and visible status.

## AlphabetizeWords

`AlphabetizeWords` rearranges the actual characters inside every word.

```ts
type AlphabetizeWordsProps = {
  label: string;
};
```

Press `Mill the words` to sort each word's letters alphabetically while preserving its spaces; the rendered sentence changes and `Restore reading` reverses it. It could let a reviewer inspect a sentence as a pile of letters, or let a presenter turn an agenda line into an alphabetical artifact before restoring the readable copy. The use case remains discutable because alphabetical order is not a credible reason to destroy readability. A reasonable local alternative is leaving the copy intact and using a one-off string utility for analysis.

## CalibrationWindow

`CalibrationWindow` makes a notice pass through four progressively narrower calibration apertures.

```ts
type CalibrationWindowProps = {
  children: React.ReactNode;
};
```

Press `Calibrate one notch` to advance the real progression. Each notch narrows the rendered notice, raises it and adds another ruler mark; `Open it again` restores the generous opening. It could let a reviewer certify that a handoff note survives increasingly strict apertures, or let a presenter calibrate one agenda label before putting it on a slide. A reasonable local alternative is one `max-width` and ordinary layout; four irreversible measurements make a notice less readable without adding meaning.

## SemanticLottery

`SemanticLottery` lets one child draw one of three genuinely different semantic presentations.

```ts
type SemanticLotteryProps = {
  children: React.ReactNode;
};
```

Choose `Briefing`, `Ledger` or `Aside` from the radio cards. The child is actually rendered inside an `article`, a definition list or an `aside`, with different structure and layout; `Return to plain content` clears the draw. It could let an editor classify a handoff note, or let a presenter give an agenda label a formal structural identity. A reasonable local alternative is choosing the correct element where the content is authored; a semantic lottery is ceremony around a decision the page already knows.

## CellularDrift

`CellularDrift` moves one child to a selected cell in a nine-cell board.

```ts
type CellularDriftProps = {
  children: React.ReactNode;
};
```

Click a numbered cell to move the actual child there, or focus its control and press Enter. The child travels between real grid coordinates and `Return to the middle` restores cell five. It could let a reviewer park a warning where attention wandered, or let a presenter assign an agenda item a tactical coordinate on a slide. A reasonable local alternative is normal flow or one alignment value; a nine-cell board makes a simple position depend on a needless ceremony.

## ReverseQueue

`ReverseQueue` accepts children only from last to first and keeps the resulting reverse manifest.

```ts
type ReverseQueueProps = {
  children: React.ReactNode;
};
```

Click the final child first, then each predecessor. Correct items leave the board for a visible manifest in the order clicked, while a wrong choice shakes and remains available; `Empty the queue` resets the sequence. It could make a reviewer board a handoff brief in reverse importance, or let a presenter reveal agenda fields backwards for a theatrical explanation. A reasonable local alternative is rendering the intended order directly; a backwards queue is a sequence puzzle pretending to be a data structure.

## PunctuationSieve

`PunctuationSieve` removes the actual punctuation from a label one mark at a time.

```ts
type PunctuationSieveProps = {
  label: string;
};
```

Press `Sieve next mark` to replace the next punctuation character with a visible placeholder and put the real mark in a tray; `Put marks back` restores the label. It could let a reviewer inspect which marks create drama in a handoff sentence, or let a presenter strip punctuation from an agenda phrase before returning it. A reasonable local alternative is leaving punctuation in the sentence or using one local text utility; a sieve should not supervise a comma one click at a time.

## ContextEscalator

`ContextEscalator` sends a notice through four increasingly serious filing levels by right-clicking it.

```ts
type ContextEscalatorProps = {
  children: React.ReactNode;
};
```

Right-click the notice, or press `Open next context`, to record one level. Each level adds a visible record and paper shadow; `Clear context` restores the initial state. It could let a reviewer escalate a handoff note through progressively official filing levels, or let a presenter right-click an agenda label until it earns a ceremonial status. A reasonable local alternative is one visible status field and a normal button; a context menu should not carry a four-step approval ladder.

## OutcomeTriptych

`OutcomeTriptych` gives one child three materially different fates.

```ts
type OutcomeTriptychProps = {
  children: React.ReactNode;
};
```

Choose `Promote`, `Quarantine` or `Muffle`. The actual rendered treatment becomes a priority card, a fieldset or a softened notice, and `Return to indecision` restores the waiting state. It could let a reviewer assign one of three fates to a handoff note, or let a presenter give an agenda label a temporary verdict. A reasonable local alternative is one explicit status and one conditional near the data; a reusable tribunal hides a simple decision behind ceremony.

## MagneticDock

`MagneticDock` makes dragged content snap to the nearest of three named pockets.

```ts
type MagneticDockProps = {
  children: React.ReactNode;
};
```

Drag the cargo anywhere across the surface and release it. The component calculates the nearest pocket and moves the content there; arrow keys choose pockets and `Release cargo` returns it to the middle. It could let a reviewer fling a warning toward the nearest filing category, or let a presenter park an agenda label wherever it happens to attract. A reasonable local alternative is normal flow layout with one category; a magnetic coordinate surface adds calculations where a button or list would suffice.

## PatternLatch

`PatternLatch` opens a child only after the exact triangle-circle-square-circle pattern is entered.

```ts
type PatternLatchProps = {
  children: React.ReactNode;
};
```

Select the four symbols in order. A wrong symbol clears the attempt, while the correct sequence opens the notice; `Forget pattern` returns the lock to its initial state. It could make a reviewer unlock a handoff note with a pattern remembered from a meeting, or make a presenter perform a tiny gesture ritual before revealing an agenda line. A reasonable local alternative is an ordinary button or permission check; a fixed pattern protects nothing and mainly provides a memorable failure mode.

## LetterCensus

`LetterCensus` replaces a label with an animated frequency ledger of its actual letters.

```ts
type LetterCensusProps = {
  label: string;
};
```

Press `Count letters` to transform the text into a first-seen list of unique letters, with bars sized by their real counts. `Restore label` reverses the transformation. It could let a reviewer audit which letters dominate a handoff sentence, or let a presenter turn one agenda phrase into a tiny linguistic report before restoring it. A reasonable local alternative is the original label or a one-off utility; a census machine is not a meaningful UI primitive.

## RecessDepth

`RecessDepth` files a child beneath four actual layers until it becomes needlessly recessed.

```ts
type RecessDepthProps = {
  children: React.ReactNode;
};
```

Press `File one layer` to move the content deeper and add a visible layer to the filing well. `Unbury` restores the initial state. It could let a reviewer bury a handoff note under successive approval sheets, or let a presenter recess an agenda label before deciding it has been sufficiently archived. A reasonable local alternative is the child itself with one status or a normal disclosure; four physical filing layers make a simple label harder to retrieve without adding meaning.

## CustodyChoice

`CustodyChoice` gives one child three custody destinations that produce genuinely different rendered states.

```ts
type CustodyChoiceProps = {
  children: React.ReactNode;
};
```

Choose `Desk`, `Vault` or `Courier` to move the actual content from intake into that station, then use `Recall` to return it. It could make a reviewer decide where a handoff note belongs, or let a presenter route one agenda label to the table, the archive or the next speaker. A reasonable local alternative is one explicit state near the data and one conditional render; publishing three ceremonial destinations as a reusable custody machine is difficult to defend.

## Counterweight

`Counterweight` lets a user drag a weight across five slots while its child moves to the exact mirrored slot.

```ts
type CounterweightProps = {
  children: React.ReactNode;
};
```

Drag the weight, or focus the rail and use the arrow keys. The cargo keeps the opposite position until `Recenter` restores the balance. It could let a reviewer position a handoff warning opposite the place where attention is dragged, or let a presenter balance an agenda label against a deliberately chosen counter-position. A reasonable local alternative is normal flow layout with one alignment value; a mirrored cargo rail creates a surprising coordinate rule where a direct position would have been enough.

## ShadowPair

`ShadowPair` requires every child to be selected, then paired with its matching witness, in order.

```ts
type ShadowPairProps = {
  children: React.ReactNode;
};
```

Select `card 1`, then `witness` in the same row, and repeat for every row. A wrong card or witness erases the route; `Restart` begins again. It could make a reviewer acknowledge every handoff field and then sign its matching shadow, or make a presenter pair each agenda item with an unnecessary witness before advancing. A reasonable local alternative is one ordered checklist with independent completion state; requiring a second click on a matching witness makes sequence state reusable where a list would suffice.

## CenterOut

`CenterOut` reassembles a label from its middle outward into a new reading order.

```ts
type CenterOutProps = {
  label: string;
};
```

Press `Read from the middle` to put the center character first, then alternate its neighbors outward. The actual character order changes and `Straighten the sentence` restores it. It could let a reviewer inspect the center of a handoff sentence before its edges, or let a presenter make one agenda phrase radiate outward during a theatrical explanation. A reasonable local alternative is ordinary text selection or typographic emphasis; a center-first reading order makes a sentence less readable without revealing anything useful.

## PunchProof

`PunchProof` makes a child earn five visible perforations before its proof card is complete. The holes fill one at a time, the card settles into a completed state, and `Re-file` returns it to the untouched card.

```ts
type PunchProofProps = {
  children: React.ReactNode;
};
```

Press `Punch next hole` five times. The perforation strip animates on every press and the content receives its final over-certified treatment only at the fifth hole. It could make a reviewer punch an approval card before filing a handoff note, or let a presenter perforate an agenda label before moving on. A reasonable local alternative is a normal progress indicator or no approval ceremony; a card does not become more correct because a button opened five holes in it.

## SortMandate

`SortMandate` gives one roster three arbitrary ordering rules and applies the selected rule to the actual rendered item order.

```ts
type SortMandateProps = {
  items: readonly string[];
};
```

Choose `First letter`, `Most vowels` or `Last letter`. Each choice produces a different order with a short arrival animation, and `Withdraw` restores the supplied order. It could make a reviewer decide how a handoff roster should be officially arranged, or let a presenter rearrange agenda labels according to whichever criterion feels authoritative. A reasonable local alternative is one explicit `sort` near the data; a reusable tribunal for arbitrary ordering rules makes list intent harder to understand.

## LensRail

`LensRail` lets a user move a lens across a label and inspect a real seven-character excerpt at each position.

```ts
type LensRailProps = {
  label: string;
};
```

Drag the range or use its arrow keys. The focused character lifts on the rail, and the excerpt below changes with the lens position; `Return lens to the start` restores the initial position. It could let a reviewer inspect a narrow slice of a long handoff label, or let a presenter park a magnified phrase over one agenda item. A reasonable local alternative is ordinary text selection or static truncation; a draggable lens is difficult to defend when the sentence was already readable.

## QuotaProcession

`QuotaProcession` makes each child demand a different number of taps before the next child may be touched.

```ts
type QuotaProcessionProps = {
  children: React.ReactNode;
};
```

The first child needs one tap, the second two, the third three, then the quota pattern repeats. Only the active step is interactive, its marks fill in place, and completed pieces remain filed; `Return to the first stage` restarts the procession. It could force a reviewer to tap a title, status and owner according to an arbitrary handoff ritual, or make a presenter perform a growing ceremony on each agenda label. A reasonable local alternative is an ordered list with one completion button; per-item tap quotas add ceremony without information.

## Braidline

`Braidline` transforms a label into two visible strands by distributing its actual alternating characters, then can return the text to one straight line.

```ts
type BraidlineProps = {
  label: string;
};
```

Click `Braid the characters` to replace the line with an animated two-row braid; click `Unbraid the line` to restore it. The characters are not decorative copies: the rendered content is reorganized into two real strands. It could let a reviewer braid a handoff phrase while discussing its structure, or let a presenter turn an agenda line into a two-strand visual aside. A reasonable local alternative is the original label with deliberate typography; a reusable character loom is not a meaningful content abstraction.

## WheelStamp

`WheelStamp` makes a child collect five paper seals from a local mouse wheel. Each notch advances a real state and adds a visible seal; rolling back or removing the stamps returns the paper to its initial form.

```ts
type WheelStampProps = {
  children: React.ReactNode;
};
```

Roll over the paper, or focus it and use the arrow keys, to progress from zero to five seals. It could make a reviewer over-certify a handoff note, or let a presenter stamp an agenda label before allowing it onto a slide. A reasonable local alternative is a progress indicator or no indicator at all; scrolling should not issue paper authority.

## ElasticFrame

`ElasticFrame` lets a child be resized directly by dragging its frame handle. The available width changes the actual wrapping of the content and remains at the chosen measurement until the frame is restored.

```ts
type ElasticFrameProps = {
  children: React.ReactNode;
};
```

Drag the right handle, or focus it and use the arrow keys, to force the content into an arbitrary width. It could let a reviewer test whether a handoff label survives an unreasonable column, or let a presenter choose the least readable width for an agenda. A reasonable local alternative is normal responsive layout with a deliberate max-width; a draggable frame is not a layout system.

## NeighborMarch

`NeighborMarch` requires every child to be visited by stepping only to an adjacent child. A long-distance click resets the route, and a completed route keeps the real visited state until reset.

```ts
type NeighborMarchProps = {
  children: React.ReactNode;
};
```

Choose any first piece, then click or focus each untouched neighbor in sequence. It could make a reviewer inspect fields as though they were tiles in a corridor, or make a presenter walk an agenda left and right instead of selecting a topic directly. A reasonable local alternative is a normal list with independent focus; adjacency is not a useful requirement for reading.

## SignalChoice

`SignalChoice` offers three genuinely different encodings of a label: Morse marks, Braille glyphs or numbered ledger initials. The selected choice changes the actual rendered content, not only its color or decoration.

```ts
type SignalChoiceProps = {
  label: string;
};
```

Choose one encoding and restore the original label when the experiment is over. It could turn a handoff status into an unnecessarily formal signal, or let a presenter choose a different notation for each agenda line. A reasonable local alternative is one explicit formatter chosen by the page; three incompatible records are not a useful label API.

## FootnoteShift

`FootnoteShift` moves clicked words out of a sentence and into a numbered footnote rail. The sentence receives a visible placeholder, while the actual word remains available in its new position and can be returned.

```ts
type FootnoteShiftProps = {
  label: string;
};
```

Click a word to relocate it, or click its footnote to restore it; `Restore sentence` returns every word at once. It could make a reviewer quarantine debatable words in a handoff note, or let a presenter demote agenda terms into a running scholarly apparatus. A reasonable local alternative is an annotation or footnote supplied by the page; moving prose around one click at a time is not editorial tooling.

## PrecisionLadder

`PrecisionLadder` makes a child earn its center through four increasingly small target rings. A successful hit advances the real progress state and tightens the next ring; a miss returns the ladder to its outer ring. The target gives a short scale-and-ring hit animation and a small rejection shake.

```ts
type PrecisionLadderProps = {
  children: React.ReactNode;
};
```

`children` is the content placed in the target. Click nearer the center on each attempt, or focus the target and press `Enter` or `Space`; after four successful hits the child is considered centered. It could make a reviewer center a handoff warning before it is presentable, or let a presenter earn the exact middle of a slide for one agenda label. A reasonable local alternative is a centered container with no ceremony; a label does not gain authority from being clicked near its own center.

## MaskBallot

`MaskBallot` gives a child three physical stencil choices. Choosing `Round`, `Ticket` or `Slit` changes the actual clipping geometry of the rendered content, with a snap animation as the mask settles.

```ts
type MaskBallotProps = {
  children: React.ReactNode;
};
```

`children` is the content covered by the selected stencil. Choose one of the three buttons to create a materially different opening, then remove the stencil to return to the unmasked state. It could let a reviewer choose how a warning is seen through a paper opening, or give a presenter three ceremonial ways to reveal an agenda label. A reasonable local alternative is one CSS mask chosen directly by the page; content does not need a ballot for perforation.

## FreeDrift

`FreeDrift` lets a child keep arbitrary coordinates inside a bounded grid. Dragging moves the real position directly, arrow keys make five-point adjustments, and the cargo settles with a short positional transition.

```ts
type FreeDriftProps = {
  children: React.ReactNode;
};
```

`children` is the single draggable cargo. Drag it anywhere inside the surface, or focus it and use the arrow keys; `Return to center` restores the initial position. It could let a reviewer park a handoff note where attention wandered, or let a presenter assign an agenda label a personally selected coordinate on a slide. A reasonable local alternative is normal flow layout or one alignment value; arbitrary coordinates are not a filing system.

## DocketSequence

`DocketSequence` moves a child through four visible stations only when three actions happen in order: click `Open docket`, type exactly one character, then click `File with evidence`. The cargo translates between stations and gives the final filing a small settle animation.

```ts
type DocketSequenceProps = {
  children: React.ReactNode;
};
```

`children` is the content filed by the sequence. The evidence field is unavailable until the docket is open, and filing is unavailable until one character exists; `Clear docket` starts over. It could make a reviewer open a handoff item, add a one-character evidence mark and file it, or force an agenda label through a miniature approval ritual. A reasonable local alternative is one button and one boolean; a trivial filing does not need a key, a gate and four stations.

## VowelHinge

`VowelHinge` detaches the first vowel from one word at a time. The original word gains a visible gap and the removed vowel becomes a raised chip beside it, so the rendered content is structurally transformed rather than merely recolored; `Restore words` returns every letter to its word.

```ts
type VowelHingeProps = {
  label: string;
};
```

`label` is the sentence whose words are transformed. Click `Hinge next vowel` until each word has surrendered one vowel. It could make a reviewer separate the vocal centers of a handoff note, or let a presenter hang one vowel from each agenda word while discussing its structure. A reasonable local alternative is the original sentence with an annotation; a short label does not become clearer when its vowels are put on hinges.

## RatchetReveal

`RatchetReveal` opens children one sealed tooth at a time. Each notch changes the real rendered state and stays open until the ratchet is reset.

```ts
type RatchetRevealProps = {
  children: React.ReactNode;
};
```

```tsx
import { RatchetReveal } from "gra-ui";
import "gra-ui/styles.css";

export function NotarizedFields() {
  return (
    <RatchetReveal>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </RatchetReveal>
  );
}
```

Click `Advance one notch` or focus it and press `Enter`. Exactly one child becomes visible in the ratchet, the progress rail advances, and `Reset` closes every tooth. It could be used to reveal handoff fields only as a reviewer discusses them, or to open agenda items one notch at a time during a ceremonial briefing. A reasonable local alternative is a normal row with one disclosure state; visibility should not require mechanical paperwork.

## VerdictSelector

`VerdictSelector` gives a label three binding editorial verdicts that produce genuinely different text.

```ts
type VerdictSelectorProps = {
  label: string;
};
```

```tsx
import { VerdictSelector } from "gra-ui";
import "gra-ui/styles.css";

export function JudgedStatus() {
  return <VerdictSelector label="Ready for another review" />;
}
```

Choose `Headline`, `Ledger` or `Whisper`. The output changes its word order, numbering or initials rather than only changing its appearance; `Reopen the case` returns the undecided label. It could be used to give a handoff note an unnecessarily official register, or to let a presenter choose how an agenda line is recorded. A reasonable local alternative is one formatter function selected directly by the page; three buttons should not decide how a short label is allowed to exist.

## OrbitStow

`OrbitStow` parks a child at one of eight orbital docks through direct manipulation.

```ts
type OrbitStowProps = {
  children: React.ReactNode;
};
```

```tsx
import { OrbitStow } from "gra-ui";
import "gra-ui/styles.css";

export function OrbitalNotice() {
  return <OrbitStow><span>Review me</span></OrbitStow>;
}
```

Drag the cargo around the ring, or focus it and use the arrow keys. The child moves to the selected dock and remains there until `Return to dock 1`. It could be used to park a warning at a reviewer-chosen edge of a card, or to orbit an agenda label toward the corner of a slide. A reasonable local alternative is one CSS position or alignment control; circling content does not make it better filed.

## PalindromeLatch

`PalindromeLatch` seals children only after the activation route reads the same forwards and backwards.

```ts
type PalindromeLatchProps = {
  children: React.ReactNode;
};
```

```tsx
import { PalindromeLatch } from "gra-ui";
import "gra-ui/styles.css";

export function MirroredAgenda() {
  return (
    <PalindromeLatch>
      <span>Open</span>
      <span>Review</span>
      <span>Decide</span>
      <span>Close</span>
    </PalindromeLatch>
  );
}
```

Activate the pieces in ascending order and then back down the same route: `1, 2, 3, 4, 3, 2, 1`. A wrong choice clears the sequence; a complete palindrome fills the latch tray. It could be used to make a reviewer open and close a handoff card through a mirrored ceremony, or to let a presenter walk an agenda forward and backward before it is settled. A reasonable local alternative is one ordered list and a completion button; an action sequence does not improve when it has to rhyme with itself.

## InsideOutWords

`InsideOutWords` reverses the actual letters of whichever words you click.

```ts
type InsideOutWordsProps = {
  label: string;
};
```

```tsx
import { InsideOutWords } from "gra-ui";
import "gra-ui/styles.css";

export function ReversibleNote() {
  return <InsideOutWords label="Ready for another review" />;
}
```

Click a word, or focus it and press `Enter` or `Space`. Its letters reverse in the rendered sentence and stay reversed independently; `Restore sentence` returns the original text. It could be used to mark challenged words in a handoff note, or to make agenda terms temporarily unreadable while they are discussed. A reasonable local alternative is the original label plus an annotation style; clickable letter reversal is not a credible review status.

## FocusReceipt

`FocusReceipt` turns focus into an unnecessary receipt printer. Focus an original child and a real copy appears in the station bearing that child’s position; the original stays where it was, so the receipt records attention without improving the content.

```ts
type FocusReceiptProps = {
  children: React.ReactNode;
};
```

```tsx
import { FocusReceipt } from "gra-ui";
import "gra-ui/styles.css";

export function AuditedFields() {
  return (
    <FocusReceipt>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </FocusReceipt>
  );
}
```

Focus an original field by clicking it or tabbing through the row. Each focus leaves a persistent duplicate in the receipt station matching the field’s original position; `Clear receipt` returns the empty receipt. It could be used to make a reviewer leave a physical-looking copy of every field they inspect on a handoff card, or to let a presenter build a receipt of the agenda labels they touched during a talk. A reasonable local alternative is a focus style and one local array of visited indices. This component should not have existed because looking at a field should not duplicate it.

## RulerRise

`RulerRise` turns a ruler dragged across a row into a one-way elevation order. Each marker the ruler passes raises the next child onto a higher visible step and keeps it there until the whole row has climbed or the staircase is lowered.

```ts
type RulerRiseProps = {
  children: React.ReactNode;
};
```

```tsx
import { RulerRise } from "gra-ui";
import "gra-ui/styles.css";

export function RaisedBrief() {
  return (
    <RulerRise>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </RulerRise>
  );
}
```

Drag the ruler across the rail, or focus it and press `ArrowRight`. Each passed marker raises one child onto a higher step and keeps it there; `Lower all` returns the original row. It could be used to make a reviewer physically raise the fields that deserve attention on a handoff card, or to let a presenter elevate agenda items into a literal staircase as they are discussed. A reasonable local alternative is an array index and one conditional class in the page. This component should not have existed because a ruler crossing a line is not evidence that content deserves a higher place.

## LassoLock

`LassoLock` turns a drawn rectangle into a real filing decision. Enclose at least two children and the pieces whose centers fall inside the box leave the loose field for a locked tray while the other pieces stay in place.

```ts
type LassoLockProps = {
  children: React.ReactNode;
};
```

```tsx
import { LassoLock } from "gra-ui";
import "gra-ui/styles.css";

export function BoxedBrief() {
  return (
    <LassoLock>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </LassoLock>
  );
}
```

Drag across the field and release when one rectangle encloses at least two pieces. The enclosed children move into the locked tray and arrive with a short settle animation; the initial field, drawing state and locked state remain observable until `Reset` is used. Keyboard users can tab to the field and press `Space` or `Enter` to lock the first two pieces. It could be used to make a reviewer draw a literal box around the fields that belong together on a handoff card, or to let a presenter quarantine the agenda items they are about to discuss. A reasonable local alternative is an array filter with one selected range and a normal layout. This component should not have existed because a rectangle around content is not a meaningful ownership boundary.

## WordTurnstile

`WordTurnstile` makes a label pass through a word-by-word turnstile. Each activation rotates the next word 180 degrees and keeps that real transformation until every word has paid its unnecessary inversion fee.

```ts
type WordTurnstileProps = {
  label: string;
};
```

```tsx
import { WordTurnstile } from "gra-ui";
import "gra-ui/styles.css";

export function UpsideDownBrief() {
  return <WordTurnstile label="Ready for another review" />;
}
```

Click `Turn next word` or focus the native button and press `Enter` or `Space`. The next word rotates upside down and stays transformed; `Reset label` returns every word to its original orientation. It could be used to make a reviewer invert each word of a handoff status before a meeting, or to let a presenter ceremonially turn an agenda line upside down as each topic is discussed. A reasonable local alternative is the original label with one ordinary class. This component should not have existed because a sentence does not become more complete when its words are upside down.

## MarginQuota

`MarginQuota` makes a label rent its own margin. Click the control and it reserves one visible slot for every character in the label, moving the text into a real side margin until the space is reclaimed.

```ts
type MarginQuotaProps = {
  label: string;
};
```

```tsx
import { MarginQuota } from "gra-ui";
import "gra-ui/styles.css";

export function RentedLabel() {
  return <MarginQuota label="Review this once" />;
}
```

Click `Reserve the margin` or focus it and press `Enter`. The label shifts into a responsive margin containing one slot per character; `Reclaim space` returns it to the full-width surface. It could be used to make a reviewer reserve visual room for a handoff note before it is allowed to stand beside a decision, or to let a presenter give an agenda label a literal amount of breathing room proportional to its copy. A reasonable local alternative is a normal layout with an intentional `margin-inline` value. This component should not have existed because a label's character count is not a credible landlord.

## RotationTithe

`RotationTithe` charges pointer distance for the privilege of turning a label. Move the pointer back and forth across the receipt until a full track width has been spent; the label rotates 45 degrees and keeps the turn until it is returned.

```ts
type RotationTitheProps = {
  label: string;
};
```

```tsx
import { RotationTithe } from "gra-ui";
import "gra-ui/styles.css";

export function TaxedReceipt() {
  return <RotationTithe label="Approved for another review" />;
}
```

Move across the interactive surface with a pointer, or use the left and right arrow keys after focusing it. The distance bank accumulates until a complete width buys a real 45-degree turn; `Return receipt` restores the initial orientation. It could be used to make a reviewer spend attention before rotating a caution label, or to let a presenter ceremonially turn an agenda note after each extra pass across a slide. A reasonable local alternative is a label with one ordinary class and no pointer accounting. This component should not have existed because cursor distance is not a meaningful reason to reorient text.

## LetterLevy

`LetterLevy` makes a keyboard letter into a filing order. Press a letter that appears in the label and every matching occurrence leaves the sentence for a visible levy drawer.

```ts
type LetterLevyProps = {
  label: string;
};
```

```tsx
import { LetterLevy } from "gra-ui";
import "gra-ui/styles.css";

export function TaxedStatus() {
  return <LetterLevy label="Review the brief today" />;
}
```

Focus the label surface and press a visible letter. All matching characters disappear from the rendered label and arrive as individual tokens in the drawer; `Restore label` returns the original text. It could be used to make a reviewer pay a textual levy before filing a handoff status, or to let a presenter remove every copy of one letter from an agenda heading while discussing it. A reasonable local alternative is a string filter with an ordinary display. This component should not have existed because a keyboard character is not an authority entitled to tax an entire sentence.

## ParityPurge

`ParityPurge` asks whether odd or even child positions deserve to survive. Choosing a rule moves the other children into a real discard tray, turning an arbitrary numbering decision into a visible filing state.

```ts
type ParityPurgeProps = {
  children: React.ReactNode;
};
```

```tsx
import { ParityPurge } from "gra-ui";
import "gra-ui/styles.css";

export function ParityFiledFields() {
  return (
    <ParityPurge>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </ParityPurge>
  );
}
```

Choose `Keep odd positions` or `Keep even positions`. The selected positions remain in the kept tray while the others move into the purged tray; `Restore all` returns the original set. It could be used to let a reviewer decide which numbered fields stay on a handoff card, or to make a presenter discard every other agenda label before discussing the survivors. A reasonable local alternative is an array filter with a normal layout. This component should not have existed because a field’s position is not evidence that it deserves to survive.

## BlankFiling

`BlankFiling` files one child at a time whenever its small form is submitted with absolutely no evidence. A filled submission is refused; an empty one moves the next child into a separate void shelf, so the absence of information becomes a real layout decision.

```ts
type BlankFilingProps = {
  children: React.ReactNode;
};
```

```tsx
import { BlankFiling } from "gra-ui";
import "gra-ui/styles.css";

export function UnexplainedFiling() {
  return (
    <BlankFiling>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </BlankFiling>
  );
}
```

Leave the evidence field empty and submit with the button or the `Enter` key. Each empty submission moves the next child from the waiting room to the void shelf; entering any text leaves the children in place and explains why. `Reset filing` restores the original arrangement. It could be used to make a reviewer file handoff fields through a sequence of empty acknowledgements, or to make a presenter move agenda labels away without ever documenting a reason. A reasonable local alternative is a form handler with one array slice and a normal button. This component should not have existed because the absence of evidence should not reorganize content.

## MomentumWeave

`MomentumWeave` gives a row of children a shuttle whose release speed decides how they are woven. A gentle drag interleaves them into two strands; a quick flick uses three strands, and the changed order remains visible until it is restored.

```ts
type MomentumWeaveProps = {
  children: React.ReactNode;
};
```

```tsx
import { MomentumWeave } from "gra-ui";
import "gra-ui/styles.css";

export function WovenBrief() {
  return (
    <MomentumWeave>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </MomentumWeave>
  );
}
```

Drag the shuttle across the rail and release gently or flick quickly; the children reunite in a real two- or three-strand order. Focus the rail and use the arrow keys for the same alternatives. `Restore order` returns the supplied order. It could be used to let a reviewer weave handoff fields according to the urgency of a gesture, or to recompose four agenda labels into a tighter grid after a quick flick. A reasonable local alternative is an array with one explicit reorder and a CSS grid. This component should not have existed because the children already had a perfectly serviceable order, regardless of how energetically someone drags a shuttle.

## SpaceStaple

`SpaceStaple` lets a dragged staple remove one actual space from a label. The chosen gap is a real position-dependent result: `Friday review notes` can become `Fridayreview notes`, `Friday reviewnotes`, or another equally questionable contraction.

```ts
type SpaceStapleProps = {
  label: string;
};
```

```tsx
import { SpaceStaple } from "gra-ui";
import "gra-ui/styles.css";

export function StapledBrief() {
  return <SpaceStaple label="Friday review notes" />;
}
```

Drag the staple across the rail and release it at one of the label's gaps, or focus the rail and use the arrow keys. The selected space disappears from the rendered text; `Unstaple the label` restores the original. It could be used to make a reviewer choose which phrase in a handoff note should be fused for a compact subject line, or to let a presenter ceremonially compress one agenda label before showing it. A reasonable local alternative is the original label with one string replacement. This component should not have existed because typography does not need a physical staple to decide where words stop being separate.

## ArrowBias

`ArrowBias` lets three keyboard directions decide which edge should receive its children. The majority direction moves the whole row and locks it there; `Escape` clears the vote and returns the row to center.

```ts
type ArrowBiasProps = {
  children: React.ReactNode;
};
```

```tsx
import { ArrowBias } from "gra-ui";
import "gra-ui/styles.css";

export function DirectionalBrief() {
  return (
    <ArrowBias>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </ArrowBias>
  );
}
```

Focus the row and press `ArrowLeft` or `ArrowRight` three times. The majority direction moves every child toward that edge and locks the row there; `Escape` returns it to the undecided center. The count and three-step meter show the progression, and the final movement uses a short transform transition that remains a real state change with reduced motion. It could be used to let a reviewer bias a handoff card toward the side they intend to discuss, or to make a presenter settle a small agenda row against the edge of a slide. A reasonable local alternative is a flex row with one direction class and a keyboard handler. This component should not have existed because a layout should not need a three-arrow vote to choose its own edge.

## IdleUnspool

`IdleUnspool` quietly moves its children from a main row onto an aside shelf while nobody is interacting with it. One child leaves every 1.1 seconds; when the shelf is full, `Refile everything` returns the children to the row and starts the waiting sequence again.

```ts
type IdleUnspoolProps = {
  children: React.ReactNode;
};
```

```tsx
import { IdleUnspool } from "gra-ui";
import "gra-ui/styles.css";

export function NeglectedAgenda() {
  return (
    <IdleUnspool>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </IdleUnspool>
  );
}
```

Leave the component alone and watch the first child move aside, followed by the others. The counter records the migration, the newly moved item arrives with a short slide-and-settle animation, and `Refile everything` restores the initial row; the button is keyboard reachable and the state change remains real with reduced motion. It could be used to let an ignored handoff card slowly move its fields into an aside, or to let a presenter peel agenda items into side notes between talking points. A reasonable local alternative is a static row, or one local array and a CSS transition if the content must move. This component should not have existed because waiting should not reorganize a layout.

## DisclosureSpill

`DisclosureSpill` gives a native disclosure one unnecessary filing rule: closing it ejects the final child into a visible escape slot, and reopening files that child back inside.

```ts
type DisclosureSpillProps = {
  children: React.ReactNode;
};
```

```tsx
import { DisclosureSpill } from "gra-ui";
import "gra-ui/styles.css";

export function UnstableFiling() {
  return (
    <DisclosureSpill>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </DisclosureSpill>
  );
}
```

Click the disclosure summary, or focus it and press `Enter` or `Space`. Closing hides the filed children and moves the final child into an escape slot; reopening puts it back with a short entrance animation. It could be used to make a reviewer close a handoff card while the date escapes for separate attention, or to let a presenter give one agenda item permission to leave its section. A reasonable local alternative is a native `details` element that simply hides its children. This component should not have existed because closing a disclosure should not change where its last child lives.

## CursorProof

`CursorProof` makes a label earn its legibility one character at a time. Move the local proofing cursor across the surface; every character it crosses becomes visible and stays visible until the proof is reset.

```ts
type CursorProofProps = {
  label: string;
};
```

```tsx
import { CursorProof } from "gra-ui";
import "gra-ui/styles.css";

export function VerifiedStatus() {
  return <CursorProof label="Ready for review" />;
}
```

Move the pointer across the label, or focus the proofing surface and use the arrow keys. The characters are revealed individually and the counter reaches completion only after every position has been visited; `Reset` hides them again. It could be used to make a reviewer scan a status label before a handoff, or to let a presenter reveal an agenda item character by character while discussing it. A reasonable local alternative is the original text with no interaction, or a small CSS mask with one pointer handler. This component should not have existed because moving a cursor over a label does not make the label more true.

## SeamFold

`SeamFold` gives a row of children a movable crease. Move the native range control and the children split at that seam; the lower half returns in reverse order, creating a real folded state for content that did not request one.

```ts
type SeamFoldProps = {
  children: React.ReactNode;
};
```

```tsx
import { SeamFold } from "gra-ui";
import "gra-ui/styles.css";

export function FoldedFields() {
  return (
    <SeamFold>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </SeamFold>
  );
}
```

Drag the crease, or focus the range and use the arrow keys. The children move into an upper row and a reversed lower row at the selected position; `Flatten the paperwork` returns the original row. It could be used to let a reviewer fold the fields of a handoff card where the discussion changes topic, or to make a presenter crease an agenda before reading its second half. A reasonable local alternative is a small CSS grid with one breakpoint or an array slice in the page. This component should not have existed because ordinary fields do not need to be folded by a slider.

## SelectionSeal

`SelectionSeal` asks you to select the exact same excerpt three times before it is allowed to leave the sentence. Each selection creates a visible impression that bounces into the seal row; the third selection locks the excerpt into a raised mark and changes the rendered sentence.

```ts
type SelectionSealProps = Record<never, never>;
```

```tsx
import { SelectionSeal } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialApproval() {
  return <SelectionSeal />;
}
```

Focus the read-only sentence and select any non-empty excerpt with the mouse or keyboard. Select that exact range two more times; the count advances only when both endpoints match. The third matching selection seals the excerpt, replaces the textarea with the transformed sentence, and keeps the three impressions visible. `Reset` returns to the initial sentence. It could be used to make a reviewer certify the most important phrase in a handoff note, or to let a presenter ceremonially isolate the sentence they are about to discuss. A reasonable local alternative is a text selection plus one boolean or range in the page. This component should not have existed because selecting a sentence three times does not make it more approved.

## CheckpointQueue

`CheckpointQueue` makes a row of children pass through three drag checkpoints. Each checkpoint moves the first child to the back of the queue, so the content itself is genuinely reordered by the filing ceremony.

```ts
type CheckpointQueueProps = {
  children: React.ReactNode;
};
```

```tsx
import { CheckpointQueue } from "gra-ui";
import "gra-ui/styles.css";

export function FiledFields() {
  return (
    <CheckpointQueue>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </CheckpointQueue>
  );
}
```

Drag the seal through all three marks, or focus the track and use the arrow keys. Every reached checkpoint rotates the first child to the end; after the third checkpoint the changed order stays visible. `Restore the queue` returns the original order. It could be used to make a reviewer file the fields of a handoff card one checkpoint at a time, or to force a presenter to rotate an agenda before discussing it. A reasonable local alternative is an array with one queue rotation per button click, or simply rendering the intended order. This component should not have existed because it makes already ordered content earn the right to remain ordered.

## AlphabetTreadmill

`AlphabetTreadmill` advances every alphabetic character in a label by one place per click, then stops after twelve turns. The text itself changes, which is a disproportionate response to a button press.

```ts
type AlphabetTreadmillProps = {
  label: string;
};
```

```tsx
import { AlphabetTreadmill } from "gra-ui";
import "gra-ui/styles.css";

export function EscalatedLabel() {
  return <AlphabetTreadmill label="Ready for review" />;
}
```

Click `Advance one letter` to move every letter forward together; spaces and punctuation stay in place. After twelve turns the transformed label rests in its final state, and `Restore original` returns it to the starting text. It could be used to make a reviewer escalate a status label through twelve editorial revisions before a handoff, or to let a presenter ceremonially age a small heading during a talk. A reasonable local alternative is the original string plus one character-mapping function, or no transformation at all. This component should not have existed because a label does not need to earn its final spelling.

## WeekdayLedger

`WeekdayLedger` asks for a starting date, then files each child into the next weekday in order. The date is real, the calendar is real, and the reason to put interface labels on a weekly ledger is not.

```ts
type WeekdayLedgerProps = {
  children: React.ReactNode;
};
```

```tsx
import { WeekdayLedger } from "gra-ui";
import "gra-ui/styles.css";

export function ScheduledFields() {
  return (
    <WeekdayLedger>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </WeekdayLedger>
  );
}
```

Choose a date and press `File the week`. The date's weekday becomes the first column, and every child moves into the next weekday in sequence. `Clear the ledger` restores the waiting row. It could be used to assign the fields of a handoff card to the days of a review sprint, or to make a presenter schedule four agenda labels across a week. A reasonable local alternative is an array of labels and a small calendar grid, or simply rendering the labels together. This component should not have existed because a date that does not schedule anything is only a calendar-shaped excuse to move children around.

## LayoutReferendum

`LayoutReferendum` submits its children to a tiny layout referendum. Double-click one of three genuinely different arrangements and the chosen disposition persists until the ballot is reopened.

```ts
type LayoutReferendumProps = {
  children: React.ReactNode;
};
```

```tsx
import { LayoutReferendum } from "gra-ui";
import "gra-ui/styles.css";

export function RefiledFields() {
  return (
    <LayoutReferendum>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </LayoutReferendum>
  );
}
```

Double-click `Stack everything`, `Read backwards`, or `Split the committee`; the fields visibly become a column, a reversed row, or a two-column grid, and the controls lock under the binding result. `Reopen the ballot` restores the initial row. It could be used to let a reviewer settle the layout of a handoff card or to make a presenter formally choose how a few labels should be read. A reasonable local alternative is one layout class and an ordinary select or button group. This component should not have existed because a layout referendum adds ceremony to a decision CSS already knows how to make.

## ChildGravity

`ChildGravity` turns its children into a tiny gravity experiment. Click one child to make it the anchor; every sibling moves away by a gap calculated from the total child count.

```ts
type ChildGravityProps = {
  children: React.ReactNode;
};
```

```tsx
import { ChildGravity } from "gra-ui";
import "gra-ui/styles.css";

export function SeparatedFields() {
  return (
    <ChildGravity>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </ChildGravity>
  );
}
```

Click any child to choose the temporary anchor. Its siblings visibly retreat by their ordinal distance multiplied by a child-count-based gap; the selected child is marked as the anchor. `Release gravity` returns the children to their initial positions, with a short transform transition and the same state change under reduced motion. It could be used to make a reviewer create space around the field they are discussing, or to let a presenter ceremonially separate the labels surrounding a selected topic. A reasonable local alternative is a selected index and one conditional transform in the page. This component should not have existed because ordinary spacing does not need a gravity calculation.

## ScaleSweep

`ScaleSweep` turns a row of children into a sizing ritual. Drag its handle across the items and every child crossed by the sweep remains visibly enlarged until the sweep is reset.

```ts
type ScaleSweepProps = {
  children: React.ReactNode;
};
```

```tsx
import { ScaleSweep } from "gra-ui";
import "gra-ui/styles.css";

export function EarnedLabels() {
  return (
    <ScaleSweep>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </ScaleSweep>
  );
}
```

Drag the handle across every item, or focus the track and use the arrow keys. The touched items stay scaled up, the meter records the sweep, and `Shrink everything` returns the row to its initial state. A short transform transition makes each item grow into place, with reduced-motion users receiving the same state changes without the long transition. It could be used to make a reviewer sweep across the fields that deserve extra space on a summary card, or to let a presenter ceremonially enlarge the labels they plan to discuss. A reasonable local alternative is a small visited-index set and one conditional class in the page. This component should not have existed because the layout already knows its own priorities and does not need a drag-operated sizing ritual.

## ScrollRedact

`ScrollRedact` covers its children with one opaque band per wheel notch until the content is fully redacted. Scrolling back removes the bands, which is a disproportionate amount of ceremony for hiding a label.

```ts
type ScrollRedactProps = {
  children: React.ReactNode;
};
```

```tsx
import { ScrollRedact } from "gra-ui";
import "gra-ui/styles.css";

export function ClassifiedLabel() {
  return <ScrollRedact>Release candidate 2.7</ScrollRedact>;
}
```

Scroll over the content to add five horizontal redaction bands; scroll back, use the arrow keys, or choose `Remove bands` to uncover it. Each band is real DOM that hides part of the content, and the newest band slides in with a short transition. It could be used to make a reviewer classify a status label before a handoff, or to ceremonially hide a small detail during a presentation. A reasonable local alternative is a boolean or small number in the page with one overlay. This component should not have existed because scrolling a censorship layer into place is not a reusable UI need.

## CopyEcho

`CopyEcho` listens to the browser's real copy event and leaves a visible replica of a label behind every time it is copied. After three copies, the source receives an unnecessarily official shadow.

```ts
type CopyEchoProps = {
  label: string;
};
```

```tsx
import { CopyEcho } from "gra-ui";
import "gra-ui/styles.css";

export function OverDocumentedLabel() {
  return <CopyEcho label="Ready for review" />;
}
```

Select the read-only label and press `Ctrl+C` or `Cmd+C`. The browser copies the value normally, while the component keeps one visible echo per copy, up to three; `Erase echoes` returns to the initial state. The newly added echo arrives with a short scale-and-rise animation, and the final source settles under an official shadow. It could be used to make a reviewer copy a release status three times before a handoff, or to create a tiny visible audit trail for a clipboard-friendly label. A reasonable local alternative is a read-only input with one `onCopy` handler and a small array rendered beside it. This component should not have existed because preserving a visible souvenir of an ordinary copy gesture is an absurd abstraction for both forms and documentation.

## WordRelay

`WordRelay` passes the last letter of every word to the beginning of the next word. Each activation changes the visible labels while preserving all their letters, which is an impressive amount of ceremony for a sentence that did not need to move.

```ts
type WordRelayProps = {
  label: string;
};
```

```tsx
import { WordRelay } from "gra-ui";
import "gra-ui/styles.css";

export function HandoffLabels() {
  return <WordRelay label="Title Status Owner Date" />;
}
```

Click `Pass the last letters` to complete one relay round. Every word visibly loses its final letter and receives the previous word's letter; `Return the letters` restores the original label. It could be used to make a team hand off the last character of each review label before a planning meeting, or to compress a row of labels without actually removing any information. A reasonable local alternative is one `useState` value and a small `map` over the words. This component should not have existed because circulating characters between otherwise finished labels is a poor abstraction for both writing and layout.

## Button

`Button` is the one conventional component in the package: a typed shadcn-style button with standard visual variants. It exists so the questionable components can be demonstrated without inventing a questionable button too.

```ts
type ButtonProps = {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  // plus les attributs natifs d'un bouton
};
```

## DragThreshold

`DragThreshold` requires three successful drags, each released farther than the previous one. A short release resets the progression; the third success leaves the content raised under an unnecessarily official shadow.

```ts
type DragThresholdProps = {
  children: React.ReactNode;
};
```

```tsx
import { DragThreshold } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyCommitted() {
  return <DragThreshold>Drag this farther</DragThreshold>;
}
```

Drag the content past each marker and release. The cleared markers remain lit, a short release returns the component to zero, and the final state stays locked until `Start over`. It could be used to make a reviewer demonstrate increasing confidence before committing a tiny label. A reasonable person would keep one local progress value and a pointer handler in the page. This component should not have existed because three fixed drag distances are a ceremony, not a reusable abstraction.

## IndexSum

`IndexSum` assigns each child the value of its position and asks the user to select a combination that reaches the component's calculated target. The chosen items remain selected, overshooting is a recoverable state, and an exact sum freezes the result.

```ts
type IndexSumProps = {
  children: React.ReactNode;
};
```

```tsx
import { IndexSum } from "gra-ui";
import "gra-ui/styles.css";

export function ChooseFieldsByArithmetic() {
  return (
    <IndexSum>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </IndexSum>
  );
}
```

Select items until their position values match the target shown above the grid. With four items, `Title + Date` and `Status + Owner` are different successful results; a reasonable person would keep the selected indexes and total directly in the page. This could be used to choose fields for a card whose “budget” is an arbitrary checksum, but it should not have become a reusable abstraction because ordinary field selection does not need arithmetic ceremony.

## SideSplit

`SideSplit` makes you route each child into a left or right side, one decision at a time. The split remains visible after the last choice, which is a surprisingly formal way to make two lists.

```ts
type SideSplitProps = {
  children: React.ReactNode;
};
```

```tsx
import { SideSplit } from "gra-ui";
import "gra-ui/styles.css";

export function SortFields() {
  return (
    <SideSplit>
      <span>Keep visible</span>
      <span>Review later</span>
      <span>Ask the owner</span>
    </SideSplit>
  );
}
```

Choose `Place next here` on either side for each child. The waiting child leaves the queue and stays in the selected column until `Start over`. It could be used to sort fields into “keep” and “later” during a tiny review. A reasonable person would keep an array of destinations and render two local lists. This component should not have existed because a fixed two-sided sorting ceremony is too specific to justify a reusable abstraction.

## MixedClick

`MixedClick` releases its children only after a left click, a right click, and another left click. The content visibly walks through three slots; using the wrong button resets the sequence.

```ts
type MixedClickProps = {
  children: React.ReactNode;
};
```

```tsx
import { MixedClick } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialRelease() {
  return <MixedClick>Approve this card</MixedClick>;
}
```

Left-click once, right-click once, then left-click again. Keyboard users can use `Enter`, `Shift+Enter`, and `Enter` for the same sequence. It could be used to make someone perform a mouse-button ritual before releasing a review card. A reasonable person would keep one local state value and two handlers in the page. This component should not have existed because a fixed three-click ceremony is not a reusable interaction.

## WeightVote

`WeightVote` lets each child collect three clicks of weight. Every partial choice grows, and the first one to reach three clicks wins while the others become visually smaller and inert.

```ts
type WeightVoteProps = {
  children: React.ReactNode;
};
```

```tsx
import { WeightVote } from "gra-ui";
import "gra-ui/styles.css";

export function EmphasizedField() {
  return (
    <WeightVote>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </WeightVote>
  );
}
```

Click any child to add one weight. The chosen child scales up as its three-part meter fills; the first child to reach three clicks stays enlarged and locks the rest until `Reset`. It could be used to let a reviewer choose which field deserves oversized treatment on a tiny summary card. A reasonable person would keep an array of counts and a conditional class in the page. This component should not have existed because a fixed three-click visual vote is too specific to justify a reusable abstraction.

## CaseGate

`CaseGate` keeps its children visually locked until six typed letters alternate between uppercase and lowercase. A wrong case erases the attempt, which is a lot of ceremony for a small reveal.

```ts
type CaseGateProps = {
  children: React.ReactNode;
};
```

```tsx
import { CaseGate } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyHidden() {
  return <CaseGate>Release notes</CaseGate>;
}
```

Click the field and type a pattern such as `aBcDeF`. Each alternating letter advances the six-slot progression; any other key resets it, and a complete sequence reveals the children. It could be used to make a reviewer type a ceremonial case pattern before seeing release notes. A reasonable person would keep an input, six lines of local state, and a conditional in the page. This component should not have existed because a fixed typing ritual is not a reusable abstraction.

## IndecisiveButton

`IndecisiveButton` cycles through possible decisions while it is hovered or focused, then reports whichever option was visible when it was clicked.

```tsx
import { IndecisiveButton } from "gra-ui";
import "gra-ui/styles.css";

export function Decision() {
  return (
    <IndecisiveButton
      choices={["Ship it", "Wait a minute", "Ship it anyway"]}
      onDecision={(choice) => console.log(choice)}
    >
      Decide
    </IndecisiveButton>
  );
}
```

## CountedClone

`CountedClone` clones an HTML element solely to add a `data-child-count` attribute containing the number of its children. The element already knew this, technically.

```ts
type CountedCloneProps = {
  element: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
};
```

```tsx
import { CountedClone } from "gra-ui";

export function Counted() {
  return <CountedClone element={<span>One child</span>} />;
}
```

Its only prop is `element`. The returned element is otherwise identical, with `data-child-count="1"` attached to it. A reasonable person would write `React.cloneElement(element, { "data-child-count": React.Children.count(element.props.children) })` directly, or keep the original element. This component should not have existed because it turns an obvious count into a public abstraction.

## AveragePosition

`AveragePosition` asks for three points on a track, calculates their arithmetic mean, and parks its content at that average.

```ts
type AveragePositionProps = {
  children: React.ReactNode;
};
```

```tsx
import { AveragePosition } from "gra-ui";

export function SettledLabel() {
  return <AveragePosition>Place this carefully</AveragePosition>;
}
```

Click three locations, or use Enter and the arrow keys. Each point remains visible and the content moves to the calculated average; `Reset` starts another round. It could be used to place a label halfway between three design-review comments, although a reasonable person would keep those coordinates in local state and write the average directly. This component should not have existed because publishing a three-click averaging ritual is more specific than the problem it pretends to solve.

## LastRemaining

`LastRemaining` removes one option at a time until a single survivor is promoted.

```ts
type LastRemainingProps = {
  items: readonly string[];
};
```

```tsx
import { LastRemaining } from "gra-ui";
import "gra-ui/styles.css";

export function ChooseOne() {
  return (
    <LastRemaining
      items={["Keep the title", "Keep the status", "Keep the owner"]}
    />
  );
}
```

Click an option to eliminate it. Eliminated options remain visible but disabled, and the last remaining option is marked as the winner; `Start over` restores the full list. It could be used to make a reviewer reduce the fields on a tiny summary card one rejection at a time. A reasonable person would keep an array of remaining indexes in the page and filter it locally. This component should not have existed because it turns choosing one option into a public elimination ceremony.

## BackspaceArchive

`BackspaceArchive` is an editable label that keeps every character removed with Backspace in a visible archive.

```ts
type BackspaceArchiveProps = {
  label: string;
};
```

```tsx
import { BackspaceArchive } from "gra-ui";
import "gra-ui/styles.css";

export function ReviewedText() {
  return <BackspaceArchive label="Keep this sentence" />;
}
```

Edit the starting text and press Backspace. Each removed character is copied into the archive in deletion order; `Restore text` clears the archive and starts again. It could be used for a review field where someone must visibly account for every deleted character. A reasonable person would keep an input and a small `onKeyDown` handler in the page. This component should not have existed because it makes ordinary text editing preserve the evidence of every backspace.

## FocusUnpack

`FocusUnpack` keeps several children in one compact bundle until focus separates them into individual cards.

```ts
type FocusUnpackProps = {
  children: React.ReactNode;
};
```

```tsx
import { FocusUnpack } from "gra-ui";
import "gra-ui/styles.css";

export function InspectedFields() {
  return (
    <FocusUnpack>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </FocusUnpack>
  );
}
```

Focus the bundle with a pointer or the keyboard and each child moves into its own visible card. Press Space or Enter to pack them together again. It could be used to inspect the fields of a compact review summary one focus event at a time. A reasonable person would keep a boolean and a conditional class in the page. This component should not have existed because it makes focus responsible for rearranging content that was already readable.

## HoverRoute

`HoverRoute` moves its children through four fixed hover zones and only settles after the route is completed in order.

```ts
type HoverRouteProps = {
  children: React.ReactNode;
};
```

```tsx
import { HoverRoute } from "gra-ui";
import "gra-ui/styles.css";

export function DeliberateRelease() {
  return <HoverRoute>Release this carefully</HoverRoute>;
}
```

Hover steps 1 through 4 in order. Skipping ahead resets the progress; completing the route moves the content to the center and keeps it there until `Start over`. It could be used to make someone follow a cursor path before releasing a carefully positioned control. A reasonable person would keep four event handlers and a number in the page. This component should not have existed because a fixed hover route is not a reusable interaction so much as a small obstacle.

## NestChildren

`NestChildren` makes you choose the order in which its children wrap one another.

```ts
type NestChildrenProps = {
  children: React.ReactNode;
};
```

```tsx
import { NestChildren } from "gra-ui";
import "gra-ui/styles.css";

export function NestedFields() {
  return (
    <NestChildren>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </NestChildren>
  );
}
```

Click the available children in any order. Each choice becomes a new outer layer around the existing stack; `Unnest everything` clears the ritual. It could be used to let someone assemble the hierarchy of a compact review card by hand. A reasonable person would render the desired nesting directly in the page. This component should not have existed because turning a finished child tree into a click-by-click construction project is not a reusable UI need.

## RepeatChildren

`RepeatChildren` renders the same child twice because one copy was apparently not enough.

```ts
type RepeatChildrenProps = {
  children: React.ReactElement;
};
```

```tsx
import { RepeatChildren } from "gra-ui";

export function Repeated() {
  return <RepeatChildren><span>Again</span></RepeatChildren>;
}
```

Its only prop is `children`. The result contains two identical child elements. A reasonable person would write `{children}{children}` directly inside a Fragment. This component should not have existed because it gives a public API to pressing copy and paste twice.

## EqualChoice

`EqualChoice` waits for a double-click, offers two visually equivalent sides, animates toward the selected side, then returns to the exact starting position.

```ts
type EqualChoiceProps = {
  children: React.ReactNode;
};
```

```tsx
import { EqualChoice } from "gra-ui";

export function SamePlace() {
  return <EqualChoice><span>Stay here</span></EqualChoice>;
}
```

Double-click the component, choose either side, and watch the content briefly travel before coming back. A reasonable person would render the children directly and not ask anyone to choose between equal destinations. This component should not have existed because both decisions produce the same result.

## SplitLabel

`SplitLabel` splits a label into two halves, then requires both halves to be clicked before reuniting them.

```ts
type SplitLabelProps = {
  label: string;
};
```

```tsx
import { SplitLabel } from "gra-ui";

export function Together() {
  return <SplitLabel label="Keep this together" />;
}
```

Double-click the label, click each half, and watch the unchanged text reunite with a small oscillation. A reasonable person would render the label directly and leave it alone. This component should not have existed because it turns a stable string into a three-step ceremony with no result.

## FocusFade

`FocusFade` makes its content disappear and return when it receives focus, confirming an event the browser already made obvious.

```ts
type FocusFadeProps = {
  children: React.ReactNode;
};
```

```tsx
import { FocusFade } from "gra-ui";

export function Focused() {
  return <FocusFade><span>Still here</span></FocusFade>;
}
```

Its only prop is `children`. Focus the group with a pointer or keyboard and its content fades out, then fades back in unchanged. A reasonable person would render the children directly and let focus remain invisible. This component should not have existed because it turns a browser state into a pointless disappearance ceremony.

## PressEscape

`PressEscape` makes its content flee while the button is held down, then brings it back when released.

```ts
type PressEscapeProps = {
  children: React.ReactNode;
};
```

```tsx
import { PressEscape } from "gra-ui";

export function Held() {
  return <PressEscape>Hold this</PressEscape>;
}
```

Press and hold with a pointer or the keyboard. The content slides away and rotates slightly, then returns to its exact starting position. A reasonable person would write a button with one CSS transform directly. This component should not have existed because holding a button should not make its label escape.

## KeystrokeStack

`KeystrokeStack` makes you press one character key per character before stacking the label into separate rows, then asks for one more key to flatten it again.

```ts
type KeystrokeStackProps = {
  label: string;
};
```

```tsx
import { KeystrokeStack } from "gra-ui";

export function Stacked() {
  return <KeystrokeStack label="Leave this alone" />;
}
```

Focus the button and press character keys. Each key lifts one character into its own row; after the whole label is stacked, the next key restores the original line. A reasonable person would render the label and use no keyboard ceremony at all. This component should not have existed because it makes displaying a string depend on counting keystrokes.

## ReorderBack

`ReorderBack` swaps two pieces of content when clicked, then swaps them back on the next click.

```ts
type ReorderBackProps = {
  first: React.ReactNode;
  second: React.ReactNode;
};
```

```tsx
import { ReorderBack } from "gra-ui";

export function Rearranged() {
  return <ReorderBack first="First" second="Second" />;
}
```

Its `first` and `second` props are shown in two slots. Click or focus it and press Enter or Space to watch the slots exchange their contents, then do it again to restore the starting order. A reasonable person would render the two pieces in their final order directly. This component should not have existed because it turns an already settled arrangement into a reversible errand.

## DragDuplicate

`DragDuplicate` makes a second copy of its content while you drag it, then merges both copies when you release it.

```ts
type DragDuplicateProps = {
  children: React.ReactNode;
};
```

```tsx
import { DragDuplicate } from "gra-ui";
import "gra-ui/styles.css";

export function Duplicated() {
  return <DragDuplicate>One copy is enough</DragDuplicate>;
}
```

Its only prop is `children`. Drag the content anywhere to see two offset copies, then release to watch them fold back into one. A reasonable person would render `{children}` directly and skip dragging it. This component should not have existed because it turns a single piece of content into a temporary two-copy problem.

## HoverConfirm

`HoverConfirm` requires three separate pointer entries before it considers its content confirmed.

```ts
type HoverConfirmProps = {
  children: React.ReactNode;
};
```

```tsx
import { HoverConfirm } from "gra-ui";
import "gra-ui/styles.css";

export function Acknowledged() {
  return <HoverConfirm>Approve this card</HoverConfirm>;
}
```

Move the pointer out of the content and back in three times. The pass meter fills, the content lifts slightly, and the third entry leaves a persistent `Confirmed` state; click or press Enter to reset it. It might serve as a deliberately ceremonial acknowledgement for a card that nobody should need to acknowledge by hovering. A reasonable person would keep a small counter in the page and use a normal button. This component should not have existed because it turns pointer travel into a public confirmation protocol.

## HoldPosition

`HoldPosition` lets a user hold its content, move it between three fixed positions, and leave it parked wherever the pointer is released. The position is real state, which is a lot of ceremony for a piece of content that could have stayed where it was.

```ts
type HoldPositionProps = {
  children: React.ReactNode;
};
```

```tsx
import { HoldPosition } from "gra-ui";
import "gra-ui/styles.css";

export function Parked() {
  return <HoldPosition>Leave this nearby</HoldPosition>;
}
```

Hold the content and move left, middle, or right before releasing it. The content stays in that position until the next hold; arrow keys provide the same three-position movement when focused. It could be used to let a reviewer park a card in one of three columns before moving on, or to make someone physically place a status label before it is considered settled. A reasonable person would keep the state in the page and use a normal drag or a local conditional. This component should not have existed because it publishes a three-slot parking ritual without a value, callback, or reason to reuse it.

## TimedRelease

`TimedRelease` makes the release time of a held piece of content choose between two permanent destinations.

```ts
type TimedReleaseProps = {
  children: React.ReactNode;
};
```

```tsx
import { TimedRelease } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyReleased() {
  return <TimedRelease>Release this carefully</TimedRelease>;
}
```

Press and hold the content. Release before the meter fills and it settles on the left; hold until the meter fills and it settles on the right. Press it again to reset. It could be used to make a reviewer deliberately park a status label based on how long they hesitate, or to classify a card by the exact duration of an approval gesture. A reasonable person would keep this two-branch state in the page and use a normal button. This component should not have existed because it turns one elapsed-time check into a reusable release ritual.

## LengthOrder

`LengthOrder` cycles a list through its original order, shortest label first, and longest label first.

```ts
type LengthOrderProps = {
  items: readonly string[];
};
```

```tsx
import { LengthOrder } from "gra-ui";
import "gra-ui/styles.css";

export function SortedLabels() {
  return (
    <LengthOrder items={["Keep", "Maybe later", "Definitely not"]} />
  );
}
```

Click the control to reorder the visible labels by character count. The list stays in the selected order until the next click, and each item reports the count that caused its new position. It could be used to make a reviewer rank short status labels before long ones, or to force a content editor to admire the relative size of three increasingly unnecessary warnings. A reasonable person would call `items.toSorted()` locally and keep the intended order in the page. This component should not have existed because it turns a one-line sort into a public opinion about how long words deserve to be.

## ClickOrder

`ClickOrder` asks the user to click content fragments in the order they should appear, then keeps the assembled result.

```ts
type ClickOrderProps = {
  children: React.ReactNode;
};
```

```tsx
import { ClickOrder } from "gra-ui";
import "gra-ui/styles.css";

export function OrderedCopy() {
  return (
    <ClickOrder>
      <span>First,</span>
      <span>then this,</span>
      <span>finally this.</span>
    </ClickOrder>
  );
}
```

Click each fragment in sequence. It disappears from the choices and is added to the numbered result; after every fragment is placed, choose again resets the sequence. It could be used to let a reviewer assemble the reading order of a short approval note, or to make someone click legal warnings into the order they deserve to regret. A reasonable person would keep an array of selected indexes in the page and render the fragments locally. This component should not have existed because it turns a few lines of list state into a reusable ceremony for arranging content.

## CornerFold

`CornerFold` records four separate corner visits, then folds its content into a smaller permanent state.

```ts
type CornerFoldProps = {
  children: React.ReactNode;
};
```

```tsx
import { CornerFold } from "gra-ui";
import "gra-ui/styles.css";

export function FoldedCard() {
  return <CornerFold>Visit every corner first</CornerFold>;
}
```

Enter each visible corner with the pointer, or focus the corner controls with the keyboard. Each visit stays counted; the fourth folds the content and reveals a reset. It could be used to force a reviewer to inspect all four corners of a compliance card before compacting it, or to make a status label earn the privilege of becoming smaller. A reasonable person would keep one counter and one conditional class in the page. This component should not have existed because it turns visiting four fixed points into a reusable folding protocol.

## PairwiseMerge

`PairwiseMerge` makes the user merge content two groups at a time until only one group remains.

```ts
type PairwiseMergeProps = {
  children: React.ReactNode;
};
```

```tsx
import { PairwiseMerge } from "gra-ui";
import "gra-ui/styles.css";

export function MergeFields() {
  return (
    <PairwiseMerge>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </PairwiseMerge>
  );
}
```

Double-click one group, then another. The two are joined in their existing order, the merged result stays visible, and the process can be repeated until one group remains. It could serve as a deliberately ceremonial way to collapse a short field list before a compact review card, or as an unnecessarily strict exercise for deciding which two labels deserve to share a line. A reasonable person would keep an array of groups in the page and merge them locally. This component should not have existed because it turns a few lines of state into a reusable ceremony for combining content that was already allowed to sit next to itself.

## DurationScale

`DurationScale` measures how long its content is held three times, then scales the content according to the average duration.

```ts
type DurationScaleProps = {
  children: React.ReactNode;
};
```

```tsx
import { DurationScale } from "gra-ui";
import "gra-ui/styles.css";

export function MeasuredContent() {
  return <DurationScale>Hold this carefully</DurationScale>;
}
```

Its only prop is `children`. Press and hold the content three times; each release is recorded, the average is calculated, and the content keeps the resulting scale. It could be used to make the size of a review label reflect how long somebody hesitated before releasing it. A reasonable person would keep three durations in the page and calculate the scale locally. This component should not have existed because turning a few pointer events and an average into a reusable hold-measuring ritual is excessive.

## ClarityDebt

`ClarityDebt` accumulates four real blur charges against a child.

```ts
type ClarityDebtProps = {
  children: React.ReactNode;
};
```

Press `Charge clarity` to advance the progression: the child becomes visibly blurrier at each level, then `Clear debt` returns it to its readable state. It could let a reviewer blur a handoff note each time more context is requested, or let a presenter make an agenda label harder to read after too much discussion. A reasonable local alternative is readable content with a small status; a blur debt makes information worse while pretending to track progress.

## ArithmeticCouncil

`ArithmeticCouncil` gives one number three incompatible arithmetic rulings.

```ts
type ArithmeticCouncilProps = {
  value: number;
};
```

Choose `Double it`, `Halve it` or `Invert it`. The selected choice changes the actual result, and `Reopen the case` returns to the undecided state. It could let a reviewer decide whether an estimate deserves twice the time, half the time or a negative amount of time, or let a presenter give an agenda number a ceremonial verdict. A reasonable local alternative is one local arithmetic expression; a council turns a trivial calculation into a decision ritual with no policy.

## TetherPull

`TetherPull` lets an anchor move while the content refuses to leave the center.

```ts
type TetherPullProps = {
  children: React.ReactNode;
};
```

Drag the anchor dot, or focus it and use the arrow keys. The SVG tether stretches to the real anchor position while the child stays fixed; `Relax the tether` restores the initial anchor. It could let a reviewer pull a warning toward drifting attention, or let a presenter stretch an agenda label toward a speaker without moving the label. A reasonable local alternative is one pointer position or normal flow; a tether adds geometry where a relationship could simply be stated.

## DoubleEntry

`DoubleEntry` requires every child to be clicked in order twice.

```ts
type DoubleEntryProps = {
  children: React.ReactNode;
};
```

Click the children in their supplied order for the first pass, then repeat that exact order for the second. Each pass fills a visible ledger row, wrong choices stay unposted, and `Tear up the ledger` resets both passes. It could make a reviewer check title, status and owner twice before posting a handoff brief, or let a presenter rehearse every agenda field in duplicate. A reasonable local alternative is an ordinary checklist; requiring the same sequence twice is bookkeeping theater.

## SignalTranscript

`SignalTranscript` transforms a label into a visible Morse transcript.

```ts
type SignalTranscriptProps = {
  label: string;
};
```

Press `Transmit label` to replace the actual text with per-character dots, dashes and slash tokens, then use `Restore text` to return it. It could let a reviewer transmit a handoff phrase as though the room had lost its vocabulary, or let a presenter turn an agenda label into an over-engineered signal board. A reasonable local alternative is rendering the label or using a one-off encoding utility; a transcript component makes a conversion ceremony look reusable.

## NotchProgress

`NotchProgress` advances a child through five visible ceremonial notches.

```ts
type NotchProgressProps = {
  children: React.ReactNode;
};
```

Press `Add a notch` to fill the actual seal one stage at a time. The ring, numbered marks and paper depth change at every stage; `Begin again` or `Clear seal` returns to the empty state. It could make a reviewer notch a handoff note once per glance, or let a presenter certify an agenda label before placing it on a slide. The use case remains discutable because seeing a notice is not measurable progress and a seal adds no authority. A reasonable local alternative is rendering the notice with one explicit status when approval matters.

## FilingFork

`FilingFork` puts one child into one of three incompatible filing structures.

```ts
type FilingForkProps = {
  children: React.ReactNode;
};
```

Choose `Ledger`, `Frame` or `Echo`. The child is actually rendered inside a numbered list, a fieldset or a quotation figure, and `Return to intake` removes the choice. It could let a reviewer classify a handoff note for a ledger or a containment frame, or let a presenter give an agenda line a temporary stage format. The use case remains discutable because the intended structure should be known by the author, not chosen by the audience. A reasonable local alternative is selecting one semantic structure at the call site.

## PointerPlot

`PointerPlot` relocates a child to a directly chosen coordinate.

```ts
type PointerPlotProps = {
  children: React.ReactNode;
};
```

Click the plotting surface to move the cargo and crosshair to that real point; focus it and use the arrow keys for smaller movements. `Recenter cargo` returns it to the middle. It could let a reviewer park a warning where attention drifted, or let a presenter position an agenda label on a tactical-looking slide. The use case remains discutable because normal layout already knows where the content belongs. A reasonable local alternative is normal flow with one alignment or a local CSS position.

## SwitchbackRoute

`SwitchbackRoute` releases a child only after an exact four-arrow detour.

```ts
type SwitchbackRouteProps = {
  children: React.ReactNode;
};
```

Focus the route and press `ArrowUp`, `ArrowRight`, `ArrowDown`, then `ArrowLeft`. Each correct turn lights a station; a wrong arrow returns to the entrance, and the completed route changes the child into a released cargo state. `Start over` clears it. It could make a reviewer navigate a handoff note through a memorized detour, or let a presenter rehearse four turns before revealing an agenda item. The use case remains discutable because the sequence protects nothing. A reasonable local alternative is one button or one direct keyboard command.

## CodepointReceipt

`CodepointReceipt` converts readable text into a reversible ledger of its actual Unicode code points.

```ts
type CodepointReceiptProps = {
  label: string;
};
```

Press `Issue receipt` to replace the label with one line per glyph, its visible code point and a proportional bar; `Restore sentence` returns the exact text. It could let a reviewer audit the characters in a handoff label, or let a presenter turn an agenda phrase into a machine-legible artifact for one slide. The use case remains discutable because implementation detail competes with reading and rarely deserves a visual receipt. A reasonable local alternative is rendering the label and using a local string utility only when code points are genuinely relevant.

## BinaryMarch

`BinaryMarch` turns a decimal integer into binary one manual division at a time.

```ts
type BinaryMarchProps = {
  value: number;
};
```

```tsx
import { BinaryMarch } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialNumber() {
  return <BinaryMarch value={42} />;
}
```

Click `Divide by two` to record the quotient and remainder, prepend the earned bit, and continue until the binary result is complete. `Restart march` returns to the initial decimal state. The new row arrives with a short slide, and the result settles into its receipt. It could let a reviewer manually convert a release number before admitting it to a machine-facing handoff, or let a presenter give one agenda count a tiny arithmetic procession. Both uses are discutable because `value.toString(2)` already performs the conversion. A reasonable local alternative is that one-line conversion or a local utility, not a progress component for long division.

## MetricMandate

`MetricMandate` makes a label choose what it is officially made of.

```ts
type MetricMandateProps = {
  label: string;
};
```

```tsx
import { MetricMandate } from "gra-ui";
import "gra-ui/styles.css";

export function MeasuredNotice() {
  return <MetricMandate label="Prepare the ordinary handoff" />;
}
```

Choose `Ink`, `Air` or `Edges`. The choices calculate different totals from the same label and change the actual meter width and live result. `Withdraw standard` returns to the undecided state. It could let a reviewer decide whether a handoff is large because it contains characters, whitespace or word boundaries, or let a presenter assign an agenda item an official size. The use remains discutable because the metric is arbitrary and none changes the content. A reasonable local alternative is one explicit count selected for the real task.

## CrankShift

`CrankShift` uses a directly manipulated dial to rotate children into a new order.

```ts
type CrankShiftProps = {
  children: React.ReactNode;
};
```

```tsx
import { CrankShift } from "gra-ui";
import "gra-ui/styles.css";

export function ShiftedCargo() {
  return (
    <CrankShift>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </CrankShift>
  );
}
```

Drag the crank, or focus it and use the arrow keys. Each of eight dial positions rotates the actual child order in the cargo list; `Return to intake` restores the supplied order. The arm turns with a short transition while the reordered items settle into place. It could let a reviewer turn a handoff row until the least urgent field reaches the front, or let a presenter rotate agenda items through a ceremonial loading dock. A reasonable local alternative is an array with one ordinary reorder interaction. The component should not have existed because a list operation does not need a crank.

## GesturePatent

`GesturePatent` grants a specimen only after three unrelated gestures arrive in order.

```ts
type GesturePatentProps = {
  children: React.ReactNode;
};
```

```tsx
import { GesturePatent } from "gra-ui";
import "gra-ui/styles.css";

export function PatentedNotice() {
  return <GesturePatent><span>Approved for another meeting</span></GesturePatent>;
}
```

Click `Stamp` once, double-click `Turn`, then right-click `Seal`; keyboard activation of each station is also available. Correct steps fill the three stations and move the specimen through pending states to a real `GRANTED` mark. A wrong gesture resets the route, and `Withdraw patent` clears it. It could make a reviewer certify a handoff note before filing it, or let a presenter rehearse three pointer intents before revealing an agenda item. The use remains discutable because unrelated gestures provide no security or meaning. A reasonable local alternative is one explicit confirmation button or short form.

## RunLengthPack

`RunLengthPack` turns adjacent repeated characters into counted visual crates.

```ts
type RunLengthPackProps = {
  label: string;
};
```

```tsx
import { RunLengthPack } from "gra-ui";
import "gra-ui/styles.css";

export function PackedNotice() {
  return <RunLengthPack label="Sooo much ceremony" />;
}
```

Click `Pack adjacent runs` to perform a real run-length encoding: `ooo` becomes `o×3`, spaces become visible space glyphs, and the packed tokens replace the readable sentence. `Unpack sequence` restores the exact label. The crates arrive with a small rise-and-settle animation. It could let a reviewer compress an emphatic handoff label for a tiny display, or let a presenter turn a repeated phrase into a storage artifact. A reasonable local alternative is a local run-length utility used only where storage matters. This component should not have existed because optimizing a readable sentence visually makes it less readable.

## ClauseAudit

`ClauseAudit` inspects a label one word at a time and gives each word a needless clearance mark.

```ts
type ClauseAuditProps = {
  label: string;
};
```

```tsx
import { ClauseAudit } from "gra-ui";
import "gra-ui/styles.css";

export function AuditedNotice() {
  return <ClauseAudit label="Prepare the remarkably ordinary handoff" />;
}
```

Press `Audit next word` to mark the next word and advance the real progress ledger; `Clear audit` returns to the unexamined sentence. It could let a reviewer inspect every word in a handoff sentence or let a presenter clear an agenda label before advancing. Both uses mistake looking at words for measurable work. A reasonable local alternative is the sentence with one ordinary review status.

## TerminusChoice

`TerminusChoice` asks whether every word should report its first, middle or last letter.

```ts
type TerminusChoiceProps = {
  label: string;
};
```

```tsx
import { TerminusChoice } from "gra-ui";
import "gra-ui/styles.css";

export function RuledPhrase() {
  return <TerminusChoice label="Prepare the remarkably ordinary handoff" />;
}
```

Choose `First letters`, `Middle letters` or `Last letters`. The actual displayed words change according to the selected extraction, and `Restore whole phrase` brings back every letter. It could summarize a handoff sentence or make an agenda line confess one arbitrary letter per word. Neither use benefits from losing the rest. A reasonable local alternative is deriving one explicit summary where it is needed and keeping the source readable.

## DropSilo

`DropSilo` moves one child through three visible destinations with native drag-and-drop.

```ts
type DropSiloProps = {
  children: React.ReactNode;
};
```

```tsx
import { DropSilo } from "gra-ui";
import "gra-ui/styles.css";

export function FiledNotice() {
  return <DropSilo><span>Needs a decision</span></DropSilo>;
}
```

Drag the cargo to `Inbox`, `Vault` or `Quarantine`, or focus a lane and press Enter. The child moves into the selected lane, and `Release cargo` returns it to the loose surface. It could let a reviewer file a warning or let a presenter categorize an agenda item by hand. The use remains discutable because the destination changes the ceremony, not the decision. A reasonable local alternative is a select, list or ordinary drag target backed by the real data model.

## AlphabeticalQueue

`AlphabeticalQueue` admits labels only in alphabetical order.

```ts
type AlphabeticalQueueProps = {
  items: readonly string[];
};
```

```tsx
import { AlphabeticalQueue } from "gra-ui";
import "gra-ui/styles.css";

export function OrderedFields() {
  return <AlphabeticalQueue items={["Status", "Owner", "Title"]} />;
}
```

Select the next label alphabetically. Correct choices leave the board for a visible manifest, while an early choice is rejected; `Empty queue` starts over. It could make a reviewer file handoff fields alphabetically or reveal agenda labels according to a dictionary. Both uses impose an order unrelated to meaning. A reasonable local alternative is sorting the array once or preserving the author’s intentional order.

## PercentParcel

`PercentParcel` turns readable text into a URL percent-encoded parcel and back.

```ts
type PercentParcelProps = {
  label: string;
};
```

```tsx
import { PercentParcel } from "gra-ui";
import "gra-ui/styles.css";

export function TransportLabel() {
  return <PercentParcel label="Prepare the ordinary handoff" />;
}
```

Press `Parcel the label` to apply the real `encodeURIComponent` transformation; the transport marks replace the readable phrase. `Unpack text` restores it. It could package a handoff label for a URL-shaped filing system or expose the transport spelling of an agenda phrase. The browser already performs this work invisibly when it matters. A reasonable local alternative is calling `encodeURIComponent` at the boundary that needs it while keeping the display readable.

## ColumnTally

`ColumnTally` makes a group earn its grid columns one click at a time.

```ts
type ColumnTallyProps = {
  children: React.ReactNode;
};
```

```tsx
import { ColumnTally } from "gra-ui";
import "gra-ui/styles.css";

export function TalliedFields() {
  return (
    <ColumnTally>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Due date</span>
    </ColumnTally>
  );
}
```

Press `Award a column` to reflow the actual children from one through four grid columns. The state is `counting` until the final allocation, then `complete`; `Return to one` restores the initial layout. The grid transition lets each cell settle into its new place. It could let a reviewer award a handoff brief one column per approval, or let a presenter make agenda fields earn the right to sit beside one another. Neither use improves the information architecture. A reasonable local alternative is choosing the grid columns in CSS or rendering the intended layout directly; a tally turns a layout decision into a progress ceremony.

## RoundingRuling

`RoundingRuling` lets three policies overrule one decimal value.

```ts
type RoundingRulingProps = {
  value: number;
};
```

```tsx
import { RoundingRuling } from "gra-ui";
import "gra-ui/styles.css";

export function RuledScore() {
  return <RoundingRuling value={27.6} />;
}
```

Choose `Floor`, `Ceiling` or `Nearest five`. The selected policy changes the actual calculated result and the live ledger; `Reopen the case` returns to `Undecided`. The result settles with a short scale-and-rise animation. It could let a reviewer decide whether a handoff estimate rounds down, up or toward the nearest five, or let a presenter give an agenda score a formal numerical verdict. Both uses make arithmetic policy look like governance. A reasonable local alternative is one explicit rounding function at the calculation boundary.

## TensionArc

`TensionArc` bends a row of children into an unnecessary sag.

```ts
type TensionArcProps = {
  children: React.ReactNode;
};
```

```tsx
import { TensionArc } from "gra-ui";
import "gra-ui/styles.css";

export function SaggingFields() {
  return (
    <TensionArc>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </TensionArc>
  );
}
```

Drag the tension range, or use its keyboard controls. Each child moves to a calculated vertical offset along the curve while its content and order stay unchanged; `Release tension` returns the row to straight. The cells transition smoothly and change corner shape as the arc bends. It could let a reviewer bend a handoff row toward the field under discussion, or let a presenter sag an agenda line to signal that a topic has lost energy. The shape adds mood without adding meaning. A reasonable local alternative is normal flow with one intentional alignment or spacing rule.

## GrayRoute

`GrayRoute` accepts children only in binary-reflected Gray-code order.

```ts
type GrayRouteProps = {
  children: React.ReactNode;
};
```

```tsx
import { GrayRoute } from "gra-ui";
import "gra-ui/styles.css";

export function RoutedFields() {
  return (
    <GrayRoute>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Due date</span>
    </GrayRoute>
  );
}
```

For four children, select station 1, then 2, then 4, then 3. Correct visits leave the board for a real manifest, while a wrong station shakes and remains available; `Reset route` returns to the first station. It could force a reviewer to inspect handoff fields in a bitwise route, or let a presenter reveal agenda items in an order that changes only one abstract bit at a time. The rule is precise but unrelated to the content. A reasonable local alternative is the authored order or a normal checklist.

## AtbashNotice

`AtbashNotice` mirrors a readable notice through the alphabet.

```ts
type AtbashNoticeProps = {
  label: string;
};
```

```tsx
import { AtbashNotice } from "gra-ui";
import "gra-ui/styles.css";

export function MirroredNotice() {
  return <AtbashNotice label="Prepare the ordinary handoff" />;
}
```

Press `Mirror alphabet` to transform A into Z, B into Y and so on while preserving spaces and punctuation. The mirrored text replaces the readable label, and `Restore notice` reverses it. Characters flip into place with a short reduced-motion-aware animation. It could let a reviewer hide a handoff phrase behind a reversible secret identity, or let a presenter reveal an agenda line as a tiny cryptographic artifact before restoring it. Neither use benefits from making copy unreadable. A reasonable local alternative is rendering the text normally and calling a local cipher utility only where a real protocol requires it.

## ApportionVeil

`ApportionVeil` assigns a notice four increasingly unnecessary privacy layers.

```ts
type ApportionVeilProps = {
  children: React.ReactNode;
};
```

Press `Assign another veil` to change the real chamber shape, scale and perimeter one stage at a time; `Unveil and begin again` or `Clear veils` returns to the open state. It could let a reviewer add one privacy layer per awkward question, or let a presenter protect an agenda line until it has received enough ceremony. Neither use makes the message safer or wiser. A reasonable local alternative is one disclosure state or one explicit permission label.

## FatePanel

`FatePanel` gives one child three materially different semantic destinies.

```ts
type FatePanelProps = {
  children: React.ReactNode;
};
```

Choose `Notice`, `Parcel` or `Monument`. The child is actually rendered as an aside, a definition-list parcel or a figure with a blockquote; `Return to uncertainty` clears the choice. It could let a reviewer decide whether a handoff note should remain plain, become a filed object or be elevated into a monument, or let a presenter give an agenda item a temporary stage form. The choice changes ceremony rather than meaning. A reasonable local alternative is choosing the intended semantic element once at the call site.

## DriftPin

`DriftPin` parks content at one of seven arbitrary rail slots.

```ts
type DriftPinProps = {
  children: React.ReactNode;
};
```

Drag the rail or focus it and use the arrow keys, Home or End. The child moves to the exact selected grid slot and stays there after release; `Center pin` returns it to the middle. It could let a reviewer park a warning where attention drifted, or let a presenter slide an agenda label toward the person discussing it. Normal layout already has a more honest answer. A reasonable local alternative is normal flow, one alignment rule or a real drag-and-drop destination.

## AlternatingIntake

`AlternatingIntake` admits children only through alternating left and right gates.

```ts
type AlternatingIntakeProps = {
  children: React.ReactNode;
};
```

Use `Left intake`, then `Right intake`, repeating until every entry is in the real manifest. The wrong gate is rejected without advancing the sequence, and `Empty manifest` restores the waiting entries. It could make a reviewer admit handoff fields from alternating sides of a paper tray, or let a presenter reveal agenda items as if left-right parity were editorial policy. The sequence adds friction without useful order. A reasonable local alternative is the authored order or a normal checklist.

## VowelShift

`VowelShift` moves every vowel in a label one place around an unnecessary vowel wheel.

```ts
type VowelShiftProps = {
  label: string;
};
```

Press `Shift every vowel` to transform `a→e→i→o→u→a` while preserving consonants, spaces and case; `Restore label` returns the exact original copy. It could let a reviewer create a temporary pronunciation puzzle from a handoff line, or let a presenter make an agenda label pass through an invented dialect before restoring it. Neither use improves the copy. A reasonable local alternative is keeping the label readable and using a local string transform only for a real linguistic task.

## GlyphMigration

`GlyphMigration` transfers a sentence’s actual glyphs into an unnecessary archive one at a time.

```ts
type GlyphMigrationProps = {
  label: string;
};
```

Press `Migrate next glyph` to remove the next real character from the readable line and file it as a visible token; spaces become dots in the archive. `Return glyphs` restores the starting sentence. It could let a reviewer migrate a handoff sentence into a character-level archive, or let a presenter file an agenda line one glyph at a time as a tiny ceremony. Neither use makes the message easier to read or safer to store. A reasonable local alternative is leaving the sentence intact and using one local string operation when a parser truly needs individual characters. This component should not have existed because a transfer ledger should not supervise ordinary reading.

## WritingTribunal

`WritingTribunal` lets three directions decide how one child is allowed to be read.

```ts
type WritingTribunalProps = {
  children: React.ReactNode;
};
```

Choose `Row`, `Column` or `Mirror`. The child is actually rendered with normal flow, vertical writing mode or right-to-left override, so the verdict changes the reading geometry. It could let a reviewer choose whether a handoff note should read across, down or from the other edge, or let a presenter give an agenda label a direction before it enters a slide. Both uses turn a known layout choice into a public hearing. A reasonable local alternative is setting `writing-mode` or `direction` directly where the content is authored. This component should not have existed because a tribunal should not decide how ordinary copy flows.

## TraceReceipt

`TraceReceipt` turns a pointer trace into persistent ink geometry around its content.

```ts
type TraceReceiptProps = {
  children: React.ReactNode;
};
```

Draw on the surface and the exact pointer path remains as an SVG receipt around the child. Arrow keys can add a small accessible path, and `Erase trace` clears it. It could let a reviewer circle the field that caused a handoff discussion, or let a presenter draw an improvised border around the agenda item currently under debate. Neither use turns a gesture into useful evidence. A reasonable local alternative is a normal focus ring, annotation field or one explicit selected state. This component should not have existed because persisting freehand geometry is a poor substitute for recording the reason.

## ChordContract

`ChordContract` releases a document only after an exact four-key keyboard contract.

```ts
type ChordContractProps = {
  children: React.ReactNode;
};
```

Focus the surface and press `Control`, `Alt`, `Shift` and `Enter` in that order. Each correct key marks a real station, an unexpected key voids the draft, and the completed sequence changes the document to a signed state; `Void contract` resets it. It could make a reviewer sign a handoff note with a memorized keyboard ritual, or let a presenter unlock an agenda label after demonstrating four keys. Both uses confuse gesture ceremony with authentication or approval. A reasonable local alternative is one accessible button or a real authentication boundary when security matters. This component should not have existed because a fixed key sequence is neither a reliable secret nor useful confirmation.

## RomanLedger

`RomanLedger` replaces a readable phrase with Roman numerals that report each word’s length.

```ts
type RomanLedgerProps = {
  label: string;
};
```

Press `Issue Roman ledger` to transform every word into the Roman numeral for its actual character count while retaining a small source label; `Restore phrase` returns the exact text. It could let a reviewer issue a ceremonial size report for a handoff sentence, or let a presenter turn an agenda line into an antique-looking inventory of word lengths. Both uses discard meaning to display an arbitrary measurement. A reasonable local alternative is keeping the label readable and calculating `word.length` locally when a metric is genuinely needed. This component should not have existed because a Roman ledger should not replace content with its measurement.

## Development

```bash
pnpm install
pnpm dev:docs
```

Available quality checks deliberately exclude tests:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm build:docs
```

## License

MIT
