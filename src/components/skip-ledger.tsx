import * as React from "react";

interface LedgerState {
  count: number;
  manifest: number[];
  nextPosition: number;
  remaining: number[];
  wrong: boolean;
}

function createLedger(count: number): LedgerState {
  return {
    count,
    manifest: [],
    nextPosition: 0,
    remaining: Array.from({ length: count }, (_, index) => index),
    wrong: false,
  };
}

export interface SkipLedgerProps {
  children: React.ReactNode;
}

export function SkipLedger({ children }: SkipLedgerProps) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const [ledgerState, setLedgerState] = React.useState(() => createLedger(count));
  const current = ledgerState.count === count ? ledgerState : createLedger(count);
  const expectedIndex = current.remaining[current.nextPosition] ?? -1;
  const complete = current.remaining.length === 0;

  const choose = (index: number) => {
    setLedgerState((previous) => {
      const ledger = previous.count === count ? previous : createLedger(count);
      if (index !== (ledger.remaining[ledger.nextPosition] ?? -1)) {
        return { ...ledger, wrong: true };
      }

      const removedPosition = ledger.remaining.indexOf(index);
      const remaining = ledger.remaining.filter((item) => item !== index);
      return {
        count,
        manifest: [...ledger.manifest, index],
        nextPosition: remaining.length === 0 ? 0 : (removedPosition + 1) % remaining.length,
        remaining,
        wrong: false,
      };
    });
  };

  return (
    <section
      aria-label="File children by skipping one available item"
      className="gra-ui skip-ledger"
      data-complete={complete}
      data-wrong={current.wrong}
    >
      <header className="skip-ledger__header">
        <span>Skip ledger</span>
        <output aria-live="polite">{complete ? "Filed" : `${current.manifest.length} / ${count} filed`}</output>
      </header>

      <div className="skip-ledger__cargo" aria-live="polite">
        <span className="skip-ledger__caption">Next permitted cargo</span>
        <strong>{complete ? "The route is empty." : `Choose item ${expectedIndex + 1}`}</strong>
        <small>{complete ? "Every item survived a needless route." : "After each filing, skip the next available item."}</small>
      </div>

      <div aria-label="Available cargo" className="skip-ledger__remaining">
        {current.remaining.length > 0 ? current.remaining.map((index) => (
          <button
            aria-current={index === expectedIndex ? "step" : undefined}
            className="skip-ledger__item"
            disabled={complete}
            key={index}
            onClick={() => choose(index)}
            type="button"
          >
            <span>{index + 1}</span>
            {items[index]}
          </button>
        )) : <small className="skip-ledger__empty">No cargo remains.</small>}
      </div>

      <div className="skip-ledger__manifest" aria-live="polite">
        <span className="skip-ledger__caption">Filed manifest</span>
        <div>
          {current.manifest.length > 0
            ? current.manifest.map((index, order) => <mark key={`${index}-${order}`}>{items[index]}</mark>)
            : <small>Nothing filed yet.</small>}
        </div>
      </div>

      <footer className="skip-ledger__footer">
        <p>{current.wrong ? "That item was not next. The ledger is still waiting." : "The route skips one item after every accepted filing."}</p>
        <button
          className="skip-ledger__reset"
          disabled={current.manifest.length === 0 && !current.wrong}
          onClick={() => setLedgerState(createLedger(count))}
          type="button"
        >
          Empty ledger
        </button>
      </footer>
    </section>
  );
}
