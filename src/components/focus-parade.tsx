import * as React from "react";

const STATIONS = ["Intake", "Review", "Release"] as const;

interface FocusParadeState {
  step: number;
  wrong: boolean;
}

export interface FocusParadeProps {
  children: React.ReactNode;
}

export function FocusParade({ children }: FocusParadeProps) {
  const [state, setState] = React.useState<FocusParadeState>({ step: 0, wrong: false });
  const complete = state.step === STATIONS.length;

  const visitStation = (index: number) => {
    setState((current) => {
      if (index === current.step) return { step: current.step + 1, wrong: false };
      return { step: 0, wrong: true };
    });
  };

  return (
    <section aria-label="Move content by focusing stations in order" className="gra-ui focus-parade" data-state={complete ? "released" : state.wrong ? "void" : state.step ? "marching" : "waiting"}>
      <header className="focus-parade__header">
        <span>Focus parade</span>
        <output aria-live="polite">{complete ? "Released" : `${state.step} / ${STATIONS.length} stations`}</output>
      </header>

      <div className="focus-parade__stations" aria-label="Focus stations">
        {STATIONS.map((station, index) => (
          <button
            aria-pressed={index < state.step}
            className="focus-parade__station"
            data-current={index === state.step && !complete}
            data-passed={index < state.step}
            key={station}
            onFocus={() => visitStation(index)}
            type="button"
          >
            <span>{index + 1}</span>{station}
          </button>
        ))}
      </div>

      <div className="focus-parade__stage" aria-live="polite">
        <div className="focus-parade__cargo" data-step={state.step}>
          <span className="focus-parade__seal" aria-hidden="true">{complete ? "✓" : state.step}</span>
          <div>{children}</div>
        </div>
      </div>

      <footer className="focus-parade__footer">
        <p aria-live="polite">
          {complete ? "The content has passed all three stations by being focused in the correct order." : state.wrong ? "Wrong station. The parade has returned to intake." : "Use Tab or click to focus Intake, then Review, then Release."}
        </p>
        <button className="focus-parade__reset" disabled={state.step === 0 && !state.wrong} onClick={() => setState({ step: 0, wrong: false })} type="button">Restart parade</button>
      </footer>
    </section>
  );
}
