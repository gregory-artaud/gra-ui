import * as React from "react";

type CustodyMode = "intake" | "desk" | "vault" | "courier";

export interface CustodyChoiceProps {
  children: React.ReactNode;
}

interface CustodyChoiceState {
  mode: CustodyMode;
  signature: string;
}

function childrenSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return `${index}:${String(child.type)}:${String(child.key)}:${String(child.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("\u241f");
}

function createState(signature: string): CustodyChoiceState {
  return { mode: "intake", signature };
}

const modeLabels: Record<Exclude<CustodyMode, "intake">, string> = {
  desk: "Desk",
  vault: "Vault",
  courier: "Courier",
};

export function CustodyChoice({ children }: CustodyChoiceProps) {
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<CustodyChoiceState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isPlaced = current.mode !== "intake";

  return (
    <section
      aria-label="Custody choice"
      className="gra-ui custody-choice"
      data-mode={current.mode}
    >
      <div className="custody-choice__header">
        <span>Custody decision</span>
        <output aria-live="polite">
          {current.mode === "intake" ? "Awaiting a destination" : `Sent to ${modeLabels[current.mode]}`}
        </output>
      </div>

      <div className="custody-choice__dispatch">
        <div className="custody-choice__intake" data-empty={isPlaced}>
          <span>intake</span>
          {!isPlaced ? <div className="custody-choice__cargo">{children}</div> : <small>departed</small>}
        </div>
        {(Object.keys(modeLabels) as Array<Exclude<CustodyMode, "intake">>).map((mode) => (
          <div className="custody-choice__destination" data-active={current.mode === mode} key={mode}>
            <span>{modeLabels[mode]}</span>
            {current.mode === mode ? <div className="custody-choice__cargo">{children}</div> : <small>empty</small>}
          </div>
        ))}
      </div>

      <div aria-label="Choose custody" className="custody-choice__choices" role="group">
        {(Object.keys(modeLabels) as Array<Exclude<CustodyMode, "intake">>).map((mode) => (
          <button
            aria-pressed={current.mode === mode}
            key={mode}
            onClick={() => setState({ mode, signature })}
            type="button"
          >
            Send to {modeLabels[mode]}
          </button>
        ))}
        <button
          className="custody-choice__reset"
          disabled={!isPlaced}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Recall
        </button>
      </div>
    </section>
  );
}
