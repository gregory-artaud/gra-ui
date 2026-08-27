import * as React from "react";

function normalizeSeed(value: number) {
  if (!Number.isFinite(value)) return 2;
  return Math.max(2, Math.min(99999, Math.floor(Math.abs(value))));
}

function smallestFactor(value: number) {
  for (let candidate = 2; candidate * candidate <= value; candidate += 1) {
    if (value % candidate === 0) return candidate;
  }
  return value;
}

export interface PrimeLedgerProps {
  value: number;
}

export function PrimeLedger({ value }: PrimeLedgerProps) {
  const seed = normalizeSeed(value);
  const [ledgerState, setLedger] = React.useState({ seed, remaining: seed, factors: [] as number[] });
  const ledger = ledgerState.seed === seed
    ? ledgerState
    : { seed, remaining: seed, factors: [] as number[] };

  const complete = ledger.remaining === 1;

  const extractFactor = () => {
    if (complete) return;
    const factor = smallestFactor(ledger.remaining);
    setLedger((currentState) => {
      const current = currentState.seed === seed
        ? currentState
        : { seed, remaining: seed, factors: [] as number[] };
      return {
        seed,
        remaining: current.remaining / factor,
        factors: [...current.factors, factor],
      };
    });
  };

  return (
    <section
      aria-label="Extract the prime factors of a number"
      className="gra-ui prime-ledger"
      data-state={complete ? "complete" : "open"}
    >
      <header className="prime-ledger__header">
        <span>Prime ledger</span>
        <output aria-live="polite">{complete ? "Filed" : `${ledger.factors.length} entries`}</output>
      </header>

      <div className="prime-ledger__number" aria-live="polite">
        <span>Number still under review</span>
        <strong>{ledger.remaining}</strong>
      </div>

      <div className="prime-ledger__factors" aria-label="Extracted factors">
        <span className="prime-ledger__caption">Extracted factors</span>
        <div className="prime-ledger__factor-list">
          {ledger.factors.length > 0
            ? ledger.factors.map((factor, index) => (
                <mark key={`${factor}-${index}`}>{factor}</mark>
              ))
            : <small>Nothing has been factored yet.</small>}
        </div>
      </div>

      <footer className="prime-ledger__footer">
        <p aria-live="polite">
          {complete
            ? "The number is one. The ledger is complete and no one is better informed."
            : "Extract the smallest available factor, one ruling at a time."}
        </p>
        <div className="prime-ledger__actions">
          <button disabled={complete} onClick={extractFactor} type="button">Extract factor</button>
          <button className="prime-ledger__reset" disabled={ledger.factors.length === 0} onClick={() => setLedger({ seed, remaining: seed, factors: [] })} type="button">
            Reopen ledger
          </button>
        </div>
      </footer>
    </section>
  );
}
