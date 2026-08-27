import * as React from "react";

function transposeWords(words: string[]) {
  if (words.length < 2) return words;
  const columns = Math.max(2, Math.min(4, Math.ceil(Math.sqrt(words.length))));
  const rows = Math.ceil(words.length / columns);
  const transposed: string[] = [];

  for (let column = 0; column < columns; column += 1) {
    for (let row = 0; row < rows; row += 1) {
      const word = words[row * columns + column];
      if (word) transposed.push(word);
    }
  }

  return transposed;
}

export interface ColumnTransposeProps {
  label: string;
}

export function ColumnTranspose({ label }: ColumnTransposeProps) {
  const [transposeState, setTransposeState] = React.useState({ label, transposed: false });
  const transposed = transposeState.label === label ? transposeState.transposed : false;
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  const displayedWords = transposed ? transposeWords(words) : words;

  return (
    <section
      aria-label="Transpose a caption by columns"
      className="gra-ui column-transpose"
      data-state={transposed ? "transposed" : "reading"}
    >
      <header className="column-transpose__header">
        <span>Column transpose</span>
        <output aria-live="polite">{transposed ? "Turned sideways" : "Reading order"}</output>
      </header>

      <div className="column-transpose__paper" aria-live="polite">
        <span className="column-transpose__caption">Visible wording</span>
        <p className="column-transpose__label" key={displayedWords.join(" ")}>{displayedWords.join(" ") || "The empty page has nothing to transpose."}</p>
        <div className="column-transpose__grid" aria-label="Word order">
          {displayedWords.length > 0
            ? displayedWords.map((word, index) => <span key={`${word}-${index}`}>{index + 1}. {word}</span>)
            : <small>No cells available.</small>}
        </div>
      </div>

      <footer className="column-transpose__footer">
        <p>{transposed ? "The words still exist, but reading now has to visit columns first." : "Write the words across a row, then make the reader visit each column."}</p>
        <div className="column-transpose__actions">
          <button disabled={transposed} onClick={() => setTransposeState({ label, transposed: true })} type="button">Transpose columns</button>
          <button className="column-transpose__reset" disabled={!transposed} onClick={() => setTransposeState({ label, transposed: false })} type="button">Restore rows</button>
        </div>
      </footer>
    </section>
  );
}
