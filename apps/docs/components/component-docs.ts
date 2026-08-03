export type DemoKind =
  | "button"
  | "indecisive"
  | "counted-clone"
  | "repeat-children"
  | "equal-choice"
  | "split-label"
  | "focus-fade"
  | "press-escape"
  | "keystroke-stack"
  | "reorder-back"
  | "drag-duplicate"
  | "hover-confirm"
  | "hold-position"
  | "timed-release"
  | "length-order"
  | "click-order"
  | "corner-fold"
  | "pairwise-merge"
  | "average-position";

export interface ApiRow {
  name: string;
  type: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  slug: string;
  summary: string;
  description: string;
  usage: string;
  api: readonly ApiRow[];
  demo: DemoKind;
  featured?: boolean;
  isNew?: boolean;
}

export const componentDocs: readonly ComponentDoc[] = [
  {
    name: "Button",
    slug: "button",
    summary: "A conventional button with the usual variants.",
    description:
      "A familiar shadcn-style button, included so the unreasonable components have something dependable to use.",
    usage: `import { Button } from "gra-ui";
import "gra-ui/styles.css";

export function Example() {
  return <Button variant="outline">A regular button</Button>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The button content." },
      { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', description: "The visual treatment." },
      { name: "size", type: '"default" | "sm" | "lg" | "icon"', description: "The button dimensions." },
      { name: "asChild", type: "boolean", description: "Render the child element instead of a button." },
      { name: "...props", type: "ButtonHTMLAttributes", description: "Native button attributes are forwarded." },
    ],
    demo: "button",
  },
  {
    name: "IndecisiveButton",
    slug: "indecisive-button",
    summary: "A button that cycles through labels before accepting a decision.",
    description:
      "It considers every option while hovered or focused, then commits to whichever label happens to be visible when clicked.",
    usage: `import { IndecisiveButton } from "gra-ui";
import "gra-ui/styles.css";

export function Example() {
  return (
    <IndecisiveButton
      choices={["Ship it", "Wait", "Ship it anyway"]}
      interval={900}
      onDecision={(choice) => console.log(choice)}
    >
      Decide
    </IndecisiveButton>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The stable label shown while the button is idle." },
      { name: "choices", type: "readonly string[]", description: "Labels cycled while the button is active." },
      { name: "interval", type: "number", description: "Delay between choices. Defaults to 900 ms." },
      { name: "onDecision", type: "(choice, index, event) => void", description: "Called with the visible choice on click." },
      { name: "...props", type: "ButtonProps", description: "Button props, except asChild and children, are forwarded." },
    ],
    demo: "indecisive",
    featured: true,
  },
  {
    name: "CountedClone",
    slug: "counted-clone",
    summary: "A clone that reports how many children its element already has.",
    description:
      "It clones one HTML element solely to attach its existing child count as a data attribute, where it will help almost nobody.",
    usage: `import { CountedClone } from "gra-ui";

export function Example() {
  return <CountedClone element={<span>One child</span>} />;
}`,
    api: [
      { name: "element", type: "ReactElement<HTMLAttributes<HTMLElement>>", description: "The HTML element to clone and annotate." },
    ],
    demo: "counted-clone",
  },
  {
    name: "RepeatChildren",
    slug: "repeat-children",
    summary: "A component that renders one child twice for no useful reason.",
    description:
      "It gives a public component API to the act of writing the same child twice, because one copy was apparently insufficient.",
    usage: `import { RepeatChildren } from "gra-ui";

export function Example() {
  return (
    <RepeatChildren>
      <span>Again</span>
    </RepeatChildren>
  );
}`,
    api: [
      { name: "children", type: "ReactElement", description: "The element rendered twice." },
    ],
    demo: "repeat-children",
  },
  {
    name: "EqualChoice",
    slug: "equal-choice",
    summary: "A double-click choice whose two destinations end in the same place.",
    description:
      "It asks you to choose a side, moves the content there, and restores the original position immediately afterward.",
    usage: `import { EqualChoice } from "gra-ui";

export function Example() {
  return (
    <EqualChoice>
      <span>Stay here</span>
    </EqualChoice>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content offered two equivalent destinations." },
    ],
    demo: "equal-choice",
  },
  {
    name: "SplitLabel",
    slug: "split-label",
    summary: "A label that must be split and personally reassembled.",
    description:
      "It separates a label, asks you to click both pieces, and reunites them exactly as they were before the interruption.",
    usage: `import { SplitLabel } from "gra-ui";

export function Example() {
  return <SplitLabel label="Keep this together" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text to split into two selectable halves." },
    ],
    demo: "split-label",
  },
  {
    name: "FocusFade",
    slug: "focus-fade",
    summary: "A focusable group that fades away and returns to confirm focus.",
    description:
      "It fades focused content away, waits for the browser to notice, and restores the exact same content moments later.",
    usage: `import { FocusFade } from "gra-ui";

export function Example() {
  return (
    <FocusFade>
      <span>Focus me</span>
    </FocusFade>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content that disappears and returns on focus." },
    ],
    demo: "focus-fade",
    featured: true,
  },
  {
    name: "PressEscape",
    slug: "press-escape",
    summary: "A held button whose content flees and returns unchanged.",
    description:
      "It makes its content flee while pressed, then restores everything when the pointer or key is released.",
    usage: `import { PressEscape } from "gra-ui";

export function Example() {
  return <PressEscape>Hold this</PressEscape>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content that flees while the button is pressed." },
    ],
    demo: "press-escape",
  },
  {
    name: "KeystrokeStack",
    slug: "keystroke-stack",
    summary: "A label that stacks one character at a time when you type.",
    description:
      "It counts character keystrokes, stacks the label one symbol at a time, and flattens it again after one extra key.",
    usage: `import { KeystrokeStack } from "gra-ui";

export function Example() {
  return <KeystrokeStack label="Leave this alone" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text stacked one character at a time." },
    ],
    demo: "keystroke-stack",
  },
  {
    name: "ReorderBack",
    slug: "reorder-back",
    summary: "Two items that swap places and immediately regret it.",
    description:
      "It moves two pieces of content into each other’s slots on click, then requires another click to restore the original order.",
    usage: `import { ReorderBack } from "gra-ui";
import "gra-ui/styles.css";

export function Example() {
  return <ReorderBack first="First" second="Second" />;
}`,
    api: [
      { name: "first", type: "ReactNode", description: "The content in the first slot." },
      { name: "second", type: "ReactNode", description: "The content in the second slot." },
    ],
    demo: "reorder-back",
    featured: true,
  },
  {
    name: "DragDuplicate",
    slug: "drag-duplicate",
    summary: "A draggable child that makes a second copy of itself.",
    description:
      "It duplicates the content while being dragged, then folds both copies together when the drag ends.",
    usage: `import { DragDuplicate } from "gra-ui";
import "gra-ui/styles.css";

export function Example() {
  return <DragDuplicate>One copy is enough</DragDuplicate>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content duplicated during a drag." },
    ],
    demo: "drag-duplicate",
    featured: true,
  },
  {
    name: "HoverConfirm",
    slug: "hover-confirm",
    summary: "A card that needs three separate hover entries before confirmation.",
    description:
      "It counts each time the pointer leaves and re-enters its content, then locks the card in a confirmed state after the third pass.",
    usage: `import { HoverConfirm } from "gra-ui";
import "gra-ui/styles.css";

export function Example() {
  return <HoverConfirm>Approve this card</HoverConfirm>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content that must be entered three times." },
    ],
    demo: "hover-confirm",
    featured: true,
  },
  {
    name: "HoldPosition",
    slug: "hold-position",
    summary: "A held item that stays wherever you leave it.",
    description:
      "Hold the content, move across three fixed positions, and release it to permanently keep the chosen slot until you move it again.",
    usage: `import { HoldPosition } from "gra-ui";
import "gra-ui/styles.css";

export function Parked() {
  return <HoldPosition>Leave this in the middle</HoldPosition>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved between three fixed positions." },
    ],
    demo: "hold-position",
    featured: true,
  },
  {
    name: "TimedRelease",
    slug: "timed-release",
    summary: "A hold whose release time chooses where the content lands.",
    description:
      "Release it before the meter fills and the content settles on the left; keep holding until it fills and it settles on the right.",
    usage: `import { TimedRelease } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyReleased() {
  return <TimedRelease>Release this carefully</TimedRelease>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content parked by the release timing." },
    ],
    demo: "timed-release",
    featured: true,
  },
  {
    name: "LengthOrder",
    slug: "length-order",
    summary: "A list that sorts itself by the length of its labels.",
    description:
      "It cycles through the original order, shortest label first, and longest label first, because visible copy apparently needs a ranking system.",
    usage: `import { LengthOrder } from "gra-ui";
import "gra-ui/styles.css";

export function SortedLabels() {
  return (
    <LengthOrder items={["Keep", "Maybe later", "Definitely not"]} />
  );
}`,
    api: [
      { name: "items", type: "readonly string[]", description: "The labels sorted by character count." },
    ],
    demo: "length-order",
    featured: true,
  },
  {
    name: "ClickOrder",
    slug: "click-order",
    summary: "Fragments that remember the order you clicked them in.",
    description:
      "It removes each selected fragment and composes a permanent result in the exact order you chose, because content apparently needs to be assembled by hand.",
    usage: `import { ClickOrder } from "gra-ui";
import "gra-ui/styles.css";

export function OrderedCopy() {
  return (
    <ClickOrder>
      <span>First,</span>
      <span>then this,</span>
      <span>finally this.</span>
    </ClickOrder>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The fragments selected into a user-defined order." },
    ],
    demo: "click-order",
    featured: true,
  },
  {
    name: "CornerFold",
    slug: "corner-fold",
    summary: "A card that folds only after every corner has been visited.",
    description:
      "It records four separate corner visits, then compresses the content into a folded state that remains until you start over.",
    usage: `import { CornerFold } from "gra-ui";
import "gra-ui/styles.css";

export function FoldedCard() {
  return <CornerFold>Visit every corner first</CornerFold>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content folded after all four corners are visited." },
    ],
    demo: "corner-fold",
    featured: true,
  },
  {
    name: "PairwiseMerge",
    slug: "pairwise-merge",
    summary: "Groups that can only be reduced two at a time.",
    description:
      "It makes you double-click two groups at a time, joins their content, and keeps reducing the list until one group remains.",
    usage: `import { PairwiseMerge } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The groups reduced two at a time." },
    ],
    demo: "pairwise-merge",
    featured: true,
  },
  {
    name: "AveragePosition",
    slug: "average-position",
    summary: "A label that settles at the average of three clicks.",
    description:
      "It records three locations on a track, calculates their arithmetic mean, and parks the content there until someone resets the exercise.",
    usage: `import { AveragePosition } from "gra-ui";
import "gra-ui/styles.css";

export function SettledLabel() {
  return <AveragePosition>Place this carefully</AveragePosition>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content parked at the average of three marked positions." },
    ],
    demo: "average-position",
    featured: true,
    isNew: true,
  },
] as const;

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
