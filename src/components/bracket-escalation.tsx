import * as React from "react";

const BRACKET_STAGES = [
  { label: "Plain", open: "", close: "" },
  { label: "Parenthetical", open: "(", close: ")" },
  { label: "Square", open: "[", close: "]" },
  { label: "Braced", open: "{", close: "}" },
  { label: "Double", open: "⟦", close: "⟧" },
] as const;

export interface BracketEscalationProps {
  label: string;
}

interface BracketEscalationState {
  label: string;
  stage: number;
}

function createState(label: string): BracketEscalationState {
  return { label, stage: 0 };
}

export function BracketEscalation({ label }: BracketEscalationProps) {
  const [state, setState] = React.useState<BracketEscalationState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const stage = BRACKET_STAGES[current.stage] ?? BRACKET_STAGES[0];
  const complete = current.stage === BRACKET_STAGES.length - 1;

  return (
    <section
      aria-label="Escalate the brackets around a label"
      className="gra-ui bracket-escalation"
      data-stage={current.stage}
      data-state={complete ? "complete" : current.stage === 0 ? "plain" : "escalating"}
    >
      <header className="bracket-escalation__header">
        <span>Bracket escalation</span>
        <output aria-live="polite">{stage.label}</output>
      </header>

      <div className="bracket-escalation__paper" aria-live="polite">
        <span className="bracket-escalation__stage">Stage {current.stage + 1} / {BRACKET_STAGES.length}</span>
        <p key={`${current.label}-${current.stage}`}>
          {stage.open}{label || "(empty label)"}{stage.close}
        </p>
      </div>

      <footer className="bracket-escalation__footer">
        <p aria-live="polite">
          {complete
            ? "The label has reached maximum containment and gained no authority."
            : current.stage === 0
              ? "Raise the boundary one bracket at a time."
              : `${BRACKET_STAGES.length - current.stage - 1} bracket levels remain in the appeal.`}
        </p>
        <div className="bracket-escalation__actions">
          <button
            disabled={complete}
            onClick={() => setState({ label, stage: Math.min(current.stage + 1, BRACKET_STAGES.length - 1) })}
            type="button"
          >
            {complete ? "Escalation complete" : "Escalate bracket"}
          </button>
          <button
            className="bracket-escalation__reset"
            disabled={current.stage === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Return to plain
          </button>
        </div>
      </footer>
    </section>
  );
}
