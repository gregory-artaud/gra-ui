import * as React from "react";

export interface AlphabetizeWordsProps {
  label: string;
}

interface AlphabetizeWordsState {
  label: string;
  milled: boolean;
}

function createState(label: string): AlphabetizeWordsState {
  return { label, milled: false };
}

function compareCharacters(left: string, right: string) {
  const difference = left.toLowerCase().charCodeAt(0) - right.toLowerCase().charCodeAt(0);
  return difference === 0 ? left.charCodeAt(0) - right.charCodeAt(0) : difference;
}

function millLabel(label: string) {
  return label
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) ? part : Array.from(part).sort(compareCharacters).join("")))
    .join("");
}

export function AlphabetizeWords({ label }: AlphabetizeWordsProps) {
  const [state, setState] = React.useState<AlphabetizeWordsState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const renderedLabel = current.milled ? millLabel(label) : label;

  return (
    <section
      aria-label="Alphabetize every word in a label"
      className="gra-ui alphabetize-words"
      data-state={current.milled ? "milled" : "ready"}
    >
      <header className="alphabetize-words__header">
        <span>Alphabetize words</span>
        <output aria-live="polite">{current.milled ? "Milled" : "Original order"}</output>
      </header>

      <div className="alphabetize-words__paper" aria-live="polite">
        <span className="alphabetize-words__stamp">{current.milled ? "A → Z" : "As submitted"}</span>
        <p>{renderedLabel || "An empty label has no letters to rearrange."}</p>
      </div>

      <footer className="alphabetize-words__footer">
        <p aria-live="polite">
          {current.milled
            ? "Every word has been made alphabetically orderly, at the cost of reading it."
            : "Mill the label to sort each word's actual characters in place."}
        </p>
        <div className="alphabetize-words__actions">
          <button
            disabled={current.milled || label.length === 0}
            onClick={() => setState({ label, milled: true })}
            type="button"
          >
            Mill the words
          </button>
          <button
            className="alphabetize-words__reset"
            disabled={!current.milled}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore reading
          </button>
        </div>
      </footer>
    </section>
  );
}
