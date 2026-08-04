export type DemoKind =
  | "scale-sweep"
  | "scroll-redact"
  | "copy-echo"
  | "word-relay"
  | "index-sum"
  | "drag-threshold"
  | "button"
  | "side-split"
  | "duration-scale"
  | "mixed-click"
  | "weight-vote"
  | "case-gate"
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
  | "average-position"
  | "last-remaining"
  | "focus-unpack"
  | "backspace-archive"
  | "hover-route"
  | "nest-children";

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
  useCase?: string;
  alternative?: string;
  featured?: boolean;
  isNew?: boolean;
}

export const componentDocs: readonly ComponentDoc[] = [
  {
    name: "ScaleSweep",
    slug: "scale-sweep",
    summary: "Children that stay enlarged after a pointer sweeps across them.",
    description:
      "It turns a row of children into a size-earning track: drag the handle across each item, and every item it crosses remains visibly enlarged until you shrink everything again.",
    usage: `import { ScaleSweep } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The items enlarged and marked as the sweep passes over them." },
    ],
    demo: "scale-sweep",
    useCase:
      "It could be used to make a reviewer sweep across the fields that deserve extra space on a summary card, or to let a presenter ceremonially enlarge the labels they plan to discuss.",
    alternative:
      "A reasonable local alternative is a small visited-index set and one conditional class in the page. Publishing a drag-operated sizing ritual is difficult to defend when the layout already knows its own priorities.",
    featured: true,
    isNew: true,
  },
  {
    name: "ScrollRedact",
    slug: "scroll-redact",
    summary: "A label that gets redacted one wheel notch at a time.",
    description:
      "It covers its children with five opaque bands as you scroll over them, turning a harmless label into a gradually classified document and preserving the blackout until you scroll back or remove the bands.",
    usage: `import { ScrollRedact } from "gra-ui";
import "gra-ui/styles.css";

export function ClassifiedLabel() {
  return <ScrollRedact>Release candidate 2.7</ScrollRedact>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content covered by one redaction band per wheel step." },
    ],
    demo: "scroll-redact",
    useCase:
      "It could be used to make a reviewer scroll five notches before a status label becomes properly classified, or to ceremonially hide a small piece of content during a live presentation.",
    alternative:
      "A reasonable local alternative is a boolean or small number in the page with one overlay. Publishing a wheel-operated censorship ritual is difficult to defend when CSS can hide content directly.",
    featured: true,
  },
  {
    name: "CopyEcho",
    slug: "copy-echo",
    summary: "A copied label that leaves visible souvenirs behind.",
    description:
      "It listens to the browser's real copy event, adds one visible replica of the label, and settles after three copies with an unnecessarily official shadow. The label is changed in the DOM, not merely counted, while the original clipboard action still works normally.",
    usage: `import { CopyEcho } from "gra-ui";
import "gra-ui/styles.css";

export function OverDocumentedLabel() {
  return <CopyEcho label="Ready for review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The read-only text users select and copy to create visible echoes." },
    ],
    demo: "copy-echo",
    useCase:
      "It could be used to make a reviewer copy a release status three times before a handoff, or to let a tiny clipboard-friendly label visibly accumulate an audit trail.",
    alternative:
      "A reasonable local alternative is a read-only input with one onCopy handler and a small array rendered beside it. Publishing that ceremony as a reusable component remains difficult to defend.",
    featured: true,
  },
  {
    name: "WordRelay",
    slug: "word-relay",
    summary: "Words that pass their last letters to the next word.",
    description:
      "It repeatedly removes the final letter from every word and hands it to the beginning of the next word, preserving the total letters while making the sentence less useful.",
    usage: `import { WordRelay } from "gra-ui";
import "gra-ui/styles.css";

export function HandoffLabels() {
  return <WordRelay label="Title Status Owner Date" />;
}`,
    api: [
      { name: "label", type: "string", description: "The space-separated words whose final letters circulate between neighbors." },
    ],
    demo: "word-relay",
    featured: true,
  },
  {
    name: "IndexSum",
    slug: "index-sum",
    summary: "Children selected by the arithmetic value of their position.",
    description:
      "It gives every child an ordinal value, asks you to select a combination that reaches a calculated target, and freezes the exact sum when you get there.",
    usage: `import { IndexSum } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The items assigned ascending values by their position." },
    ],
    demo: "index-sum",
    featured: true,
  },
  {
    name: "DragThreshold",
    slug: "drag-threshold",
    summary: "Content that unlocks after three increasingly long drags.",
    description:
      "It asks you to release the content past three marks in order, resets the whole progression when you release too early, and locks the final state after the last threshold.",
    usage: `import { DragThreshold } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyCommitted() {
  return <DragThreshold>Drag this farther</DragThreshold>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content dragged through three increasing thresholds." },
    ],
    demo: "drag-threshold",
    featured: true,
  },
  {
    name: "SideSplit",
    slug: "side-split",
    summary: "Children routed into two permanent sides one choice at a time.",
    description:
      "It presents one child at a time and makes you send each one left or right, preserving the resulting split after the final decision.",
    usage: `import { SideSplit } from "gra-ui";
import "gra-ui/styles.css";

export function SortFields() {
  return (
    <SideSplit>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </SideSplit>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces routed one at a time into the two sides." },
    ],
    demo: "side-split",
    featured: true,
  },
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
    name: "DurationScale",
    slug: "duration-scale",
    summary: "Content scaled by the average time you hold it.",
    description:
      "It records three press-and-hold durations, calculates their average, and keeps the content at the resulting scale until you measure it again.",
    usage: `import { DurationScale } from "gra-ui";
import "gra-ui/styles.css";

export function MeasuredContent() {
  return <DurationScale>Hold this carefully</DurationScale>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content scaled by the average of three hold durations." },
    ],
    demo: "duration-scale",
    featured: true,
  },
  {
    name: "MixedClick",
    slug: "mixed-click",
    summary: "Content that releases only after left-right-left clicking.",
    description:
      "It requires a primary click, a context click, and another primary click; a wrong button resets the sequence before the content is released.",
    usage: `import { MixedClick } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialRelease() {
  return <MixedClick>Approve this card</MixedClick>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved through the three-click sequence." },
    ],
    demo: "mixed-click",
    featured: true,
  },
  {
    name: "WeightVote",
    slug: "weight-vote",
    summary: "Children that grow toward a winner one click at a time.",
    description:
      "It lets each child collect three clicks of weight, enlarges every partial choice, and locks the first one to reach the arbitrary limit.",
    usage: `import { WeightVote } from "gra-ui";
import "gra-ui/styles.css";

export function EmphasizedField() {
  return (
    <WeightVote>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </WeightVote>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The choices that accumulate weight through clicks." },
    ],
    demo: "weight-vote",
    featured: true,
  },
  {
    name: "CaseGate",
    slug: "case-gate",
    summary: "Content that unlocks after six alternating letter cases.",
    description:
      "It hides its children until you type six letters that alternate uppercase and lowercase; one mistake erases the whole attempt.",
    usage: `import { CaseGate } from "gra-ui";
import "gra-ui/styles.css";

export function CarefullyHidden() {
  return <CaseGate>Release notes</CaseGate>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content revealed after six alternating-case letters." },
    ],
    demo: "case-gate",
    featured: true,
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
  },
  {
    name: "LastRemaining",
    slug: "last-remaining",
    summary: "An option list that removes choices until one remains.",
    description:
      "It lets you eliminate each option one at a time, preserves the casualties, and promotes the final survivor as though a list needed a tournament bracket.",
    usage: `import { LastRemaining } from "gra-ui";
import "gra-ui/styles.css";

export function ChooseOne() {
  return (
    <LastRemaining
      items={["Keep the title", "Keep the status", "Keep the owner"]}
    />
  );
}`,
    api: [
      { name: "items", type: "readonly string[]", description: "The options eliminated one at a time until one remains." },
    ],
    demo: "last-remaining",
    featured: true,
  },
  {
    name: "FocusUnpack",
    slug: "focus-unpack",
    summary: "A focused bundle that separates its children for inspection.",
    description:
      "It keeps several children in one compact bundle until focus splits them into separate cards; press Space to pack them together again.",
    usage: `import { FocusUnpack } from "gra-ui";
import "gra-ui/styles.css";

export function InspectedFields() {
  return (
    <FocusUnpack>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </FocusUnpack>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content packed together until focus separates it." },
    ],
    demo: "focus-unpack",
    featured: true,
  },
  {
    name: "BackspaceArchive",
    slug: "backspace-archive",
    summary: "An input that archives every character removed with Backspace.",
    description:
      "It lets you edit a label normally, except each Backspace deletion is copied into a permanent little tray for inspection.",
    usage: `import { BackspaceArchive } from "gra-ui";
import "gra-ui/styles.css";

export function ReviewedText() {
  return <BackspaceArchive label="Keep this sentence" />;
}`,
    api: [
      { name: "label", type: "string", description: "The starting text placed in the editable field." },
    ],
    demo: "backspace-archive",
    featured: true,
  },
  {
    name: "HoverRoute",
    slug: "hover-route",
    summary: "Content that moves only when you hover a fixed route in order.",
    description:
      "It moves its children through four hover zones, resets when you skip ahead, and settles in the middle after the full route is completed.",
    usage: `import { HoverRoute } from "gra-ui";
import "gra-ui/styles.css";

export function DeliberateRelease() {
  return <HoverRoute>Release this carefully</HoverRoute>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved along the fixed four-step route." },
    ],
    demo: "hover-route",
    featured: true,
  },
  {
    name: "NestChildren",
    slug: "nest-children",
    summary: "A stack that makes you nest every child by hand.",
    description:
      "It removes one child at a time from a menu and wraps the growing stack with it, turning a finished tree into an activity.",
    usage: `import { NestChildren } from "gra-ui";
import "gra-ui/styles.css";

export function NestedFields() {
  return (
    <NestChildren>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </NestChildren>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The children nested one at a time into a visible stack." },
    ],
    demo: "nest-children",
    featured: true,
  },
] as const;

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
