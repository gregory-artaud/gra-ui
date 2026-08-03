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
