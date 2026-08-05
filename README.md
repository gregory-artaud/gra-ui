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
