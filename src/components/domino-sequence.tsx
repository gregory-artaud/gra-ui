import * as React from "react";

type DominoSequenceState = {
  chain: number[];
  rejected: boolean;
  signature: string;
};

export interface DominoSequenceProps {
  items: readonly string[];
}

function signatureFor(items: readonly string[]) {
  return items.join("\u0000");
}

function initialState(signature: string): DominoSequenceState {
  return { chain: [], rejected: false, signature };
}

function firstLetter(item: string) {
  return Array.from(item.trim())[0]?.toLocaleLowerCase() ?? "";
}

function lastLetter(item: string) {
  const letters = Array.from(item.trim());
  return letters.at(-1)?.toLocaleLowerCase() ?? "";
}

export function DominoSequence({ items }: DominoSequenceProps) {
  const signature = signatureFor(items);
  const [state, setState] = React.useState<DominoSequenceState>(() => initialState(signature));
  const current = state.signature === signature ? state : initialState(signature);
  const complete = items.length > 0 && current.chain.length === items.length;
  const previous = current.chain.at(-1);
  const expected = previous === undefined ? null : lastLetter(items[previous]);

  const choose = (index: number) => {
    if (complete || current.chain.includes(index)) {
      return;
    }

    const valid = expected === null || firstLetter(items[index]) === expected;
    if (!valid) {
      setState({ signature, chain: [], rejected: true });
      return;
    }

    setState({ signature, chain: [...current.chain, index], rejected: false });
  };

  return (
    <section
      aria-label="Build a word domino chain in an unnecessarily exact order"
      className="gra-ui domino-sequence"
      data-state={complete ? "complete" : current.rejected ? "rejected" : "ready"}
    >
      <header className="domino-sequence__header">
        <span>Domino sequence</span>
        <output aria-live="polite">{complete ? "Chained" : `${current.chain.length} / ${items.length}`}</output>
      </header>

      <div className="domino-sequence__prompt" aria-live="polite">
        <span>Next tile must begin with</span>
        <strong>{expected ?? "any letter"}</strong>
      </div>

      <div className="domino-sequence__tiles" role="group" aria-label="Available domino tiles">
        {items.map((item, index) => {
          const used = current.chain.includes(index);
          return (
            <button
              aria-pressed={used}
              className="domino-sequence__tile"
              data-used={used}
              disabled={used || complete}
              key={`${signature}-${index}`}
              onClick={() => choose(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <small>{lastLetter(item)} · {firstLetter(item)}</small>
            </button>
          );
        })}
      </div>

      <ol className="domino-sequence__chain" aria-label="Accepted chain" aria-live="polite">
        {current.chain.length > 0 ? current.chain.map((index) => <li key={`${signature}-chain-${index}`}>{items[index]}</li>) : <li className="domino-sequence__empty">Nothing has fallen yet.</li>}
      </ol>

      <footer className="domino-sequence__footer">
        <p aria-live="polite">
          {complete
            ? "Every tile followed the last letter of its predecessor. The sentence is now needlessly chained."
            : current.rejected
              ? "That tile did not match. The whole chain fell down."
              : "Start anywhere, then obey the last-letter-to-first-letter rule."}
        </p>
        <button disabled={current.chain.length === 0 && !current.rejected} onClick={() => setState(initialState(signature))} type="button">Reset chain</button>
      </footer>
    </section>
  );
}
