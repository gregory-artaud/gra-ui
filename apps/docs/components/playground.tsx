"use client";

import {
  AcronymForge,
  AlphabetizeWords,
  AlphabeticalQueue,
  BinaryMarch,
  ArithmeticCouncil,
  AlphabetTreadmill,
  ArrowBias,
  AveragePosition,
  Braidline,
  BackspaceArchive,
  BeltCollector,
  BlankFiling,
  CaseGate,
  CenterOut,
  ChildGravity,
  ClauseAudit,
  CoilCertification,
  CodepointReceipt,
  CompassHinge,
  ClickOrder,
  CornerFold,
  CopyEcho,
  Counterweight,
  CustodyChoice,
  CursorProof,
  DisclosureSpill,
  DragDuplicate,
  DragThreshold,
  DropSilo,
  DurationScale,
  EqualChoice,
  FocusFade,
  FocusReceipt,
  FocusUnpack,
  FilingFork,
  HoldPosition,
  HoverRoute,
  HoverConfirm,
  IndexSum,
  IdleUnspool,
  IndecisiveButton,
  KeystrokeStack,
  LassoLock,
  LensRail,
  LetterLevy,
  LayoutReferendum,
  LastRemaining,
  LengthOrder,
  MarkupPromotion,
  MarginQuota,
  MetricMandate,
  MixedClick,
  MomentumWeave,
  NestChildren,
  NotchProgress,
  OperationParade,
  PairwiseMerge,
  ParityPurge,
  PressEscape,
  PointerPlot,
  PunchProof,
  QuotaProcession,
  ReorderBack,
  RedundancyCuller,
  RotationTithe,
  ScaleSweep,
  SeparatorBallot,
  SeamFold,
  SelectionSeal,
  ShadowPair,
  ScrollRedact,
  SortMandate,
  SpaceStaple,
  SideSplit,
  SplitLabel,
  SwitchbackRoute,
  TimedRelease,
  TetherPull,
  TerminusChoice,
  WeightVote,
  WeekdayLedger,
  WheelStamp,
  WitnessChoice,
  ClarityDebt,
  RecessDepth,
  ReturnProtocol,
  ElasticFrame,
  NeighborMarch,
  SignalChoice,
  ShutterPass,
  SignalTranscript,
  FootnoteShift,
  WordRelay,
  WordTurnstile,
  RulerRise,
  CheckpointQueue,
  DocketSequence,
  DoubleEntry,
  EventRelay,
  FreeDrift,
  GesturePatent,
  InsideOutWords,
  MaskBallot,
  OrbitStow,
  PalindromeLatch,
  PrecisionLadder,
  RatchetReveal,
  VerdictSelector,
  VowelHinge,
  GlyphMigration,
  WritingTribunal,
  TraceReceipt,
  ChordContract,
  RomanLedger,
  ContextEscalator,
  CrankShift,
  LetterCensus,
  MagneticDock,
  OutcomeTriptych,
  PatternLatch,
  PercentParcel,
  CalibrationWindow,
  SemanticLottery,
  SliceReferendum,
  SpellingPermit,
  CellularDrift,
  ReverseQueue,
  PunctuationSieve,
  RunLengthPack,
  ColumnTally,
  RoundingRuling,
  TensionArc,
  GrayRoute,
  AtbashNotice,
  AlternatingIntake,
  ApportionVeil,
  DriftPin,
  FatePanel,
  VowelShift,
} from "gra-ui";
import { useState } from "react";

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
] as const;

type Variant = (typeof variants)[number];

export interface PlaygroundProps {
  kind?:
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
    | "ratchet-reveal"
    | "precision-ladder"
    | "mask-ballot"
    | "free-drift"
    | "docket-sequence"
    | "vowel-hinge"
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
    | "side-split"
    | "duration-scale"
    | "indecisive"
    | "mixed-click"
    | "weight-vote"
    | "case-gate"
    | "equal-choice"
    | "split-label"
    | "focus-fade"
    | "focus-unpack"
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
    | "backspace-archive"
    | "hover-route"
    | "nest-children"
    | "drag-threshold"
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
    | "roman-ledger";
}

