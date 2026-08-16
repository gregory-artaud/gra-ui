import { useState } from "react";

const ballots = [
  { id: "dot", label: "Dot trail", hint: "one quiet divider" },
  { id: "slash", label: "Slash file", hint: "one official divider" },
  { id: "column", label: "Column fall", hint: "one word per line" },
] as const;

type BallotId = (typeof ballots)[number]["id"];

export interface SeparatorBallotProps {
  label: string;
}

export function SeparatorBallot({ label }: SeparatorBallotProps) {
  const [ballot, setBallot] = useState<BallotId | null>(null);
  const words = label.trim().split(/\s+/).filter(Boolean);
  const renderedLabel = ballot === "dot" ? words.join(" · ") : words.join(" / ");

  return (
    <section className="gra-ui separator-ballot" data-ballot={ballot ?? "waiting"} aria-label="Separator ballot">
      <header className="separator-ballot__header">
        <span>Separator ballot</span>
        <output aria-live="polite">{ballot ? ballots.find((option) => option.id === ballot)?.label : "Awaiting a ruling"}</output>
      </header>

      <div className="separator-ballot__paper">
        {ballot === "column" ? (
          <ol aria-label="Column-separated label">
            {words.map((word, index) => <li key={`${word}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b>{word}</li>)}
          </ol>
        ) : (
          <p>{ballot ? renderedLabel : label}</p>
        )}
      </div>

      <nav className="separator-ballot__choices" aria-label="Separator choices">
        {ballots.map((option) => (
          <button key={option.id} type="button" aria-pressed={ballot === option.id} onClick={() => setBallot(option.id)}>
            <strong>{option.label}</strong>
            <small>{option.hint}</small>
          </button>
        ))}
      </nav>

      <footer className="separator-ballot__footer">
        <span>{ballot ? "The ruling changed the label, not its importance." : "A readable label waits for a separator policy."}</span>
        <button type="button" onClick={() => setBallot(null)} disabled={ballot === null}>Return to spacing</button>
      </footer>
    </section>
  );
}
