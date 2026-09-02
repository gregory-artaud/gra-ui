import * as React from "react";

const CRITERIA = [
  { id: "prime", label: "Prime alibi", detail: "claims no smaller accomplice" },
  { id: "even", label: "Even alibi", detail: "arrives in pairs" },
  { id: "triangular", label: "Triangle alibi", detail: "fits a counted staircase" },
] as const;

type Criterion = (typeof CRITERIA)[number]["id"];

function isPrime(value: number) {
  if (!Number.isInteger(value) || value < 2) return false;
  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) return false;
  }
  return true;
}

function isTriangular(value: number) {
  if (!Number.isInteger(value) || value < 0) return false;
  const root = Math.sqrt(8 * value + 1);
  return Number.isInteger(root);
}

function testCriterion(value: number, criterion: Criterion) {
  if (criterion === "prime") return isPrime(value);
  if (criterion === "even") return Number.isInteger(value) && value % 2 === 0;
  return isTriangular(value);
}

export interface NumberAlibiProps {
  value: number;
}

export function NumberAlibi({ value }: NumberAlibiProps) {
  const [criterion, setCriterion] = React.useState<Criterion | null>(null);
  const selected = CRITERIA.find((candidate) => candidate.id === criterion);
  const verdict = selected ? testCriterion(value, selected.id) : null;

  return (
    <section
      aria-label="Choose a mathematical alibi for a number"
      className="gra-ui number-alibi"
      data-verdict={verdict === null ? "undecided" : verdict ? "cleared" : "suspect"}
    >
      <header className="number-alibi__header">
        <span>Number alibi</span>
        <output aria-live="polite">{selected ? selected.label : "No testimony"}</output>
      </header>

      <div className="number-alibi__case" aria-live="polite">
        <span className="number-alibi__caption">The number on trial</span>
        <strong>{value}</strong>
        <span className="number-alibi__verdict" data-cleared={verdict === true}>
          {verdict === null ? "Awaiting a criterion" : verdict ? "Condition satisfied" : "Condition rejected"}
        </span>
        <small>{selected ? selected.detail : "Choose one theory; each produces a different ruling."}</small>
      </div>

      <div aria-label="Number criteria" className="number-alibi__choices">
        {CRITERIA.map((candidate) => (
          <button
            aria-pressed={criterion === candidate.id}
            className="number-alibi__choice"
            data-selected={criterion === candidate.id}
            key={candidate.id}
            onClick={() => setCriterion(candidate.id)}
            type="button"
          >
            <strong>{candidate.label}</strong>
            <small>{candidate.id === "prime" ? "2, 3, 5, 7…" : candidate.id === "even" ? "2, 4, 6, 8…" : "1, 3, 6, 10…"}</small>
          </button>
        ))}
      </div>

      <footer className="number-alibi__footer">
        <p>{verdict === null ? "A number should not need a legal strategy." : verdict ? "The chosen theory has granted temporary clearance." : "The chosen theory found the number suspicious."}</p>
        <button className="number-alibi__reset" disabled={criterion === null} onClick={() => setCriterion(null)} type="button">
          Dismiss the case
        </button>
      </footer>
    </section>
  );
}