export function Playground({ kind = "indecisive" }: PlaygroundProps) {
  const [choiceInput, setChoiceInput] = useState(
    "Ship it, Wait a minute, Ship it anyway",
  );
  const [disabled, setDisabled] = useState(false);
  const [interval, setIntervalValue] = useState(900);
  const [lastDecision, setLastDecision] = useState<string | null>(null);
  const [mixedClickReset, setMixedClickReset] = useState(0);
  const [sideSplitReset, setSideSplitReset] = useState(0);
  const [holdPositionReset, setHoldPositionReset] = useState(0);
  const [dragThresholdReset, setDragThresholdReset] = useState(0);
  const [variant, setVariant] = useState<Variant>("default");
  const choices = choiceInput
    .split(",")
    .map((choice) => choice.trim())
    .filter(Boolean);

  if (kind === "markup-promotion") {
    return (
      <div className="playground-shell markup-promotion-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <MarkupPromotion><span>Ready for another review</span></MarkupPromotion>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Promote the notice one actual HTML container at a time.</dd></div>
            <div><dt>2</dt><dd>Watch the document structure and visual treatment change together.</dd></div>
            <div><dt>3</dt><dd>Demote it back to plain when markup has had enough authority.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "separator-ballot") {
    return (
      <div className="playground-shell separator-ballot-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <SeparatorBallot label="Prepare the remarkably ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with an ungoverned readable label.</dd></div>
            <div><dt>2</dt><dd>Vote for dots, slashes or one word per line.</dd></div>
            <div><dt>3</dt><dd>Return to normal spacing when the ruling feels ceremonial.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "belt-collector") {
    return (
      <div className="playground-shell belt-collector-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <BeltCollector>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
            </BeltCollector>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Drag the pickup head across the belt.</dd></div>
            <div><dt>2</dt><dd>Every reached child leaves the belt for the real tray.</dd></div>
            <div><dt>3</dt><dd>Use arrow keys or reset the belt to send the pieces back.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "operation-parade") {
    return (
      <div className="playground-shell operation-parade-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <OperationParade value={24} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Choose one operation, then another, then the last.</dd></div>
            <div><dt>2</dt><dd>Watch the number change after every actual calculation.</dd></div>
            <div><dt>3</dt><dd>Restart and use a different order to reach a different answer.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "redundancy-culler") {
    return (
      <div className="playground-shell redundancy-culler-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <RedundancyCuller label="Review the review before the review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a sentence that tolerates repetition.</dd></div>
            <div><dt>2</dt><dd>Cull later repeats from the actual visible sentence.</dd></div>
            <div><dt>3</dt><dd>Open the drawer to inspect what was removed, then restore it.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "coil-certification") {
    return (
      <div className="playground-shell coil-certification-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <CoilCertification><span>Ready for another review</span></CoilCertification>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Wind one actual loop around the notice.</dd></div>
            <div><dt>2</dt><dd>Watch each loop tighten the geometric perimeter.</dd></div>
            <div><dt>3</dt><dd>Uncoil the certification when four loops feel excessive.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "witness-choice") {
    return (
      <div className="playground-shell witness-choice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <WitnessChoice><span>Needs a decision</span></WitnessChoice>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Choose Lead, Side or Tail.</dd></div>
            <div><dt>2</dt><dd>The witness changes the child&apos;s actual arrangement.</dd></div>
            <div><dt>3</dt><dd>Return to unwitnessed when the layout has testified enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "shutter-pass") {
    return (
      <div className="playground-shell shutter-pass-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <ShutterPass><span>Only the approved portion is visible</span></ShutterPass>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Drag the reading shutter across the rail.</dd></div>
            <div><dt>2</dt><dd>The clip boundary reveals a real amount of the notice.</dd></div>
            <div><dt>3</dt><dd>Use arrow keys or reset the aperture.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "return-protocol") {
    return (
      <div className="playground-shell return-protocol-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <ReturnProtocol><span>Back by the next meeting</span></ReturnProtocol>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Borrow the notice into the loan tray.</dd></div>
            <div><dt>2</dt><dd>Add its witness mark before returning it.</dd></div>
            <div><dt>3</dt><dd>Cancel to send the notice home without ceremony.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "acronym-forge") {
    return (
      <div className="playground-shell acronym-forge-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <AcronymForge label="Please keep this sentence readable" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Forge the phrase into its opening letters.</dd></div>
            <div><dt>2</dt><dd>Inspect the source ledger below the acronym.</dd></div>
            <div><dt>3</dt><dd>Restore the words when the shorthand stops helping.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "notch-progress") {
    return (
      <div className="playground-shell notch-progress-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <NotchProgress><span>Ready for one more review</span></NotchProgress>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a readable notice and an empty seal.</dd></div>
            <div><dt>2</dt><dd>Add five notches one at a time; the ring and paper depth respond.</dd></div>
            <div><dt>3</dt><dd>Begin again to discard the completely unnecessary certification.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "filing-fork") {
    return (
      <div className="playground-shell filing-fork-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <FilingFork><span>Needs a decision</span></FilingFork>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Choose Ledger, Frame or Echo.</dd></div>
            <div><dt>2</dt><dd>The child moves into a genuinely different HTML structure.</dd></div>
            <div><dt>3</dt><dd>Return to intake when the shelf feels too authoritative.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "pointer-plot") {
    return (
      <div className="playground-shell pointer-plot-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <PointerPlot><span>Park this note</span></PointerPlot>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Click anywhere on the plotting surface.</dd></div>
            <div><dt>2</dt><dd>Watch the cargo and crosshair move to the real coordinate.</dd></div>
            <div><dt>3</dt><dd>Use arrow keys for needless precision, or recenter it.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "switchback-route") {
    return (
      <div className="playground-shell switchback-route-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <SwitchbackRoute><span>Arrived eventually</span></SwitchbackRoute>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Focus the route board.</dd></div>
            <div><dt>2</dt><dd>Press Up, Right, Down, then Left in that order.</dd></div>
            <div><dt>3</dt><dd>A wrong turn resets the route before the child is released.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "codepoint-receipt") {
    return (
      <div className="playground-shell codepoint-receipt-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <CodepointReceipt label="Please keep this sentence readable" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a sentence that is easy to read.</dd></div>
            <div><dt>2</dt><dd>Issue a receipt for every actual character code.</dd></div>
            <div><dt>3</dt><dd>Restore the sentence when implementation detail has had enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "spelling-permit") {
    return (
      <div className="playground-shell spelling-permit-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <SpellingPermit label="File the note" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Type “File the note” into the permit field.</dd></div>
            <div><dt>2</dt><dd>Each correct character reveals one actual letter.</dd></div>
            <div><dt>3</dt><dd>Make a mistake to see the permit reject it, then revoke and begin again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "slice-referendum") {
    return (
      <div className="playground-shell slice-referendum-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <SliceReferendum label="Please file the remarkably ordinary handoff note today" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the entire label awaiting a cut.</dd></div>
            <div><dt>2</dt><dd>Choose Opening, Middle or Closing.</dd></div>
            <div><dt>3</dt><dd>The surviving excerpt is actual content, not a tint on the same sentence.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "compass-hinge") {
    return (
      <div className="playground-shell compass-hinge-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <CompassHinge><span>Face the issue</span></CompassHinge>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Drag the compass knob around its dial.</dd></div>
            <div><dt>2</dt><dd>Watch the content pivot to the exact angle.</dd></div>
            <div><dt>3</dt><dd>Arrow keys also turn the hinge; Face north restores it.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "event-relay") {
    return (
      <div className="playground-shell event-relay-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <EventRelay>
              <span>One parcel</span>
            </EventRelay>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Tab to focus the relay panel.</dd></div>
            <div><dt>2</dt><dd>Scroll once while it is focused, then press Space.</dd></div>
            <div><dt>3</dt><dd>The parcel only reaches delivery when all three events arrive in order.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "alphabetize-words") {
    return (
      <div className="playground-shell alphabetize-words-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <AlphabetizeWords label="Keep the useful sentence readable" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a readable sentence.</dd></div>
            <div><dt>2</dt><dd>Mill the words to sort each word’s real characters.</dd></div>
            <div><dt>3</dt><dd>Restore reading when alphabetical order has gone too far.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "clarity-debt") {
    return (
      <div className="playground-shell clarity-debt-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <ClarityDebt><span>Ready for review</span></ClarityDebt>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Charge the readable notice.</dd></div>
            <div><dt>2</dt><dd>Watch four real blur levels accumulate.</dd></div>
            <div><dt>3</dt><dd>Clear the debt to make it legible again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "arithmetic-council") {
    return (
      <div className="playground-shell arithmetic-council-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <ArithmeticCouncil value={7.25} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Submit the amount 7.25.</dd></div>
            <div><dt>2</dt><dd>Choose double, halve or invert.</dd></div>
            <div><dt>3</dt><dd>Reopen the case to choose again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "tether-pull") {
    return (
      <div className="playground-shell tether-pull-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <TetherPull><span>Stay exactly here</span></TetherPull>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Drag the anchor dot around the surface.</dd></div>
            <div><dt>2</dt><dd>Use arrow keys when the dot is focused.</dd></div>
            <div><dt>3</dt><dd>Watch the tether stretch while the notice refuses to move.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "double-entry") {
    return (
      <div className="playground-shell double-entry-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <DoubleEntry>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
            </DoubleEntry>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Click Title, Status and Owner in order.</dd></div>
            <div><dt>2</dt><dd>Repeat the same order for the second pass.</dd></div>
            <div><dt>3</dt><dd>Try the wrong entry to leave it visibly unposted.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "signal-transcript") {
    return (
      <div className="playground-shell signal-transcript-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <SignalTranscript label="Please review this" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Transmit the plain label.</dd></div>
            <div><dt>2</dt><dd>Read the actual per-character Morse signals.</dd></div>
            <div><dt>3</dt><dd>Restore the original phrase when the ceremony is over.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "context-escalator") {
    return (
      <div className="playground-shell context-escalator-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <ContextEscalator><span>Needs one decision</span></ContextEscalator>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a notice and four closed record levels.</dd></div>
            <div><dt>2</dt><dd>Right-click the notice, or use Open next context.</dd></div>
            <div><dt>3</dt><dd>Each gesture adds a real record and a deeper paper shadow.</dd></div>
            <div><dt>4</dt><dd>Clear the context when the escalation has become indefensible.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "outcome-triptych") {
    return (
      <div className="playground-shell outcome-triptych-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <OutcomeTriptych><span>Ready for review</span></OutcomeTriptych>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one child waiting for a fate.</dd></div>
            <div><dt>2</dt><dd>Choose Promote, Quarantine or Muffle.</dd></div>
            <div><dt>3</dt><dd>The actual markup changes to a priority card, fieldset or softened notice.</dd></div>
            <div><dt>4</dt><dd>Return to indecision when none of the three outcomes deserves to last.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "magnetic-dock") {
    return (
      <div className="playground-shell magnetic-dock-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <MagneticDock><span>Loose cargo</span></MagneticDock>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with cargo floating between three named pockets.</dd></div>
            <div><dt>2</dt><dd>Drag it anywhere across the surface and release.</dd></div>
            <div><dt>3</dt><dd>It snaps to whichever pocket is mathematically nearest.</dd></div>
            <div><dt>4</dt><dd>Use the arrow keys or Release cargo to move it again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "pattern-latch") {
    return (
      <div className="playground-shell pattern-latch-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <PatternLatch><span>Already available</span></PatternLatch>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a perfectly ordinary notice behind a lock.</dd></div>
            <div><dt>2</dt><dd>Enter triangle, circle, square, then circle.</dd></div>
            <div><dt>3</dt><dd>A wrong symbol clears the route; the exact pattern opens the notice.</dd></div>
            <div><dt>4</dt><dd>Forget the pattern when the lock has made its point.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "letter-census") {
    return (
      <div className="playground-shell letter-census-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <LetterCensus label="Ready for another review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one readable sentence.</dd></div>
            <div><dt>2</dt><dd>Click Count letters to replace it with a frequency ledger.</dd></div>
            <div><dt>3</dt><dd>Each bar is calculated from the actual letters in the supplied label.</dd></div>
            <div><dt>4</dt><dd>Restore the label when the census has become more official than the sentence.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "calibration-window") {
    return (
      <div className="playground-shell calibration-window-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <CalibrationWindow><span>Ready for review</span></CalibrationWindow>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a notice in a generous aperture.</dd></div>
            <div><dt>2</dt><dd>Press Calibrate one notch to narrow the actual notice width.</dd></div>
            <div><dt>3</dt><dd>Four marks change the box, shadow and progress state together.</dd></div>
            <div><dt>4</dt><dd>Open it again when the measurement has become more important than the notice.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "semantic-lottery") {
    return (
      <div className="playground-shell semantic-lottery-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <SemanticLottery><span>Needs a noun</span></SemanticLottery>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one child and no semantic verdict.</dd></div>
            <div><dt>2</dt><dd>Choose Briefing, Ledger or Aside from the radio cards.</dd></div>
            <div><dt>3</dt><dd>The child moves into a different real HTML structure and layout.</dd></div>
            <div><dt>4</dt><dd>Return to plain content when the lottery has chosen enough meaning.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "cellular-drift") {
    return (
      <div className="playground-shell cellular-drift-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <CellularDrift><span>Place me precisely</span></CellularDrift>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the content in the privileged middle cell.</dd></div>
            <div><dt>2</dt><dd>Click any numbered cell or focus it and press Enter.</dd></div>
            <div><dt>3</dt><dd>The actual child travels to that coordinate across the board.</dd></div>
            <div><dt>4</dt><dd>Return to the middle when the grid has made its point.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "reverse-queue") {
    return (
      <div className="playground-shell reverse-queue-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <ReverseQueue>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </ReverseQueue>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with four items waiting in their ordinary order.</dd></div>
            <div><dt>2</dt><dd>Board Date first, then Owner, Status and Title.</dd></div>
            <div><dt>3</dt><dd>A wrong choice shakes but does not remove the item.</dd></div>
            <div><dt>4</dt><dd>Empty the queue when the reverse manifest feels sufficiently official.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "punctuation-sieve") {
    return (
      <div className="playground-shell punctuation-sieve-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage">
            <PunctuationSieve label="Please, file this: today." />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with punctuation embedded in a readable sentence.</dd></div>
            <div><dt>2</dt><dd>Press Sieve next mark to remove the next actual punctuation character.</dd></div>
            <div><dt>3</dt><dd>The sentence leaves placeholders while the marks collect in the tray.</dd></div>
            <div><dt>4</dt><dd>Put marks back when the tray has become more important than grammar.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "recess-depth") {
    return (
      <div className="playground-shell recess-depth-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage recess-depth-preview">
            <RecessDepth><span>Ready to review</span></RecessDepth>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a child above four empty filing layers.</dd></div>
            <div><dt>2</dt><dd>Press File one layer. The content shifts deeper and one layer becomes real.</dd></div>
            <div><dt>3</dt><dd>Continue until the content is fully recessed beneath the filing stack.</dd></div>
            <div><dt>4</dt><dd>Unbury the child when the archive has become unnecessarily hard to reach.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "custody-choice") {
    return (
      <div className="playground-shell custody-choice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage custody-choice-preview">
            <CustodyChoice><span>Needs a destination</span></CustodyChoice>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the notice waiting in intake.</dd></div>
            <div><dt>2</dt><dd>Choose Desk, Vault or Courier. Each button moves the actual notice into a different station.</dd></div>
            <div><dt>3</dt><dd>The chosen destination stays visible while the other stations remain empty.</dd></div>
            <div><dt>4</dt><dd>Recall the notice when a custody decision has become too official.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "counterweight") {
    return (
      <div className="playground-shell counterweight-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage counterweight-preview">
            <Counterweight><span>Opposite cargo</span></Counterweight>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the weight and cargo balanced in the center.</dd></div>
            <div><dt>2</dt><dd>Drag the weight across the five-slot rail, or use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>The cargo moves to the exact opposite slot and stays there.</dd></div>
            <div><dt>4</dt><dd>Recenter the weight when the counter-position has made its point.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "shadow-pair") {
    return (
      <div className="playground-shell shadow-pair-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage shadow-pair-preview">
            <ShadowPair>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
            </ShadowPair>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with three cards and their unselected witnesses.</dd></div>
            <div><dt>2</dt><dd>Select card 1, then witness 1. Repeat the pair for each row.</dd></div>
            <div><dt>3</dt><dd>A correct pair stays signed; a wrong card or witness resets the whole route.</dd></div>
            <div><dt>4</dt><dd>Restart the filing when every witness has finally been involved.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "center-out") {
    return (
      <div className="playground-shell center-out-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage center-out-preview">
            <CenterOut label="Ready for another review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the supplied sentence in its ordinary order.</dd></div>
            <div><dt>2</dt><dd>Press Read from the middle to reorder the actual characters.</dd></div>
            <div><dt>3</dt><dd>The center appears first, then its neighbors alternate outward.</dd></div>
            <div><dt>4</dt><dd>Straighten the sentence when center-first reading has done enough damage.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "punch-proof") {
    return (
      <div className="playground-shell punch-proof-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage punch-proof-preview">
            <PunchProof><span>Ready to file</span></PunchProof>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary card and five empty perforations.</dd></div>
            <div><dt>2</dt><dd>Press Punch next hole. Each press opens the next physical hole.</dd></div>
            <div><dt>3</dt><dd>The card changes from waiting to complete only after all five holes are open.</dd></div>
            <div><dt>4</dt><dd>Re-file the card when the approval has become sufficiently official.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "sort-mandate") {
    return (
      <div className="playground-shell sort-mandate-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage sort-mandate-preview">
            <SortMandate items={["Status", "Owner", "Review", "Date"]} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the roster in the supplied order.</dd></div>
            <div><dt>2</dt><dd>Choose First letter, Most vowels or Last letter.</dd></div>
            <div><dt>3</dt><dd>The same four labels move into a genuinely different order under each mandate.</dd></div>
            <div><dt>4</dt><dd>Withdraw the mandate when no criterion deserves to govern the list.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "lens-rail") {
    return (
      <div className="playground-shell lens-rail-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage lens-rail-preview">
            <LensRail label="Ready for another review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the lens at the first character.</dd></div>
            <div><dt>2</dt><dd>Drag the range or use the arrow keys to move it along the rail.</dd></div>
            <div><dt>3</dt><dd>The current character enlarges and the seven-character excerpt changes with it.</dd></div>
            <div><dt>4</dt><dd>Return the lens to the start when the inspection becomes needless.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "quota-procession") {
    return (
      <div className="playground-shell quota-procession-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage quota-procession-preview">
            <QuotaProcession>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </QuotaProcession>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start at Title, which demands one tap.</dd></div>
            <div><dt>2</dt><dd>Status demands two taps, Owner three and Date one again.</dd></div>
            <div><dt>3</dt><dd>Only the current step accepts input; completed steps stay filed.</dd></div>
            <div><dt>4</dt><dd>Return to the first stage when the procession has gone far enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "braidline") {
    return (
      <div className="playground-shell braidline-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage braidline-preview">
            <Braidline label="Ready for review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one straight label.</dd></div>
            <div><dt>2</dt><dd>Click Braid the characters to distribute alternating characters into two strands.</dd></div>
            <div><dt>3</dt><dd>The actual characters remain present, but their reading order becomes visibly interlaced.</dd></div>
            <div><dt>4</dt><dd>Unbraid the line when the typographic loom has done enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "wheel-stamp") {
    return (
      <div className="playground-shell wheel-stamp-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage wheel-stamp-preview">
            <WheelStamp><span>Approve this</span></WheelStamp>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary label and no paper seals.</dd></div>
            <div><dt>2</dt><dd>Roll over the paper, or focus it and press ArrowUp.</dd></div>
            <div><dt>3</dt><dd>Each notch adds one real visible seal, up to five.</dd></div>
            <div><dt>4</dt><dd>Roll back or remove the stamps when the paperwork is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "elastic-frame") {
    return (
      <div className="playground-shell elastic-frame-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage elastic-frame-preview">
            <ElasticFrame><span>Fit me into the brief column</span></ElasticFrame>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a flexible frame around one label.</dd></div>
            <div><dt>2</dt><dd>Drag the right handle, or focus it and press the arrow keys.</dd></div>
            <div><dt>3</dt><dd>The frame width changes the label&apos;s actual wrapping and remains selected.</dd></div>
            <div><dt>4</dt><dd>Restore the frame when the layout has been made sufficiently awkward.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "neighbor-march") {
    return (
      <div className="playground-shell neighbor-march-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage neighbor-march-preview">
            <NeighborMarch>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </NeighborMarch>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start anywhere in the row.</dd></div>
            <div><dt>2</dt><dd>After that, choose only an untouched piece directly beside the current one.</dd></div>
            <div><dt>3</dt><dd>A long jump clears the route and sends the march back to its first step.</dd></div>
            <div><dt>4</dt><dd>Visit the full row to finish the corridor.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "signal-choice") {
    return (
      <div className="playground-shell signal-choice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage signal-choice-preview">
            <SignalChoice label="Ready for review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one ordinary sentence.</dd></div>
            <div><dt>2</dt><dd>Choose Morse, Braille or Ledger.</dd></div>
            <div><dt>3</dt><dd>Each choice replaces the actual text with a different notation.</dd></div>
            <div><dt>4</dt><dd>Restore the label when no notation deserves to win.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "footnote-shift") {
    return (
      <div className="playground-shell footnote-shift-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage footnote-shift-preview">
            <FootnoteShift label="Review the questionable brief" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with every word inline and an empty footnote rail.</dd></div>
            <div><dt>2</dt><dd>Click any word to move its actual content into a numbered note.</dd></div>
            <div><dt>3</dt><dd>The sentence keeps a visible gap and the note can move back.</dd></div>
            <div><dt>4</dt><dd>Restore the sentence when the scholarship has become excessive.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "ratchet-reveal") {
    return (
      <div className="playground-shell ratchet-reveal-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage ratchet-reveal-preview">
            <RatchetReveal>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </RatchetReveal>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four sealed teeth and no revealed fields.</dd></div>
            <div><dt>2</dt><dd>Click Advance one notch, or focus it and press Enter.</dd></div>
            <div><dt>3</dt><dd>Exactly one child opens and the ratchet cannot move backward.</dd></div>
            <div><dt>4</dt><dd>Reset when the paperwork has become sufficiently ceremonial.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "precision-ladder") {
    return (
      <div className="playground-shell precision-ladder-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage precision-ladder-preview">
            <PrecisionLadder><span>Center me</span></PrecisionLadder>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with four rings and no earned precision.</dd></div>
            <div><dt>2</dt><dd>Click nearer the center on each attempt; keyboard activation counts as a perfect hit.</dd></div>
            <div><dt>3</dt><dd>Each success tightens the target. A miss sends the ladder back to its outer ring.</dd></div>
            <div><dt>4</dt><dd>Reset when centering a label has become a professional obligation.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "mask-ballot") {
    return (
      <div className="playground-shell mask-ballot-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage mask-ballot-preview">
            <MaskBallot><span>Review me</span></MaskBallot>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with content that has no stencil.</dd></div>
            <div><dt>2</dt><dd>Choose Round, Ticket or Slit.</dd></div>
            <div><dt>3</dt><dd>The selected mask clips the actual content into a materially different opening.</dd></div>
            <div><dt>4</dt><dd>Remove the stencil to hold another unnecessary ballot.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "free-drift") {
    return (
      <div className="playground-shell free-drift-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage free-drift-preview">
            <FreeDrift><span>Unassigned</span></FreeDrift>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the content at the exact center of the grid.</dd></div>
            <div><dt>2</dt><dd>Drag it to any coordinate, or focus it and use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>The content keeps the precise place you gave it instead of improving the layout.</dd></div>
            <div><dt>4</dt><dd>Return it to center when free will has been sufficiently demonstrated.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "docket-sequence") {
    return (
      <div className="playground-shell docket-sequence-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage docket-sequence-preview">
            <DocketSequence><span>Approve</span></DocketSequence>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Click Open docket. The other steps remain unavailable.</dd></div>
            <div><dt>2</dt><dd>Type exactly one character into the newly permitted evidence field.</dd></div>
            <div><dt>3</dt><dd>Click File with evidence in that order; the content travels to Filed.</dd></div>
            <div><dt>4</dt><dd>Clear the docket to repeat the whole ceremony.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "vowel-hinge") {
    return (
      <div className="playground-shell vowel-hinge-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage vowel-hinge-preview">
            <VowelHinge label="Review the brief" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary sentence and intact words.</dd></div>
            <div><dt>2</dt><dd>Click Hinge next vowel to detach one first vowel.</dd></div>
            <div><dt>3</dt><dd>The vowel leaves a visible gap and becomes a raised hinge chip beside its word.</dd></div>
            <div><dt>4</dt><dd>Restore words when the sentence has been disassembled enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "verdict-selector") {
    return (
      <div className="playground-shell verdict-selector-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage verdict-selector-preview">
            <VerdictSelector label="Ready for another review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with one label and no editorial verdict.</dd></div>
            <div><dt>2</dt><dd>Choose Headline, Ledger or Whisper.</dd></div>
            <div><dt>3</dt><dd>The result changes its actual words, order or notation.</dd></div>
            <div><dt>4</dt><dd>Reopen the case to make a different decision.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "orbit-stow") {
    return (
      <div className="playground-shell orbit-stow-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage orbit-stow-preview">
            <OrbitStow><span>Review me</span></OrbitStow>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with the notice parked at dock one.</dd></div>
            <div><dt>2</dt><dd>Drag the cargo around the ring, or focus the ring and use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>The notice moves to an actual orbital dock and stays there.</dd></div>
            <div><dt>4</dt><dd>Return to dock one when the orbit has done enough filing.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "palindrome-latch") {
    return (
      <div className="playground-shell palindrome-latch-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage palindrome-latch-preview">
            <PalindromeLatch>
              <span>Open</span>
              <span>Review</span>
              <span>Decide</span>
              <span>Close</span>
            </PalindromeLatch>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>The required route is 1, 2, 3, 4, 3, 2, 1.</dd></div>
            <div><dt>2</dt><dd>Click the pieces in that order, using Enter or Space when focused.</dd></div>
            <div><dt>3</dt><dd>A wrong click clears the route and returns the tray to waiting.</dd></div>
            <div><dt>4</dt><dd>Complete the palindrome to seal the visible sequence.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "inside-out-words") {
    return (
      <div className="playground-shell inside-out-words-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage inside-out-words-preview">
            <InsideOutWords label="Ready for another review" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with every word in its original spelling.</dd></div>
            <div><dt>2</dt><dd>Click any word, or focus it and press Enter or Space.</dd></div>
            <div><dt>3</dt><dd>Only that word reverses its actual letters and stays reversed.</dd></div>
            <div><dt>4</dt><dd>Restore the sentence when the typography has become too honest.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "focus-receipt") {
    return (
      <div className="playground-shell focus-receipt-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage focus-receipt-preview">
            <FocusReceipt>
              <span className="focus-receipt-demo-label">Title</span>
              <span className="focus-receipt-demo-label">Status</span>
              <span className="focus-receipt-demo-label">Owner</span>
              <span className="focus-receipt-demo-label">Date</span>
            </FocusReceipt>
            <p className="decision-output" aria-live="polite">
              Focus each field. Every glance prints a copy beneath its original position.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four originals and an empty receipt.</dd></div>
            <div><dt>2</dt><dd>Tab through the fields, or focus one directly.</dd></div>
            <div><dt>3</dt><dd>Each focus leaves a real copy in the station matching its position.</dd></div>
            <div><dt>4</dt><dd>Clear the receipt when the inspection has become ceremonial.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "ruler-rise") {
    return (
      <div className="playground-shell ruler-rise-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage ruler-rise-preview">
            <RulerRise>
              <span className="ruler-rise-demo-label">Title</span>
              <span className="ruler-rise-demo-label">Status</span>
              <span className="ruler-rise-demo-label">Owner</span>
              <span className="ruler-rise-demo-label">Date</span>
            </RulerRise>
            <p className="decision-output">
              Drag the ruler across the rail. Each passed marker raises one field and keeps it raised.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four fields resting on one line.</dd></div>
            <div><dt>2</dt><dd>Drag the ruler past each marker, or focus it and press ArrowRight.</dd></div>
            <div><dt>3</dt><dd>Every passed field climbs onto a higher step and stays there.</dd></div>
            <div><dt>4</dt><dd>Use Lower all to return the fields to the floor.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "lasso-lock") {
    return (
      <div className="playground-shell lasso-lock-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage lasso-lock-preview">
            <LassoLock>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </LassoLock>
            <p className="decision-output" aria-live="polite">
              Draw one box around the pieces that deserve to stay together.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four pieces loose in the field.</dd></div>
            <div><dt>2</dt><dd>Drag a rectangle around the center of at least two pieces.</dd></div>
            <div><dt>3</dt><dd>Release: enclosed pieces leave the field and arrive in the locked tray.</dd></div>
            <div><dt>4</dt><dd>Tab to the field and press Space to lock the first two, or reset to draw again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "word-turnstile") {
    return (
      <div className="playground-shell word-turnstile-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage word-turnstile-preview">
            <WordTurnstile label="Ready for another review" />
            <p className="decision-output" aria-live="polite">
              Turn the words one at a time. The label stays transformed until it is reset.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with every word upright.</dd></div>
            <div><dt>2</dt><dd>Click or focus the visible control to turn the next word.</dd></div>
            <div><dt>3</dt><dd>Continue until every word is upside down.</dd></div>
            <div><dt>4</dt><dd>Reset the label when the ceremony has gone far enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "margin-quota") {
    return (
      <div className="playground-shell margin-quota-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage margin-quota-preview">
            <MarginQuota label="Review this once" />
            <p className="decision-output" aria-live="polite">
              Reserve a margin equal to the label&apos;s character count, then reclaim it when the text has paid its rent.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with a label occupying the whole available surface.</dd></div>
            <div><dt>2</dt><dd>Reserve the margin; one visible slot appears for every character.</dd></div>
            <div><dt>3</dt><dd>The label moves into the remaining space while the quota stays real.</dd></div>
            <div><dt>4</dt><dd>Reclaim the space when a label has finally paid enough rent.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "rotation-tithe") {
    return (
      <div className="playground-shell rotation-tithe-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage rotation-tithe-preview">
            <RotationTithe label="Approved for another review" />
            <p className="decision-output" aria-live="polite">
              Move the pointer left and right across the receipt. A full track width buys one 45° turn.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary label and an unspent distance bank.</dd></div>
            <div><dt>2</dt><dd>Move across the receipt, then reverse direction to keep spending width.</dd></div>
            <div><dt>3</dt><dd>Each full width rotates the label by 45 degrees and leaves the angle in place.</dd></div>
            <div><dt>4</dt><dd>Use the arrow keys as a keyboard-sized quarter-width, or return the receipt to reset.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "letter-levy") {
    return (
      <div className="playground-shell letter-levy-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage letter-levy-preview">
            <LetterLevy label="Review the brief today" />
            <p className="decision-output" aria-live="polite">
              Focus the label and press a visible letter. Every matching copy pays into the drawer.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary status label and an empty levy drawer.</dd></div>
            <div><dt>2</dt><dd>Focus the label surface and press a letter that appears in it.</dd></div>
            <div><dt>3</dt><dd>Every matching occurrence leaves the label and arrives as a real token.</dd></div>
            <div><dt>4</dt><dd>Restore the label when the keyboard has collected enough unnecessary tax.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "parity-purge") {
    return (
      <div className="playground-shell parity-purge-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage parity-purge-preview">
            <ParityPurge>
              <span className="parity-purge-demo-label">Title</span>
              <span className="parity-purge-demo-label">Status</span>
              <span className="parity-purge-demo-label">Owner</span>
              <span className="parity-purge-demo-label">Date</span>
            </ParityPurge>
            <p className="decision-output" aria-live="polite">
              Choose odd or even. The other positions move into a real discard tray.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields carrying positions one through four.</dd></div>
            <div><dt>2</dt><dd>Choose whether odd or even positions deserve to remain.</dd></div>
            <div><dt>3</dt><dd>The surviving fields stay visible while the others move into a separate purged tray.</dd></div>
            <div><dt>4</dt><dd>Restore all to erase the decree and return every field to the waiting lane.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "blank-filing") {
    return (
      <div className="playground-shell blank-filing-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage blank-filing-preview">
            <BlankFiling>
              <span className="blank-filing-demo-label">Title</span>
              <span className="blank-filing-demo-label">Status</span>
              <span className="blank-filing-demo-label">Owner</span>
              <span className="blank-filing-demo-label">Date</span>
            </BlankFiling>
            <p className="decision-output" aria-live="polite">
              Leave the evidence field empty and submit. Each blank filing moves one label into the void.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields and an empty evidence field.</dd></div>
            <div><dt>2</dt><dd>Submit the blank field with the button or the Enter key.</dd></div>
            <div><dt>3</dt><dd>The next child leaves the waiting room and appears in the void shelf.</dd></div>
            <div><dt>4</dt><dd>Type anything to refuse the filing, or reset after all four absences have been recorded.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "momentum-weave") {
    return (
      <div className="playground-shell momentum-weave-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage momentum-weave-preview">
            <MomentumWeave>
              <span className="momentum-weave-demo-label">Title</span>
              <span className="momentum-weave-demo-label">Status</span>
              <span className="momentum-weave-demo-label">Owner</span>
              <span className="momentum-weave-demo-label">Date</span>
            </MomentumWeave>
            <p className="decision-output" aria-live="polite">
              Drag slowly for two strands or flick quickly for three. The order really changes.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields in their supplied order.</dd></div>
            <div><dt>2</dt><dd>Drag the shuttle across the rail, or focus it and press an arrow key.</dd></div>
            <div><dt>3</dt><dd>Release gently to weave two strands; flick quickly to weave three.</dd></div>
            <div><dt>4</dt><dd>Restore the order when the shuttle has rearranged enough paperwork.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "space-staple") {
    return (
      <div className="playground-shell space-staple-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage space-staple-preview">
            <SpaceStaple label="Friday review notes" />
            <p className="decision-output" aria-live="polite">
              Drag the staple to one gap. That space will be removed from the actual label.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with three ordinary words and their visible gaps.</dd></div>
            <div><dt>2</dt><dd>Drag the staple across the rail, or focus it and use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>Release at a gap; that real space disappears and the words fuse.</dd></div>
            <div><dt>4</dt><dd>Unstaple the label when one missing space has been enough ceremony.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "arrow-bias") {
    return (
      <div className="playground-shell arrow-bias-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage arrow-bias-preview">
            <ArrowBias>
              <span className="arrow-bias-demo-label">Title</span>
              <span className="arrow-bias-demo-label">Status</span>
              <span className="arrow-bias-demo-label">Owner</span>
              <span className="arrow-bias-demo-label">Date</span>
            </ArrowBias>
            <p className="decision-output" aria-live="polite">
              Focus the surface and press three left or right arrows. Escape clears the vote.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields centered in one row.</dd></div>
            <div><dt>2</dt><dd>Focus the row and press ArrowLeft or ArrowRight.</dd></div>
            <div><dt>3</dt><dd>After three presses, the majority direction moves the whole row and locks it there.</dd></div>
            <div><dt>4</dt><dd>Press Escape to erase the vote and return the fields to center.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "idle-unspool") {
    return (
      <div className="playground-shell idle-unspool-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage idle-unspool-preview">
            <IdleUnspool>
              <span className="idle-unspool-demo-label">Title</span>
              <span className="idle-unspool-demo-label">Status</span>
              <span className="idle-unspool-demo-label">Owner</span>
              <span className="idle-unspool-demo-label">Date</span>
            </IdleUnspool>
            <p className="decision-output" aria-live="polite">
              Wait without touching anything. Each field will quietly move to the aside shelf.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields in one main row.</dd></div>
            <div><dt>2</dt><dd>Do nothing; after a short pause, the first field leaves by itself.</dd></div>
            <div><dt>3</dt><dd>Every 1.1 seconds, one more field moves onto the aside shelf.</dd></div>
            <div><dt>4</dt><dd>Refile everything to restore the row and begin waiting again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "disclosure-spill") {
    return (
      <div className="playground-shell disclosure-spill-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage disclosure-spill-preview">
            <DisclosureSpill>
              <span className="disclosure-spill-demo-label">Title</span>
              <span className="disclosure-spill-demo-label">Status</span>
              <span className="disclosure-spill-demo-label">Owner</span>
              <span className="disclosure-spill-demo-label">Date</span>
            </DisclosureSpill>
            <p className="decision-output" aria-live="polite">
              Close the filing. The last field leaves its paperwork behind.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four children safely filed inside a native disclosure.</dd></div>
            <div><dt>2</dt><dd>Close the filing with a click, Enter, or Space.</dd></div>
            <div><dt>3</dt><dd>The final child spills into a separate escape slot.</dd></div>
            <div><dt>4</dt><dd>Reopen the filing to put the child back where it started.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "cursor-proof") {
    return (
      <div className="playground-shell cursor-proof-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage cursor-proof-preview">
            <CursorProof label="Ready for review" />
            <p className="decision-output" aria-live="polite">
              Move across every character. The label becomes readable only after its paperwork is complete.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary status label hidden behind proof dots.</dd></div>
            <div><dt>2</dt><dd>Move the local cursor across the surface, or use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>Every character crossed becomes visible and stays visible.</dd></div>
            <div><dt>4</dt><dd>Reset the proof when the label has earned an unnecessary reading.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "seam-fold") {
    return (
      <div className="playground-shell seam-fold-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage seam-fold-preview">
            <SeamFold>
              <span className="seam-fold-demo-label">Title</span>
              <span className="seam-fold-demo-label">Status</span>
              <span className="seam-fold-demo-label">Owner</span>
              <span className="seam-fold-demo-label">Date</span>
            </SeamFold>
            <p className="decision-output" aria-live="polite">
              Drag the crease. The lower half returns in reverse, as paperwork apparently does.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields in one row.</dd></div>
            <div><dt>2</dt><dd>Move the native crease slider with a pointer or arrow keys.</dd></div>
            <div><dt>3</dt><dd>The fields split at that position and the lower half reverses.</dd></div>
            <div><dt>4</dt><dd>Flatten the paperwork to return the row to its original order.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "selection-seal") {
    return (
      <div className="playground-shell selection-seal-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage selection-seal-preview">
            <SelectionSeal />
            <p className="decision-output" aria-live="polite">
              Select the same excerpt three times. The sentence will make the result official.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Focus the read-only sentence and select any non-empty excerpt.</dd></div>
            <div><dt>2</dt><dd>Select the exact same range again; a visible impression bounces into place.</dd></div>
            <div><dt>3</dt><dd>Repeat once more and the selected words leave the textarea for a raised mark.</dd></div>
            <div><dt>4</dt><dd>Reset when three identical selections have become enough ceremony.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "checkpoint-queue") {
    return (
      <div className="playground-shell checkpoint-queue-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage checkpoint-queue-preview">
            <CheckpointQueue>
              <span className="checkpoint-queue-demo-label">Title</span>
              <span className="checkpoint-queue-demo-label">Status</span>
              <span className="checkpoint-queue-demo-label">Owner</span>
              <span className="checkpoint-queue-demo-label">Date</span>
            </CheckpointQueue>
            <p className="decision-output" aria-live="polite">
              Drag the seal through three marks. Each mark sends the first field to the back.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary fields waiting in a queue.</dd></div>
            <div><dt>2</dt><dd>Drag the seal past the first mark, or use the arrow keys on the track.</dd></div>
            <div><dt>3</dt><dd>Each reached checkpoint moves the first field to the end of the queue.</dd></div>
            <div><dt>4</dt><dd>Restore the queue when the three-checkpoint filing is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "alphabet-treadmill") {
    return (
      <div className="playground-shell alphabet-treadmill-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage alphabet-treadmill-preview">
            <AlphabetTreadmill label="Ready for review" />
            <p className="decision-output" aria-live="polite">
              Advance the label one letter at a time. The spelling really changes.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with an ordinary status label.</dd></div>
            <div><dt>2</dt><dd>Advance one letter; every alphabetic character moves forward together.</dd></div>
            <div><dt>3</dt><dd>Repeat until twelve turns have changed the actual text.</dd></div>
            <div><dt>4</dt><dd>Restore the original when the label has walked far enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "weekday-ledger") {
    return (
      <div className="playground-shell weekday-ledger-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage weekday-ledger-preview">
            <WeekdayLedger>
              <span className="weekday-ledger-demo-label">Title</span>
              <span className="weekday-ledger-demo-label">Status</span>
              <span className="weekday-ledger-demo-label">Owner</span>
              <span className="weekday-ledger-demo-label">Date</span>
            </WeekdayLedger>
            <p className="decision-output" aria-live="polite">
              Choose any date, file the labels, and watch them receive consecutive weekdays.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Choose an ordinary starting date.</dd></div>
            <div><dt>2</dt><dd>File the week; the date&apos;s weekday becomes the first column.</dd></div>
            <div><dt>3</dt><dd>Each child moves into the next weekday in sequence.</dd></div>
            <div><dt>4</dt><dd>Clear the ledger to return the labels to their waiting row.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "layout-referendum") {
    return (
      <div className="playground-shell layout-referendum-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage layout-referendum-preview">
            <LayoutReferendum>
              <span className="layout-referendum-demo-label">Title</span>
              <span className="layout-referendum-demo-label">Status</span>
              <span className="layout-referendum-demo-label">Owner</span>
              <span className="layout-referendum-demo-label">Date</span>
            </LayoutReferendum>
            <p className="decision-output" aria-live="polite">
              Double-click a proposal. The chosen arrangement becomes binding until you reopen the ballot.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four fields in their ordinary row.</dd></div>
            <div><dt>2</dt><dd>Double-click one of the three genuinely different proposals.</dd></div>
            <div><dt>3</dt><dd>The fields become a stack, a backwards row, or a split committee.</dd></div>
            <div><dt>4</dt><dd>Reopen the ballot to restore the original arrangement.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "child-gravity") {
    return (
      <div className="playground-shell child-gravity-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage child-gravity-preview">
            <ChildGravity>
              <span className="child-gravity-demo-label">Title</span>
              <span className="child-gravity-demo-label">Status</span>
              <span className="child-gravity-demo-label">Owner</span>
              <span className="child-gravity-demo-label">Date</span>
            </ChildGravity>
            <p className="decision-output" aria-live="polite">
              Click one field. Its siblings retreat by the same calculated gap.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Click the child you want to make the temporary anchor.</dd></div>
            <div><dt>2</dt><dd>The gap is calculated from the number of children.</dd></div>
            <div><dt>3</dt><dd>Every sibling moves away according to its ordinal distance.</dd></div>
            <div><dt>4</dt><dd>Release gravity to return every child to its starting position.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "copy-echo") {
    return (
      <div className="playground-shell copy-echo-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage copy-echo-preview">
            <CopyEcho label="Ready for review" />
            <p className="decision-output" aria-live="polite">
              Select the label, copy it three times, and watch the component keep the evidence.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Focus the read-only label and select its text.</dd></div>
            <div><dt>2</dt><dd>Press Ctrl+C or Cmd+C; the browser still copies the value normally.</dd></div>
            <div><dt>3</dt><dd>Each copy adds a permanent visible echo underneath the source.</dd></div>
            <div><dt>4</dt><dd>After three copies, the source receives an official shadow for no useful reason.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "scroll-redact") {
    return (
      <div className="playground-shell scroll-redact-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage scroll-redact-preview">
            <ScrollRedact>Release candidate 2.7</ScrollRedact>
            <p className="decision-output" aria-live="polite">
              Scroll over the label to cover it one band at a time. Scroll back to make it visible again.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Place the pointer over the ordinary label.</dd></div>
            <div><dt>2</dt><dd>Scroll down; one opaque band covers one fifth of the content.</dd></div>
            <div><dt>3</dt><dd>Continue for five bands until the label is fully classified.</dd></div>
            <div><dt>4</dt><dd>Scroll up or remove the bands when the ceremony is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "scale-sweep") {
    return (
      <div className="playground-shell scale-sweep-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage scale-sweep-preview">
            <ScaleSweep>
              <span className="scale-sweep-demo-label">Title</span>
              <span className="scale-sweep-demo-label">Status</span>
              <span className="scale-sweep-demo-label">Owner</span>
              <span className="scale-sweep-demo-label">Date</span>
            </ScaleSweep>
            <p className="decision-output" aria-live="polite">
              Drag the handle across every field. Each one stays larger after the sweep passes.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Grab the handle or focus the track with the keyboard.</dd></div>
            <div><dt>2</dt><dd>Drag across a field; the handle records every field it crosses.</dd></div>
            <div><dt>3</dt><dd>Visited fields remain visibly enlarged instead of returning to normal.</dd></div>
            <div><dt>4</dt><dd>Sweep the whole row, then shrink everything when the ceremony is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "word-relay") {
    return (
      <div className="playground-shell word-relay-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage word-relay-preview">
            <WordRelay label="Title Status Owner Date" />
            <p className="decision-output" aria-live="polite">
              Pass one final letter onward at a time. The words change, but the sentence still has the same number of letters.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary labels waiting in separate cells.</dd></div>
            <div><dt>2</dt><dd>Pass the last letter of every word to the next word.</dd></div>
            <div><dt>3</dt><dd>Each round preserves the letters while changing every label.</dd></div>
            <div><dt>4</dt><dd>Return the letters when this handoff has become administratively important.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "index-sum") {
    return (
      <div className="playground-shell index-sum-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage index-sum-preview">
            <IndexSum>
              <span className="index-sum-demo-label">Title</span>
              <span className="index-sum-demo-label">Status</span>
              <span className="index-sum-demo-label">Owner</span>
              <span className="index-sum-demo-label">Date</span>
            </IndexSum>
            <p className="decision-output" aria-live="polite">
              Choose positions that add to the target. For four items, Title + Date and Status + Owner are both valid.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Each item is worth its position: 1, 2, 3, or 4.</dd></div>
            <div><dt>2</dt><dd>Select any combination and watch the sum persist.</dd></div>
            <div><dt>3</dt><dd>Overshoot the target, then remove a position to recover.</dd></div>
            <div><dt>4</dt><dd>Hit the exact total and the selected combination freezes.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "drag-threshold") {
    return (
      <div className="playground-shell drag-threshold-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage drag-threshold-preview">
            <DragThreshold key={dragThresholdReset}>
              <span className="drag-threshold-demo-label">Drag this farther</span>
            </DragThreshold>
            <p className="decision-output" aria-live="polite">
              Release past three marks in order. A short release sends the whole ceremony back to zero.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
            <button type="button" onClick={() => setDragThresholdReset((current) => current + 1)}>
              Reset
            </button>
          </div>
          <dl>
            <div><dt>1</dt><dd>Drag the content and release beyond the first marker.</dd></div>
            <div><dt>2</dt><dd>Each success keeps its marker lit and moves the next one farther away.</dd></div>
            <div><dt>3</dt><dd>Release too early and every cleared marker goes dark again.</dd></div>
            <div><dt>4</dt><dd>Clear all three to give one label an unnecessarily official shadow.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "side-split") {
    return (
      <div className="playground-shell side-split-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage side-split-preview">
            <SideSplit key={sideSplitReset}>
              <span className="side-split-demo-label">Keep visible</span>
              <span className="side-split-demo-label">Review later</span>
              <span className="side-split-demo-label">Ask the owner</span>
              <span className="side-split-demo-label">Archive quietly</span>
            </SideSplit>
            <p className="decision-output" aria-live="polite">
              Send each field left or right. The two lists stay split after the final choice.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
            <button type="button" onClick={() => setSideSplitReset((current) => current + 1)}>
              Reset
            </button>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with one field waiting for a destination.</dd></div>
            <div><dt>2</dt><dd>Place the next field on the left or right.</dd></div>
            <div><dt>3</dt><dd>Each choice removes the field from the queue and keeps it in its side.</dd></div>
            <div><dt>4</dt><dd>Finish the split, then wonder why the parent could not do this.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "duration-scale") {
    return (
      <div className="playground-shell duration-scale-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage duration-scale-preview">
            <DurationScale>
              <span className="duration-scale-demo-label">Hold this carefully</span>
            </DurationScale>
            <p className="decision-output" aria-live="polite">
              Hold and release three times. The content keeps the average scale of your releases.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Press and hold the content.</dd></div>
            <div><dt>2</dt><dd>Release to save one measured duration.</dd></div>
            <div><dt>3</dt><dd>Repeat three times; every release changes the average scale.</dd></div>
            <div><dt>4</dt><dd>Measure again when the content has become appropriately sized.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "mixed-click") {
    return (
      <div className="playground-shell mixed-click-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage mixed-click-preview">
            <MixedClick key={mixedClickReset}>
              <span className="mixed-click-demo-label">Approve this card</span>
            </MixedClick>
            <p className="decision-output" aria-live="polite">
              Left-click, right-click, then left-click. Use the wrong button and the ritual starts over.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
            <button type="button" onClick={() => setMixedClickReset((current) => current + 1)}>
              Reset
            </button>
          </div>
          <dl>
            <div><dt>1</dt><dd>Left-click the content once to arm it.</dd></div>
            <div><dt>2</dt><dd>Right-click the same content to verify it.</dd></div>
            <div><dt>3</dt><dd>Left-click again to release it.</dd></div>
            <div><dt>4</dt><dd>Any wrong button resets the three-step sequence.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "weight-vote") {
    return (
      <div className="playground-shell weight-vote-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage weight-vote-preview">
            <WeightVote>
              <span className="weight-vote-demo-label">Title</span>
              <span className="weight-vote-demo-label">Status</span>
              <span className="weight-vote-demo-label">Owner</span>
            </WeightVote>
            <p className="decision-output" aria-live="polite">
              Click the same choice three times. It becomes the only one allowed to look important.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with three ordinary choices at equal size.</dd></div>
            <div><dt>2</dt><dd>Click any choice to add one visible unit of weight.</dd></div>
            <div><dt>3</dt><dd>Partial choices grow as their meters fill.</dd></div>
            <div><dt>4</dt><dd>The first choice clicked three times wins and locks the others.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "case-gate") {
    return (
      <div className="playground-shell case-gate-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage case-gate-preview">
            <CaseGate>
              <span className="case-gate-demo-label">Release notes</span>
            </CaseGate>
            <p className="decision-output" aria-live="polite">
              Type alternating uppercase and lowercase letters. One mistake erases the attempt.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Click the input and start with any letter.</dd></div>
            <div><dt>2</dt><dd>Switch case on every next letter, such as aBcDeF.</dd></div>
            <div><dt>3</dt><dd>A wrong case resets all accepted keys.</dd></div>
            <div><dt>4</dt><dd>Six correct keys uncover the content.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "hover-route") {
    return (
      <div className="playground-shell hover-route-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage hover-route-preview">
            <HoverRoute>
              <span className="hover-route-demo-label">Release this carefully</span>
            </HoverRoute>
            <p className="decision-output" aria-live="polite">
              Hover steps 1 through 4 in order. Skipping ahead sends the content back to the start.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with the content waiting above the route.</dd></div>
            <div><dt>2</dt><dd>Hover each numbered zone in sequence.</dd></div>
            <div><dt>3</dt><dd>Skip ahead and the progress returns to zero.</dd></div>
            <div><dt>4</dt><dd>Complete the route and the content settles in the middle.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "nest-children") {
    return (
      <div className="playground-shell nest-children-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage nest-children-preview">
            <NestChildren>
              <span className="nest-children-demo-label">Title</span>
              <span className="nest-children-demo-label">Status</span>
              <span className="nest-children-demo-label">Owner</span>
              <span className="nest-children-demo-label">Date</span>
            </NestChildren>
            <p className="decision-output" aria-live="polite">
              Click each child. Every choice becomes a new layer around the stack.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four ordinary pieces of content.</dd></div>
            <div><dt>2</dt><dd>Click any available child to place it around the current stack.</dd></div>
            <div><dt>3</dt><dd>The order of your clicks becomes the nesting order.</dd></div>
            <div><dt>4</dt><dd>Unnest everything when the hierarchy is sufficiently ceremonial.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "click-order") {
    return (
      <div className="playground-shell click-order-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage click-order-preview">
            <ClickOrder>
              <span className="click-order-demo-label">First read</span>
              <span className="click-order-demo-label">Then approve</span>
              <span className="click-order-demo-label">Finally regret it</span>
            </ClickOrder>
            <p className="decision-output">
              Click the fragments in the order you want them to appear. The result stays assembled.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with every fragment available.</dd></div>
            <div><dt>2</dt><dd>Click each one in a deliberate reading order.</dd></div>
            <div><dt>3</dt><dd>Watch each choice leave the tray and join the result.</dd></div>
            <div><dt>4</dt><dd>Choose again only after the entire order is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "corner-fold") {
    return (
      <div className="playground-shell corner-fold-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage corner-fold-preview">
            <CornerFold>
              <span className="corner-fold-demo-label">Visit every corner first</span>
            </CornerFold>
            <p className="decision-output" aria-live="polite">
              Enter all four corners. Each visit stays counted until the card folds.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with the card open and four unvisited corners.</dd></div>
            <div><dt>2</dt><dd>Move into each corner in any order.</dd></div>
            <div><dt>3</dt><dd>Watch the content fold only after the fourth visit.</dd></div>
            <div><dt>4</dt><dd>Use the reset inside the folded card to begin again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "pairwise-merge") {
    return (
      <div className="playground-shell pairwise-merge-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage pairwise-merge-preview">
            <PairwiseMerge>
              <span className="pairwise-merge-demo-label">Title</span>
              <span className="pairwise-merge-demo-label">Status</span>
              <span className="pairwise-merge-demo-label">Owner</span>
              <span className="pairwise-merge-demo-label">Date</span>
            </PairwiseMerge>
            <p className="decision-output" aria-live="polite">
              Double-click two groups at a time. They become one group and stay merged.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Double-click one group to mark it.</dd></div>
            <div><dt>2</dt><dd>Double-click a second group to join the pair.</dd></div>
            <div><dt>3</dt><dd>Repeat until four groups have become one.</dd></div>
            <div><dt>4</dt><dd>Separate again only after the reduction is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "average-position") {
    return (
      <div className="playground-shell average-position-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage average-position-preview">
            <AveragePosition>
              <span className="average-position-demo-label">Place this carefully</span>
            </AveragePosition>
            <p className="decision-output" aria-live="polite">
              Click three locations. The label will settle at their average, which is apparently a destination.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Mark three different points on the track.</dd></div>
            <div><dt>2</dt><dd>Watch every mark remain visible.</dd></div>
            <div><dt>3</dt><dd>The label moves to the arithmetic average.</dd></div>
            <div><dt>4</dt><dd>Reset it when the average has served its purpose.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "last-remaining") {
    return (
      <div className="playground-shell last-remaining-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage last-remaining-preview">
            <LastRemaining
              items={["Keep the title", "Keep the status", "Keep the owner", "Keep the date"]}
            />
            <p className="decision-output" aria-live="polite">
              Eliminate the fields one by one. The last survivor becomes the winner.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with four available fields.</dd></div>
            <div><dt>2</dt><dd>Click a field to remove it from consideration.</dd></div>
            <div><dt>3</dt><dd>Removed fields stay visible as evidence.</dd></div>
            <div><dt>4</dt><dd>The last field is promoted and the list can restart.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "backspace-archive") {
    return (
      <div className="playground-shell backspace-archive-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage backspace-archive-preview">
            <BackspaceArchive label="Keep this sentence" />
            <p className="decision-output" aria-live="polite">
              Edit the sentence, then use Backspace. Every removed character stays on record.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Focus the pre-filled sentence.</dd></div>
            <div><dt>2</dt><dd>Press Backspace one character at a time.</dd></div>
            <div><dt>3</dt><dd>Watch each deletion become a permanent chip.</dd></div>
            <div><dt>4</dt><dd>Restore the sentence when the archive has done enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "focus-unpack") {
    return (
      <div className="playground-shell focus-unpack-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage focus-unpack-preview">
            <FocusUnpack>
              <span className="focus-unpack-demo-label">Title</span>
              <span className="focus-unpack-demo-label">Status</span>
              <span className="focus-unpack-demo-label">Owner</span>
            </FocusUnpack>
            <p className="decision-output" aria-live="polite">
              Focus the bundle to separate its children. Press Space to pack them back together.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Click or tab to focus the compact bundle.</dd></div>
            <div><dt>2</dt><dd>Watch each child move into its own card.</dd></div>
            <div><dt>3</dt><dd>Press Space or Enter to pack the cards together again.</dd></div>
            <div><dt>4</dt><dd>Focus it again whenever the collection needs another inspection.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "length-order") {
    return (
      <div className="playground-shell length-order-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage length-order-preview">
            <LengthOrder items={["Keep", "Maybe later", "Definitely not", "No"]} />
            <p className="decision-output" aria-live="polite">
              Click the order control. The list will rank its own labels by character count.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Start with the labels in their supplied order.</dd></div>
            <div><dt>2</dt><dd>Click to put the shortest label first.</dd></div>
            <div><dt>3</dt><dd>Click again for longest first, then return to the beginning.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "hold-position") {
    return (
      <div className="playground-shell hold-position-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage hold-position-preview">
            <HoldPosition key={holdPositionReset}>
              <span className="hold-position-demo-label">Keep this nearby</span>
            </HoldPosition>
            <p className="decision-output" aria-live="polite">
              Hold, move across the track, then release. The position stays put.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
            <button type="button" onClick={() => setHoldPositionReset((current) => current + 1)}>
              Reset
            </button>
          </div>
          <dl>
            <div><dt>1</dt><dd>Press and hold the content.</dd></div>
            <div><dt>2</dt><dd>Move left, middle, or right while holding.</dd></div>
            <div><dt>3</dt><dd>Release it and the chosen position remains.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "timed-release") {
    return (
      <div className="playground-shell timed-release-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage timed-release-preview">
            <TimedRelease>
              <span className="timed-release-demo-label">Release this carefully</span>
            </TimedRelease>
            <p className="decision-output" aria-live="polite">
              Release before the meter fills for the left slot, or keep holding for the right.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Press and hold the content.</dd></div>
            <div><dt>2</dt><dd>Release before or after the meter fills.</dd></div>
            <div><dt>3</dt><dd>Press again to clear the chosen slot.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "hover-confirm") {
    return (
      <div className="playground-shell hover-confirm-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage hover-confirm-preview">
            <HoverConfirm>
              <span className="hover-confirm-demo-label">Approve this card</span>
            </HoverConfirm>
            <p className="decision-output" aria-live="polite">
              Enter the card three separate times. It confirms only after the third pass.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Move the pointer out of the card.</dd></div>
            <div><dt>2</dt><dd>Re-enter it to record one pass.</dd></div>
            <div><dt>3</dt><dd>Repeat three times, then click to reset.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "drag-duplicate") {
    return (
      <div className="playground-shell drag-duplicate-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage drag-duplicate-preview">
            <DragDuplicate>
              <span className="drag-duplicate-demo-label">One copy is enough</span>
            </DragDuplicate>
            <p className="decision-output">
              Drag it anywhere. It makes a copy, then merges back when released.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Drag the content away from its starting point.</dd></div>
            <div><dt>2</dt><dd>Watch a second copy travel alongside it.</dd></div>
            <div><dt>3</dt><dd>Release it and both copies merge again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "press-escape") {
    return (
      <div className="playground-shell press-escape-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage press-escape-preview">
            <PressEscape>
              <span className="press-escape-demo-label">Hold this</span>
            </PressEscape>
            <p className="decision-output">
              Press and hold. The content leaves, then returns unchanged.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Press and hold the content.</dd></div>
            <div><dt>2</dt><dd>Watch the label escape from its own button.</dd></div>
            <div><dt>3</dt><dd>Release it and nothing has changed.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "keystroke-stack") {
    return (
      <div className="playground-shell keystroke-stack-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage keystroke-stack-preview">
            <KeystrokeStack label="Leave this alone" />
            <p className="decision-output">
              Focus it, then press one character key per letter. One extra key flattens it.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Focus the label and type any character.</dd></div>
            <div><dt>2</dt><dd>Repeat until every character is in its own row.</dd></div>
            <div><dt>3</dt><dd>Press once more to restore the line.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "reorder-back") {
    return (
      <div className="playground-shell reorder-back-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage reorder-back-preview">
            <ReorderBack
              first={<span className="reorder-back-demo-label">First</span>}
              second={<span className="reorder-back-demo-label">Second</span>}
            />
            <p className="decision-output">
              Click once to swap the slots. Click again to undo the swap.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Click the two-item arrangement.</dd></div>
            <div><dt>2</dt><dd>Watch both pieces trade places.</dd></div>
            <div><dt>3</dt><dd>Click again to undo your work.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "focus-fade") {
    return (
      <div className="playground-shell focus-fade-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage focus-fade-preview">
            <FocusFade>
              <span className="focus-fade-demo-label">Focus me</span>
            </FocusFade>
            <p className="decision-output">
              Focus it once. The content disappears, then returns unchanged.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Focus the content by clicking or tabbing.</dd></div>
            <div><dt>2</dt><dd>Wait for the unnecessary disappearance.</dd></div>
            <div><dt>3</dt><dd>It returns exactly as it was.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "split-label") {
    return (
      <div className="playground-shell split-label-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage split-label-preview">
            <SplitLabel label="Keep this together" />
            <p className="decision-output">
              Double-click, then click both halves. It reunites for no reason.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Double-click the label.</dd></div>
            <div><dt>2</dt><dd>Select each newly separated half.</dd></div>
            <div><dt>3</dt><dd>Watch the unchanged label reunite.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "clause-audit") {
    return (
      <div className="playground-shell clause-audit-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage clause-audit-preview">
            <ClauseAudit label="Prepare the remarkably ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with every word unexamined.</dd></div>
            <div><dt>2</dt><dd>Audit the next word to mark it and advance the real ledger.</dd></div>
            <div><dt>3</dt><dd>Clear the audit when the sentence has been over-inspected.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "terminus-choice") {
    return (
      <div className="playground-shell terminus-choice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage terminus-choice-preview">
            <TerminusChoice label="Prepare the remarkably ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with the complete phrase.</dd></div>
            <div><dt>2</dt><dd>Choose first, middle or last letters; the actual reading changes.</dd></div>
            <div><dt>3</dt><dd>Restore the whole phrase when the extraction has gone far enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "drop-silo") {
    return (
      <div className="playground-shell drop-silo-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage drop-silo-preview">
            <DropSilo><span>Needs a decision</span></DropSilo>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Pick up the loose cargo.</dd></div>
            <div><dt>2</dt><dd>Drag it to Inbox, Vault or Quarantine, or focus a lane and press Enter.</dd></div>
            <div><dt>3</dt><dd>Release the cargo to give it a new but meaningless destiny.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "alphabetical-queue") {
    return (
      <div className="playground-shell alphabetical-queue-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage alphabetical-queue-preview">
            <AlphabeticalQueue items={["Status", "Owner", "Title", "Date"]} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with four labels in a deliberately unhelpful order.</dd></div>
            <div><dt>2</dt><dd>Select the next label alphabetically; an early choice is rejected.</dd></div>
            <div><dt>3</dt><dd>Watch the manifest build itself one letter at a time.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "percent-parcel") {
    return (
      <div className="playground-shell percent-parcel-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage percent-parcel-preview">
            <PercentParcel label="Prepare the ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a readable phrase.</dd></div>
            <div><dt>2</dt><dd>Parcel it into real URL percent escapes.</dd></div>
            <div><dt>3</dt><dd>Unpack the transport spelling to restore the message.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "binary-march") {
    return (
      <div className="playground-shell binary-march-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage binary-march-preview">
            <BinaryMarch value={42} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one ordinary decimal number.</dd></div>
            <div><dt>2</dt><dd>Divide by two; the quotient continues and the remainder becomes a real bit.</dd></div>
            <div><dt>3</dt><dd>Repeat until the binary receipt is complete, then restart the march if needed.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "metric-mandate") {
    return (
      <div className="playground-shell metric-mandate-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage metric-mandate-preview">
            <MetricMandate label="Prepare the ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with the same readable label and no official size.</dd></div>
            <div><dt>2</dt><dd>Choose Ink, Air or Edges; each standard calculates a different total.</dd></div>
            <div><dt>3</dt><dd>Withdraw the standard when the sentence has been measured enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "crank-shift") {
    return (
      <div className="playground-shell crank-shift-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage crank-shift-preview">
            <CrankShift>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Date</span>
            </CrankShift>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with four fields in their ordinary cargo order.</dd></div>
            <div><dt>2</dt><dd>Drag the circular crank, or focus it and use the arrow keys.</dd></div>
            <div><dt>3</dt><dd>Every dial position rotates the actual list order.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "gesture-patent") {
    return (
      <div className="playground-shell gesture-patent-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage gesture-patent-preview">
            <GesturePatent><span>Approved for another meeting</span></GesturePatent>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Click Stamp once.</dd></div>
            <div><dt>2</dt><dd>Double-click Turn, then right-click Seal.</dd></div>
            <div><dt>3</dt><dd>A wrong gesture restarts the patent; keyboard activation works on each station too.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "run-length-pack") {
    return (
      <div className="playground-shell run-length-pack-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage run-length-pack-preview">
            <RunLengthPack label="Sooo much ceremony" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a label containing adjacent repetitions.</dd></div>
            <div><dt>2</dt><dd>Pack the runs; each repeated glyph becomes a counted token.</dd></div>
            <div><dt>3</dt><dd>Unpack the sequence to restore the exact readable text.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "column-tally") {
    return (
      <div className="playground-shell column-tally-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage column-tally-preview">
            <ColumnTally>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Due date</span>
            </ColumnTally>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with four fields in one narrow column.</dd></div>
            <div><dt>2</dt><dd>Award a column to reflow the actual children.</dd></div>
            <div><dt>3</dt><dd>Return to one column when the layout ceremony has gone far enough.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "rounding-ruling") {
    return (
      <div className="playground-shell rounding-ruling-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage rounding-ruling-preview">
            <RoundingRuling value={27.6} />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Submit one decimal value without a policy.</dd></div>
            <div><dt>2</dt><dd>Choose Floor, Ceiling or Nearest five; each yields a different result.</dd></div>
            <div><dt>3</dt><dd>Reopen the case to withdraw the ruling.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "tension-arc") {
    return (
      <div className="playground-shell tension-arc-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage tension-arc-preview">
            <TensionArc>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
            </TensionArc>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a row that refuses to express an opinion.</dd></div>
            <div><dt>2</dt><dd>Drag the tension control; the actual children sag along a calculated curve.</dd></div>
            <div><dt>3</dt><dd>Release tension to make the row straight again.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "gray-route") {
    return (
      <div className="playground-shell gray-route-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage gray-route-preview">
            <GrayRoute>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Due date</span>
            </GrayRoute>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Four stations wait in their ordinary visual order.</dd></div>
            <div><dt>2</dt><dd>Visit them in Gray-code order: station 1, 2, 4, then 3.</dd></div>
            <div><dt>3</dt><dd>A wrong station stays open; reset the route whenever the bits become too ceremonial.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "atbash-notice") {
    return (
      <div className="playground-shell atbash-notice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage atbash-notice-preview">
            <AtbashNotice label="Prepare the ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a readable notice.</dd></div>
            <div><dt>2</dt><dd>Mirror every letter through the alphabet; spaces and punctuation survive.</dd></div>
            <div><dt>3</dt><dd>Restore the original notice when the cipher has made its point.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "apportion-veil") {
    return (
      <div className="playground-shell apportion-veil-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage apportion-veil-preview">
            <ApportionVeil><span className="apportion-veil-demo-label">Ready for another review</span></ApportionVeil>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Begin with the notice exposed and unallocated.</dd></div>
            <div><dt>2</dt><dd>Assign a veil; the actual chamber shape and perimeter change.</dd></div>
            <div><dt>3</dt><dd>Give the notice four layers, then unveil it when the ceremony is complete.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "fate-panel") {
    return (
      <div className="playground-shell fate-panel-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage fate-panel-preview">
            <FatePanel><span className="fate-panel-demo-label">Needs a decision</span></FatePanel>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with one child and three structurally different futures.</dd></div>
            <div><dt>2</dt><dd>Choose Notice, Parcel or Monument; the actual element structure changes.</dd></div>
            <div><dt>3</dt><dd>Return to uncertainty when the chosen destiny feels excessive.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "drift-pin") {
    return (
      <div className="playground-shell drift-pin-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage drift-pin-preview">
            <DriftPin><span className="drift-pin-demo-label">Move me slightly to the right</span></DriftPin>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Grab the cargo rail or focus it for keyboard control.</dd></div>
            <div><dt>2</dt><dd>Drag across seven snap slots; the child parks at the exact chosen slot.</dd></div>
            <div><dt>3</dt><dd>Center the pin when the arbitrary parking place has been documented.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "alternating-intake") {
    return (
      <div className="playground-shell alternating-intake-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage alternating-intake-preview">
            <AlternatingIntake>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Due date</span>
            </AlternatingIntake>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>The first entry must come through the left gate.</dd></div>
            <div><dt>2</dt><dd>Alternate left and right; the admitted entries build a real manifest.</dd></div>
            <div><dt>3</dt><dd>Use the wrong gate once to see the order rule reject it.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "vowel-shift") {
    return (
      <div className="playground-shell vowel-shift-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage vowel-shift-preview">
            <VowelShift label="Prepare the ordinary handoff" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a readable label and ordinary vowels.</dd></div>
            <div><dt>2</dt><dd>Shift every vowel to its next place; the displayed copy changes.</dd></div>
            <div><dt>3</dt><dd>Restore the label when the invented dialect has done enough damage.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "glyph-migration") {
    return (
      <div className="playground-shell glyph-migration-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <GlyphMigration label="Please file this ordinary note" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with every glyph in a readable sentence.</dd></div>
            <div><dt>2</dt><dd>Transfer one actual character into the archive on every press.</dd></div>
            <div><dt>3</dt><dd>Return the glyphs when the archive has become the whole point.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "writing-tribunal") {
    return (
      <div className="playground-shell writing-tribunal-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <WritingTribunal><span>Needs a decision</span></WritingTribunal>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Choose Row, Column or Mirror.</dd></div>
            <div><dt>2</dt><dd>The same child actually changes its writing direction and layout.</dd></div>
            <div><dt>3</dt><dd>Reopen the hearing when a normal reading direction seems sufficient.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "trace-receipt") {
    return (
      <div className="playground-shell trace-receipt-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <TraceReceipt><span>Evidence</span></TraceReceipt>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Draw directly around the evidence with a pointer.</dd></div>
            <div><dt>2</dt><dd>The surface keeps the real pointer path as an ink receipt.</dd></div>
            <div><dt>3</dt><dd>Use arrow keys for a tiny accessible trace, then erase it.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "chord-contract") {
    return (
      <div className="playground-shell chord-contract-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <ChordContract><span>Approved for one more meeting</span></ChordContract>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Focus the panel and press Control, Alt, Shift, then Enter.</dd></div>
            <div><dt>2</dt><dd>Each correct key marks a real station; a wrong key voids the draft.</dd></div>
            <div><dt>3</dt><dd>Release the contract and watch the document receive its needless signature.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "roman-ledger") {
    return (
      <div className="playground-shell roman-ledger-playground">
        <div className="preview-panel">
          <div className="preview-toolbar"><span>Preview</span><span className="preview-status"><i /> Interactive</span></div>
          <div className="preview-stage">
            <RomanLedger label="Keep the handoff readable" />
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header"><span>Mechanism</span></div>
          <dl>
            <div><dt>1</dt><dd>Start with a sentence whose words still carry meaning.</dd></div>
            <div><dt>2</dt><dd>Issue a ledger that replaces every word with its letter-count numeral.</dd></div>
            <div><dt>3</dt><dd>Restore the phrase when Roman administration stops helping.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (kind === "equal-choice") {
    return (
      <div className="playground-shell equal-choice-playground">
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Preview</span>
            <span className="preview-status"><i /> Interactive</span>
          </div>
          <div className="preview-stage equal-choice-preview">
            <EqualChoice>
              <span className="equal-choice-demo-label">Stay here</span>
            </EqualChoice>
            <p className="decision-output">
              Double-click, pick either side, and watch it return.
            </p>
          </div>
        </div>
        <div className="controls-panel equal-choice-notes">
          <div className="controls-header">
            <span>Mechanism</span>
          </div>
          <dl>
            <div><dt>1</dt><dd>Double-click the content.</dd></div>
            <div><dt>2</dt><dd>Choose either identical destination.</dd></div>
            <div><dt>3</dt><dd>It returns to where it started.</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  return (
    <div className="playground-shell">
      <div className="preview-panel">
        <div className="preview-toolbar">
          <span>Preview</span>
          <span className="preview-status"><i /> Interactive</span>
        </div>
        <div className="preview-stage">
          <IndecisiveButton
            choices={choices}
            disabled={disabled}
            interval={interval}
            onDecision={(choice) => setLastDecision(choice)}
            variant={variant}
          >
            Make a decision
          </IndecisiveButton>
          <p className="decision-output" aria-live="polite">
            {lastDecision ? (
              <>Last decision: <strong>{lastDecision}</strong></>
            ) : (
              "Hover, focus, then click. No pressure."
            )}
          </p>
        </div>
      </div>

      <form className="controls-panel" onSubmit={(event) => event.preventDefault()}>
        <div className="controls-header">
          <span>Controls</span>
          <button
            type="button"
            onClick={() => {
              setChoiceInput("Ship it, Wait a minute, Ship it anyway");
              setDisabled(false);
              setIntervalValue(900);
              setLastDecision(null);
              setVariant("default");
            }}
          >
            Reset
          </button>
        </div>

        <label className="control-group">
          <span>Choices <small>comma separated</small></span>
          <textarea
            rows={3}
            value={choiceInput}
            onChange={(event) => setChoiceInput(event.target.value)}
          />
        </label>

        <label className="control-group">
          <span>Variant</span>
          <select
            value={variant}
            onChange={(event) => setVariant(event.target.value as Variant)}
          >
            {variants.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="control-group range-control">
          <span>Interval <output>{interval} ms</output></span>
          <input
            type="range"
            min="150"
            max="1800"
            step="50"
            value={interval}
            onChange={(event) => setIntervalValue(Number(event.target.value))}
          />
        </label>

        <label className="switch-control">
          <span>
            Disabled
            <small>Prevent interaction and decisions</small>
          </span>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
          />
        </label>
      </form>
    </div>
  );
}
