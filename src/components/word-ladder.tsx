import * as React from "react";

export interface WordLadderProps {
  start: string;
  target: string;
}

export function WordLadder({ start, target }: WordLadderProps) {
  const [state, setState] = React.useState({ source: start, destination: target, step: 0 });
  const startCharacters = Array.from(start);
  const targetCharacters = Array.from(target);
  const totalSteps = Math.max(startCharacters.length, targetCharacters.length);
  const step = state.source === start && state.destination === target
    ? Math.min(state.step, totalSteps)
    : 0;
  const complete = step === totalSteps;
  const displayedCharacters = Array.from({ length: totalSteps }, (_, index) =>
    index < step ? targetCharacters[index] ?? "" : startCharacters[index] ?? "",
  );
  const displayed = displayedCharacters.join("");

  const advance = () => {
    setState({ source: start, destination: target, step: Math.min(step + 1, totalSteps) });
  };

  return (
    <section
      aria-label="Move a word one character at a time"
      className="gra-ui word-ladder"
      data-complete={complete}
    >
      <header className="word-ladder__header">
        <span>Word ladder</span>
        <output aria-live="polite">{step} / {totalSteps} rungs</output>
      </header>

      <div className="word-ladder__display" aria-live="polite">
        <span className="word-ladder__caption">A label is changing its mind by position</span>
        <strong key={`${start}-${target}-${step}`}>{displayed || "∅"}</strong>
        <small>{complete ? "The target wording has finally arrived." : "Each rung replaces one real character."}</small>
      </div>

      <div className="word-ladder__rungs" aria-label="Character rungs">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            className="word-ladder__rung"
            data-active={index < step}
            key={`${index}-${start}-${target}`}
          >
            {index + 1}
          </span>
        ))}
        {!totalSteps ? <span className="word-ladder__empty">No characters to climb.</span> : null}
      </div>

      <footer className="word-ladder__footer">
        <p>{complete ? "The wording survived a completely unnecessary renovation." : "Advance one character toward the target."}</p>
        <div className="word-ladder__actions">
          <button disabled={complete} onClick={advance} type="button">Next rung</button>
          <button
            className="word-ladder__reset"
            disabled={step === 0}
            onClick={() => setState({ source: start, destination: target, step: 0 })}
            type="button"
          >
            Return to start
          </button>
        </div>
      </footer>
    </section>
  );
}
