import * as React from "react";

export interface ContextEscalatorProps {
  children: React.ReactNode;
}

const LEVELS = ["Noted", "Reviewed", "Escalated", "Filed"] as const;

interface ContextEscalatorState {
  level: number;
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

function createState(signature: string): ContextEscalatorState {
  return { level: 0, signature };
}

export function ContextEscalator({ children }: ContextEscalatorProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<ContextEscalatorState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.level === LEVELS.length;

  const advance = () => {
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return baseline.level >= LEVELS.length
        ? baseline
        : { level: baseline.level + 1, signature };
    });
  };

  return (
    <section
      aria-label="Escalate content through four context menu levels"
      className="gra-ui context-escalator"
      data-level={current.level}
      data-state={isComplete ? "filed" : current.level > 0 ? "escalating" : "ready"}
    >
      <header className="context-escalator__header">
        <span>Context escalation</span>
        <output aria-live="polite">{current.level} / {LEVELS.length}</output>
      </header>

      <article
        aria-label="Context menu escalation target"
        className="context-escalator__target"
        onContextMenu={(event) => {
          event.preventDefault();
          advance();
        }}
      >
        <div className="context-escalator__paper">{children}</div>
        <span className="context-escalator__hint">Right-click the notice</span>
      </article>

      <ol aria-label="Escalation record" className="context-escalator__record">
        {LEVELS.map((level, index) => (
          <li data-open={index < current.level ? "true" : "false"} key={level}>
            <span aria-hidden="true">{index + 1}</span>
            {level}
          </li>
        ))}
      </ol>

      <div className="context-escalator__footer">
        <p aria-live="polite">
          {isComplete
            ? "The notice has reached the final menu for no defensible reason."
            : current.level === 0
              ? "One right-click begins the paperwork."
              : `${LEVELS[current.level - 1]} recorded. Continue escalating the same notice.`}
        </p>
        <div className="context-escalator__actions">
          <button disabled={isComplete} onClick={advance} type="button">
            {isComplete ? "Fully escalated" : "Open next context"}
          </button>
          <button
            className="context-escalator__reset"
            disabled={current.level === 0}
            onClick={() => setState(createState(signature))}
            type="button"
          >
            Clear context
          </button>
        </div>
      </div>
    </section>
  );
}
