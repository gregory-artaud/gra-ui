import * as React from "react";

const SEALED_SENTENCE = "Please approve this sentence before Friday.";
const IMPRESSIONS_TO_SEAL = 3;

export type SelectionSealProps = Record<never, never>;

interface SelectionSealState {
  end: number;
  excerpt: string;
  impressions: number;
  sealed: boolean;
  start: number;
}

const INITIAL_STATE: SelectionSealState = {
  end: -1,
  excerpt: "",
  impressions: 0,
  sealed: false,
  start: -1,
};

export function SelectionSeal() {
  const [state, setState] = React.useState<SelectionSealState>(INITIAL_STATE);

  const handleSelection = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (state.sealed) {
      return;
    }

    const { selectionEnd, selectionStart } = event.currentTarget;

    if (selectionStart === selectionEnd) {
      return;
    }

    const excerpt = SEALED_SENTENCE.slice(selectionStart, selectionEnd);

    if (!excerpt.trim()) {
      return;
    }

    setState((current) => {
      const repeated = current.start === selectionStart && current.end === selectionEnd;
      const impressions = repeated
        ? Math.min(current.impressions + 1, IMPRESSIONS_TO_SEAL)
        : 1;

      return {
        end: selectionEnd,
        excerpt,
        impressions,
        sealed: impressions === IMPRESSIONS_TO_SEAL,
        start: selectionStart,
      };
    });
  };

  const excerptLabel = state.excerpt.trim() || "the excerpt";
  const remaining = IMPRESSIONS_TO_SEAL - state.impressions;

  return (
    <section
      aria-label="Select the same excerpt three times to seal it"
      className="gra-ui selection-seal"
      data-state={state.sealed ? "sealed" : state.impressions > 0 ? "marking" : "ready"}
      data-impressions={state.impressions}
    >
      <header className="selection-seal__header">
        <span>Selection seal</span>
        <output aria-live="polite">
          {state.sealed ? "Sealed" : `${state.impressions} / ${IMPRESSIONS_TO_SEAL}`}
        </output>
      </header>

      <div className="selection-seal__surface">
        {state.sealed ? (
          <p aria-live="polite" className="selection-seal__sentence">
            {SEALED_SENTENCE.slice(0, state.start)}
            <mark className="selection-seal__sealed-mark">{state.excerpt}</mark>
            {SEALED_SENTENCE.slice(state.end)}
          </p>
        ) : (
          <textarea
            aria-label="Sentence to select"
            className="selection-seal__input"
            onSelect={handleSelection}
            readOnly
            rows={2}
            value={SEALED_SENTENCE}
          />
        )}
      </div>

      <div aria-label="Selection impressions" className="selection-seal__impressions">
        {Array.from({ length: state.impressions }, (_, index) => (
          <span
            aria-hidden="true"
            className="selection-seal__stamp"
            key={`${index}-${state.excerpt}`}
          >
            {excerptLabel}
          </span>
        ))}
      </div>

      <div className="selection-seal__footer">
        <p aria-live="polite">
          {state.sealed
            ? `“${excerptLabel}” is now officially sealed.`
            : state.impressions === 0
              ? "Select any excerpt, then select that exact excerpt two more times."
              : `Select “${excerptLabel}” ${remaining} more time${remaining === 1 ? "" : "s"}.`}
        </p>
        <button
          className="selection-seal__reset"
          disabled={state.impressions === 0}
          onClick={() => setState(INITIAL_STATE)}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
