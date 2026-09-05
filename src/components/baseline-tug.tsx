import * as React from "react";

interface BaselineTugState {
  dragging: boolean;
  offset: number;
}

export interface BaselineTugProps {
  children: React.ReactNode;
}

const MIN_OFFSET = -54;
const MAX_OFFSET = 54;

export function BaselineTug({ children }: BaselineTugProps) {
  const [state, setState] = React.useState<BaselineTugState>({ dragging: false, offset: 0 });
  const position = 50 + (state.offset / MAX_OFFSET) * 36;

  const setOffsetFromPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!state.dragging) {
      return;
    }

    const surface = event.currentTarget.closest<HTMLElement>(".baseline-tug__surface");
    if (!surface) {
      return;
    }

    const bounds = surface.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const offset = Math.round(((ratio - 0.5) / 0.36) * MAX_OFFSET);
    setState((current) => ({ ...current, offset: Math.max(MIN_OFFSET, Math.min(MAX_OFFSET, offset)) }));
  };

  const nudge = (amount: number) => {
    setState((current) => ({
      ...current,
      offset: Math.max(MIN_OFFSET, Math.min(MAX_OFFSET, current.offset + amount)),
    }));
  };

  return (
    <section
      aria-label="Tug a notice away from its baseline"
      className="gra-ui baseline-tug"
      data-dragging={state.dragging ? "true" : "false"}
      data-position={state.offset}
    >
      <header className="baseline-tug__header">
        <span>Baseline tug</span>
        <output aria-live="polite">{state.offset > 0 ? "+" : ""}{state.offset}px</output>
      </header>

      <div
        className="baseline-tug__surface"
        onPointerMove={setOffsetFromPointer}
        onPointerUp={() => setState((current) => ({ ...current, dragging: false }))}
        onPointerCancel={() => setState((current) => ({ ...current, dragging: false }))}
      >
        <span className="baseline-tug__ruler" aria-hidden="true" />
        <div className="baseline-tug__content" style={{ "--baseline-offset": `${state.offset}px` } as React.CSSProperties}>
          {children}
        </div>
        <button
          aria-label="Move the baseline tug"
          className="baseline-tug__handle"
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              nudge(-6);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              nudge(6);
            }
          }}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            setState((current) => ({ ...current, dragging: true }));
          }}
          style={{ "--baseline-position": `${position}%` } as React.CSSProperties}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <footer className="baseline-tug__footer">
        <p aria-live="polite">
          {state.offset === 0
            ? "The notice is resting on the line it was given."
            : "The notice now keeps a real vertical disagreement with its baseline."}
        </p>
        <button
          className="baseline-tug__reset"
          disabled={state.offset === 0}
          onClick={() => setState({ dragging: false, offset: 0 })}
          type="button"
        >
          Rejoin baseline
        </button>
      </footer>
    </section>
  );
}
