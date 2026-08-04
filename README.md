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
