import * as React from "react";

export interface RatchetRevealProps {
  children: React.ReactNode;
}

interface RatchetRevealState {
  signature: string;
  stage: number;
}

function signatureForItems(items: readonly React.ReactNode[]) {
  return items
    .map((item, index) => {
      if (React.isValidElement(item)) {
        const element = item as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof item}:${String(item)}`;
    })
    .join("|");
}

function createState(signature: string): RatchetRevealState {
  return { signature, stage: 0 };
}

export function RatchetReveal({ children }: RatchetRevealProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForItems(items);
  const [state, setState] = React.useState<RatchetRevealState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = items.length > 0 && current.stage === items.length;

  const advance = () => {
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);

      return baseline.stage >= items.length
        ? baseline
        : { signature, stage: baseline.stage + 1 };
    });
  };

  return (
    <section
      aria-label="Advance a ratchet to reveal children one notch at a time"
      className="gra-ui ratchet-reveal"
      data-stage={current.stage}
      data-state={isComplete ? "complete" : current.stage > 0 ? "ratcheting" : "ready"}
    >
      <header className="ratchet-reveal__header">
        <span>Ratchet reveal</span>
        <output aria-live="polite">
          {items.length === 0 ? "No teeth" : `${current.stage} / ${items.length} notches`}
        </output>
      </header>

      <div className="ratchet-reveal__track" aria-live="polite">
        <div
          aria-hidden="true"
          className="ratchet-reveal__progress"
          style={{ "--ratchet-progress": `${items.length === 0 ? 0 : (current.stage / items.length) * 100}%` } as React.CSSProperties}
        />
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              className="ratchet-reveal__tooth"
              data-revealed={index < current.stage ? "true" : "false"}
              key={`${signature}-${index}`}
            >
              <span className="ratchet-reveal__number">{index + 1}</span>
              <div className="ratchet-reveal__item">
                {index < current.stage ? item : <span className="ratchet-reveal__closed">sealed</span>}
              </div>
            </div>
          ))
        ) : (
          <span className="ratchet-reveal__empty">Add children to give the ratchet some teeth.</span>
        )}
      </div>

      <div className="ratchet-reveal__footer">
        <p aria-live="polite">
          {isComplete
            ? "Every tooth has clicked into place. The reveal is needlessly complete."
            : current.stage === 0
              ? "Advance the ratchet to open one sealed tooth."
              : "The ratchet only moves forward; each opened tooth stays open."}
        </p>
        <div className="ratchet-reveal__actions">
          <button disabled={isComplete || items.length === 0} onClick={advance} type="button">
            {isComplete ? "Fully revealed" : "Advance one notch"}
          </button>
          <button
            className="ratchet-reveal__reset"
            disabled={current.stage === 0}
            onClick={() => setState(createState(signature))}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
