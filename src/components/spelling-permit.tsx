import * as React from "react";

export interface SpellingPermitProps {
  label: string;
}

interface SpellingPermitState {
  label: string;
  rejections: number;
  typed: string;
}

function createState(label: string): SpellingPermitState {
  return { label, rejections: 0, typed: "" };
}

export function SpellingPermit({ label }: SpellingPermitProps) {
  const [state, setState] = React.useState<SpellingPermitState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const isComplete = current.typed === label;
  const progress = label.length === 0 ? 1 : current.typed.length / label.length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;

    if (label.startsWith(next)) {
      setState({ label, rejections: 0, typed: next });
      return;
    }

    setState((previous) => ({
      ...previous,
      rejections: previous.rejections + 1,
    }));
  };

  return (
    <section
      aria-label="Type a label one permitted character at a time"
      className="gra-ui spelling-permit"
      data-state={isComplete ? "permitted" : current.typed.length === 0 ? "waiting" : "partial"}
    >
      <header className="spelling-permit__header">
        <span>Spelling permit</span>
        <output aria-live="polite">
          {isComplete ? "Granted" : `${current.typed.length} / ${label.length} letters`}
        </output>
      </header>

      <div className="spelling-permit__document" aria-live="polite">
        <p className="spelling-permit__label">
          {Array.from(label).map((character, index) => (
            <span data-visible={index < current.typed.length} key={`${character}-${index}`}>
              {index < current.typed.length ? character : "·"}
            </span>
          ))}
          {label.length === 0 ? "Nothing requires a permit." : null}
        </p>
        <div aria-hidden="true" className="spelling-permit__bar">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      <footer className="spelling-permit__footer">
        <p aria-live="polite">
          {isComplete
            ? "The label has been admitted, although it was already readable."
            : current.typed.length === 0
              ? "Type the label exactly. Each correct character opens one more gate."
              : "That character was not next. The permit refuses to guess."}
        </p>
        <div className="spelling-permit__actions">
          <input
            aria-label="Type the label for its spelling permit"
            className={current.rejections > 0 ? "spelling-permit__input spelling-permit__input--rejected" : "spelling-permit__input"}
            disabled={isComplete || label.length === 0}
            onChange={handleChange}
            placeholder="Type here"
            type="text"
            value={current.typed}
          />
          <button
            className="spelling-permit__reset"
            disabled={current.typed.length === 0 && current.rejections === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Revoke
          </button>
        </div>
      </footer>
    </section>
  );
}
