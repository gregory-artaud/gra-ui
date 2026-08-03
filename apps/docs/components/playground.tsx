"use client";

import { IndecisiveButton } from "gra-ui";
import { useState } from "react";

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
] as const;

type Variant = (typeof variants)[number];

export function Playground() {
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
