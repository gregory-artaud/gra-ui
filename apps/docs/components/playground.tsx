"use client";

import {
  AveragePosition,
  BackspaceArchive,
  ClickOrder,
  CornerFold,
  DragDuplicate,
  EqualChoice,
  FocusFade,
  FocusUnpack,
  HoldPosition,
  HoverRoute,
  HoverConfirm,
  IndecisiveButton,
  KeystrokeStack,
  LastRemaining,
  LengthOrder,
  PairwiseMerge,
  PressEscape,
  ReorderBack,
  SplitLabel,
  TimedRelease,
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
    | "indecisive"
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
    | "hover-route";
}

export function Playground({ kind = "indecisive" }: PlaygroundProps) {
  const [choiceInput, setChoiceInput] = useState(
    "Ship it, Wait a minute, Ship it anyway",
  );
  const [disabled, setDisabled] = useState(false);
  const [interval, setIntervalValue] = useState(900);
  const [lastDecision, setLastDecision] = useState<string | null>(null);
  const [holdPositionReset, setHoldPositionReset] = useState(0);
  const [variant, setVariant] = useState<Variant>("default");
  const choices = choiceInput
    .split(",")
    .map((choice) => choice.trim())
    .filter(Boolean);

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
