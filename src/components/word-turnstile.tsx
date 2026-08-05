import * as React from "react";

export interface WordTurnstileProps {
  label: string;
}

interface WordTurnstileState {
  signature: string;
  turned: number;
}

function createState(label: string): WordTurnstileState {
  return { signature: label, turned: 0 };
}

export function WordTurnstile({ label }: WordTurnstileProps) {
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  const [state, setState] = React.useState<WordTurnstileState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const isComplete = words.length > 0 && current.turned === words.length;

  function turnNextWord() {
    setState((previous) => {
      const base = previous.signature === label ? previous : createState(label);

      return {
        ...base,
        turned: Math.min(base.turned + 1, words.length),
      };
    });
  }

  return (
    <section
      aria-label="Turn the words of a label one at a time"
      className="gra-ui word-turnstile"
      data-state={isComplete ? "complete" : current.turned === 0 ? "ready" : "turning"}
    >
      <header className="word-turnstile__header">
        <span>Word turnstile</span>
        <output aria-live="polite">
          {words.length === 0 ? "No words" : `${current.turned} / ${words.length} turned`}
        </output>
      </header>

      <div className="word-turnstile__stage">
        <div aria-label="Words to turn" className="word-turnstile__sentence" role="list">
          {words.length > 0 ? (
            words.map((word, index) => (
              <span
                className="word-turnstile__word"
                data-turned={index < current.turned}
                key={`${word}-${index}`}
                role="listitem"
              >
                {word}
              </span>
            ))
          ) : (
            <span className="word-turnstile__empty">Give the turnstile a label.</span>
          )}
        </div>
        <span aria-hidden="true" className="word-turnstile__gate" />
      </div>

      <div className="word-turnstile__footer">
        <p aria-live="polite">
          {words.length === 0
            ? "There is nothing to send through the gate."
            : isComplete
              ? "Every word has paid for its unnecessary inversion."
              : current.turned === 0
                ? "Turn each word before the label is allowed to finish."
                : `${words.length - current.turned} ${words.length - current.turned === 1 ? "word remains" : "words remain"} upright.`}
        </p>
        <div className="word-turnstile__actions">
          <button
            disabled={isComplete || words.length === 0}
            onClick={turnNextWord}
            type="button"
          >
            Turn next word
          </button>
          <button
            className="word-turnstile__reset"
            disabled={current.turned === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Reset label
          </button>
        </div>
      </div>
    </section>
  );
}
