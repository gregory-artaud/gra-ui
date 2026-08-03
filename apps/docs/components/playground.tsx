"use client";

import {
  DragDuplicate,
  EqualChoice,
  FocusFade,
  HoverConfirm,
  IndecisiveButton,
  KeystrokeStack,
  PressEscape,
  ReorderBack,
  SplitLabel,
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
    | "press-escape"
    | "keystroke-stack"
    | "reorder-back"
    | "drag-duplicate"
    | "hover-confirm";
}

export function Playground({ kind = "indecisive" }: PlaygroundProps) {
  const [choiceInput, setChoiceInput] = useState(
    "Ship it, Wait a minute, Ship it anyway",
  );
  const [disabled, setDisabled] = useState(false);
  const [interval, setIntervalValue] = useState(900);
  const [lastDecision, setLastDecision] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const choices = choiceInput
    .split(",")
    .map((choice) => choice.trim())
    .filter(Boolean);

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
