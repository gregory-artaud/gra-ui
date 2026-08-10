import * as React from "react";

export interface OutcomeTriptychProps {
  children: React.ReactNode;
}

type Outcome = "promote" | "quarantine" | "muffle";

interface OutcomeTriptychState {
  outcome: Outcome | null;
  signature: string;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): OutcomeTriptychState {
  return { outcome: null, signature };
}

export function OutcomeTriptych({ children }: OutcomeTriptychProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<OutcomeTriptychState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);

  return (
    <section
      aria-label="Choose one of three unnecessary outcomes for the content"
      className="gra-ui outcome-triptych"
      data-outcome={current.outcome ?? "waiting"}
    >
      <header className="outcome-triptych__header">
        <span>Outcome triptych</span>
        <output aria-live="polite">
          {current.outcome ? current.outcome : "Undecided"}
        </output>
      </header>

      <div aria-live="polite" className="outcome-triptych__stage">
        {current.outcome === "promote" ? (
          <div className="outcome-triptych__promoted">
            <span className="outcome-triptych__flag">Priority</span>
            <div>{children}</div>
          </div>
        ) : current.outcome === "quarantine" ? (
          <fieldset className="outcome-triptych__quarantined">
            <legend>Under observation</legend>
            <div>{children}</div>
          </fieldset>
        ) : current.outcome === "muffle" ? (
          <div className="outcome-triptych__muffled">
            <span aria-hidden="true">•••</span>
            <div>{children}</div>
          </div>
        ) : (
          <div className="outcome-triptych__waiting">{children}</div>
        )}
      </div>

      <div className="outcome-triptych__choices" role="group" aria-label="Choose an outcome">
        <button
          aria-pressed={current.outcome === "promote"}
          onClick={() => setState({ outcome: "promote", signature })}
          type="button"
        >
          Promote
        </button>
        <button
          aria-pressed={current.outcome === "quarantine"}
          onClick={() => setState({ outcome: "quarantine", signature })}
          type="button"
        >
          Quarantine
        </button>
        <button
          aria-pressed={current.outcome === "muffle"}
          onClick={() => setState({ outcome: "muffle", signature })}
          type="button"
        >
          Muffle
        </button>
      </div>

      <button
        className="outcome-triptych__reset"
        disabled={current.outcome === null}
        onClick={() => setState(createState(signature))}
        type="button"
      >
        Return to indecision
      </button>
    </section>
  );
}
