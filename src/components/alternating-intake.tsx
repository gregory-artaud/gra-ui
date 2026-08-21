import * as React from "react";

export interface AlternatingIntakeProps {
  children: React.ReactNode;
}

interface AlternatingIntakeState {
  signature: string;
  admitted: number[];
  wrongSide: "left" | "right" | null;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): AlternatingIntakeState {
  return { signature, admitted: [], wrongSide: null };
}

export function AlternatingIntake({ children }: AlternatingIntakeProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<AlternatingIntakeState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const complete = current.admitted.length === items.length && items.length > 0;
  const expectedSide = current.admitted.length % 2 === 0 ? "left" : "right";
  const nextIndex = expectedSide === "left"
    ? current.admitted.length / 2
    : items.length - 1 - Math.floor(current.admitted.length / 2);

  const admit = (side: "left" | "right") => {
    if (complete) return;
    if (side !== expectedSide) {
      setState({ ...current, wrongSide: side });
      return;
    }

    setState({
      signature,
      admitted: [...current.admitted, nextIndex],
      wrongSide: null,
    });
  };

  return (
    <section
      aria-label="Admit content by alternating intake sides"
      className="gra-ui alternating-intake"
      data-state={complete ? "complete" : current.admitted.length > 0 ? "admitting" : "waiting"}
      data-wrong-side={current.wrongSide ?? "none"}
    >
      <header className="alternating-intake__header">
        <span>Alternating intake</span>
        <output aria-live="polite">{current.admitted.length} / {items.length} admitted</output>
      </header>

      <div className="alternating-intake__manifest" aria-live="polite">
        {current.admitted.length === 0 ? (
          <span className="alternating-intake__empty">The manifest is waiting for a left entry.</span>
        ) : (
          current.admitted.map((index, position) => (
            <span className="alternating-intake__entry" key={`${signature}-${index}`}>
              <b>0{position + 1}</b>{items[index]}
            </span>
          ))
        )}
      </div>

      <div className="alternating-intake__waiting" aria-label="Waiting entries">
        {items.map((item, index) => (
          <span data-admitted={current.admitted.includes(index)} key={`${signature}-waiting-${index}`}>{item}</span>
        ))}
      </div>

      <div className="alternating-intake__gates" role="group" aria-label="Choose an intake side">
        <button
          aria-pressed={expectedSide === "left"}
          className="alternating-intake__gate"
          data-wrong={current.wrongSide === "left"}
          disabled={complete}
          onClick={() => admit("left")}
          type="button"
        >
          <strong>Left intake</strong><small>{expectedSide === "left" ? "next permitted" : "wait your turn"}</small>
        </button>
        <button
          aria-pressed={expectedSide === "right"}
          className="alternating-intake__gate"
          data-wrong={current.wrongSide === "right"}
          disabled={complete}
          onClick={() => admit("right")}
          type="button"
        >
          <strong>Right intake</strong><small>{expectedSide === "right" ? "next permitted" : "wait your turn"}</small>
        </button>
      </div>

      <footer className="alternating-intake__footer">
        <p aria-live="polite">
          {complete ? "Every item arrived by the mandated left-right alternation." : `Use the ${expectedSide} gate next.`}
        </p>
        <button
          className="alternating-intake__reset"
          disabled={current.admitted.length === 0 && current.wrongSide === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Empty manifest
        </button>
      </footer>
    </section>
  );
}
