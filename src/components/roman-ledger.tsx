import * as React from "react";

export interface RomanLedgerProps {
  label: string;
}

interface RomanLedgerState {
  label: string;
  issued: boolean;
}

const ROMAN_VALUES: readonly [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function createState(label: string): RomanLedgerState {
  return { label, issued: false };
}

function romanLength(length: number) {
  let remaining = length;
  let result = "";

  for (const [value, numeral] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result || "—";
}

export function RomanLedger({ label }: RomanLedgerProps) {
  const [state, setState] = React.useState<RomanLedgerState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const words = label.trim().split(/\s+/).filter(Boolean);

  return (
    <section aria-label="Issue a Roman ledger for a label" className="gra-ui roman-ledger" data-state={current.issued ? "issued" : "readable"}>
      <header className="roman-ledger__header">
        <span>Roman ledger</span>
        <output aria-live="polite">{current.issued ? `${words.length} entries` : "Readable phrase"}</output>
      </header>

      <div className="roman-ledger__paper" aria-live="polite">
        {current.issued ? (
          <ol className="roman-ledger__entries">
            {words.map((word, index) => (
              <li key={`${label}-${index}`}>
                <small>{word}</small>
                <strong>{romanLength(Array.from(word).length)}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <strong className="roman-ledger__original">{label || "No words submitted."}</strong>
        )}
      </div>

      <footer className="roman-ledger__footer">
        <p aria-live="polite">
          {current.issued
            ? "Only the number of letters survived, wearing a Roman costume that nobody requested."
            : "Issue a ledger that replaces every word with the Roman numeral for its length."}
        </p>
        <div className="roman-ledger__actions">
          <button disabled={current.issued || words.length === 0} onClick={() => setState({ label, issued: true })} type="button">
            Issue Roman ledger
          </button>
          <button className="roman-ledger__reset" disabled={!current.issued} onClick={() => setState(createState(label))} type="button">
            Restore phrase
          </button>
        </div>
      </footer>
    </section>
  );
}
