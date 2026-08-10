import * as React from "react";

export interface LetterCensusProps {
  label: string;
}

interface LetterCensusState {
  counted: boolean;
  signature: string;
}

function createState(label: string): LetterCensusState {
  return { counted: false, signature: label };
}

function censusForLabel(label: string) {
  const counts = new Map<string, number>();
  for (const character of Array.from(label.toLowerCase())) {
    if (!/\p{L}/u.test(character)) {
      continue;
    }

    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  return Array.from(counts, ([character, count]) => ({ character, count }));
}

export function LetterCensus({ label }: LetterCensusProps) {
  const [state, setState] = React.useState<LetterCensusState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const census = censusForLabel(label);
  const highest = census.reduce((maximum, item) => Math.max(maximum, item.count), 1);

  return (
    <section
      aria-label="Transform a label into a letter census"
      className="gra-ui letter-census"
      data-state={current.counted ? "counted" : "ready"}
    >
      <header className="letter-census__header">
        <span>Letter census</span>
        <output aria-live="polite">
          {current.counted ? `${census.length} letters observed` : "Uncounted"}
        </output>
      </header>

      <div aria-live="polite" className="letter-census__paper">
        {current.counted ? (
          <ol className="letter-census__ledger">
            {census.map((item) => (
              <li key={item.character}>
                <strong>{item.character}</strong>
                <span className="letter-census__bar">
                  <i style={{ "--census-width": `${(item.count / highest) * 100}%` } as React.CSSProperties} />
                </span>
                <output>{item.count}</output>
              </li>
            ))}
          </ol>
        ) : (
          <p className="letter-census__original">{label}</p>
        )}
      </div>

      <div className="letter-census__footer">
        <p>
          {current.counted
            ? "The sentence has been reduced to evidence about itself."
            : "Count the letters to replace the label with its private bureaucracy."}
        </p>
        <div className="letter-census__actions">
          <button
            disabled={current.counted || census.length === 0}
            onClick={() => setState({ counted: true, signature: label })}
            type="button"
          >
            Count letters
          </button>
          <button
            className="letter-census__reset"
            disabled={!current.counted}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore label
          </button>
        </div>
      </div>
    </section>
  );
}
