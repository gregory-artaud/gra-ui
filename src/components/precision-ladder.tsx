import * as React from "react";

export interface PrecisionLadderProps {
  children: React.ReactNode;
}

type PrecisionResult = "ready" | "hit" | "miss";

interface PrecisionLadderState {
  signature: string;
  level: number;
  result: PrecisionResult;
}

const LEVELS = [
  { radius: 0.7, label: "Outer ring" },
  { radius: 0.52, label: "Middle ring" },
  { radius: 0.35, label: "Inner ring" },
  { radius: 0.2, label: "Pinpoint" },
] as const;

function createSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): PrecisionLadderState {
  return { signature, level: 0, result: "ready" };
}

export function PrecisionLadder({ children }: PrecisionLadderProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<PrecisionLadderState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.level === LEVELS.length;
  const nextTarget = LEVELS[Math.min(current.level, LEVELS.length - 1)];

  const attempt = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isComplete) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const isKeyboardActivation = event.clientX === 0 && event.clientY === 0;
    const horizontal = isKeyboardActivation
      ? 0
      : (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
    const vertical = isKeyboardActivation
      ? 0
      : (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
    const distance = Math.min(1, Math.hypot(horizontal, vertical));

    if (distance <= nextTarget.radius) {
      setState({ signature, level: current.level + 1, result: "hit" });
    } else {
      setState({ signature, level: 0, result: "miss" });
    }
  };

  return (
    <section
      aria-label="Advance a precision ladder by landing inside smaller target rings"
      className="gra-ui precision-ladder"
      data-level={current.level}
      data-result={current.result}
      data-state={isComplete ? "complete" : current.level > 0 ? "climbing" : "ready"}
    >
      <header className="precision-ladder__header">
        <span>Precision ladder</span>
        <output aria-live="polite">
          {isComplete ? "Centered" : `${current.level} / ${LEVELS.length} rings`}
        </output>
      </header>

      <div className="precision-ladder__stage">
        <button
          aria-label={isComplete ? "Precision ladder complete" : `Hit the ${nextTarget.label.toLowerCase()}`}
          className="precision-ladder__target"
          disabled={isComplete}
          onClick={attempt}
          type="button"
        >
          <span aria-hidden="true" className="precision-ladder__rings" />
          <span className="precision-ladder__payload">{children}</span>
        </button>
      </div>

      <div className="precision-ladder__footer">
        <p aria-live="polite">
          {isComplete
            ? "The content is centered to a degree nobody requested."
            : current.result === "miss"
              ? "The ladder disapproves. Start again at the outer ring."
              : `Click inside the ${nextTarget.label.toLowerCase()} to climb one step.`}
        </p>
        <button
          className="precision-ladder__reset"
          disabled={current.level === 0 && current.result !== "miss"}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Reset aim
        </button>
      </div>
    </section>
  );
}
