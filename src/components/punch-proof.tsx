import * as React from "react";

const TOTAL_PUNCHES = 5;

export interface PunchProofProps {
  children: React.ReactNode;
}

interface PunchProofState {
  signature: string;
  punched: number;
}

function childrenSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return `${index}:${String(child.type)}:${String(child.props.children ?? child.key ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("\u241f");
}

function createState(signature: string): PunchProofState {
  return { signature, punched: 0 };
}

export function PunchProof({ children }: PunchProofProps) {
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<PunchProofState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.punched === TOTAL_PUNCHES;

  return (
    <section
      aria-label="Punch proof"
      className="gra-ui punch-proof"
      data-complete={isComplete}
      data-punched={current.punched}
    >
      <div className="punch-proof__header">
        <span>Proof card</span>
        <output aria-live="polite">{current.punched}/{TOTAL_PUNCHES} holes</output>
      </div>

      <div className="punch-proof__paper">
        <div className="punch-proof__content">{children}</div>
        <div className="punch-proof__holes" aria-hidden="true">
          {Array.from({ length: TOTAL_PUNCHES }, (_, index) => (
            <span data-open={index < current.punched} key={index} />
          ))}
        </div>
      </div>

      <div className="punch-proof__actions">
        <button
          disabled={isComplete}
          onClick={() => {
            setState({
              signature,
              punched: Math.min(current.punched + 1, TOTAL_PUNCHES),
            });
          }}
          type="button"
        >
          {isComplete ? "Proof complete" : "Punch next hole"}
        </button>
        <button
          className="punch-proof__reset"
          disabled={current.punched === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Re-file
        </button>
      </div>
    </section>
  );
}
