import * as React from "react";

type ArithmeticChoice = "double" | "halve" | "invert";

const CHOICES: readonly { id: ArithmeticChoice; label: string; hint: string }[] = [
  { id: "double", label: "Double it", hint: "twice the submitted amount" },
  { id: "halve", label: "Halve it", hint: "half the submitted amount" },
  { id: "invert", label: "Invert it", hint: "the submitted amount with a negative sign" },
];

export interface ArithmeticCouncilProps {
  value: number;
}

interface ArithmeticCouncilState {
  choice: ArithmeticChoice | null;
  value: number;
}

function createState(value: number): ArithmeticCouncilState {
  return { choice: null, value };
}

function resultFor(value: number, choice: ArithmeticChoice) {
  if (choice === "double") {
    return value * 2;
  }

  if (choice === "halve") {
    return value / 2;
  }

  return -value;
}

function displayNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export function ArithmeticCouncil({ value }: ArithmeticCouncilProps) {
  const groupId = React.useId();
  const [state, setState] = React.useState<ArithmeticCouncilState>(() => createState(value));
  const current = state.value === value ? state : createState(value);
  const selected = CHOICES.find((choice) => choice.id === current.choice);
  const result = selected && current.choice ? resultFor(value, current.choice) : null;

  return (
    <section
      aria-label="Choose an unnecessarily official arithmetic decision"
      className="gra-ui arithmetic-council"
      data-choice={current.choice ?? "undecided"}
    >
      <header className="arithmetic-council__header">
        <span>Arithmetic council</span>
        <output aria-live="polite">
          {result === null ? "Undecided" : `Result ${displayNumber(result)}`}
        </output>
      </header>

      <div className="arithmetic-council__ledger" aria-live="polite">
        <div>
          <span>Submitted amount</span>
          <strong>{displayNumber(value)}</strong>
        </div>
        <span aria-hidden="true" className="arithmetic-council__arrow">→</span>
        <div className="arithmetic-council__result" data-decided={result !== null}>
          <span>{selected ? selected.label : "Awaiting a ruling"}</span>
          <strong>{result === null ? "—" : displayNumber(result)}</strong>
        </div>
      </div>

      <fieldset className="arithmetic-council__choices">
        <legend>Issue a ruling</legend>
        {CHOICES.map((choice) => (
          <label className="arithmetic-council__choice" key={choice.id}>
            <input
              checked={current.choice === choice.id}
              name={`arithmetic-council-${groupId}`}
              onChange={() => setState({ value, choice: choice.id })}
              type="radio"
            />
            <span>
              <strong>{choice.label}</strong>
              <small>{choice.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <footer className="arithmetic-council__footer">
        <p aria-live="polite">
          {selected
            ? `The council has ruled to make ${displayNumber(value)} become ${displayNumber(result ?? value)}.`
            : "Three incompatible calculations await a binding decision."}
        </p>
        <button
          className="arithmetic-council__reset"
          disabled={current.choice === null}
          onClick={() => setState(createState(value))}
          type="button"
        >
          Reopen the case
        </button>
      </footer>
    </section>
  );
}
