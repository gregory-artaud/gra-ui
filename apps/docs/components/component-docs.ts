export type DemoKind =
  | "markup-promotion"
  | "separator-ballot"
  | "belt-collector"
  | "operation-parade"
  | "redundancy-culler"
  | "coil-certification"
  | "witness-choice"
  | "shutter-pass"
  | "return-protocol"
  | "acronym-forge"
  | "notch-progress"
  | "filing-fork"
  | "pointer-plot"
  | "switchback-route"
  | "codepoint-receipt"
  | "clarity-debt"
  | "spelling-permit"
  | "slice-referendum"
  | "compass-hinge"
  | "event-relay"
  | "alphabetize-words"
  | "arithmetic-council"
  | "tether-pull"
  | "double-entry"
  | "signal-transcript"
  | "calibration-window"
  | "semantic-lottery"
  | "cellular-drift"
  | "reverse-queue"
  | "punctuation-sieve"
  | "context-escalator"
  | "outcome-triptych"
  | "magnetic-dock"
  | "pattern-latch"
  | "letter-census"
  | "recess-depth"
  | "custody-choice"
  | "counterweight"
  | "shadow-pair"
  | "center-out"
  | "punch-proof"
  | "sort-mandate"
  | "lens-rail"
  | "quota-procession"
  | "braidline"
  | "wheel-stamp"
  | "elastic-frame"
  | "neighbor-march"
  | "signal-choice"
  | "footnote-shift"
  | "precision-ladder"
  | "mask-ballot"
  | "free-drift"
  | "docket-sequence"
  | "vowel-hinge"
  | "ratchet-reveal"
  | "verdict-selector"
  | "orbit-stow"
  | "palindrome-latch"
  | "inside-out-words"
  | "focus-receipt"
  | "ruler-rise"
  | "lasso-lock"
  | "word-turnstile"
  | "margin-quota"
  | "rotation-tithe"
  | "letter-levy"
  | "parity-purge"
  | "blank-filing"
  | "momentum-weave"
  | "space-staple"
  | "arrow-bias"
  | "idle-unspool"
  | "disclosure-spill"
  | "cursor-proof"
  | "seam-fold"
  | "selection-seal"
  | "checkpoint-queue"
  | "alphabet-treadmill"
  | "layout-referendum"
  | "child-gravity"
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
  | "nest-children"
  | "weekday-ledger"
  | "binary-march"
  | "metric-mandate"
  | "crank-shift"
  | "gesture-patent"
  | "run-length-pack"
  | "clause-audit"
  | "terminus-choice"
  | "drop-silo"
  | "alphabetical-queue"
  | "percent-parcel"
  | "column-tally"
  | "rounding-ruling"
  | "tension-arc"
  | "gray-route"
  | "atbash-notice"
  | "apportion-veil"
  | "fate-panel"
  | "drift-pin"
  | "alternating-intake"
  | "vowel-shift"
  | "glyph-migration"
  | "writing-tribunal"
  | "trace-receipt"
  | "chord-contract"
  | "roman-ledger"
  | "citation-ladder"
  | "prefix-referendum"
  | "perimeter-escort"
  | "checksum-order"
  | "edge-exchange"
  | "parcel-audit"
  | "format-fork"
  | "indent-tether"
  | "focus-parade"
  | "slug-mangle"
  | "crest-progress"
  | "shape-verdict"
  | "vanishing-point"
  | "fold-order"
  | "glyph-offset"
  | "decoration-toll"
  | "case-ballot"
  | "ratio-rail"
  | "edit-sequence"
  | "article-ejector"
  | "prime-ledger"
  | "caption-charter"
  | "caret-split"
  | "gate-sequence"
  | "column-transpose";

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
    name: "MarkupPromotion",
    slug: "markup-promotion",
    summary: "A notice climbs through increasingly official HTML containers one promotion at a time.",
    description:
      "It promotes the same notice from a plain block into a section, article, aside and blockquote. The DOM and the visual treatment both change, as though semantic weight could be earned by clicking.",
    usage: `import { MarkupPromotion } from "gra-ui";
import "gra-ui/styles.css";

export function PromotedNotice() {
  return <MarkupPromotion><span>Ready for another review</span></MarkupPromotion>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice promoted through five increasingly official containers." },
    ],
    demo: "markup-promotion",
    useCase:
      "It could let a reviewer promote a handoff note until its HTML structure looks authoritative, or let a presenter raise an agenda line through five ranks before giving it the floor. Neither use makes semantics more true.",
    alternative:
      "A reasonable local alternative is choosing the correct element at authoring time and adding one status if needed. A promotion ladder turns document structure into a reward track.",
  },
  {
    name: "SeparatorBallot",
    slug: "separator-ballot",
    summary: "Three separator policies give one label three genuinely different readings.",
    description:
      "Choose a dot trail, slash file or column fall. Each ruling changes the actual separators and, for the column choice, the rendered list structure rather than merely changing a color or label.",
    usage: `import { SeparatorBallot } from "gra-ui";
import "gra-ui/styles.css";

