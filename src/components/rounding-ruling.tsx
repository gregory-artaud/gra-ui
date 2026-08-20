import * as React from "react";

type RulingId = "floor" | "ceiling" | "fives";

const RULINGS: readonly {
  id: RulingId;
  label: string;
  hint: string;
  calculate: (value: number) => number;
}[] = [
  { id: "floor", label: "Floor", hint: "always down", calculate: Math.floor },
  { id: "ceiling", label: "Ceiling", hint: "always up", calculate: Math.ceil },
  { id: "fives", label: "Nearest five", hint: "land on 5s", calculate: (value) => Math.round(value / 5) * 5 },
];

export interface RoundingRulingProps {
  value: number;
}

interface RoundingRulingState {
  ruling: RulingId | null;
  signature: number;
}

function createState(value: number): RoundingRulingState {
  return { ruling: null, signature: value };
}

function displayNumber(value: number) {
  return Number.isFinite(value) ? String(value) : "not a number";
}

export function RoundingRuling({ value }: RoundingRulingProps) {
  const [state, setState] = React.useState<RoundingRulingState>(() => createState(value));
  const current = Object.is(state.signature, value) ? state : createState(value);
  const selected = RULINGS.find((ruling) => ruling.id === current.ruling);
  const result = selected ? selected.calculate(value) : null;

  return (
    <section
      aria-label="Choose an unnecessarily binding rounding ruling"
      className="gra-ui rounding-ruling"
      data-ruling={current.ruling ?? "undecided"}
    >
      <header className="rounding-ruling__header">
        <span>Rounding ruling</span>
        <output aria-live="polite">{result === null ? "Undecided" : `Result ${displayNumber(result)}`}</output>
      </header>

      <div className="rounding-ruling__ledger" aria-live="polite">
        <div>
          <span>Submitted value</span>
          <strong>{displayNumber(value)}</strong>
        </div>
        <span aria-hidden="true" className="rounding-ruling__arrow">→</span>
        <div className="rounding-ruling__result" data-decided={result !== null}>
          <span>{selected?.label ?? "Awaiting a policy"}</span>
          <strong>{result === null ? "—" : displayNumber(result)}</strong>
        </div>
      </div>

      <div aria-label="Rounding policies" className="rounding-ruling__choices" role="group">
        {RULINGS.map((ruling) => (
          <button
            aria-pressed={current.ruling === ruling.id}
            className="rounding-ruling__choice"
            data-selected={current.ruling === ruling.id}
            key={ruling.id}
            onClick={() => setState({ ruling: ruling.id, signature: value })}
            type="button"
          >
            <strong>{ruling.label}</strong>
            <small>{ruling.hint}</small>
          </button>
        ))}
      </div>

      <footer className="rounding-ruling__footer">
        <p aria-live="polite">
          {selected
            ? `${displayNumber(value)} has been legally interpreted as ${displayNumber(result ?? value)}.`
            : "Three incompatible policies are waiting to overrule the decimal part."}
        </p>
        <button
          className="rounding-ruling__reset"
          disabled={current.ruling === null}
          onClick={() => setState(createState(value))}
          type="button"
        >
          Reopen the case
        </button>
      </footer>
    </section>
  );
}
