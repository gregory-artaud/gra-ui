import * as React from "react";

export interface LetterLevyProps {
  label: string;
}

interface LetterLevyState {
  signature: string;
  filed: string[];
}

function createState(label: string): LetterLevyState {
  return { signature: label, filed: [] };
}

function isLetter(key: string) {
  return key.length === 1 && key.toLocaleLowerCase() !== key.toLocaleUpperCase();
}

function hasFiledLetter(filed: readonly string[], key: string) {
  const normalizedKey = key.toLocaleLowerCase();
  return filed.some((letter) => letter.toLocaleLowerCase() === normalizedKey);
}

export function LetterLevy({ label }: LetterLevyProps) {
  const [state, setState] = React.useState<LetterLevyState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const filedLetters = current.filed;
  const remaining = Array.from(label).filter(
    (letter) => !hasFiledLetter(filedLetters, letter),
  );
  const isComplete = label.length > 0 && remaining.length === 0;

  function fileLetter(key: string) {
    if (!isLetter(key)) {
      return;
    }

    setState((previous) => {
      const base = previous.signature === label ? previous : createState(label);

      if (hasFiledLetter(base.filed, key)) {
        return base;
      }

      const filed = Array.from(label).filter(
        (letter) => letter.toLocaleLowerCase() === key.toLocaleLowerCase(),
      );

      if (filed.length === 0) {
        return base;
      }

      return {
        signature: label,
        filed: [...base.filed, ...filed],
      };
    });
  }

  return (
    <section
      aria-label="File every matching letter from a label"
      className="gra-ui letter-levy"
      data-state={isComplete ? "cleared" : filedLetters.length > 0 ? "filing" : "ready"}
    >
      <header className="letter-levy__header">
        <span>Letter levy</span>
        <output aria-live="polite">
          {filedLetters.length === 0
            ? "No letters filed"
            : `${filedLetters.length} ${filedLetters.length === 1 ? "letter" : "letters"} filed`}
        </output>
      </header>

      <div className="letter-levy__stage">
        <div
          aria-keyshortcuts="A-Z"
          aria-label={label ? "Press a letter that appears in the label" : "The label is empty"}
          className="letter-levy__label-surface"
          onKeyDown={(event) => {
            if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
              return;
            }

            fileLetter(event.key);
          }}
          role="group"
          tabIndex={label ? 0 : -1}
        >
          <p aria-label={remaining.join("")} className="letter-levy__label" aria-live="polite">
            {remaining.length > 0 ? (
              remaining.map((letter, index) => (
                <span data-space={letter === " "} key={`${current.signature}-${index}-${letter}`}>
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))
            ) : (
              <span className="letter-levy__cleared">No letters left to defend.</span>
            )}
          </p>
          <span aria-hidden="true" className="letter-levy__hint">
            {label ? "Focus here, then press a visible letter" : "Nothing to levy"}
          </span>
        </div>

        <div aria-label="Filed letters" className="letter-levy__drawer" role="list">
          <span className="letter-levy__drawer-label">Levy drawer</span>
          {filedLetters.length > 0 ? (
            filedLetters.map((letter, index) => (
              <span
                className="letter-levy__token"
                key={`${current.signature}-filed-${index}`}
                role="listitem"
              >
                {letter}
              </span>
            ))
          ) : (
            <span className="letter-levy__empty">Empty</span>
          )}
        </div>
      </div>

      <div className="letter-levy__footer">
        <p aria-live="polite">
          {label.length === 0
            ? "Give the levy a label."
            : isComplete
              ? "Every letter paid its unnecessary fee."
              : filedLetters.length === 0
                ? "Press any letter found above; every matching copy will leave at once."
                : "The matching letters left the label and settled in the drawer."}
        </p>
        <button
          className="letter-levy__reset"
          disabled={filedLetters.length === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Restore label
        </button>
      </div>
    </section>
  );
}
