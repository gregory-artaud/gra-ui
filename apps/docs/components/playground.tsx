"use client";

import {
  AlphabetTreadmill,
  AveragePosition,
  BackspaceArchive,
  CaseGate,
  ChildGravity,
  ClickOrder,
  CornerFold,
  CopyEcho,
  DragDuplicate,
  DragThreshold,
  DurationScale,
  EqualChoice,
  FocusFade,
  FocusUnpack,
  HoldPosition,
  HoverRoute,
  HoverConfirm,
  IndexSum,
  IndecisiveButton,
  KeystrokeStack,
  LayoutReferendum,
  LastRemaining,
  LengthOrder,
  MixedClick,
  NestChildren,
  PairwiseMerge,
  PressEscape,
  ReorderBack,
  ScaleSweep,
  SeamFold,
  SelectionSeal,
  ScrollRedact,
  SideSplit,
  SplitLabel,
  TimedRelease,
  WeightVote,
  WeekdayLedger,
  WordRelay,
  CheckpointQueue,
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
    | "weekday-ledger";
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
