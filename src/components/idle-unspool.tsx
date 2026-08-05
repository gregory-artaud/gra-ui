import * as React from "react";

export interface IdleUnspoolProps {
  children: React.ReactNode;
}

interface IdleUnspoolState {
  signature: string;
  detached: number;
}

const STEP_DELAY = 1_100;

function signatureForPieces(pieces: readonly React.ReactNode[]) {
  return pieces
    .map((piece, index) => {
      if (React.isValidElement(piece)) {
        const element = piece as React.ReactElement<{ children?: React.ReactNode }>;

        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof piece}:${String(piece)}`;
    })
    .join("|");
}

function createState(signature: string): IdleUnspoolState {
  return { signature, detached: 0 };
}

export function IdleUnspool({ children }: IdleUnspoolProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<IdleUnspoolState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const detached = Math.min(current.detached, pieces.length);
  const waiting = pieces.slice(detached);
  const aside = pieces.slice(0, detached);
  const isComplete = pieces.length > 0 && detached === pieces.length;

  React.useEffect(() => {
    if (detached >= pieces.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setState((previous) => {
        const previousDetached = previous.signature === signature ? previous.detached : 0;

        return {
          signature,
          detached: Math.min(previousDetached + 1, pieces.length),
        };
      });
    }, STEP_DELAY);

    return () => window.clearTimeout(timeout);
  }, [detached, pieces.length, signature]);

  return (
    <section
      aria-label="Content that unspools into an aside while idle"
      className="gra-ui idle-unspool"
      data-count={pieces.length}
      data-state={isComplete ? "unspooled" : detached > 0 ? "unspooling" : "waiting"}
    >
      <header className="idle-unspool__header">
        <span>Idle unspool</span>
        <output aria-live="polite">
          {pieces.length === 0 ? "Empty" : `${detached}/${pieces.length} aside`}
        </output>
      </header>

      <div className="idle-unspool__stage">
        <div className="idle-unspool__waiting" aria-label="Children still waiting" role="list">
          <span className="idle-unspool__zone-label">Main row</span>
          {waiting.length > 0 ? (
            waiting.map((piece, index) => (
              <div className="idle-unspool__item" key={`waiting-${detached + index}-${signature}`} role="listitem">
                {piece}
              </div>
            ))
          ) : (
            <span className="idle-unspool__empty">Nothing left to wait for.</span>
          )}
        </div>

        <div className="idle-unspool__aside" aria-label="Children that moved aside" role="list">
          <span className="idle-unspool__zone-label">Aside shelf</span>
          {aside.length > 0 ? (
            aside.map((piece, index) => (
              <div
                className="idle-unspool__item"
                data-fresh={index === detached - 1}
                key={`aside-${index}-${signature}`}
                role="listitem"
              >
                {piece}
              </div>
            ))
          ) : (
            <span className="idle-unspool__empty">The shelf is still empty.</span>
          )}
        </div>
      </div>

      <div className="idle-unspool__footer">
        <p aria-live="polite">
          {pieces.length === 0
            ? "Give the shelf something to unspool."
            : isComplete
              ? "Every child moved aside while nobody was doing anything."
              : detached === 0
                ? "Stay idle. The first child will leave the row shortly."
                : `${waiting.length} ${waiting.length === 1 ? "child remains" : "children remain"} in the main row.`}
        </p>
        <button
          className="idle-unspool__reset"
          disabled={detached === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Refile everything
        </button>
      </div>
    </section>
  );
}
