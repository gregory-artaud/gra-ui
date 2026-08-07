import * as React from "react";

export interface FootnoteShiftProps {
  label: string;
}

interface FootnoteShiftState {
  label: string;
  moved: number[];
}

function createState(label: string): FootnoteShiftState {
  return { label, moved: [] };
}

export function FootnoteShift({ label }: FootnoteShiftProps) {
  const [state, setState] = React.useState<FootnoteShiftState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const tokens = label.split(/(\s+)/).filter(Boolean);
  const wordIndexes = tokens.reduce<number[]>((indexes, token, index) => {
    if (!/^\s+$/.test(token)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
  const movedWords = current.moved.map((tokenIndex) => ({ tokenIndex, word: tokens[tokenIndex] ?? "" }));

  const toggleWord = (tokenIndex: number) => {
    setState((previous) => {
      const baseline = previous.label === label ? previous : createState(label);
      const moved = baseline.moved.includes(tokenIndex)
        ? baseline.moved.filter((index) => index !== tokenIndex)
        : [...baseline.moved, tokenIndex];
      return { label, moved };
    });
  };

  return (
    <section
      aria-label="Move words from a sentence into numbered footnotes"
      className="gra-ui footnote-shift"
      data-moved={current.moved.length}
      data-state={current.moved.length === 0 ? "inline" : "footnoted"}
    >
      <header className="footnote-shift__header">
        <span>Footnote shift</span>
        <output aria-live="polite">{current.moved.length} / {wordIndexes.length} footnoted</output>
      </header>

      <div className="footnote-shift__document">
        <p className="footnote-shift__sentence" aria-live="polite">
          {tokens.map((token, tokenIndex) => {
            if (/^\s+$/.test(token)) {
              return <span aria-hidden="true" key={`${label}-space-${tokenIndex}`}>{token}</span>;
            }

            const moved = current.moved.includes(tokenIndex);
            return (
              <button
                aria-label={moved ? `Restore word ${token}` : `Move word ${token} to a footnote`}
                aria-pressed={moved}
                className="footnote-shift__word"
                data-moved={moved ? "true" : "false"}
                key={`${label}-${tokenIndex}`}
                onClick={() => toggleWord(tokenIndex)}
                type="button"
              >
                {moved ? "•••" : token}
              </button>
            );
          })}
        </p>

        <aside className="footnote-shift__notes" aria-label="Footnotes">
          <span className="footnote-shift__notes-label">Footnotes</span>
          {movedWords.length === 0 ? (
            <p className="footnote-shift__empty">Nothing has been unnecessarily relocated.</p>
          ) : (
            <ol>
              {movedWords.map(({ tokenIndex, word }, index) => (
                <li key={`${label}-note-${tokenIndex}`}>
                  <button onClick={() => toggleWord(tokenIndex)} type="button">
                    <span>{index + 1}</span>
                    {word}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>

      <div className="footnote-shift__footer">
        <p aria-live="polite">
          {current.moved.length === wordIndexes.length && wordIndexes.length > 0
            ? "Every word has been demoted to a footnote. The sentence is technically still present."
            : current.moved.length === 0
              ? "Click any word to move its actual content into a numbered footnote."
              : "The sentence has lost a word. Click the dotted space or its note to move it back."}
        </p>
        <button
          className="footnote-shift__reset"
          disabled={current.moved.length === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Restore sentence
        </button>
      </div>
    </section>
  );
}
