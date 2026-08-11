import * as React from "react";

export interface PunctuationSieveProps {
  label: string;
}

interface PunctuationSieveState {
  removed: number[];
  signature: string;
}

function createState(label: string): PunctuationSieveState {
  return { removed: [], signature: label };
}

export function PunctuationSieve({ label }: PunctuationSieveProps) {
  const characters = Array.from(label);
  const punctuation = characters
    .map((character, index) => ({ character, index }))
    .filter(({ character }) => /\p{P}/u.test(character));
  const [state, setState] = React.useState<PunctuationSieveState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const isComplete = punctuation.length > 0 && current.removed.length === punctuation.length;
  const next = punctuation[current.removed.length];
  const removedSet = new Set(current.removed);

  return (
    <section
      aria-label="Sieve punctuation from a label one mark at a time"
      className="gra-ui punctuation-sieve"
      data-count={current.removed.length}
      data-state={isComplete ? "sifted" : current.removed.length > 0 ? "sifting" : "ready"}
    >
      <header className="punctuation-sieve__header">
        <span>Punctuation sieve</span>
        <output aria-live="polite">{current.removed.length} / {punctuation.length} marks sifted</output>
      </header>

      <div className="punctuation-sieve__paper">
        <p aria-label="Sieved label" className="punctuation-sieve__label">
          {characters.map((character, index) => (
            <span className={removedSet.has(index) ? "punctuation-sieve__character is-removed" : "punctuation-sieve__character"} key={`${character}-${index}`}>
              {removedSet.has(index) ? "·" : character === " " ? "\u00a0" : character}
            </span>
          ))}
        </p>
        <div className="punctuation-sieve__tray" aria-live="polite" aria-label="Removed punctuation">
          {current.removed.length > 0
            ? current.removed.map((index) => <span key={index}>{characters[index]}</span>)
            : <span className="punctuation-sieve__tray-empty">No marks collected</span>}
        </div>
      </div>

      <footer className="punctuation-sieve__footer">
        <p>
          {punctuation.length === 0
            ? "This label arrived suspiciously punctuation-free."
            : isComplete
              ? "Every mark is in the tray. The sentence did not improve."
              : `The next mark is ${next?.character ?? "unknown"}.`}
        </p>
        <div className="punctuation-sieve__actions">
          <button
            disabled={isComplete || punctuation.length === 0}
            onClick={() => {
              if (next) {
                setState({ removed: [...current.removed, next.index], signature: label });
              }
            }}
            type="button"
          >
            Sieve next mark
          </button>
          <button
            className="punctuation-sieve__reset"
            disabled={current.removed.length === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Put marks back
          </button>
        </div>
      </footer>
    </section>
  );
}
