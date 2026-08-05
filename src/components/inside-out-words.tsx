import * as React from "react";

export interface InsideOutWordsProps {
  label: string;
}

interface InsideOutWordsState {
  reversed: number[];
  signature: string;
}

function createState(label: string): InsideOutWordsState {
  return { reversed: [], signature: label };
}

function reverseWord(word: string) {
  return Array.from(word).reverse().join("");
}

export function InsideOutWords({ label }: InsideOutWordsProps) {
  const [state, setState] = React.useState<InsideOutWordsState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const tokens = label.split(/(\s+)/).filter((token) => token.length > 0);
  const words = tokens.filter((token) => !/^\s+$/.test(token));
  const turnedCount = current.reversed.length;

  const toggleWord = (index: number) => {
    setState((previous) => {
      const baseline = previous.signature === label ? previous : createState(label);
      const reversed = baseline.reversed.includes(index)
        ? baseline.reversed.filter((value) => value !== index)
        : [...baseline.reversed, index].sort((left, right) => left - right);

      return { signature: label, reversed };
    });
  };

  return (
    <section
      aria-label="Turn individual words inside out"
      className="gra-ui inside-out-words"
      data-state={turnedCount > 0 ? "turning" : "ready"}
      data-turned={turnedCount}
    >
      <header className="inside-out-words__header">
        <span>Inside-out words</span>
        <output aria-live="polite">{turnedCount} / {words.length} turned</output>
      </header>

      <p className="inside-out-words__sentence" aria-live="polite">
        {tokens.map((token, tokenIndex) => {
          if (/^\s+$/.test(token)) {
            return token;
          }

          const index = tokens
            .slice(0, tokenIndex)
            .filter((value) => !/^\s+$/.test(value)).length;
          const isReversed = current.reversed.includes(index);

          return (
            <button
              aria-pressed={isReversed}
              className="inside-out-words__word"
              data-turned={isReversed ? "true" : "false"}
              key={`${label}-${tokenIndex}`}
              onClick={() => toggleWord(index)}
              type="button"
            >
              {isReversed ? reverseWord(token) : token}
            </button>
          );
        })}
      </p>

      <div className="inside-out-words__footer">
        <p aria-live="polite">
          {turnedCount === 0
            ? "Click a word to reverse its actual letters."
            : "The sentence will remain slightly wrong until each word is restored."}
        </p>
        <button
          className="inside-out-words__reset"
          disabled={turnedCount === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Restore sentence
        </button>
      </div>
    </section>
  );
}
