import * as React from "react";

const ACTIONS = [
  { id: "stamp", label: "Stamp", detail: "make it official" },
  { id: "fold", label: "Fold", detail: "reduce the surface" },
  { id: "weigh", label: "Weigh", detail: "assign gravity" },
  { id: "file", label: "File", detail: "put it away" },
] as const;

type CeremonyAction = (typeof ACTIONS)[number]["id"];

export interface CeremonyQueueProps {
  children: React.ReactNode;
}

export function CeremonyQueue({ children }: CeremonyQueueProps) {
  const [state, setState] = React.useState({ stage: 0, wrong: false });
  const complete = state.stage === ACTIONS.length;
  const currentAction = ACTIONS[state.stage];

  const perform = (action: CeremonyAction) => {
    setState((previous) => {
      if (action !== ACTIONS[previous.stage]?.id) return { stage: 0, wrong: true };
      return { stage: previous.stage + 1, wrong: false };
    });
  };

  return (
    <section
      aria-label="Move the content through a four-step filing ceremony"
      className="gra-ui ceremony-queue"
      data-complete={complete}
      data-wrong={state.wrong}
    >
      <header className="ceremony-queue__header">
        <span>Ceremony queue</span>
        <output aria-live="polite">{complete ? "Filed" : `${state.stage} / ${ACTIONS.length} rites`}</output>
      </header>

      <div className="ceremony-queue__stations" aria-live="polite">
        {ACTIONS.map((action, index) => (
          <div className="ceremony-queue__station" data-active={index === state.stage} data-complete={index < state.stage} key={action.id}>
            <span className="ceremony-queue__station-number">0{index + 1}</span>
            <strong>{action.label}</strong>
          </div>
        ))}
      </div>

      <div className={`ceremony-queue__cargo ceremony-queue__cargo--stage-${Math.min(state.stage, ACTIONS.length - 1)}`} key={`${state.stage}-${state.wrong}`}>
        <div className="ceremony-queue__content">{children}</div>
        <span>{complete ? "Archive" : currentAction?.detail ?? "Awaiting release"}</span>
      </div>

      <div aria-label="Ceremony actions" className="ceremony-queue__actions">
        {ACTIONS.map((action) => (
          <button disabled={complete} key={action.id} onClick={() => perform(action.id)} type="button">
            {action.label}
          </button>
        ))}
      </div>

      <footer className="ceremony-queue__footer">
        <p>{state.wrong ? "The wrong rite returned the cargo to intake." : complete ? "The notice has completed its needless filing." : `Next rite: ${currentAction?.label}.`}</p>
        <button className="ceremony-queue__reset" disabled={state.stage === 0 && !state.wrong} onClick={() => setState({ stage: 0, wrong: false })} type="button">
          Empty queue
        </button>
      </footer>
    </section>
  );
}
