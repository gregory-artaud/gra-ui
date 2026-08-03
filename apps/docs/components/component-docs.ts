export type DemoKind =
  | "button"
  | "indecisive"
  | "counted-clone"
  | "repeat-children"
  | "equal-choice"
  | "split-label"
  | "focus-fade"
  | "press-escape"
  | "keystroke-stack";

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
    featured: true,
    isNew: true,
  },
] as const;

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