export function RuledLabel() {
  return <SeparatorBallot label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The words submitted to the three competing separator policies." },
    ],
    demo: "separator-ballot",
    useCase:
      "It could let a reviewer decide whether a handoff phrase belongs in dots, slashes or a vertical filing column, or let a presenter vote on how an agenda line should occupy a slide. The words gain no authority from their chosen punctuation.",
    alternative:
      "A reasonable local alternative is writing the desired separator directly or keeping the sentence in normal flow. A ballot makes a formatting decision look like governance.",
  },
  {
    name: "BeltCollector",
    slug: "belt-collector",
    summary: "Drag a pickup head across a row and collect each child into a needless tray.",
    description:
      "The collector follows the pointer or arrow keys along a belt. As it reaches each piece, that child leaves the belt and appears in a real pickup tray, so movement changes the inventory rather than merely animating a cursor.",
    usage: `import { BeltCollector } from "gra-ui";
import "gra-ui/styles.css";

export function CollectedNotice() {
  return (
    <BeltCollector>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </BeltCollector>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces picked up from the belt and placed in the tray." },
    ],
    demo: "belt-collector",
    useCase:
      "It could let a reviewer sweep a handoff brief into a pickup tray one field at a time, or let a presenter physically collect agenda items before a slide advances. A list already has a much better collection mechanism.",
    alternative:
      "A reasonable local alternative is an ordinary list with selection state or one batch action. A pointer-controlled collector spends a machine metaphor on moving data a few pixels.",
  },
  {
    name: "OperationParade",
    slug: "operation-parade",
    summary: "Three arithmetic buttons produce different answers solely because they march in a different order.",
    description:
      "Double, add seven and reverse the digits can each be used once. The live number changes after every step, and the final result depends on the order in which the same three operations were paraded.",
    usage: `import { OperationParade } from "gra-ui";
import "gra-ui/styles.css";

export function ParadedValue() {
  return <OperationParade value={24} />;
}`,
    api: [
      { name: "value", type: "number", description: "The starting number submitted to the order-dependent operation parade." },
    ],
    demo: "operation-parade",
    useCase:
      "It could make a reviewer perform three arbitrary calculations on a handoff estimate, or let a presenter demonstrate that an agenda number changes when its ceremony changes. Both uses confuse order sensitivity with policy.",
    alternative:
      "A reasonable local alternative is one explicit expression or a named calculation function. A public parade makes arithmetic depend on audience choreography.",
  },
  {
    name: "RedundancyCuller",
    slug: "redundancy-culler",
    summary: "One click removes repeated words from a sentence and files the discarded copies.",
    description:
      "It keeps the first occurrence of each word, removes later case-insensitive repeats from the visible sentence and records the discarded words in a real drawer. Restoring repetitions returns the original label.",
    usage: `import { RedundancyCuller } from "gra-ui";
import "gra-ui/styles.css";

export function CullableNotice() {
  return <RedundancyCuller label="Review the review before the review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose repeated words can be removed and listed." },
    ],
    demo: "redundancy-culler",
    useCase:
      "It could let a reviewer cull repeated words from a handoff sentence, or let a presenter strip an agenda line down to its first mention of every term. Removing repetition also removes emphasis that may have been intentional.",
    alternative:
      "A reasonable local alternative is editing the copy deliberately or leaving repetition intact. A reusable culler should not decide that recurring language is waste.",
  },
  {
    name: "CoilCertification",
    slug: "coil-certification",
    summary: "Four unnecessary loops wind around a notice until geometry declares it certified.",
    description:
      "It adds one actual perimeter loop at a time around the child. Each loop changes the chamber and the final coil gives the notice a visible seal that says nothing about its contents.",
    usage: `import { CoilCertification } from "gra-ui";
import "gra-ui/styles.css";

export function CoiledNotice() {
  return <CoilCertification><span>Ready for another review</span></CoilCertification>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice enclosed by the progressively growing coil." },
    ],
    demo: "coil-certification",
    useCase:
      "It could let a reviewer wind one loop around a handoff note per glance, or let a presenter certify an agenda label by physically enclosing it before a slide advances. Both uses mistake enclosure for evidence.",
    alternative:
      "A reasonable local alternative is the notice with one status badge when certification matters. Adding four geometric loops turns a binary decision into a ceremony with no new information.",
  },
  {
    name: "WitnessChoice",
    slug: "witness-choice",
    summary: "Choose whether an unnecessary witness leads, follows or stands beside the same notice.",
    description:
      "The three choices do not merely recolor a box: they render the child in three different physical arrangements with a distinct witness slip above, beside or below it. The chosen placement remains until it is returned to an unwitnessed state.",
    usage: `import { WitnessChoice } from "gra-ui";
import "gra-ui/styles.css";

export function WitnessedNotice() {
  return <WitnessChoice><span>Needs a decision</span></WitnessChoice>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice assigned one of three witness placements." },
    ],
    demo: "witness-choice",
    useCase:
      "It could let a reviewer decide whether a handoff note needs a witness before it, beside it or after it, or let a presenter give an agenda line a ceremonial chaperone position. Neither use benefits from making layout answer to a vote.",
    alternative:
      "A reasonable local alternative is one nearby status label and the intended layout. A three-way witness placement creates structural doubt where the content already has a natural position.",
  },
  {
    name: "ShutterPass",
    slug: "shutter-pass",
    summary: "Drag a reading shutter across a notice and keep only the arbitrary aperture you leave open.",
    description:
      "A pointer-controlled shutter changes the actual clip boundary of the child, so the notice is partially hidden until the aperture is moved. Arrow keys, Home and End provide the same direct manipulation route without a pointer.",
    usage: `import { ShutterPass } from "gra-ui";
import "gra-ui/styles.css";

export function AperturedNotice() {
  return <ShutterPass><span>Only the approved portion is visible</span></ShutterPass>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content revealed through the movable reading shutter." },
    ],
    demo: "shutter-pass",
    useCase:
      "It could let a reviewer reveal a handoff note only as far as attention permits, or let a presenter choose how much of an agenda label the audience deserves to see. Both uses turn visibility into a hand-operated aperture.",
    alternative:
      "A reasonable local alternative is the content itself or a deliberate disclosure control. A draggable clip boundary is extra geometry for deciding whether a sentence is visible.",
  },
  {
    name: "ReturnProtocol",
    slug: "return-protocol",
    summary: "Borrow, witness and return a notice in order, leaving a mark it never needed.",
    description:
      "The child travels from Home to a Loan Tray, receives a visible witness mark and returns only after the three actions happen in that order. The stations and completed mark make the sequence observable, and cancellation restores the beginning.",
    usage: `import { ReturnProtocol } from "gra-ui";
import "gra-ui/styles.css";

export function LoanedNotice() {
  return <ReturnProtocol><span>Back by the next meeting</span></ReturnProtocol>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice that travels through the ordered loan stations." },
    ],
    demo: "return-protocol",
    useCase:
      "It could make a reviewer borrow a handoff note before annotating it, or let a presenter rehearse taking an agenda line off the slide and returning it with a witness mark. The order creates accountability theater, not accountability.",
    alternative:
      "A reasonable local alternative is one edit action with a visible status. A three-station loan protocol makes a small annotation depend on an invented custody chain.",
  },
  {
    name: "AcronymForge",
    slug: "acronym-forge",
    summary: "One click smelts a readable phrase into its opening letters and displays the evidence trail.",
    description:
      "The supplied label is transformed into a real acronym made from the first character of every word. A source ledger shows which words contributed, and restoring the phrase brings back the original content.",
    usage: `import { AcronymForge } from "gra-ui";
import "gra-ui/styles.css";

export function ForgedNotice() {
  return <AcronymForge label="Please keep this sentence readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase transformed into an acronym and source ledger." },
    ],
    demo: "acronym-forge",
    useCase:
      "It could let a reviewer compress a handoff sentence into a meeting shorthand, or let a presenter forge a slide code from an agenda phrase before restoring the readable version. Both uses reward losing words that were already doing useful work.",
    alternative:
      "A reasonable local alternative is keeping the phrase and deriving a local acronym only where the shortened form is actually needed. A forge should not replace the copy it is meant to help name.",
  },
  {
    name: "NotchProgress",
    slug: "notch-progress",
    summary: "Five ceremonial notches turn a readable notice into a fully notarized seal.",
    description:
      "It advances one physical-looking notch at a time. The ring fills, the marks settle and the child sinks into its seal only at the fifth stage; starting again deliberately discards the certification.",
    usage: `import { NotchProgress } from "gra-ui";
import "gra-ui/styles.css";

export function NotarizedNotice() {
  return <NotchProgress><span>Ready for one more review</span></NotchProgress>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice that earns five visible notches." },
    ],
    demo: "notch-progress",
    useCase:
      "It could make a reviewer notch a handoff note once per glance, or let a presenter certify an agenda label before putting it on a slide. Both uses turn merely seeing content into an ornamental approval ritual.",
    alternative:
      "A reasonable local alternative is rendering the notice and using one explicit status when approval matters. A five-notch seal gives a progress meter authority over a task that has no measurable progress.",
  },
  {
    name: "FilingFork",
    slug: "filing-fork",
    summary: "Choose a ledger, frame or echo and the same child receives a different actual shelf.",
    description:
      "The three choices render different HTML structures: a numbered filing ledger, a fieldset container or a quoted echo. The result is not a tint or a label change; it is a real structural fork that can be returned to intake.",
    usage: `import { FilingFork } from "gra-ui";
import "gra-ui/styles.css";

export function ShelvedNotice() {
  return <FilingFork><span>Needs a decision</span></FilingFork>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content placed into one of three incompatible filing structures." },
    ],
    demo: "filing-fork",
    useCase:
      "It could let a reviewer choose whether a handoff note belongs in a ledger, a containment frame or an emphatic quote, or let a presenter give one agenda line a temporary stage format. Neither use needs a reusable fork because the intended structure is already known.",
    alternative:
      "A reasonable local alternative is choosing one semantic structure at the call site and styling it locally. Making the audience vote on a shelf adds a decision without improving the content.",
  },
  {
    name: "PointerPlot",
    slug: "pointer-plot",
    summary: "A click on a map relocates the cargo to the exact coordinate it did not need.",
    description:
      "It puts one child on a bounded plotting surface. Pointer placement moves the actual child and crosshair to the chosen coordinate, while arrow keys provide a precise keyboard route back to the middle.",
    usage: `import { PointerPlot } from "gra-ui";
import "gra-ui/styles.css";

export function PlottedNotice() {
  return <PointerPlot><span>Park this note</span></PointerPlot>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The cargo moved to a real coordinate on the plot." },
    ],
    demo: "pointer-plot",
    useCase:
      "It could let a reviewer park a warning at the place where attention drifted, or let a presenter position an agenda label on a tactical-looking slide. Both uses make ordinary layout answer to a coordinate ritual.",
    alternative:
      "A reasonable local alternative is normal flow with one alignment or a local CSS position. A plotting surface introduces geometry when the content could simply occupy its intended place.",
  },
  {
    name: "SwitchbackRoute",
    slug: "switchback-route",
    summary: "Four arrow keys send a notice around a route whose long way is the only way.",
    description:
      "Focus the route and press Up, Right, Down, then Left. Each correct turn lights another station; any wrong arrow returns the route to its entrance, and only the completed detour releases the child.",
    usage: `import { SwitchbackRoute } from "gra-ui";
import "gra-ui/styles.css";

export function DetouredNotice() {
  return <SwitchbackRoute><span>Arrived eventually</span></SwitchbackRoute>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content released after the four-turn keyboard route." },
    ],
    demo: "switchback-route",
    useCase:
      "It could make a reviewer navigate a handoff note through a memorized detour, or let a presenter rehearse a four-turn gesture before revealing an agenda item. The order is real, but the detour protects nothing.",
    alternative:
      "A reasonable local alternative is one button or one direct keyboard command. Turning four arrows into a gate makes a trivial reveal depend on a sequence users must remember.",
  },
  {
    name: "CodepointReceipt",
    slug: "codepoint-receipt",
    summary: "One click converts readable copy into a receipt for every underlying character code.",
    description:
      "It transforms each actual character into a ledger line with its glyph, Unicode code point and a proportional bar. The original sentence returns intact, so the conversion is observable and reversible rather than decorative.",
    usage: `import { CodepointReceipt } from "gra-ui";
import "gra-ui/styles.css";

export function ItemizedNotice() {
  return <CodepointReceipt label="Please keep this sentence readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text itemized into a visible Unicode receipt." },
    ],
    demo: "codepoint-receipt",
    useCase:
      "It could let a reviewer audit the exact characters in a handoff label, or let a presenter turn an agenda phrase into a machine-legible artifact for one slide. Both uses expose data that is technically true and practically unhelpful.",
    alternative:
      "A reasonable local alternative is rendering the label and using a local string utility only when code points are actually relevant. A receipt component makes implementation detail compete with reading.",
  },
  {
    name: "CalibrationWindow",
    slug: "calibration-window",
    summary: "Four calibration notches narrow the window around one otherwise adequate notice.",
    description:
      "It makes a child pass through four progressively narrower calibration apertures. Each notch changes the actual width and elevation of the notice, leaving it fully calibrated inside a window that never needed measuring.",
    usage: `import { CalibrationWindow } from "gra-ui";
import "gra-ui/styles.css";

export function CalibratedNotice() {
  return <CalibrationWindow><span>Ready for review</span></CalibrationWindow>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice squeezed through the four calibration windows." },
    ],
    demo: "calibration-window",
    useCase:
      "It could make a reviewer certify that a handoff notice fits increasingly strict apertures, or let a presenter calibrate an agenda label before allowing it into a slide.",
    alternative:
      "A reasonable local alternative is one max-width and ordinary layout. Four irreversible calibration notches turn sizing into paperwork without making the notice more useful.",
    featured: true,
  },
  {
    name: "SemanticLottery",
    slug: "semantic-lottery",
    summary: "Three semantic wrappers give one child three genuinely different kinds of officialness.",
    description:
      "It asks the user to choose whether the child should be an article briefing, a ledger row or an aside. The selected option changes the actual HTML structure, typography and layout rather than only tinting the same box.",
    usage: `import { SemanticLottery } from "gra-ui";
import "gra-ui/styles.css";

export function OfficialNotice() {
  return <SemanticLottery><span>Needs a noun</span></SemanticLottery>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content assigned one of three semantic presentations." },
    ],
    demo: "semantic-lottery",
    useCase:
      "It could let an editor classify a handoff note as a briefing, ledger item or side note, or let a presenter give an agenda label a structural identity before showing it.",
    alternative:
      "A reasonable local alternative is choosing the correct element at the call site. A lottery that decides whether content is an article, definition or aside is semantic theater.",
    featured: true,
  },
  {
    name: "CellularDrift",
    slug: "cellular-drift",
    summary: "A click sends content to one of nine cells and keeps it there instead of using normal flow.",
    description:
      "It places a child on a bounded three-by-three board. Selecting any numbered cell moves the actual content to that coordinate, with the middle treated as a strangely privileged reset point.",
    usage: `import { CellularDrift } from "gra-ui";
import "gra-ui/styles.css";

export function ParkedNotice() {
  return <CellularDrift><span>Place me precisely</span></CellularDrift>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved across the nine-cell board." },
    ],
    demo: "cellular-drift",
    useCase:
      "It could let a reviewer park a warning in the cell where attention seems likely to land, or let a presenter assign an agenda item a coordinate on an unnecessarily tactical slide.",
    alternative:
      "A reasonable local alternative is normal flow or one alignment value. A nine-cell relocation board makes a simple position depend on a small ceremony.",
    featured: true,
  },
  {
    name: "ReverseQueue",
    slug: "reverse-queue",
    summary: "A queue accepts its children only from last to first, then displays that reverse manifest.",
    description:
      "It requires the final child to board first, followed by each predecessor. Wrong selections remain available and visibly rejected; the completed manifest preserves the actual reverse order of the children.",
    usage: `import { ReverseQueue } from "gra-ui";
import "gra-ui/styles.css";

export function BackwardsBrief() {
  return (
    <ReverseQueue>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </ReverseQueue>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The child items boarded from last to first." },
    ],
    demo: "reverse-queue",
    useCase:
      "It could make a reviewer board a handoff brief in reverse importance, or let a presenter reveal agenda fields backward as if arrival order were a meaningful editorial rule.",
    alternative:
      "A reasonable local alternative is rendering the intended order directly. Making users click four items backwards is a sequence puzzle masquerading as a queue.",
    featured: true,
  },
  {
    name: "PunctuationSieve",
    slug: "punctuation-sieve",
    summary: "One mark at a time leaves a sentence for a tray that did not improve it.",
    description:
      "It scans the supplied label for actual punctuation, removes each mark in order and places it into a visible sieve tray. The sentence receives real placeholders while the punctuation remains available to restore.",
    usage: `import { PunctuationSieve } from "gra-ui";
import "gra-ui/styles.css";

export function SiftedNotice() {
  return <PunctuationSieve label="Please, file this: today." />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose punctuation is removed into the sieve." },
    ],
    demo: "punctuation-sieve",
    useCase:
      "It could let a reviewer inspect which marks carry the drama in a handoff sentence, or let a presenter strip punctuation from an agenda phrase before putting every mark back.",
    alternative:
      "A reasonable local alternative is leaving punctuation in the sentence or using one text utility. A sieve should not supervise a comma one click at a time.",
    featured: true,
  },
  {
    name: "ContextEscalator",
    slug: "context-escalator",
    summary: "A right-click sends a notice through four increasingly serious filing levels.",
    description:
      "It turns the browser context menu into a four-step escalation ladder. Each right-click records another level, adds a visible paper shadow and leaves the notice fully filed after the fourth context gesture.",
    usage: `import { ContextEscalator } from "gra-ui";
import "gra-ui/styles.css";

export function EscalatedNotice() {
  return <ContextEscalator><span>Needs one decision</span></ContextEscalator>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice advanced through the four context-menu levels." },
    ],
    demo: "context-escalator",
    useCase:
      "It could let a reviewer promote a handoff note through progressively more official filing levels, or let a presenter right-click an agenda label until it has earned an entirely ceremonial status.",
    alternative:
      "A reasonable local alternative is one visible status field and a normal button. Making a context menu carry a four-step approval ladder gives a browser gesture far more authority than it deserves.",
  },
  {
    name: "OutcomeTriptych",
    slug: "outcome-triptych",
    summary: "Three buttons give one child three materially different fates.",
    description:
      "It asks the user to choose whether the content should be promoted, quarantined or muffled. The selected outcome changes the actual rendered treatment and remains visible until indecision is restored.",
    usage: `import { OutcomeTriptych } from "gra-ui";
import "gra-ui/styles.css";

export function JudgedNotice() {
  return <OutcomeTriptych><span>Ready for review</span></OutcomeTriptych>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content given one of three visibly different outcomes." },
    ],
    demo: "outcome-triptych",
    useCase:
      "It could make a reviewer decide whether a handoff note is promoted, quarantined or deliberately softened, or let a presenter assign one agenda label a fate before continuing.",
    alternative:
      "A reasonable local alternative is one explicit status near the data and one local conditional. A reusable tribunal for three theatrical outcomes obscures a decision that should be plain.",
  },
  {
    name: "MagneticDock",
    slug: "magnetic-dock",
    summary: "Dragged content snaps to whichever of three pockets is nearest.",
    description:
      "It provides a bounded surface with three named pockets. Drag the cargo anywhere and release it; the component calculates the nearest pocket and moves the actual content there, while arrow keys move it between pockets.",
    usage: `import { MagneticDock } from "gra-ui";
import "gra-ui/styles.css";

export function ParkedNotice() {
  return <MagneticDock><span>Loose cargo</span></MagneticDock>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The single piece of cargo dragged across the pocket surface." },
    ],
    demo: "magnetic-dock",
    useCase:
      "It could let a reviewer fling a handoff warning toward the nearest category before filing it, or let a presenter park an agenda label in whichever pocket happens to attract it.",
    alternative:
      "A reasonable local alternative is normal flow layout with one explicit category. A magnetic surface creates a coordinate calculation for content that could have used a button or a list.",
  },
  {
    name: "PatternLatch",
    slug: "pattern-latch",
    summary: "A notice opens only after a four-symbol pattern is entered exactly.",
    description:
      "It places a child behind a small pattern lock. The required triangle-circle-square-circle sequence advances the real lock state; one wrong symbol clears the attempt and the correct sequence opens the notice.",
    usage: `import { PatternLatch } from "gra-ui";
import "gra-ui/styles.css";

export function LockedNotice() {
  return <PatternLatch><span>Already available</span></PatternLatch>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content hidden behind the four-symbol pattern." },
    ],
    demo: "pattern-latch",
    useCase:
      "It could make a reviewer unlock a handoff note with a pattern remembered from a meeting, or make a presenter enter a tiny gesture ritual before revealing one agenda line.",
    alternative:
      "A reasonable local alternative is a visible button or an ordinary permission check. A fixed symbol pattern protects nothing while adding a memorable way to fail.",
  },
  {
    name: "LetterCensus",
    slug: "letter-census",
    summary: "One click replaces a label with an animated census of its letters.",
    description:
      "It transforms the actual supplied text into a first-seen ledger of unique letters and their frequencies. The bar lengths reflect the real counts, and restoring the label reverses the transformation.",
    usage: `import { LetterCensus } from "gra-ui";
import "gra-ui/styles.css";

export function AuditedLabel() {
  return <LetterCensus label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text converted into a visible frequency ledger." },
    ],
    demo: "letter-census",
    useCase:
      "It could let a reviewer audit which letters dominate a handoff sentence, or let a presenter turn one agenda phrase into a tiny linguistic report before putting it back.",
    alternative:
      "A reasonable local alternative is the original label or a one-off utility near the content. Publishing a census machine makes an observation about a sentence feel like a reusable UI primitive.",
  },
  {
    name: "RecessDepth",
    slug: "recess-depth",
    summary: "A child is filed under four actual layers until it becomes needlessly recessed.",
    description:
      "It turns one child into a filing well. Every press adds a real layer, shifts the content deeper and changes the final state from available to fully recessed; Unbury restores the original depth.",
    usage: `import { RecessDepth } from "gra-ui";
import "gra-ui/styles.css";

export function OverFiledNotice() {
  return <RecessDepth><span>Ready to review</span></RecessDepth>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content pushed beneath four visible filing layers." },
    ],
    demo: "recess-depth",
    useCase:
      "It could let a reviewer bury a handoff note under successive approval sheets, or let a presenter recess an agenda label before deciding it has been sufficiently archived.",
    alternative:
      "A reasonable local alternative is the child itself with one visible status or a normal disclosure. Four physical filing layers make a simple label harder to retrieve without adding meaning.",
    featured: true,
  },
  {
    name: "CustodyChoice",
    slug: "custody-choice",
    summary: "Three custody buttons send one child to three genuinely different stations.",
    description:
      "It makes a single child wait in intake until the user chooses Desk, Vault or Courier. The choice moves the actual content into a different named station, and Recall brings it back to intake.",
    usage: `import { CustodyChoice } from "gra-ui";
import "gra-ui/styles.css";

export function RoutedNotice() {
  return <CustodyChoice><span>Needs a destination</span></CustodyChoice>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content waiting in intake and moved to the chosen custody station." },
    ],
    demo: "custody-choice",
    useCase:
      "It could make a reviewer decide whether a handoff note belongs on the desk, in the vault or with a courier, or let a presenter route one agenda label to the table, the archive or the next speaker.",
    alternative:
      "A reasonable local alternative is one explicit state near the data and one conditional render. Publishing three ceremonial destinations as a reusable custody machine is difficult to defend.",
    featured: true,
  },
  {
    name: "Counterweight",
    slug: "counterweight",
    summary: "Dragging a weight to one slot sends its content to the mirrored slot.",
    description:
      "It gives a user direct control of a five-slot rail, but moves the child according to the exact opposite position. The weight remains where it was dragged and the cargo keeps its mirrored station until recentered.",
    usage: `import { Counterweight } from "gra-ui";
import "gra-ui/styles.css";

export function BalancedNotice() {
  return <Counterweight><span>Move the balance</span></Counterweight>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content parked at the slot opposite the directly manipulated weight." },
    ],
    demo: "counterweight",
    useCase:
      "It could let a reviewer position a handoff warning opposite the place where attention is dragged, or let a presenter balance an agenda label against a deliberately chosen counter-position.",
    alternative:
      "A reasonable local alternative is normal flow layout with one alignment value. A mirrored cargo rail creates a surprising coordinate rule where a direct position would have been enough.",
    featured: true,
  },
  {
    name: "ShadowPair",
    slug: "shadow-pair",
    summary: "Each child must be paired with its matching witness in the exact order.",
    description:
      "It creates a two-part filing route for every child. Select the current card, then its matching witness; any wrong card or witness erases the route and returns the sequence to the first pair.",
    usage: `import { ShadowPair } from "gra-ui";
import "gra-ui/styles.css";

export function WitnessedFields() {
  return (
    <ShadowPair>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </ShadowPair>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The ordered cards that must each be followed by their matching witness." },
    ],
    demo: "shadow-pair",
    useCase:
      "It could make a reviewer acknowledge every handoff field and then sign its matching shadow, or make a presenter pair each agenda item with an unnecessary witness before advancing.",
    alternative:
      "A reasonable local alternative is one ordered checklist with independent completion state. Requiring a second click on a matching witness makes sequence state reusable where a list would suffice.",
    featured: true,
  },
  {
    name: "CenterOut",
    slug: "center-out",
    summary: "A label is reassembled from its middle outward into a new reading order.",
    description:
      "It transforms the actual character order of a label: the middle character appears first, then its neighbors alternate outward. Straighten the sentence restores the supplied order without changing the content.",
    usage: `import { CenterOut } from "gra-ui";
import "gra-ui/styles.css";

export function UnusualReading() {
  return <CenterOut label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose actual characters are reordered from the center outward." },
    ],
    demo: "center-out",
    useCase:
      "It could let a reviewer inspect the center of a handoff sentence before its edges, or let a presenter make one agenda phrase radiate outward during a deliberately theatrical explanation.",
    alternative:
      "A reasonable local alternative is the original label with ordinary text selection or a deliberate typographic emphasis. A center-first reading order makes a sentence less readable without revealing anything useful.",
    featured: true,
  },
  {
    name: "PunchProof",
    slug: "punch-proof",
    summary: "A child earns five actual perforations before its proof card is complete.",
    description:
      "It turns a simple child into a paper proof card. Each press punches the next visible hole in a five-step strip, changes the card's completion state and leaves the content over-certified at the end.",
    usage: `import { PunchProof } from "gra-ui";
import "gra-ui/styles.css";

export function OverCertifiedNotice() {
  return <PunchProof><span>Ready to file</span></PunchProof>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content placed on the proof card and cleared after five perforations." },
    ],
    demo: "punch-proof",
    useCase:
      "It could make a reviewer punch an approval card five times before a handoff note leaves the desk, or let a presenter perforate an agenda label before moving to the next slide.",
    alternative:
      "A reasonable local alternative is a normal progress indicator or no approval ceremony. A paper card does not become more correct because a button opened five holes in it.",
    featured: true,
  },
  {
    name: "SortMandate",
    slug: "sort-mandate",
    summary: "Three arbitrary sorting mandates put the same roster under genuinely different orders.",
    description:
      "It gives a list three incompatible rules: first letter, vowel load or last letter. Selecting a mandate actually reorders the rendered items and keeps that decision visible until it is withdrawn.",
    usage: `import { SortMandate } from "gra-ui";
import "gra-ui/styles.css";

export function MandatedRoster() {
  return <SortMandate items={["Status", "Owner", "Review", "Date"]} />;
}`,
    api: [
      { name: "items", type: "readonly string[]", description: "The strings submitted to the three competing ordering rules." },
    ],
    demo: "sort-mandate",
    useCase:
      "It could make a reviewer decide whether a handoff roster deserves an opening-letter order, a vowel-heavy order or a last-letter order, or let a presenter rearrange agenda labels according to whichever criterion feels official that day.",
    alternative:
      "A reasonable local alternative is one explicit sort chosen near the data. A reusable tribunal for three arbitrary ordering rules makes list intent harder to understand.",
    featured: true,
  },
  {
    name: "LensRail",
    slug: "lens-rail",
    summary: "A draggable lens travels across a label and enlarges one actual excerpt at a time.",
    description:
      "It turns a sentence into a rail with a movable inspection lens. The slider changes the real character position, highlights the focused character and replaces the excerpt below with the seven characters currently under review.",
    usage: `import { LensRail } from "gra-ui";
import "gra-ui/styles.css";

export function InspectedStatus() {
  return <LensRail label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text traversed by the movable lens." },
    ],
    demo: "lens-rail",
    useCase:
      "It could let a reviewer inspect one narrow slice of a long handoff label without trusting their eyes, or let a presenter park a magnified excerpt over whichever agenda phrase currently feels important.",
    alternative:
      "A reasonable local alternative is ordinary text selection or a static truncation. A draggable lens is difficult to defend when the sentence was already readable.",
    featured: true,
  },
  {
    name: "QuotaProcession",
    slug: "quota-procession",
    summary: "Each child demands its own number of taps before the procession may move on.",
    description:
      "It imposes a strict one-way sequence of per-child quotas: the first piece needs one tap, the next two, the next three and then the pattern repeats. Only the active step can be used, and completed pieces remain visibly filed.",
    usage: `import { QuotaProcession } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialFields() {
  return (
    <QuotaProcession>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </QuotaProcession>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The ordered pieces that advance through the repeating one-two-three tap quotas." },
    ],
    demo: "quota-procession",
    useCase:
      "It could force a reviewer to tap a title once, a status twice and an owner three times before a handoff card is complete, or make a presenter perform a growing ritual on each agenda label.",
    alternative:
      "A reasonable local alternative is a normal ordered list with one completion button. Per-item tap quotas add ceremony without adding information.",
    featured: true,
  },
  {
    name: "Braidline",
    slug: "braidline",
    summary: "One click separates a label into two interlaced rows of its actual characters.",
    description:
      "It transforms the supplied text by distributing alternating characters into two visible strands. The characters remain real content in a different arrangement and can be returned to the straight line without losing anything.",
    usage: `import { Braidline } from "gra-ui";
import "gra-ui/styles.css";

export function InterlacedStatus() {
  return <Braidline label="Ready for review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text split into alternating character strands." },
    ],
    demo: "braidline",
    useCase:
      "It could let a reviewer braid a handoff phrase while discussing which characters deserve attention, or let a presenter turn one agenda line into a two-strand visual aside.",
    alternative:
      "A reasonable local alternative is the original label with a deliberate typographic treatment. A reusable character loom is not a meaningful content abstraction.",
    featured: true,
  },
  {
    name: "WheelStamp",
    slug: "wheel-stamp",
    summary: "A child collects five paper seals from a mouse wheel before it is overqualified.",
    description:
      "It turns local scrolling into a real five-step approval progression. Each wheel notch adds a visible seal to the paper and rolling backward removes the most recent one.",
    usage: `import { WheelStamp } from "gra-ui";
import "gra-ui/styles.css";

export function StampedNotice() {
  return <WheelStamp><span>Review me</span></WheelStamp>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content collecting the five visible paper seals." },
    ],
    demo: "wheel-stamp",
    useCase:
      "It could make a reviewer over-certify a handoff note, or let a presenter stamp an agenda label before allowing it onto a slide.",
    alternative:
      "A reasonable local alternative is a progress indicator or no indicator at all. Scrolling should not issue paper authority.",
    featured: true,
  },
  {
    name: "ElasticFrame",
    slug: "elastic-frame",
    summary: "A draggable frame forces its child through arbitrary widths and keeps the chosen measurement.",
    description:
      "It makes direct resizing the experience. The handle changes the frame's real width, so the child wraps and reflows instead of merely changing a decorative scale.",
    usage: `import { ElasticFrame } from "gra-ui";
import "gra-ui/styles.css";

export function NarrowNotice() {
  return <ElasticFrame><span>Make this fit badly</span></ElasticFrame>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content reflowing inside the directly resized frame." },
    ],
    demo: "elastic-frame",
    useCase:
      "It could let a reviewer test whether a handoff label survives an unreasonable column, or let a presenter choose the least readable width for an agenda.",
    alternative:
      "A reasonable local alternative is normal responsive layout with a deliberate max-width. A draggable frame is not a layout system.",
    featured: true,
  },
  {
    name: "NeighborMarch",
    slug: "neighbor-march",
    summary: "Children can be visited only by stepping to an untouched adjacent neighbor.",
    description:
      "It turns a row into a tiny corridor. The first piece may be anywhere, but every next choice must be one position away; a long-distance choice resets the route.",
    usage: `import { NeighborMarch } from "gra-ui";
import "gra-ui/styles.css";

export function CorridorFields() {
  return (
    <NeighborMarch>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Date</span>
    </NeighborMarch>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces visited through the adjacent-only route." },
    ],
    demo: "neighbor-march",
    useCase:
      "It could make a reviewer inspect fields as though they were tiles in a corridor, or make a presenter walk an agenda left and right instead of selecting a topic directly.",
    alternative:
      "A reasonable local alternative is a normal list with independent focus. Adjacency is not a useful requirement for reading.",
    featured: true,
  },
  {
    name: "SignalChoice",
    slug: "signal-choice",
    summary: "Three choices encode one label as Morse, Braille or a numbered ledger.",
    description:
      "It offers genuinely divergent content states rather than cosmetic variants. The selected choice replaces the label with a different notation and can be restored without a formatter dependency.",
    usage: `import { SignalChoice } from "gra-ui";
import "gra-ui/styles.css";

export function EncodedStatus() {
  return <SignalChoice label="Ready for review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text transformed by the selected encoding." },
    ],
    demo: "signal-choice",
    useCase:
      "It could turn a handoff status into an unnecessarily formal signal, or let a presenter choose a different notation for each agenda line.",
    alternative:
      "A reasonable local alternative is one explicit formatter chosen by the page. Three incompatible records are not a useful label API.",
    featured: true,
  },
  {
    name: "FootnoteShift",
    slug: "footnote-shift",
    summary: "Clicked words leave a sentence and become numbered footnotes with visible gaps behind.",
    description:
      "It transforms the actual content of a sentence by relocating whole words. The original line keeps a placeholder, while the word lives in a reversible footnote rail.",
    usage: `import { FootnoteShift } from "gra-ui";
import "gra-ui/styles.css";

export function AnnotatedStatus() {
  return <FootnoteShift label="Review the questionable brief" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose words can move into the footnote rail." },
    ],
    demo: "footnote-shift",
    useCase:
      "It could make a reviewer quarantine debatable words in a handoff note, or let a presenter demote agenda terms into a running scholarly apparatus.",
    alternative:
      "A reasonable local alternative is an annotation or footnote supplied by the page. Moving prose around one click at a time is not editorial tooling.",
    featured: true,
  },
  {
    name: "PrecisionLadder",
    slug: "precision-ladder",
    summary: "A label climbs four shrinking target rings before it is allowed to be centered.",
    description:
      "It turns a piece of content into a precision exercise. Each successful click lands inside the current target ring, tightens the next ring and advances a real progress state; a miss resets the ladder to its outer ring.",
    usage: `import { PrecisionLadder } from "gra-ui";
import "gra-ui/styles.css";

export function CenteredNotice() {
  return <PrecisionLadder><span>Center me</span></PrecisionLadder>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content placed in the target and centered only after four accurate hits." },
    ],
    demo: "precision-ladder",
    useCase:
      "It could be used to make a reviewer center a handoff warning before it is considered presentable, or to let a presenter earn the right to place an agenda label in the exact middle of a slide.",
    alternative:
      "A reasonable local alternative is a centered container with no ceremony. Publishing an accuracy ladder is difficult to defend because a label does not gain authority from being clicked near its own center.",
    featured: true,
  },
  {
    name: "MaskBallot",
    slug: "mask-ballot",
    summary: "Three stencil votes clip the same content into three genuinely different openings.",
    description:
      "It gives a piece of content a physical masking ballot. Choosing Round, Ticket or Slit changes the actual clipping geometry of the rendered content, so the result is not merely a selected color or label.",
    usage: `import { MaskBallot } from "gra-ui";
import "gra-ui/styles.css";

export function StenciledNotice() {
  return <MaskBallot><span>Review me</span></MaskBallot>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content covered by the selected physical stencil." },
    ],
    demo: "mask-ballot",
    useCase:
      "It could be used to let a reviewer choose whether a warning is seen through a round, perforated or narrow opening, or to give a presenter three ceremonial ways to reveal one agenda label.",
    alternative:
      "A reasonable local alternative is one intentional CSS mask chosen by the page. Publishing a ballot for clipping is difficult to defend because the content did not ask for a perforation policy.",
    featured: true,
  },
  {
    name: "FreeDrift",
    slug: "free-drift",
    summary: "A child keeps the exact arbitrary coordinates assigned to it by direct manipulation.",
    description:
      "It turns a bounded surface into a small jurisdiction for free positioning. Drag the child to any coordinate or move it with arrow keys; the exact position remains real state until it is returned to center.",
    usage: `import { FreeDrift } from "gra-ui";
import "gra-ui/styles.css";

export function UnassignedNotice() {
  return <FreeDrift><span>Unassigned</span></FreeDrift>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The single piece of content that may drift anywhere inside the bounded surface." },
    ],
    demo: "free-drift",
    useCase:
      "It could be used to let a reviewer park a handoff note exactly where their attention wandered, or to let a presenter place an agenda label at a personally selected coordinate on a slide.",
    alternative:
      "A reasonable local alternative is normal flow layout or one deliberate alignment value. Publishing a free-drift surface is difficult to defend because arbitrary coordinates are not a filing system.",
    featured: true,
  },
  {
    name: "DocketSequence",
    slug: "docket-sequence",
    summary: "A child travels through a docket only after click, type and click happen in order.",
    description:
      "It turns a tiny piece of content into a three-action filing ceremony. Open the docket, type exactly one character as evidence, then file; each ordered step moves the real child through visible stations and an out-of-order step is unavailable.",
    usage: `import { DocketSequence } from "gra-ui";
import "gra-ui/styles.css";

export function FiledApproval() {
  return <DocketSequence><span>Approve</span></DocketSequence>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved through the docket stations when the sequence is completed." },
    ],
    demo: "docket-sequence",
    useCase:
      "It could be used to make a reviewer open a handoff item, add a one-character evidence mark and file it in a strict order, or to force an agenda label through a miniature approval ritual.",
    alternative:
      "A reasonable local alternative is one button and a local boolean. Publishing a docket sequence is difficult to defend because a trivial filing does not need a key, a gate and three stations.",
    featured: true,
  },
  {
    name: "VowelHinge",
    slug: "vowel-hinge",
    summary: "One first vowel leaves each word and becomes a raised hinge chip beside its gap.",
    description:
      "It turns a sentence into a hinged inventory. Each activation detaches the first vowel from the next word, leaves a visible gap in the original word and renders the vowel as a separate raised chip; restoring the sentence returns every letter.",
    usage: `import { VowelHinge } from "gra-ui";
import "gra-ui/styles.css";

export function HingedBrief() {
  return <VowelHinge label="Review the brief" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose first vowels are detached one word at a time." },
    ],
    demo: "vowel-hinge",
    useCase:
      "It could be used to make a reviewer physically separate the vocal centers of a handoff note, or to let a presenter hang one vowel from each agenda word while discussing its structure.",
    alternative:
      "A reasonable local alternative is the original sentence with an annotation or comment. Publishing vowel extraction is difficult to defend because a short label does not become clearer when its vowels are put on hinges.",
    featured: true,
  },
  {
    name: "RatchetReveal",
    slug: "ratchet-reveal",
    summary: "A one-way ratchet opens children one sealed tooth at a time.",
    description:
      "It turns a row of ordinary children into a paper mechanism with a ratcheting gate. Each activation opens exactly one tooth and keeps that child revealed, so a simple row must earn its complete visibility one notch at a time.",
    usage: `import { RatchetReveal } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces revealed one at a time by the one-way ratchet." },
    ],
    demo: "ratchet-reveal",
    useCase:
      "It could be used to make a reviewer reveal handoff fields only as each one is discussed, or to let a presenter open agenda items one notch at a time during a deliberately ceremonial briefing.",
    alternative:
      "A reasonable local alternative is the children in a normal row with one disclosure state. Publishing a ratchet is difficult to defend because visibility should not require mechanical paperwork.",
    featured: true,
  },
  {
    name: "VerdictSelector",
    slug: "verdict-selector",
    summary: "Three binding verdicts turn one label into three genuinely different readings.",
    description:
      "It gives a label a tiny editorial tribunal. Choosing Headline moves the last word to the front, Ledger numbers every word, and Whisper reduces the sentence to initials; the decision changes the actual rendered content rather than just its styling.",
    usage: `import { VerdictSelector } from "gra-ui";
import "gra-ui/styles.css";

export function JudgedStatus() {
  return <VerdictSelector label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The whitespace-separated text given to the three competing verdicts." },
    ],
    demo: "verdict-selector",
    useCase:
      "It could be used to let a reviewer choose whether a handoff note should read like a headline, ledger or whisper, or to make a presenter select the unnecessarily official register for an agenda line.",
    alternative:
      "A reasonable local alternative is one formatter function selected directly by the page. Publishing an editorial tribunal is difficult to defend because three buttons should not decide how a short label is allowed to exist.",
    featured: true,
  },
  {
    name: "OrbitStow",
    slug: "orbit-stow",
    summary: "A draggable piece parks itself at one of eight unnecessary orbital docks.",
    description:
      "It turns a child into cargo on a small storage orbit. Drag around the ring or use the arrow keys to park the content at one of eight compass docks; the cargo remains in that real position until it is returned to dock one.",
    usage: `import { OrbitStow } from "gra-ui";
import "gra-ui/styles.css";

export function OrbitalNotice() {
  return <OrbitStow><span>Review me</span></OrbitStow>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The single piece of content parked around the orbital ring." },
    ],
    demo: "orbit-stow",
    useCase:
      "It could be used to park a handoff warning at the side of a card according to where a reviewer drags it, or to let a presenter orbit an agenda label toward the corner of the slide that feels most ceremonially relevant.",
    alternative:
      "A reasonable local alternative is one CSS position or an ordinary alignment control. Publishing orbital storage is difficult to defend because content does not become better filed by circling it around a ring.",
    featured: true,
  },
  {
    name: "PalindromeLatch",
    slug: "palindrome-latch",
    summary: "Children lock only when the activation route reads the same forwards and backwards.",
    description:
      "It makes a latch out of a palindrome. Activate the pieces in ascending order and then walk back through the same route; a wrong piece clears the sequence, while a complete mirrored route seals the visible latch tray.",
    usage: `import { PalindromeLatch } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces forming the ascending half of the mirrored activation route." },
    ],
    demo: "palindrome-latch",
    useCase:
      "It could be used to make a reviewer open and close a handoff card through a perfectly mirrored ceremony, or to let a presenter walk an agenda forward and backward before it is considered settled.",
    alternative:
      "A reasonable local alternative is one ordered list and a normal completion button. Publishing a palindrome latch is difficult to defend because an action sequence does not improve when it has to rhyme with itself.",
    featured: true,
  },
  {
    name: "InsideOutWords",
    slug: "inside-out-words",
    summary: "Clicking a word reverses its actual letters and leaves the sentence awkwardly changed.",
    description:
      "It treats every word as a small reversible object. Click any word to turn its letters inside out in the rendered text; each reversal persists independently until the sentence is restored.",
    usage: `import { InsideOutWords } from "gra-ui";
import "gra-ui/styles.css";

export function ReversibleNote() {
  return <InsideOutWords label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose individual words can be reversed in place." },
    ],
    demo: "inside-out-words",
    useCase:
      "It could be used to make a reviewer reverse the words they have challenged in a handoff note, or to let a presenter mark agenda terms as temporarily unreadable while discussing their meaning.",
    alternative:
      "A reasonable local alternative is the original label plus one ordinary annotation style. Publishing clickable word reversal is difficult to defend because rearranging letters is not a credible review status.",
    featured: true,
  },
  {
    name: "FocusReceipt",
    slug: "focus-receipt",
    summary: "Every focus prints a persistent duplicate at the child’s original station.",
    description:
      "It turns focus into an unnecessary receipt printer. Focus an original child and a real copy appears in the station bearing that child’s position; the original stays where it was, so the receipt records attention without improving the content.",
    usage: `import { FocusReceipt } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The focusable originals that issue copies into their matching receipt stations." },
    ],
    demo: "focus-receipt",
    useCase:
      "It could be used to make a reviewer leave a physical-looking copy of every field they inspect on a handoff card, or to let a presenter build a receipt of the agenda labels they touched during a talk.",
    alternative:
      "A reasonable local alternative is a focus style and one local array of visited indices. Publishing a receipt printer is difficult to defend because looking at a field should not duplicate it.",
    featured: true,
  },
  {
    name: "RulerRise",
    slug: "ruler-rise",
    summary: "A draggable ruler raises one child at a time onto an unnecessary staircase.",
    description:
      "It turns a ruler dragged across a row into a one-way elevation order. Each marker the ruler passes raises the next child onto a higher visible step and keeps it there until the whole row has climbed or the staircase is lowered.",
    usage: `import { RulerRise } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces that rise one at a time when the ruler passes their markers." },
    ],
    demo: "ruler-rise",
    useCase:
      "It could be used to make a reviewer physically raise the fields that deserve attention on a handoff card, or to let a presenter elevate agenda items into a literal staircase as they are discussed.",
    alternative:
      "A reasonable local alternative is an array index and one conditional class in the page. This component should not have existed because a ruler crossing a line is not evidence that content deserves a higher place.",
    featured: true,
  },
  {
    name: "LassoLock",
    slug: "lasso-lock",
    summary: "Pieces that leave the field when a pointer box manages to enclose them.",
    description:
      "It turns a rectangle drawn around ordinary children into a permanent locking decision. Enclose at least two pieces and the ones whose centers fit inside the lasso leave the loose field for a real tray; everything else stays put.",
    usage: `import { LassoLock } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The pieces that can be enclosed and moved into the locking tray." },
    ],
    demo: "lasso-lock",
    useCase:
      "It could be used to make a reviewer draw a literal box around the fields that belong together on a handoff card, or to let a presenter physically quarantine the agenda items they are about to discuss.",
    alternative:
      "A reasonable local alternative is an array filter with one selected range and a normal layout. Publishing a lasso lock is difficult to defend because a rectangle around content is not a meaningful ownership boundary.",
    featured: true,
  },
  {
    name: "WordTurnstile",
    slug: "word-turnstile",
    summary: "A label that turns each word upside down before it may finish.",
    description:
      "It makes a sentence pass through a tiny word-by-word turnstile. Each activation rotates the next word by 180 degrees and keeps the transformation in place until the whole label has paid its unnecessary inversion fee.",
    usage: `import { WordTurnstile } from "gra-ui";
import "gra-ui/styles.css";

export function UpsideDownBrief() {
  return <WordTurnstile label="Ready for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The whitespace-separated words turned one at a time." },
    ],
    demo: "word-turnstile",
    useCase:
      "It could be used to make a reviewer invert each word of a handoff status before a meeting, or to let a presenter ceremonially turn an agenda line upside down as each topic is discussed.",
    alternative:
      "A reasonable local alternative is the original label with one ordinary class. Publishing a word turnstile is difficult to defend because a sentence does not become more complete when its words are upside down.",
    featured: true,
  },
  {
    name: "MarginQuota",
    slug: "margin-quota",
    summary: "A label that rents a margin one character at a time.",
    description:
      "It calculates a visible side margin from the label's own character count. Reserve the quota and the text moves out of the way while one slot appears for every character; reclaiming the space restores the full-width surface.",
    usage: `import { MarginQuota } from "gra-ui";
import "gra-ui/styles.css";

export function RentedLabel() {
  return <MarginQuota label="Review this once" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose character count becomes a visible reserved margin." },
    ],
    demo: "margin-quota",
    useCase:
      "It could be used to make a reviewer reserve visual room for a handoff note before it can stand beside a decision, or to let a presenter give an agenda label a literal amount of breathing room proportional to its copy.",
    alternative:
      "A reasonable local alternative is a normal layout with an intentional margin-inline value. Publishing a margin quota is difficult to defend because a label's character count is not a credible landlord.",
    featured: true,
  },
  {
    name: "RotationTithe",
    slug: "rotation-tithe",
    summary: "A label that charges pointer distance for every unnecessary turn.",
    description:
      "It turns horizontal pointer travel into a tiny rotation tax. Move across the receipt until a full track width has been spent, and the label turns 45 degrees; the accumulated angle stays until you return the receipt.",
    usage: `import { RotationTithe } from "gra-ui";
import "gra-ui/styles.css";

export function TaxedReceipt() {
  return <RotationTithe label="Approved for another review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text rotated after each full width of pointer distance is spent." },
    ],
    demo: "rotation-tithe",
    useCase:
      "It could be used to make a reviewer physically spend attention before rotating a caution label, or to let a presenter ceremonially turn an agenda note after each extra pass across a slide.",
    alternative:
      "A reasonable local alternative is a label with one ordinary class and no pointer accounting. Publishing a rotation tithe is difficult to defend because distance travelled by a cursor is not a meaningful reason to reorient text.",
    featured: true,
  },
  {
    name: "LetterLevy",
    slug: "letter-levy",
    summary: "A label that pays every matching letter into a visible drawer.",
    description:
      "It turns the keyboard into a tiny tax office. Focus the label and press one letter; every matching occurrence leaves the sentence and arrives as a separate token in the levy drawer.",
    usage: `import { LetterLevy } from "gra-ui";
import "gra-ui/styles.css";

export function TaxedStatus() {
  return <LetterLevy label="Review the brief today" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose matching letters are filed when their key is pressed." },
    ],
    demo: "letter-levy",
    useCase:
      "It could be used to make a reviewer pay a textual levy before filing a handoff status, or to let a presenter remove every copy of one letter from an agenda heading while discussing it.",
    alternative:
      "A reasonable local alternative is a string filter with an ordinary display. Publishing a letter levy is difficult to defend because a keyboard character is not an authority entitled to tax an entire sentence.",
    featured: true,
  },
  {
    name: "ParityPurge",
    slug: "parity-purge",
    summary: "Children sorted into survivors and rejects by an odd-or-even decree.",
    description:
      "It presents ordinary children as numbered positions and asks you to choose whether odd or even positions deserve to remain. The other children move into a real discard tray, so a tiny parity rule becomes a permanent filing decision until everything is restored.",
    usage: `import { ParityPurge } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content assigned one-based positions and split by the chosen odd-or-even rule." },
    ],
    demo: "parity-purge",
    useCase:
      "It could be used to let a reviewer decide whether odd- or even-numbered fields deserve to stay on a handoff card, or to make a presenter discard every other agenda label before discussing the survivors.",
    alternative:
      "A reasonable local alternative is an array filter with one normal layout. Publishing a parity purge is difficult to defend because the position of a field is not evidence that it should survive.",
    featured: true,
  },
  {
    name: "BlankFiling",
    slug: "blank-filing",
    summary: "Children filed one at a time by submitting absolutely nothing.",
    description:
      "It places a small form in front of an ordinary group of children and treats an empty submission as a filing instruction. Each blank submission moves the next child into a separate void shelf; entering evidence makes the form refuse to move anything.",
    usage: `import { BlankFiling } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content filed one piece at a time by empty form submissions." },
    ],
    demo: "blank-filing",
    useCase:
      "It could be used to let a reviewer file the fields of a handoff card by repeatedly submitting an empty acknowledgement, or to make a presenter move agenda labels into a void shelf without ever explaining why.",
    alternative:
      "A reasonable local alternative is a form submit handler with one array slice and a normal button. Publishing a blank filing protocol is difficult to defend because an absence of evidence should not reorganize content.",
    featured: true,
  },
  {
    name: "MomentumWeave",
    slug: "momentum-weave",
    summary: "Children that weave themselves according to the speed of a drag.",
    description:
      "It gives a row of children a shuttle and asks the pointer to supply the momentum. A gentle release settles the pieces into two strands; a quick flick uses three, and the resulting order stays changed until it is restored.",
    usage: `import { MomentumWeave } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content interleaved into two or three strands by the drag momentum." },
    ],
    demo: "momentum-weave",
    useCase:
      "It could be used to let a reviewer physically weave the fields of a handoff card according to how urgently they drag, or to make a presenter recompose four agenda labels into a tighter grid after a quick flick.",
    alternative:
      "A reasonable local alternative is an array with one explicit reorder and a CSS grid. Publishing a momentum-sensitive shuttle is difficult to defend because the children already had a perfectly serviceable order.",
    featured: true,
  },
  {
    name: "SpaceStaple",
    slug: "space-staple",
    summary: "A label that lets a dragged staple erase one of its spaces.",
    description:
      "It turns the gaps in a label into landing places for a tiny staple. Release the staple at one gap and that actual space disappears, leaving the words awkwardly fused until the label is unstapled.",
    usage: `import { SpaceStaple } from "gra-ui";
import "gra-ui/styles.css";

export function StapledBrief() {
  return <SpaceStaple label="Friday review notes" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose spaces can receive the staple." },
    ],
    demo: "space-staple",
    useCase:
      "It could be used to make a reviewer choose which phrase in a handoff note should be fused for a compact subject line, or to let a presenter ceremonially compress one agenda label before showing it.",
    alternative:
      "A reasonable local alternative is the original label with one string replacement. Publishing a draggable staple is difficult to defend because typography does not need a physical object to decide where words stop being separate.",
    featured: true,
  },
  {
    name: "ArrowBias",
    slug: "arrow-bias",
    summary: "A row that lets three arrow presses decide which way it should drift.",
    description:
      "It turns three keyboard directions into a tiny binding vote. The majority direction moves every child toward that edge and locks the row there; Escape restores the undecided position.",
    usage: `import { ArrowBias } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content that drifts toward the majority arrow direction." },
    ],
    demo: "arrow-bias",
    useCase:
      "It could be used to let a reviewer physically bias a handoff card toward the side they intend to discuss, or to make a presenter settle a small agenda row against the edge of a slide.",
    alternative:
      "A reasonable local alternative is a flex row with one direction class and a keyboard handler. Publishing a three-arrow binding ritual is difficult to defend because a layout should not need a vote to choose its own edge.",
    featured: true,
  },
  {
    name: "IdleUnspool",
    slug: "idle-unspool",
    summary: "A row that quietly moves its children onto an aside shelf.",
    description:
      "It starts unspooling on its own after mounting: one child at a time leaves the main row and settles on a separate shelf. The migration stops when every child has moved, and refiling starts the needless process again.",
    usage: `import { IdleUnspool } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content that leaves the main row one item at a time while idle." },
    ],
    demo: "idle-unspool",
    useCase:
      "It could be used to let an ignored handoff card slowly move its fields into an aside, or to make a presenter let agenda items peel into side notes between talking points.",
    alternative:
      "A reasonable local alternative is a static row, or one local array and a CSS transition if the content really must be moved. Publishing an idle timer that relocates children is difficult to defend because waiting should not reorganize a layout.",
    featured: true,
  },
  {
    name: "DisclosureSpill",
    slug: "disclosure-spill",
    summary: "A disclosure that lets its last child escape when closed.",
    description:
      "It uses a native disclosure for an ordinary group of children, then spills the final child into a visible escape slot whenever the filing is closed. Open it again and the escaped child is filed back inside.",
    usage: `import { DisclosureSpill } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content filed inside the disclosure, with the final child designated as the escapee." },
    ],
    demo: "disclosure-spill",
    useCase:
      "It could be used to make a reviewer close a handoff card while letting the date escape for separate attention, or to give a presenter one agenda item that refuses to stay filed.",
    alternative:
      "A reasonable local alternative is a native details element that simply hides its children. Publishing a disclosure that ejects its final child is difficult to defend because closing a panel should not change where content lives.",
    featured: true,
  },
  {
    name: "CursorProof",
    slug: "cursor-proof",
    summary: "A label that becomes legible only after a pointer passes each character.",
    description:
      "It hides a label behind proof dots and makes a local cursor reveal each character it crosses. The revealed characters stay visible, so a trivial sentence has to earn its right to be read.",
    usage: `import { CursorProof } from "gra-ui";
import "gra-ui/styles.css";

export function VerifiedStatus() {
  return <CursorProof label="Ready for review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text revealed one character at a time by the proofing cursor." },
    ],
    demo: "cursor-proof",
    useCase:
      "It could be used to make a reviewer scan a status label before a handoff, or to let a presenter reveal an agenda item character by character while discussing it.",
    alternative:
      "A reasonable local alternative is the original text with no interaction, or a small CSS mask with one pointer handler. Publishing a cursor proof is difficult to defend because moving over a label does not make it more true.",
    featured: true,
  },
  {
    name: "SeamFold",
    slug: "seam-fold",
    summary: "A row that folds its lower half backwards around a movable seam.",
    description:
      "It gives an ordinary row of children a physical crease. Move the seam with a native range control and the children split into two rows, with the lower half returning in reverse order.",
    usage: `import { SeamFold } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content split around the movable seam and reversed below it." },
    ],
    demo: "seam-fold",
    useCase:
      "It could be used to let a reviewer fold the fields of a handoff card at the exact point where the discussion changes topic, or to make a presenter physically crease an agenda before reading its second half.",
    alternative:
      "A reasonable local alternative is a small CSS grid with one breakpoint or an array slice in the page. Publishing a range-controlled paper fold is difficult to defend because the fields never needed folding.",
    featured: true,
  },
  {
    name: "SelectionSeal",
    slug: "selection-seal",
    summary: "An excerpt that needs three identical selections before it can be sealed.",
    description:
      "It asks you to select the exact same excerpt three times. Each matching selection leaves a visible impression that bounces into a row, and the third one locks the excerpt into the sentence as a raised seal.",
    usage: `import { SelectionSeal } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialApproval() {
  return <SelectionSeal />;
}`,
    api: [
      { name: "props", type: "Record<never, never>", description: "No props; the sentence and sealing ritual are self-contained." },
    ],
    demo: "selection-seal",
    useCase:
      "It could be used to make a reviewer certify the most important phrase in a handoff note, or to let a presenter ceremonially isolate the sentence they are about to discuss.",
    alternative:
      "A reasonable local alternative is a text selection plus one boolean or range in the page. Publishing a three-selection seal is difficult to defend because selecting a sentence does not make it more approved.",
    featured: true,
  },
  {
    name: "CheckpointQueue",
    slug: "checkpoint-queue",
    summary: "A queue that reorders itself at three drag checkpoints.",
    description:
      "It makes you drag a seal through three checkpoints. Each checkpoint moves the first child to the back of the queue, leaving the content in a new order when the filing is complete.",
    usage: `import { CheckpointQueue } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content rotated through the queue as checkpoints are reached." },
    ],
    demo: "checkpoint-queue",
    useCase:
      "It could be used to make a reviewer file the fields of a handoff card one checkpoint at a time, or to force a presenter to ceremonially rotate an agenda before discussing it.",
    alternative:
      "A reasonable local alternative is an array and one queue rotation per button click, or simply rendering the intended order. Publishing a drag-operated filing queue is difficult to defend when the items already had an order.",
    featured: true,
  },
  {
    name: "AlphabetTreadmill",
    slug: "alphabet-treadmill",
    summary: "A label that walks twelve letters forward one click at a time.",
    description:
      "It advances every alphabetic character in a label by one place per activation, changing the content itself until twelve unnecessary turns have been completed.",
    usage: `import { AlphabetTreadmill } from "gra-ui";
import "gra-ui/styles.css";

export function EscalatedLabel() {
  return <AlphabetTreadmill label="Ready for review" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose alphabetic characters move one place per turn." },
    ],
    demo: "alphabet-treadmill",
    useCase:
      "It could be used to make a reviewer escalate a status label through twelve editorial revisions before a handoff, or to let a presenter ceremonially age a small heading one letter at a time.",
    alternative:
      "A reasonable local alternative is the original string plus one small character-mapping function, or no transformation at all. Publishing an alphabet treadmill is difficult to defend because a label does not need to earn its final spelling.",
    featured: true,
  },
  {
    name: "WeekdayLedger",
    slug: "weekday-ledger",
    summary: "A date that files ordinary children into an unnecessary week.",
    description:
      "It asks for a starting date, then files each child into the next weekday in order. The date is real, the calendar is real, and the reason to put interface labels on a weekly ledger is not.",
    usage: `import { WeekdayLedger } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content filed into consecutive weekdays after a date is submitted." },
    ],
    demo: "weekday-ledger",
    useCase:
      "It could be used to assign the fields of a handoff card to the days of a review sprint, or to make a presenter schedule four agenda labels across a week before discussing any of them.",
    alternative:
      "A reasonable local alternative is an array of labels and a small calendar grid, or simply rendering the labels together. Publishing a weekday filing ceremony is difficult to defend when the date is not actually scheduling anything.",
    featured: true,
  },
  {
    name: "LayoutReferendum",
    slug: "layout-referendum",
    summary: "Three binding ways to make the same children harder to read.",
    description:
      "It submits the children to a tiny layout referendum: double-click one of three genuinely different arrangements, and the chosen disposition becomes persistent until the ballot is reopened.",
    usage: `import { LayoutReferendum } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content reorganized by the chosen arrangement." },
    ],
    demo: "layout-referendum",
    useCase:
      "It could be used to let a reviewer choose whether a small set of fields should become a stack, read backwards, or split into a two-column committee before a handoff.",
    alternative:
      "A reasonable local alternative is one layout class and an ordinary select or button group. Publishing a binding referendum for a few fields remains difficult to defend when CSS already knows how to arrange them.",
    featured: true,
  },
  {
    name: "ChildGravity",
    slug: "child-gravity",
    summary: "One chosen child that pushes its siblings apart by calculation.",
    description:
      "It turns children into a gravity experiment: click one fragment to make it the anchor, then moves every sibling away by a gap calculated from the total child count.",
    usage: `import { ChildGravity } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The fragments that move away from the clicked anchor." },
    ],
    demo: "child-gravity",
    useCase:
      "It could be used to let a reviewer nominate one field as the center of a card and ceremonially push every other field away, or to make a presenter create space around the label they are discussing.",
    alternative:
      "A reasonable local alternative is a selected index and one conditional transform in the page. Publishing a child-count gravity calculation is difficult to defend when ordinary spacing is already enough.",
    featured: true,
  },
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
  {
    name: "ClarityDebt",
    slug: "clarity-debt",
    summary: "Four charges make a readable child progressively harder to read.",
    description:
      "It accumulates four clarity charges against a child. Every charge adds real blur to the rendered content, leaving a fully obscured notice after a progression that should never have existed.",
    usage: `import { ClarityDebt } from "gra-ui";
import "gra-ui/styles.css";

export function IndebtedNotice() {
  return <ClarityDebt><span>Ready for review</span></ClarityDebt>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content made progressively less clear by each charge." },
    ],
    demo: "clarity-debt",
    useCase:
      "It could let a reviewer charge a handoff note every time someone asks for more context, or let a presenter blur an agenda label until the meeting agrees it has been discussed enough.",
    alternative:
      "A reasonable local alternative is leaving the content readable and recording a small status. A blur debt makes the information worse as a ceremony for progress.",
  },
  {
    name: "ArithmeticCouncil",
    slug: "arithmetic-council",
    summary: "Three incompatible calculations issue a binding ruling on one number.",
    description:
      "It asks the user to choose whether a submitted amount should be doubled, halved or inverted. The selected ruling changes the actual result rather than merely styling the same value.",
    usage: `import { ArithmeticCouncil } from "gra-ui";
import "gra-ui/styles.css";

export function RuledAmount() {
  return <ArithmeticCouncil value={7} />;
}`,
    api: [
      { name: "value", type: "number", description: "The amount submitted to the three-way arithmetic ruling." },
    ],
    demo: "arithmetic-council",
    useCase:
      "It could let a reviewer decide whether a handoff estimate deserves twice the time, half the time or a negative amount of time, or let a presenter give an agenda number a ceremonial mathematical verdict.",
    alternative:
      "A reasonable local alternative is applying the needed arithmetic beside the value. A public council turns one expression into a decision ceremony with no policy behind it.",
  },
  {
    name: "TetherPull",
    slug: "tether-pull",
    summary: "Drag an anchor away from content that refuses to move with it.",
    description:
      "It keeps a child fixed at the center of a surface while a directly manipulated anchor stretches a real SVG tether toward it. The anchor can be dragged or moved with arrow keys, but the content declines to follow.",
    usage: `import { TetherPull } from "gra-ui";
import "gra-ui/styles.css";

export function StubbornNotice() {
  return <TetherPull><span>Stay exactly here</span></TetherPull>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content fixed at the center while its tether anchor moves." },
    ],
    demo: "tether-pull",
    useCase:
      "It could let a reviewer pull a warning toward the place where attention is drifting, or let a presenter stretch an agenda label toward a speaker without moving the label itself.",
    alternative:
      "A reasonable local alternative is one pointer position or normal flow. A tether adds geometry to communicate a relationship that the page could simply state.",
  },
  {
    name: "DoubleEntry",
    slug: "double-entry",
    summary: "Every child must be clicked in order twice before the ledger will post it.",
    description:
      "It requires a first pass through the children and then the exact same ordered pass again. Each pass fills its own visible ledger row; a wrong item remains unposted until the expected entry is chosen.",
    usage: `import { DoubleEntry } from "gra-ui";
import "gra-ui/styles.css";

export function PostedFields() {
  return (
    <DoubleEntry>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </DoubleEntry>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The entries checked once, then checked again in the same order." },
    ],
    demo: "double-entry",
    useCase:
      "It could make a reviewer post a handoff brief only after checking title, status and owner twice, or let a presenter rehearse each agenda field in duplicate before advancing.",
    alternative:
      "A reasonable local alternative is one checklist with ordinary completion state. Requiring a second identical pass turns a list into bookkeeping theater.",
  },
  {
    name: "SignalTranscript",
    slug: "signal-transcript",
    summary: "A label becomes a visible Morse transcript, one character signal at a time.",
    description:
      "It transforms the actual supplied label into dots, dashes and slash tokens using a local Morse table. The original text can be restored, but the transcript has no practical reason to replace it.",
    usage: `import { SignalTranscript } from "gra-ui";
import "gra-ui/styles.css";

export function SignalledNotice() {
  return <SignalTranscript label="Please review this" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text transformed into a visible per-character signal transcript." },
    ],
    demo: "signal-transcript",
    useCase:
      "It could let a reviewer transmit a handoff phrase as though the room had lost its vocabulary, or let a presenter turn an agenda label into a signal board for a deliberately over-engineered reveal.",
    alternative:
      "A reasonable local alternative is rendering the label and using a nearby text utility when encoding is truly needed. A transcript component makes a one-off conversion look like a lasting UI primitive.",
  },
  {
    name: "SpellingPermit",
    slug: "spelling-permit",
    summary: "A label reveals itself one correctly typed character at a time.",
    description:
      "It turns typing into a literal admission process. Correct characters reveal the supplied label and fill its permit bar, while a wrong character is refused instead of being allowed to advance the sentence.",
    usage: `import { SpellingPermit } from "gra-ui";
import "gra-ui/styles.css";

export function AdmittedLabel() {
  return <SpellingPermit label="File the note" />;
}`,
    api: [
      { name: "label", type: "string", description: "The exact text typed to reveal and admit the label." },
    ],
    demo: "spelling-permit",
    useCase:
      "It could make a reviewer retype a handoff status before admitting it to a board, or let a presenter reveal an agenda phrase as if spelling were a security clearance.",
    alternative:
      "A reasonable local alternative is rendering the label and validating one ordinary input when validation is needed. A permit that refuses one wrong character adds ceremony without adding confidence.",
  },
  {
    name: "SliceReferendum",
    slug: "slice-referendum",
    summary: "Three editorial cuts decide which actual part of a label survives.",
    description:
      "It offers an opening, middle or closing cut and replaces the full label with the selected excerpt. Each choice returns different words, so the component is an unnecessary editorial decision rather than a cosmetic toggle.",
    usage: `import { SliceReferendum } from "gra-ui";
import "gra-ui/styles.css";

export function TrimmedNotice() {
  return <SliceReferendum label="Please file the remarkably ordinary handoff note today" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence divided into three competing surviving excerpts." },
    ],
    demo: "slice-referendum",
    useCase:
      "It could let a reviewer decide whether a handoff note deserves its opening request or closing deadline, or let a presenter reduce an agenda sentence to the clause that feels most official.",
    alternative:
      "A reasonable local alternative is choosing a substring near the data or writing the intended excerpt directly. A referendum makes a deterministic editorial cut look like governance.",
  },
  {
    name: "CompassHinge",
    slug: "compass-hinge",
    summary: "A dragged compass knob rotates content around an imaginary north.",
    description:
      "It places a child at the center of a dial and lets a directly manipulated knob set its real rotation angle. The content pivots continuously with the knob and can be returned to north with one action.",
    usage: `import { CompassHinge } from "gra-ui";
import "gra-ui/styles.css";

export function OrientedNotice() {
  return <CompassHinge><span>Face the issue</span></CompassHinge>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content rotated around the dial's imaginary hinge." },
    ],
    demo: "compass-hinge",
    useCase:
      "It could let a reviewer turn a warning toward the side of a room where discussion is happening, or let a presenter physically orient an agenda label toward its speaker.",
    alternative:
      "A reasonable local alternative is normal text flow with one alignment or orientation choice. A compass hinge spends geometry on a direction the content could simply name.",
  },
  {
    name: "EventRelay",
    slug: "event-relay",
    summary: "Focus, wheel and Space must deliver one parcel in exactly that order.",
    description:
      "It turns three unrelated browser events into a delivery route. Focusing the relay, scrolling once and pressing Space moves the actual content through three stations; any event out of order sends it back to the first station.",
    usage: `import { EventRelay } from "gra-ui";
import "gra-ui/styles.css";

export function DeliveredNotice() {
  return <EventRelay><span>One parcel</span></EventRelay>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content moved through the focus, wheel and Space stations." },
    ],
    demo: "event-relay",
    useCase:
      "It could make a reviewer focus, scroll and confirm before delivering a handoff field, or let a presenter rehearse three different browser gestures before releasing an agenda label.",
    alternative:
      "A reasonable local alternative is one button with an explicit handler. Making three unrelated events act as a relay protocol creates a failure mode where a normal interaction would be clearer.",
  },
  {
    name: "AlphabetizeWords",
    slug: "alphabetize-words",
    summary: "Every word is rearranged into alphabetical character order, whether it asked to be.",
    description:
      "It transforms the actual letters inside every word while preserving spaces between words. The milled sentence is visibly different and reversible, making alphabetical order a needlessly destructive editorial tool.",
    usage: `import { AlphabetizeWords } from "gra-ui";
import "gra-ui/styles.css";

export function MilledNotice() {
  return <AlphabetizeWords label="Keep the useful sentence readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose word characters are sorted in place." },
    ],
    demo: "alphabetize-words",
    useCase:
      "It could let a reviewer inspect a sentence as a pile of letters, or let a presenter turn an agenda line into an alphabetical artifact before restoring the readable copy.",
    alternative:
      "A reasonable local alternative is leaving the copy intact and using a one-off string utility for analysis. A reusable word mill makes readability subordinate to a sorting rule.",
  },
  {
    name: "BinaryMarch",
    slug: "binary-march",
    summary: "A number reaches binary one manual division at a time.",
    description:
      "It turns a trivial decimal-to-binary conversion into a visible march of long divisions. Each step records a quotient and remainder, prepends the earned bit and keeps the accumulated binary result on display.",
    usage: `import { BinaryMarch } from "gra-ui";
import "gra-ui/styles.css";

export function CeremonialNumber() {
  return <BinaryMarch value={42} />;
}`,
    api: [
      { name: "value", type: "number", description: "The non-negative integer that must earn its binary representation through repeated divisions." },
    ],
    demo: "binary-march",
    useCase:
      "It could let a reviewer manually convert a release number before admitting it to a machine-facing handoff, or let a presenter make one agenda count undergo a tiny arithmetic procession.",
    alternative:
      "A reasonable local alternative is `value.toString(2)` or a local conversion utility. A component that makes division a progress track is hard to defend as interface infrastructure.",
  },
  {
    name: "MetricMandate",
    slug: "metric-mandate",
    summary: "Choose whether a label is officially measured in ink, air or edges.",
    description:
      "Three measurement standards calculate genuinely different counts from the same label: non-space characters, whitespace or word boundaries. The selected standard changes the live total and the width of its official meter.",
    usage: `import { MetricMandate } from "gra-ui";
import "gra-ui/styles.css";

export function MeasuredNotice() {
  return <MetricMandate label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text submitted to three competing and equally unhelpful measurement standards." },
    ],
    demo: "metric-mandate",
    useCase:
      "It could let a reviewer decide whether a handoff is large because it contains ink, silence or word boundaries, or let a presenter assign an agenda item an official size without changing its words.",
    alternative:
      "A reasonable local alternative is one explicit count chosen for the actual task. A public mandate makes an arbitrary measurement policy look like content governance.",
  },
  {
    name: "CrankShift",
    slug: "crank-shift",
    summary: "Turn a physical crank to rotate a row of children into a new order.",
    description:
      "A directly manipulated dial divides a full turn into eight positions. Each position rotates the actual child order in the cargo list, so the crank moves the data rather than merely decorating a control.",
    usage: `import { CrankShift } from "gra-ui";
import "gra-ui/styles.css";

export function ShiftedCargo() {
  return (
    <CrankShift>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </CrankShift>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The cargo items rotated through the crank's actual order." },
    ],
    demo: "crank-shift",
    useCase:
      "It could let a reviewer turn a handoff row until the least urgent field reaches the front, or let a presenter rotate agenda items through a ceremonial loading dock.",
    alternative:
      "A reasonable local alternative is keeping the intended order in an array and rendering it directly, with one ordinary reorder interaction if needed. A crank turns a list operation into machinery.",
  },
  {
    name: "GesturePatent",
    slug: "gesture-patent",
    summary: "A specimen is granted a patent only after click, double-click and right-click arrive in order.",
    description:
      "The same content passes three gesture stations in a fixed order: a single click stamps it, a double-click turns it and a right-click seals it. A wrong gesture resets the route, while keyboard activation remains available on each station.",
    usage: `import { GesturePatent } from "gra-ui";
import "gra-ui/styles.css";

export function PatentedNotice() {
  return <GesturePatent><span>Approved for another meeting</span></GesturePatent>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The specimen that waits through the three-gesture patent route." },
    ],
    demo: "gesture-patent",
    useCase:
      "It could make a reviewer stamp, turn and seal a handoff note before filing it, or let a presenter rehearse three kinds of pointer intent before revealing an agenda item.",
    alternative:
      "A reasonable local alternative is one explicit confirmation button or a short form. Binding a business decision to three unrelated gesture types creates ceremony and failure without security.",
  },
  {
    name: "RunLengthPack",
    slug: "run-length-pack",
    summary: "Adjacent repeated characters collapse into little counted crates.",
    description:
      "One activation performs a real run-length encoding of the supplied label. Consecutive equal characters become visible tokens such as `a×3`, while the original sequence remains restorable with the same control.",
    usage: `import { RunLengthPack } from "gra-ui";
import "gra-ui/styles.css";

export function PackedNotice() {
  return <RunLengthPack label="Sooo much ceremony" />;
}`,
    api: [
      { name: "label", type: "string", description: "The text whose adjacent repeated characters are packed into counted runs." },
    ],
    demo: "run-length-pack",
    useCase:
      "It could let a reviewer compress an emphatic handoff label before storing it in a tiny display, or let a presenter turn a repeated phrase into a small encoding artifact.",
    alternative:
      "A reasonable local alternative is a short run-length utility used where storage actually matters, while leaving the readable text alone. A visible packer optimizes a sentence nobody asked to compress.",
  },
  {
    name: "ClauseAudit",
    slug: "clause-audit",
    summary: "A sentence receives one needless inspection stamp per word.",
    description:
      "It audits a label from left to right. Each click inspects the next word, marks it in the actual sentence and advances a real progress ledger until every clause has been ceremonially cleared.",
    usage: `import { ClauseAudit } from "gra-ui";
import "gra-ui/styles.css";

export function AuditedNotice() {
  return <ClauseAudit label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The words inspected one at a time by the audit ledger." },
    ],
    demo: "clause-audit",
    useCase:
      "It could let a reviewer inspect every word in a handoff sentence before filing it, or let a presenter clear an agenda label word by word before a slide advances. Neither use turns reading into measurable work.",
    alternative:
      "A reasonable local alternative is displaying the sentence and one ordinary review status. A progress ledger should not pretend that looking at the next word is a project milestone.",
  },
  {
    name: "TerminusChoice",
    slug: "terminus-choice",
    summary: "Choose whether every word reports its first, middle or last letter.",
    description:
      "Three choices produce three genuinely different readings of the same label. The selected position is extracted from every word, so the displayed content changes rather than merely changing its decoration.",
    usage: `import { TerminusChoice } from "gra-ui";
import "gra-ui/styles.css";

export function RuledPhrase() {
  return <TerminusChoice label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The words reduced to their first, middle or last letters." },
    ],
    demo: "terminus-choice",
    useCase:
      "It could let a reviewer choose whether a handoff sentence should be represented by its beginnings, centers or endings, or let a presenter make an agenda line confess one arbitrary letter from each word. The choice creates information loss without a policy behind it.",
    alternative:
      "A reasonable local alternative is keeping the readable label and deriving one summary explicitly where it is needed. A three-way tribunal is a poor substitute for naming the desired extraction rule.",
  },
  {
    name: "DropSilo",
    slug: "drop-silo",
    summary: "Drag one piece of content into a silo that immediately gives it a new administrative destiny.",
    description:
      "The cargo can be dragged with native HTML drag-and-drop into an inbox, vault or quarantine lane. The selected silo becomes the real rendered destination, and each lane is also keyboard-operable for devices that do not drag.",
    usage: `import { DropSilo } from "gra-ui";
import "gra-ui/styles.css";

export function FiledNotice() {
  return <DropSilo><span>Needs a decision</span></DropSilo>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The cargo moved into one of the three visible silos." },
    ],
    demo: "drop-silo",
    useCase:
      "It could let a reviewer drag a warning into an inbox, vault or quarantine lane, or let a presenter physically file an agenda item by dropping it into a ceremonial category. The destination changes the layout but not the decision.",
    alternative:
      "A reasonable local alternative is a select, list or ordinary drag target chosen for the actual data model. A three-silo cargo ritual adds logistics to a classification that could be stated directly.",
  },
  {
    name: "AlphabeticalQueue",
    slug: "alphabetical-queue",
    summary: "A queue accepts labels only in alphabetical order.",
    description:
      "Each label must be selected in the next alphabetical position. Correct choices leave the board and enter a visible manifest, while an early selection is rejected and leaves the queue unchanged.",
    usage: `import { AlphabeticalQueue } from "gra-ui";
import "gra-ui/styles.css";

export function OrderedFields() {
  return <AlphabeticalQueue items={["Status", "Owner", "Title"]} />;
}`,
    api: [
      { name: "items", type: "readonly string[]", description: "The labels that must be admitted in alphabetical order." },
    ],
    demo: "alphabetical-queue",
    useCase:
      "It could make a reviewer file handoff fields in alphabetical order, or let a presenter reveal agenda labels according to a dictionary nobody consulted. The sequence imposes an order unrelated to meaning.",
    alternative:
      "A reasonable local alternative is sorting the array once and rendering it, or preserving the author’s intentional order. A queue should not turn an ordinary sort into a timed admission ceremony.",
  },
  {
    name: "PercentParcel",
    slug: "percent-parcel",
    summary: "A readable label is packed into URL percent escapes and then unpacked again.",
    description:
      "One activation applies the real `encodeURIComponent` transformation to the supplied label and displays the resulting transport marks. A second activation restores the original readable text without involving a network or storage layer.",
    usage: `import { PercentParcel } from "gra-ui";
import "gra-ui/styles.css";

export function TransportLabel() {
  return <PercentParcel label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The readable text converted into a percent-encoded parcel." },
    ],
    demo: "percent-parcel",
    useCase:
      "It could let a reviewer package a handoff label for a URL-shaped filing system, or let a presenter reveal the transport spelling hidden inside an agenda phrase. The browser already performs this conversion invisibly when it matters.",
    alternative:
      "A reasonable local alternative is passing the value to `encodeURIComponent` at the boundary that needs it and keeping the display readable. A visible parcel makes transport syntax compete with the message.",
  },
  {
    name: "ColumnTally",
    slug: "column-tally",
    summary: "A group earns its grid columns one click at a time.",
    description:
      "Each award adds a real CSS grid column to the children, reflowing the group through increasingly official arrangements. The final four-column allocation is no more useful than the first.",
    usage: `import { ColumnTally } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content reflowed through one to four actual grid columns." },
    ],
    demo: "column-tally",
    useCase:
      "It could let a reviewer award a handoff brief one column per approval, or let a presenter make agenda fields earn the right to sit beside one another. Neither use improves the information architecture.",
    alternative:
      "A reasonable local alternative is choosing the grid columns in CSS or rendering the intended layout directly. A tally turns a layout decision into a progress ceremony.",
  },
  {
    name: "RoundingRuling",
    slug: "rounding-ruling",
    summary: "Three rounding policies compete to overrule one decimal value.",
    description:
      "Choose floor, ceiling or nearest-five. Each policy calculates a different visible result for the submitted number, as though a decimal needed a binding legal interpretation.",
    usage: `import { RoundingRuling } from "gra-ui";
import "gra-ui/styles.css";

export function RuledScore() {
  return <RoundingRuling value={27.6} />;
}`,
    api: [
      { name: "value", type: "number", description: "The decimal value submitted to three competing rounding policies." },
    ],
    demo: "rounding-ruling",
    useCase:
      "It could let a reviewer decide whether a handoff estimate rounds down, up or toward the nearest five, or let a presenter give an agenda score a formal numerical verdict. Both uses make arithmetic policy look like governance.",
    alternative:
      "A reasonable local alternative is one explicit rounding function at the calculation boundary. A three-button ruling should not replace naming the policy in code.",
  },
  {
    name: "TensionArc",
    slug: "tension-arc",
    summary: "A direct tension control bends a straight row into an unnecessary sag.",
    description:
      "Move the range control and the actual children rise or sag along a calculated curve while keeping their content and order intact. It gives geometry an opinion about emotional stability.",
    usage: `import { TensionArc } from "gra-ui";
import "gra-ui/styles.css";

export function SaggingFields() {
  return (
    <TensionArc>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
    </TensionArc>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The row of content placed along the adjustable curve." },
    ],
    demo: "tension-arc",
    useCase:
      "It could let a reviewer bend a handoff row toward the field under discussion, or let a presenter sag an agenda line to signal that a topic has lost energy. The shape adds mood without adding meaning.",
    alternative:
      "A reasonable local alternative is normal flow with one intentional alignment or spacing rule. A live curve is an expensive answer to a sentence that was already readable.",
  },
  {
    name: "GrayRoute",
    slug: "gray-route",
    summary: "A station route follows binary-reflected Gray order whether anyone asked it to.",
    description:
      "The component calculates a Gray-code order for its children and accepts stations only in that sequence. Correct visits build a real manifest; an incorrect station is rejected and stays available.",
    usage: `import { GrayRoute } from "gra-ui";
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
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The stations visited in calculated Gray-code order." },
    ],
    demo: "gray-route",
    useCase:
      "It could force a reviewer to inspect handoff fields in a bitwise route, or let a presenter reveal agenda items in an order that changes only one abstract bit at a time. The rule is precise but unrelated to the content.",
    alternative:
      "A reasonable local alternative is the authored order or a normal checklist. A Gray route makes a stable sequence harder to discover and easier to get wrong.",
  },
  {
    name: "AtbashNotice",
    slug: "atbash-notice",
    summary: "One click mirrors every letter of a notice through the alphabet.",
    description:
      "The readable label is transformed with a reversible alphabet mirror: A becomes Z, B becomes Y and so on, while spaces and punctuation remain intact. The cipher is visible, deterministic and unnecessary.",
    usage: `import { AtbashNotice } from "gra-ui";
import "gra-ui/styles.css";

export function MirroredNotice() {
  return <AtbashNotice label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The readable text transformed by the reversible alphabet mirror." },
    ],
    demo: "atbash-notice",
    useCase:
      "It could let a reviewer hide a handoff phrase behind a reversible secret identity, or let a presenter reveal an agenda line as a tiny cryptographic artifact before restoring it. Neither use benefits from making copy unreadable.",
    alternative:
      "A reasonable local alternative is rendering the text normally and calling a local cipher utility only where a real protocol requires it. A visible Atbash notice confuses a demo with security.",
  },
  {
    name: "ApportionVeil",
    slug: "apportion-veil",
    summary: "A notice receives four increasingly unnecessary privacy veils.",
    description:
      "Assign one veil at a time and the child changes chamber shape, scale and perimeter. The layers are real visible geometry, so a simple notice ends up with more privacy policy than content.",
    usage: `import { ApportionVeil } from "gra-ui";
import "gra-ui/styles.css";

export function VeiledNotice() {
  return <ApportionVeil><span>Ready for another review</span></ApportionVeil>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice progressively surrounded by four visible veils." },
    ],
    demo: "apportion-veil",
    useCase:
      "It could let a reviewer add one privacy layer per awkward question, or let a presenter protect an agenda line until it has received enough ceremony. Neither use makes the underlying message safer or wiser.",
    alternative:
      "A reasonable local alternative is one disclosure state or one explicit permission label. A four-stage veil turns a binary visibility decision into a decorative allocation process.",
  },
  {
    name: "FatePanel",
    slug: "fate-panel",
    summary: "Three buttons give one child three materially different semantic destinies.",
    description:
      "Choose Notice, Parcel or Monument. The child is actually rendered as an aside, a definition-list parcel or a figure with a blockquote, so the selected fate changes structure as well as the visible treatment.",
    usage: `import { FatePanel } from "gra-ui";
import "gra-ui/styles.css";

export function DestinedNotice() {
  return <FatePanel><span>Needs a decision</span></FatePanel>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content assigned to one of three structurally different fates." },
    ],
    demo: "fate-panel",
    useCase:
      "It could let a reviewer decide whether a handoff note should remain plain, become a filed object or be elevated into a monument, or let a presenter give an agenda item a temporary stage form. The choice changes ceremony rather than meaning.",
    alternative:
      "A reasonable local alternative is choosing the intended semantic element once at the call site. A fate panel makes an authoring decision look like a public tribunal.",
  },
  {
    name: "DriftPin",
    slug: "drift-pin",
    summary: "Drag a cargo pin across seven slots and keep the exact arbitrary parking place.",
    description:
      "A pointer-controlled rail snaps the child to one of seven actual grid slots. The position persists after release and the keyboard can move it by slot, even though the cargo has no useful destination.",
    usage: `import { DriftPin } from "gra-ui";
import "gra-ui/styles.css";

export function ParkedNotice() {
  return <DriftPin><span>Move me slightly to the right</span></DriftPin>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The cargo snapped to the directly manipulated rail position." },
    ],
    demo: "drift-pin",
    useCase:
      "It could let a reviewer park a warning at the point where attention drifted, or let a presenter slide an agenda label toward the person discussing it. Normal layout already has a more honest answer to both requests.",
    alternative:
      "A reasonable local alternative is normal flow, one alignment rule or a real drag-and-drop destination. A seven-slot pin rail preserves a coordinate without preserving a reason.",
  },
  {
    name: "AlternatingIntake",
    slug: "alternating-intake",
    summary: "A manifest admits children only by alternating left intake and right intake.",
    description:
      "The first item must enter from the left, the next from the right, and so on. The admitted items form a real manifest while a wrong gate is rejected, making the order rule observable rather than decorative.",
    usage: `import { AlternatingIntake } from "gra-ui";
import "gra-ui/styles.css";

export function AlternatingFields() {
  return (
    <AlternatingIntake>
      <span>Title</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Due date</span>
    </AlternatingIntake>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The entries admitted from alternating ends into the manifest." },
    ],
    demo: "alternating-intake",
    useCase:
      "It could make a reviewer admit handoff fields from alternating sides of a paper tray, or let a presenter reveal agenda items as if left-right parity were an editorial rule. The sequence adds friction without adding order that anyone needs.",
    alternative:
      "A reasonable local alternative is the authored order or a normal checklist. A two-gate intake should not decide how a stable list is read.",
  },
  {
    name: "VowelShift",
    slug: "vowel-shift",
    summary: "Every vowel in a label moves one place around an unnecessary vowel wheel.",
    description:
      "One action transforms a readable label by cycling a→e→i→o→u→a while preserving consonants, spaces and case. The transformed copy replaces the original until it is explicitly restored.",
    usage: `import { VowelShift } from "gra-ui";
import "gra-ui/styles.css";

export function ShiftedLabel() {
  return <VowelShift label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The readable text whose vowels are cyclically shifted." },
    ],
    demo: "vowel-shift",
    useCase:
      "It could let a reviewer create a temporary pronunciation puzzle from a handoff line, or let a presenter make an agenda label pass through an invented dialect before restoring it. Neither use improves the copy.",
    alternative:
      "A reasonable local alternative is keeping the label readable and using a local string transform only for a real linguistic task. A vowel wheel is a poor place to store editorial intent.",
  },
  {
    name: "GlyphMigration",
    slug: "glyph-migration",
    summary: "A sentence transfers its actual glyphs into an unnecessary archive one tiny move at a time.",
    description:
      "Each press removes the next real character from the readable line and files it as a visible glyph token. Spaces become explicit dots in the archive, so the content and its progress are both observable.",
    usage: `import { GlyphMigration } from "gra-ui";
import "gra-ui/styles.css";

export function MigratingNotice() {
  return <GlyphMigration label="Please file this ordinary note" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose real characters are transferred one at a time." },
    ],
    demo: "glyph-migration",
    useCase:
      "It could let a reviewer migrate a handoff sentence into a character-level archive, or let a presenter file an agenda line one glyph at a time as a tiny ceremony. Neither use makes the message easier to read or safer to store.",
    alternative:
      "A reasonable local alternative is leaving the sentence intact and using one local string operation when a parser truly needs individual characters. A transfer ledger should not supervise ordinary reading.",
  },
  {
    name: "WritingTribunal",
    slug: "writing-tribunal",
    summary: "Three directions compete to decide how one child is allowed to be read.",
    description:
      "Choose Row, Column or Mirror. The child is actually rendered with normal flow, vertical writing mode or right-to-left override, so the verdict changes the reading geometry rather than merely its decoration.",
    usage: `import { WritingTribunal } from "gra-ui";
import "gra-ui/styles.css";

export function RuledNotice() {
  return <WritingTribunal><span>Needs a decision</span></WritingTribunal>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content subjected to three materially different writing directions." },
    ],
    demo: "writing-tribunal",
    useCase:
      "It could let a reviewer choose whether a handoff note should read across, down or from the other edge, or let a presenter give an agenda label a direction before it enters a slide. Both uses turn a known layout choice into a public hearing.",
    alternative:
      "A reasonable local alternative is setting `writing-mode` or `direction` directly where the content is authored. A tribunal should not decide how ordinary copy flows.",
  },
  {
    name: "TraceReceipt",
    slug: "trace-receipt",
    summary: "A pointer trace becomes a persistent ink receipt around a piece of content.",
    description:
      "Draw on the surface and the exact pointer path remains as SVG geometry around the child. Arrow keys can add a small accessible path, making the trace a real stateful artifact instead of a pointer-only flourish.",
    usage: `import { TraceReceipt } from "gra-ui";
import "gra-ui/styles.css";

export function TracedNotice() {
  return <TraceReceipt><span>Evidence</span></TraceReceipt>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content surrounded by the user’s recorded pointer trace." },
    ],
    demo: "trace-receipt",
    useCase:
      "It could let a reviewer circle the field that caused a handoff discussion, or let a presenter draw an improvised border around the agenda item currently under debate. Neither use turns a gesture into useful evidence.",
    alternative:
      "A reasonable local alternative is a normal focus ring, annotation field or one explicit selected state. Persisting freehand geometry around a child is a poor substitute for recording the reason.",
  },
  {
    name: "ChordContract",
    slug: "chord-contract",
    summary: "A document is released only after an exact four-key keyboard contract.",
    description:
      "Focus the surface and press Control, Alt, Shift and Enter in that order. Each correct key marks a real station, an unexpected key voids the draft, and the completed sequence changes the document to a signed state.",
    usage: `import { ChordContract } from "gra-ui";
import "gra-ui/styles.css";

export function ContractedNotice() {
  return <ChordContract><span>Approved for one more meeting</span></ChordContract>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content released after the keyboard sequence is completed." },
    ],
    demo: "chord-contract",
    useCase:
      "It could make a reviewer sign a handoff note with a memorized keyboard ritual, or let a presenter unlock an agenda label after demonstrating four keys. Both uses confuse gesture ceremony with authentication or approval.",
    alternative:
      "A reasonable local alternative is one accessible button or a real authentication boundary when security matters. A fixed key sequence is neither a reliable secret nor a useful confirmation.",
  },
  {
    name: "RomanLedger",
    slug: "roman-ledger",
    summary: "A readable phrase is replaced by Roman numerals that report only each word’s length.",
    description:
      "Issue the ledger to transform every word into the Roman numeral for its actual character count while retaining a small source label. The result is deterministic, reversible and dramatically less useful to read.",
    usage: `import { RomanLedger } from "gra-ui";
import "gra-ui/styles.css";

export function CountedNotice() {
  return <RomanLedger label="Keep the handoff readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase whose words become Roman length entries." },
    ],
    demo: "roman-ledger",
    useCase:
      "It could let a reviewer issue a ceremonial size report for a handoff sentence, or let a presenter turn an agenda line into an antique-looking inventory of word lengths. Both uses discard meaning to display an arbitrary measurement.",
    alternative:
      "A reasonable local alternative is keeping the label readable and calculating `word.length` locally when a metric is genuinely needed. A Roman ledger should not replace content with its measurement.",
  },
  {
    name: "CitationLadder",
    slug: "citation-ladder",
    summary: "A note accumulates increasingly unnecessary citations until it becomes academically overqualified.",
    description:
      "Add four real citation marks one at a time. Each mark appears beside the child and adds a matching reference to the visible list, so a plain note gains a growing scholarly apparatus without gaining a source.",
    usage: `import { CitationLadder } from "gra-ui";
import "gra-ui/styles.css";

export function CitedNotice() {
  return <CitationLadder><span>Ready for one more review</span></CitationLadder>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The note that receives an unnecessary citation ladder." },
    ],
    demo: "citation-ladder",
    useCase:
      "It could let a reviewer make a handoff note look increasingly researched, or let a presenter add one reference mark per audience question before moving on. Neither use creates a source or improves the note.",
    alternative:
      "A reasonable local alternative is one real citation list tied to actual sources. A click-powered ladder mistakes the appearance of scholarship for evidence.",
  },
  {
    name: "PrefixReferendum",
    slug: "prefix-referendum",
    summary: "Three tonal prefixes give the same label three genuinely different degrees of unnecessary authority.",
    description:
      "Choose Suggest, Declare or Escalate. The selected ruling changes the actual sentence, its explanation and its visual treatment by adding a materially different prefix to the supplied label.",
    usage: `import { PrefixReferendum } from "gra-ui";
import "gra-ui/styles.css";

export function RuledLabel() {
  return <PrefixReferendum label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The neutral label submitted to three competing tonal prefixes." },
    ],
    demo: "prefix-referendum",
    useCase:
      "It could let a reviewer decide whether a handoff note should sound tentative, official or urgent, or let a presenter vote a plain agenda line into a new tone. The vote supplies posture instead of information.",
    alternative:
      "A reasonable local alternative is writing the intended tone directly or using one explicit status. A referendum turns a copy edit into a governance ritual.",
  },
  {
    name: "PerimeterEscort",
    slug: "perimeter-escort",
    summary: "A draggable cargo note keeps the exact arbitrary place where its perimeter escort leaves it.",
    description:
      "Drag the cargo along its rail or use the arrow keys. The child remains at the chosen horizontal coordinate and reports the distance from center until it is explicitly returned, making movement change the actual layout.",
    usage: `import { PerimeterEscort } from "gra-ui";
import "gra-ui/styles.css";

export function EscortedNotice() {
  return <PerimeterEscort><span>Park this note</span></PerimeterEscort>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The cargo moved along the unnecessary escort rail." },
    ],
    demo: "perimeter-escort",
    useCase:
      "It could let a reviewer park a handoff field wherever a discussion happens to drift, or let a presenter slide an agenda note toward the speaker who claims it. Neither use benefits from preserving an arbitrary coordinate.",
    alternative:
      "A reasonable local alternative is normal flow with a deliberate alignment or one selected state. A movable rail spends direct manipulation on relocating readable content.",
  },
  {
    name: "ChecksumOrder",
    slug: "checksum-order",
    summary: "A label can be posted only after three actions arrive in the order dictated by its hidden word checksum.",
    description:
      "The component calculates a checksum from the supplied words and uses it to choose a required order for Count words, Read first and Read last. A wrong action clears the draft; the correct sequence posts the label.",
    usage: `import { ChecksumOrder } from "gra-ui";
import "gra-ui/styles.css";

export function CheckedNotice() {
  return <ChecksumOrder label="File the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The words whose character lengths determine the required action order." },
    ],
    demo: "checksum-order",
    useCase:
      "It could make a reviewer perform a word-count ritual before filing a handoff note, or let a presenter require an agenda line to pass a miniature checksum gate. The checksum adds ceremony without protecting the content.",
    alternative:
      "A reasonable local alternative is one submit action with an explicit validation message. A hidden order is a poor substitute for a clear workflow.",
  },
  {
    name: "EdgeExchange",
    slug: "edge-exchange",
    summary: "One editorial ruling swaps the first and last character of every word and calls the sentence improved.",
    description:
      "Exchange edges to rotate each word’s outside characters while preserving its middle. The rendered label changes into a deterministic, reversible near-sentence; restoring it returns the exact original wording.",
    usage: `import { EdgeExchange } from "gra-ui";
import "gra-ui/styles.css";

export function ExchangedNotice() {
  return <EdgeExchange label="Keep the handoff readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase whose word edges are exchanged." },
    ],
    demo: "edge-exchange",
    useCase:
      "It could let a reviewer scramble the edges of a handoff line to test whether its middle remains recognizable, or let a presenter create a temporary editorial artifact from an agenda phrase. Neither use makes the copy clearer.",
    alternative:
      "A reasonable local alternative is keeping the label intact and applying a one-off string transform only for an actual text experiment. A reusable edge exchange should not supervise ordinary wording.",
  },
  {
    name: "ParcelAudit",
    slug: "parcel-audit",
    summary: "A local file is divided into a ceremonial audit queue before it may be released.",
    description:
      "Choose one local file and its byte size becomes one to five visible audit parcels. Inspect each parcel in order; the file itself is never uploaded or changed, but the queue insists that it was.",
    usage: `import { ParcelAudit } from "gra-ui";
import "gra-ui/styles.css";

export function AuditedFile() {
  return <ParcelAudit label="Local file audit" />;
}`,
    api: [
      { name: "label", type: "string", description: "The heading shown above the local file audit." },
    ],
    demo: "parcel-audit",
    useCase:
      "It could let a reviewer ceremonially inspect a handoff attachment before releasing it, or let a presenter make a small local asset pass through a visible intake queue. Neither use learns more than the file picker already knows.",
    alternative:
      "A reasonable local alternative is a normal file input with one validation message. Dividing bytes into invented parcels adds ceremony without security, upload or review value.",
  },
  {
    name: "FormatFork",
    slug: "format-fork",
    summary: "One label must choose whether it becomes a numbered ledger, a table row or a flowing ribbon.",
    description:
      "Choose a filing destination from a native select. The same words are rendered as an ordered list, real table cells or individual flowing spans, so the choice changes the document structure and its reading shape.",
    usage: `import { FormatFork } from "gra-ui";
import "gra-ui/styles.css";

export function ForkedLabel() {
  return <FormatFork label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The words rendered in one of three materially different filing structures." },
    ],
    demo: "format-fork",
    useCase:
      "It could let a reviewer decide whether a handoff line belongs in a ledger, a table or a ribbon on a presentation. The format changes the ceremony, not the information in the line.",
    alternative:
      "A reasonable local alternative is authoring the intended semantic element once and keeping the content in normal flow. A select should not govern the ontology of a sentence.",
  },
  {
    name: "IndentTether",
    slug: "indent-tether",
    summary: "Drag a tether along a ruler and make a notice keep an arbitrary distance from its margin.",
    description:
      "Drag the tether, use the arrow keys, or jump to either end of the ruler. The child stays in flow but receives the exact chosen indentation, so direct manipulation changes the actual spacing rather than merely moving a marker.",
    usage: `import { IndentTether } from "gra-ui";
import "gra-ui/styles.css";

export function TetheredNotice() {
  return <IndentTether><span>Park this note in the margin</span></IndentTether>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice whose actual indentation follows the tether." },
    ],
    demo: "indent-tether",
    useCase:
      "It could let a reviewer drag a handoff note toward the margin where a discussion happens, or let a presenter park an agenda line at the exact distance from its slide edge that feels official. Neither use improves alignment beyond normal layout rules.",
    alternative:
      "A reasonable local alternative is normal flow with a deliberate padding value or one alignment class. A pointer-controlled ruler should not own a document’s margin.",
  },
  {
    name: "FocusParade",
    slug: "focus-parade",
    summary: "A notice travels through three stations only when keyboard focus arrives in the prescribed order.",
    description:
      "Focus Intake, then Review, then Release. Each correct focus moves the actual notice to the next lane; focusing the wrong station voids the parade and returns it to intake. The interaction is keyboard-native and does not need timers or global listeners.",
    usage: `import { FocusParade } from "gra-ui";
import "gra-ui/styles.css";

export function ParadedNotice() {
  return <FocusParade><span>Ready for ceremonial release</span></FocusParade>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice that travels as focus reaches each station." },
    ],
    demo: "focus-parade",
    useCase:
      "It could make a reviewer tab through an attachment’s intake, review and release stations, or let a presenter rehearse an agenda line through three focus checkpoints. The order demonstrates ceremony, not readiness.",
    alternative:
      "A reasonable local alternative is a normal focus order with one explicit submit or approval action. Focus should reveal affordances, not act as a hidden workflow engine.",
  },
  {
    name: "SlugMangle",
    slug: "slug-mangle",
    summary: "One click strips a readable label into the tiny route-shaped artifact it did not ask to become.",
    description:
      "Mangle a phrase into a deterministic URL slug by removing accents, case and punctuation and joining words with hyphens. The transformed copy replaces the original until Restore label returns the exact wording.",
    usage: `import { SlugMangle } from "gra-ui";
import "gra-ui/styles.css";

export function MangledLabel() {
  return <SlugMangle label="Prepare the ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The readable phrase transformed into a URL-shaped slug." },
    ],
    demo: "slug-mangle",
    useCase:
      "It could let a reviewer inspect how a handoff title would behave in a route, or let a presenter temporarily turn an agenda line into a compact URL token. The result is useful only at the boundary where a route is actually needed.",
    alternative:
      "A reasonable local alternative is keeping the human label and deriving a slug at the routing boundary. A reusable mangle button should not make readable copy pay the URL tax.",
  },
  {
    name: "CrestProgress",
    slug: "crest-progress",
    summary: "A notice rises through four tide levels until an unnecessary beacon declares it complete.",
    description:
      "Raise one crest at a time and the actual notice travels upward through a tide gauge. Each stage changes its position and status; the final beacon is a disproportionate reward for pressing one button four times.",
    usage: `import { CrestProgress } from "gra-ui";
import "gra-ui/styles.css";

export function RisingNotice() {
  return <CrestProgress><span>Ready for another review</span></CrestProgress>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice that rises through the four actual gauge levels." },
    ],
    demo: "crest-progress",
    useCase:
      "It could let a reviewer elevate a handoff note from low water to beacon status, or let a presenter raise an agenda line before allowing it to close a slide. Neither use needs a tide gauge to express progress.",
    alternative:
      "A reasonable local alternative is one progress value or an explicit approval button. A sequence of rising paper levels gives an ordinary status more ceremony than information.",
  },
  {
    name: "ShapeVerdict",
    slug: "shape-verdict",
    summary: "A native select sentences one notice to become a coin, ticket or flag.",
    description:
      "Choose one of three shape verdicts and the notice receives a genuinely different geometry: round, notched or pointed. The words remain unchanged while their silhouette pretends to carry a ruling.",
    usage: `import { ShapeVerdict } from "gra-ui";
import "gra-ui/styles.css";

export function ShapedNotice() {
  return <ShapeVerdict><span>Needs a decision</span></ShapeVerdict>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice sentenced to one of three actual silhouettes." },
    ],
    demo: "shape-verdict",
    useCase:
      "It could let a reviewer choose whether a handoff note is a coin, a filing ticket or a directional flag, or let a presenter give an agenda line a silhouette before discussion. The shape adds posture without adding meaning.",
    alternative:
      "A reasonable local alternative is one intentional style class or a status label. A select should not decide whether readable content is round, notched or pointed.",
  },
  {
    name: "VanishingPoint",
    slug: "vanishing-point",
    summary: "Drag an imaginary camera point and make a notice lean toward a perspective it does not need.",
    description:
      "Move the point directly across a small viewfinder, or use its arrow keys. The notice stays in the same place but its actual 3D tilt follows the chosen camera, creating a precise perspective for content that was already flat.",
    usage: `import { VanishingPoint } from "gra-ui";
import "gra-ui/styles.css";

export function PerspectiveNotice() {
  return <VanishingPoint><span>Park this note in the ordinary plane</span></VanishingPoint>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice whose perspective responds to the directly manipulated point." },
    ],
    demo: "vanishing-point",
    useCase:
      "It could let a reviewer angle a handoff note toward the part of a room where a conversation happened, or let a presenter make an agenda line lean toward a speaker. Neither use improves the copy’s legibility.",
    alternative:
      "A reasonable local alternative is normal flat flow with one deliberate emphasis style. A pointer-controlled camera is an expensive way to apply a small transform.",
  },
  {
    name: "FoldOrder",
    slug: "fold-order",
    summary: "Three native disclosure flaps open only when unfolded from left to right.",
    description:
      "Open Left flap, Middle flap and Right flap in order. Each real details panel stays open after its turn, while an early flap creases the whole draft closed and sends the notice back to the first panel.",
    usage: `import { FoldOrder } from "gra-ui";
import "gra-ui/styles.css";

export function FoldedNotice() {
  return <FoldOrder><span>Ready to be unnecessarily flat</span></FoldOrder>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice revealed inside the current folding panel." },
    ],
    demo: "fold-order",
    useCase:
      "It could make a reviewer open three sections of a handoff brief as if paper had a preferred folding direction, or let a presenter unfold an agenda line in a fixed ceremony. The order has no relation to the information.",
    alternative:
      "A reasonable local alternative is independent details elements or one normal disclosure. Native panels should expose content, not enforce a paper-folding ritual.",
  },
  {
    name: "GlyphOffset",
    slug: "glyph-offset",
    summary: "One click moves every printable character exactly one Unicode step forward.",
    description:
      "Offset glyphs replaces each printable ASCII character with the next one, wrapping the final tilde to an exclamation mark. The resulting copy remains deterministic and reversible, which makes the transformation technically tidy and completely unnecessary.",
    usage: `import { GlyphOffset } from "gra-ui";
import "gra-ui/styles.css";

export function OffsetNotice() {
  return <GlyphOffset label="Keep the handoff readable" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase whose printable glyphs are shifted by one code point." },
    ],
    demo: "glyph-offset",
    useCase:
      "It could let a reviewer produce a harmless glyph-level specimen from a handoff sentence, or let a presenter turn an agenda line into a reversible typographic artifact. Neither use improves the message or protects it.",
    alternative:
      "A reasonable local alternative is keeping the label readable and applying a one-off encoding function only for a real parser or experiment. A public glyph elevator should not supervise ordinary copy.",
  },
  {
    name: "DecorationToll",
    slug: "decoration-toll",
    summary: "A notice pays five typographic fees, collecting lines until decoration pretends to be approval.",
    description:
      "Add one actual ink pass at a time. Underline, double-line, cross out and stamp the same notice until the final stage is reached; Remove ink returns it to its unmarked state.",
    usage: `import { DecorationToll } from "gra-ui";
import "gra-ui/styles.css";

export function TaxedNotice() {
  return <DecorationToll><span>Ready for one more review</span></DecorationToll>;
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The notice that collects one real typographic decoration per toll payment." },
    ],
    demo: "decoration-toll",
    useCase:
      "It could let a reviewer make a handoff note earn progressively heavier marks, or let a presenter decorate an agenda line until it looks ceremonially settled. Neither use makes the wording more approved.",
    alternative:
      "A reasonable local alternative is one status badge or one deliberate emphasis style. A button that invoices a notice for four extra decorations is a poor substitute for a clear state.",
  },
  {
    name: "CaseBallot",
    slug: "case-ballot",
    summary: "Three case policies give one label genuinely different voices instead of merely changing its color.",
    description:
      "Vote for Quiet case, Headline case or Shout case. The rendered string itself changes to lowercase, title case or uppercase, and Withdraw the ballot returns to the quiet policy.",
    usage: `import { CaseBallot } from "gra-ui";
import "gra-ui/styles.css";

export function RuledLabel() {
  return <CaseBallot label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase submitted to the three competing case policies." },
    ],
    demo: "case-ballot",
    useCase:
      "It could let a reviewer decide whether a handoff note whispers, reports or shouts, or let a presenter vote on the rhetorical volume of an agenda line. Casing changes posture, not importance.",
    alternative:
      "A reasonable local alternative is authoring the intended casing or applying one local text style. A ballot should not govern whether a sentence uses capital letters.",
  },
  {
    name: "RatioRail",
    slug: "ratio-rail",
    summary: "A draggable divider reallocates the room between two shelves of content.",
    description:
      "Drag the rail or use its arrow keys to change the actual left/right proportions. Children stay filed on their shelf while the available room, line wrapping and visual balance change in real time.",
    usage: `import { RatioRail } from "gra-ui";
import "gra-ui/styles.css";

export function ShelvedNotice() {
  return (
    <RatioRail>
      <span>Request</span>
      <span>Owner</span>
      <span>Deadline</span>
      <span>Reason</span>
    </RatioRail>
  );
}`,
    api: [
      { name: "children", type: "ReactNode", description: "The content divided in order between the left and right shelves." },
    ],
    demo: "ratio-rail",
    useCase:
      "It could let a reviewer negotiate how much room a handoff field deserves, or let a presenter squeeze an agenda label beside its supporting detail. The pixels can move without improving the information architecture.",
    alternative:
      "A reasonable local alternative is a fixed grid or one responsive layout rule. A pointer-controlled proportion is an elaborate answer to choosing two column widths.",
  },
  {
    name: "EditSequence",
    slug: "edit-sequence",
    summary: "Trim, capitalize and punctuate a sentence in exactly the order a tiny editorial office demands.",
    description:
      "Choose the three real editing actions in order. A premature action reopens the draft, while the accepted actions transform the visible label step by step and finally file it.",
    usage: `import { EditSequence } from "gra-ui";
import "gra-ui/styles.css";

export function FiledDraft() {
  return <EditSequence label="  review the ordinary handoff  " />;
}`,
    api: [
      { name: "label", type: "string", description: "The draft that must survive the trim, capitalization and punctuation sequence." },
    ],
    demo: "edit-sequence",
    useCase:
      "It could make a reviewer process a handoff draft through a miniature editorial checklist, or let a presenter stage an agenda line before revealing the final copy. The sentence does not need permission to be edited in a prescribed order.",
    alternative:
      "A reasonable local alternative is one string transformation at the boundary where it is needed, or three independent controls when order has meaning. A locked editorial queue adds ceremony to ordinary text cleanup.",
  },
  {
    name: "ArticleEjector",
    slug: "article-ejector",
    summary: "A label ejects every a, an and the into a small archive that does not improve the sentence.",
    description:
      "Eject articles to replace the visible sentence with the remaining words and file the removed tokens in a tray. Restore sentence brings the original label back exactly as supplied.",
    usage: `import { ArticleEjector } from "gra-ui";
import "gra-ui/styles.css";

export function ArticleFreeLabel() {
  return <ArticleEjector label="The team prepared an ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The sentence whose English articles are separated from the visible copy." },
    ],
    demo: "article-ejector",
    useCase:
      "It could let a reviewer inspect how much connective furniture a handoff sentence carries, or let a presenter produce an article-free slide label for a linguistic exercise. Removing small words is not a communication strategy by itself.",
    alternative:
      "A reasonable local alternative is retaining the sentence or using a one-off text utility for analysis. A reusable ejector should not supervise the words that make a noun phrase readable.",
  },
  {
    name: "PrimeLedger",
    slug: "prime-ledger",
    summary: "A number is factored one smallest divisor at a time until a pointless ledger reaches one.",
    description:
      "Extract factor files the smallest available divisor and reduces the live number. The number changes after every ruling, the factors remain visible as a ledger, and Reopen ledger restores the supplied value.",
    usage: `import { PrimeLedger } from "gra-ui";
import "gra-ui/styles.css";

export function FactoredNotice() {
  return <PrimeLedger value={84} />;
}`,
    api: [
      { name: "value", type: "number", description: "The positive integer submitted to the deliberately manual factor ledger." },
    ],
    demo: "prime-ledger",
    useCase:
      "It could let a reviewer factor a handoff estimate into a visible chain, or let a presenter turn an agenda number into a tiny arithmetic ceremony. The result is deterministic and the ceremony adds no insight.",
    alternative:
      "A reasonable local alternative is one calculation at the point where factors are actually needed, or simply displaying the original number. A ledger should not make division wait for a button.",
    isNew: true,
  },
  {
    name: "CaptionCharter",
    slug: "caption-charter",
    summary: "Three filing policies give one caption three materially different documents.",
    description:
      "Choose Brief, Ledger or Receipt. Brief keeps only the opening words, Ledger renders every word as a numbered filing and Receipt replaces the caption with its character count plus a source line. Withdraw policy returns to the unfiled caption.",
    usage: `import { CaptionCharter } from "gra-ui";
import "gra-ui/styles.css";

export function GovernedCaption() {
  return <CaptionCharter label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The caption submitted to three incompatible filing policies." },
    ],
    demo: "caption-charter",
    useCase:
      "It could let a reviewer vote whether a handoff caption should be brief, itemized or counted, or let a presenter give an agenda line a temporary document status. The policy changes presentation without adding meaning.",
    alternative:
      "A reasonable local alternative is authoring the intended format at the call site and keeping the full caption nearby. A charter turns an obvious content decision into a ballot.",
    isNew: true,
  },
  {
    name: "CaretSplit",
    slug: "caret-split",
    summary: "A movable caret divides a caption into two real panels wherever the pointer leaves it.",
    description:
      "Drag the caret across the sentence or move it with the arrow keys. The words before and after the caret are rendered in separate panels, and Return to start removes the invented boundary.",
    usage: `import { CaretSplit } from "gra-ui";
import "gra-ui/styles.css";

export function DividedCaption() {
  return <CaretSplit label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The caption divided at the caret's chosen word boundary." },
    ],
    demo: "caret-split",
    useCase:
      "It could let a reviewer park a handoff request on one side of a deadline, or let a presenter split an agenda line around the point where discussion keeps drifting. The pointer supplies geometry instead of editorial judgment.",
    alternative:
      "A reasonable local alternative is two authored fields or one ordinary line break. A movable caret is a polished way to discover that the sentence already had a natural structure.",
    isNew: true,
  },
  {
    name: "GateSequence",
    slug: "gate-sequence",
    summary: "A caption's word count secretly rotates four gates that must be clicked in order.",
    description:
      "The four visible gates are Scan, Stamp, File and Release, but the required starting gate rotates with the caption's word count. A wrong gate sends the cargo back to intake; the correct sequence releases it, and Reset route starts over.",
    usage: `import { GateSequence } from "gra-ui";
import "gra-ui/styles.css";

export function RoutedCaption() {
  return <GateSequence label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The caption whose word count determines the required gate order." },
    ],
    demo: "gate-sequence",
    useCase:
      "It could make a reviewer pass a handoff sentence through a miniature custody route, or let a presenter rehearse an agenda label before releasing it to a slide. The hidden route protects nothing and slows everything.",
    alternative:
      "A reasonable local alternative is one explicit release action with a visible status. A deterministic button order should not masquerade as a workflow.",
    isNew: true,
  },
  {
    name: "ColumnTranspose",
    slug: "column-transpose",
    summary: "One click writes a caption across rows and makes the reader visit its columns first.",
    description:
      "Transpose columns performs a real row-to-column word transposition, so the visible wording changes order while every word remains present. The numbered word grid shows the new traversal, and Restore rows returns the supplied phrase.",
    usage: `import { ColumnTranspose } from "gra-ui";
import "gra-ui/styles.css";

export function TransposedCaption() {
  return <ColumnTranspose label="Prepare the remarkably ordinary handoff" />;
}`,
    api: [
      { name: "label", type: "string", description: "The phrase rewritten by a reversible columnar word transposition." },
    ],
    demo: "column-transpose",
    useCase:
      "It could let a reviewer inspect a handoff sentence as a filing matrix, or let a presenter create a temporary agenda artifact that must be read by columns. The reversible rearrangement is technically clean and practically unhelpful.",
    alternative:
      "A reasonable local alternative is keeping the caption readable and using a local array transform for an actual data exercise. A display component should not make ordinary reading pay for a matrix.",
    isNew: true,
  },
] as const;

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
