import * as React from "react";

type Handle = "left" | "right";

const INITIAL_BOUNDS = { left: 18, right: 82 };

export interface PinchContractProps {
  children: React.ReactNode;
}

export function PinchContract({ children }: PinchContractProps) {
  const [state, setState] = React.useState({ ...INITIAL_BOUNDS, active: null as Handle | null });
  const width = state.right - state.left;

  const moveHandle = (handle: Handle, clientX: number, element: HTMLButtonElement) => {
    const track = element.parentElement;
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    const next = Math.max(6, Math.min(94, ((clientX - bounds.left) / bounds.width) * 100));

    setState((current) => {
      if (current.active !== handle) return current;
      if (handle === "left") return { ...current, left: Math.min(next, current.right - 12) };
      return { ...current, right: Math.max(next, current.left + 12) };
    });
  };

  const adjustHandle = (handle: Handle, amount: number) => {
    setState((current) => {
      if (handle === "left") return { ...current, left: Math.max(6, Math.min(current.left + amount, current.right - 12)) };
      return { ...current, right: Math.min(94, Math.max(current.right + amount, current.left + 12)) };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, handle: Handle) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      adjustHandle(handle, -4);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      adjustHandle(handle, 4);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setState((current) => handle === "left" ? { ...current, left: 6 } : { ...current, right: current.left + 12 });
    }
    if (event.key === "End") {
      event.preventDefault();
      setState((current) => handle === "left" ? { ...current, left: current.right - 12 } : { ...current, right: 94 });
    }
  };

  return (
    <section aria-label="Pinch content between two handles" className="gra-ui pinch-contract" data-active={state.active ?? "none"}>
      <header className="pinch-contract__header">
        <span>Pinch contract</span>
        <output aria-live="polite">{Math.round(width)}% breathing room</output>
      </header>

      <div className="pinch-contract__track" aria-label="Content pinch rail">
        <div className="pinch-contract__paper" style={{ left: `${state.left}%`, width: `${width}%` }}>
          <span className="pinch-contract__caption">The content must fit this exact jurisdiction</span>
          <div>{children}</div>
        </div>
        <button
          aria-label="Move left pinch handle"
          className="pinch-contract__handle"
          data-handle="left"
          onKeyDown={(event) => handleKeyDown(event, "left")}
          onPointerCancel={() => setState((current) => ({ ...current, active: null }))}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setState((current) => ({ ...current, active: "left" }));
          }}
          onPointerMove={(event) => moveHandle("left", event.clientX, event.currentTarget)}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            setState((current) => ({ ...current, active: null }));
          }}
          style={{ left: `${state.left}%` }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
        <button
          aria-label="Move right pinch handle"
          className="pinch-contract__handle"
          data-handle="right"
          onKeyDown={(event) => handleKeyDown(event, "right")}
          onPointerCancel={() => setState((current) => ({ ...current, active: null }))}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setState((current) => ({ ...current, active: "right" }));
          }}
          onPointerMove={(event) => moveHandle("right", event.clientX, event.currentTarget)}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            setState((current) => ({ ...current, active: null }));
          }}
          style={{ left: `${state.right}%` }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <footer className="pinch-contract__footer">
        <p>{width < 35 ? "The wording has been squeezed into a very official corner." : "Drag either handle to renegotiate the content's physical room."}</p>
        <button className="pinch-contract__reset" disabled={width === INITIAL_BOUNDS.right - INITIAL_BOUNDS.left} onClick={() => setState({ ...INITIAL_BOUNDS, active: null })} type="button">
          Reopen the contract
        </button>
      </footer>
    </section>
  );
}
