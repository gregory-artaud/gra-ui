import * as React from "react";

type ShadowPhase = "card" | "witness";

export interface ShadowPairProps {
  children: React.ReactNode;
}

interface ShadowPairState {
  message: "ready" | "retry" | "witness" | "complete";
  paired: number;
  phase: ShadowPhase;
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

function createState(signature: string): ShadowPairState {
  return { message: "ready", paired: 0, phase: "card", signature };
}

export function ShadowPair({ children }: ShadowPairProps) {
  const items = React.Children.toArray(children);
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<ShadowPairState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.paired === items.length;

  const resetAfterWrongMove = () => setState({ ...createState(signature), message: "retry" });

  const selectCard = (index: number) => {
    if (current.phase !== "card" || index !== current.paired) {
      resetAfterWrongMove();
      return;
    }

    setState({ message: "witness", paired: current.paired, phase: "witness", signature });
  };

  const selectWitness = (index: number) => {
    if (current.phase !== "witness" || index !== current.paired) {
      resetAfterWrongMove();
      return;
    }

    const paired = current.paired + 1;
    setState({
      message: paired === items.length ? "complete" : "ready",
      paired,
      phase: "card",
      signature,
    });
  };

  return (
    <section aria-label="Shadow pair sequence" className="gra-ui shadow-pair" data-complete={isComplete} data-phase={current.phase}>
      <div className="shadow-pair__header">
        <span>Two-part filing</span>
        <output aria-live="polite">
          {isComplete ? "All witnesses signed" : `${current.paired}/${items.length} pairs`}
        </output>
      </div>

      <div className="shadow-pair__list">
        {items.map((item, index) => {
          const status = index < current.paired ? "paired" : index === current.paired ? "current" : "waiting";
          return (
            <div className="shadow-pair__row" data-status={status} key={index}>
              <button className="shadow-pair__card" data-status={status} onClick={() => selectCard(index)} type="button">
                <span>card {index + 1}</span>
                {item}
              </button>
              <span aria-hidden="true" className="shadow-pair__line" />
              <button className="shadow-pair__witness" data-status={status} onClick={() => selectWitness(index)} type="button">
                witness
              </button>
            </div>
          );
        })}
      </div>

      <div className="shadow-pair__footer">
        <span aria-live="polite">
          {current.message === "retry"
            ? "Wrong order. The filing returned to card 1."
            : current.message === "witness"
              ? "Now sign the matching witness."
              : isComplete
                ? "The pair sequence is unnecessarily complete."
                : "Select a card, then its matching witness."}
        </span>
        <button
          className="shadow-pair__reset"
          disabled={!isComplete && current.paired === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Restart
        </button>
      </div>
    </section>
  );
}
