import * as React from "react";

const INITIAL_POSITION = { x: 74, y: 28 } as const;

export interface TetherPullProps {
  children: React.ReactNode;
}

interface TetherPullState {
  dragging: boolean;
  x: number;
  y: number;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function createState(): TetherPullState {
  return { ...INITIAL_POSITION, dragging: false };
}

export function TetherPull({ children }: TetherPullProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<TetherPullState>(createState);
  const current = state;

  const positionFromPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;

    if (!stage) {
      return null;
    }

    const bounds = stage.getBoundingClientRect();
    return {
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 100, 12, 88),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 100, 16, 84),
    };
  };

  const updateFromPointer = (event: React.PointerEvent<HTMLButtonElement>, dragging: boolean) => {
    const position = positionFromPointer(event);

    if (!position) {
      return;
    }

    setState({ ...position, dragging });
  };

  return (
    <section
      aria-label="Pull an anchor away from the content without moving the content"
      className="gra-ui tether-pull"
      data-dragging={current.dragging}
      data-state={current.x === INITIAL_POSITION.x && current.y === INITIAL_POSITION.y ? "resting" : "pulled"}
    >
      <header className="tether-pull__header">
        <span>Tether pull</span>
        <output aria-live="polite">{Math.round(current.x)} / {Math.round(current.y)}</output>
      </header>

      <div className="tether-pull__stage" ref={stageRef}>
        <svg aria-hidden="true" className="tether-pull__line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="50" x2={current.x} y2={current.y} />
        </svg>
        <div className="tether-pull__cargo">{children}</div>
        <button
          aria-label={`Tether anchor at ${Math.round(current.x)} percent across and ${Math.round(current.y)} percent down`}
          className="tether-pull__anchor"
          onKeyDown={(event) => {
            const horizontal = event.key === "ArrowRight" ? 4 : event.key === "ArrowLeft" ? -4 : 0;
            const vertical = event.key === "ArrowDown" ? 4 : event.key === "ArrowUp" ? -4 : 0;

            if (horizontal === 0 && vertical === 0) {
              return;
            }

            event.preventDefault();
            setState((previous) => ({
              ...previous,
              x: clamp(previous.x + horizontal, 12, 88),
              y: clamp(previous.y + vertical, 16, 84),
            }));
          }}
          onPointerCancel={() => setState((previous) => ({ ...previous, dragging: false }))}
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event, true);
          }}
          onPointerMove={(event) => {
            if (current.dragging) {
              updateFromPointer(event, true);
            }
          }}
          onPointerUp={(event) => {
            updateFromPointer(event, false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          style={{ left: `${current.x}%`, top: `${current.y}%` }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <footer className="tether-pull__footer">
        <p aria-live="polite">
          {current.x === INITIAL_POSITION.x && current.y === INITIAL_POSITION.y
            ? "Drag the anchor. The content will stay put while the tether complains."
            : "The anchor moved; the content remains exactly where it was."}
        </p>
        <button
          className="tether-pull__reset"
          disabled={current.x === INITIAL_POSITION.x && current.y === INITIAL_POSITION.y && !current.dragging}
          onClick={() => setState(createState())}
          type="button"
        >
          Relax the tether
        </button>
      </footer>
    </section>
  );
}
