import * as React from "react";

type Point = {
  x: number;
  y: number;
};

type PinId = "anchor" | "witness";

const INITIAL_POINTS: Record<PinId, Point> = {
  anchor: { x: 22, y: 28 },
  witness: { x: 78, y: 72 },
};

function clamp(value: number) {
  return Math.max(8, Math.min(92, value));
}

export interface ConvergenceMarkProps {
  children: React.ReactNode;
}

export function ConvergenceMark({ children }: ConvergenceMarkProps) {
  const [points, setPoints] = React.useState(INITIAL_POINTS);
  const distance = Math.hypot(points.anchor.x - points.witness.x, points.anchor.y - points.witness.y);
  const converged = distance <= 10;

  const movePin = (pin: PinId, event: React.PointerEvent<HTMLButtonElement>) => {
    const board = event.currentTarget.parentElement;
    if (!board) return;
    const bounds = board.getBoundingClientRect();
    const x = bounds.width === 0 ? 50 : ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = bounds.height === 0 ? 50 : ((event.clientY - bounds.top) / bounds.height) * 100;
    setPoints((previous) => ({ ...previous, [pin]: { x: clamp(x), y: clamp(y) } }));
  };

  const nudge = (pin: PinId, x: number, y: number) => {
    setPoints((previous) => ({
      ...previous,
      [pin]: { x: clamp(previous[pin].x + x), y: clamp(previous[pin].y + y) },
    }));
  };

  const handleKeyDown = (pin: PinId, event: React.KeyboardEvent<HTMLButtonElement>) => {
    const movement: Record<string, Point> = {
      ArrowUp: { x: 0, y: -6 },
      ArrowDown: { x: 0, y: 6 },
      ArrowLeft: { x: -6, y: 0 },
      ArrowRight: { x: 6, y: 0 },
    };
    const next = movement[event.key];
    if (!next) return;
    event.preventDefault();
    nudge(pin, next.x, next.y);
  };

  return (
    <section
      aria-label="Bring two pins together around the content"
      className="gra-ui convergence-mark"
      data-converged={converged}
    >
      <header className="convergence-mark__header">
        <span>Convergence mark</span>
        <output aria-live="polite">{converged ? "Coincidence recorded" : `${Math.round(distance)} units apart`}</output>
      </header>

      <div className="convergence-mark__board">
        <svg aria-hidden="true" className="convergence-mark__lines" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line x1={points.anchor.x} x2={points.witness.x} y1={points.anchor.y} y2={points.witness.y} />
        </svg>
        <div className="convergence-mark__cargo">{children}</div>
        {(["anchor", "witness"] as const).map((pin) => (
          <button
            aria-label={`Move the ${pin} pin`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={Math.round(points[pin].x)}
            className={`convergence-mark__pin convergence-mark__pin--${pin}`}
            key={pin}
            onKeyDown={(event) => handleKeyDown(pin, event)}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              movePin(pin, event);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) movePin(pin, event);
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            role="slider"
            style={{ left: `${points[pin].x}%`, top: `${points[pin].y}%` }}
            type="button"
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>

      <footer className="convergence-mark__footer">
        <p>{converged ? "Two independent authorities now occupy the same pixel." : "Drag both pins until their disagreement becomes geometrically negligible."}</p>
        <button className="convergence-mark__reset" disabled={points.anchor.x === INITIAL_POINTS.anchor.x && points.anchor.y === INITIAL_POINTS.anchor.y && points.witness.x === INITIAL_POINTS.witness.x && points.witness.y === INITIAL_POINTS.witness.y} onClick={() => setPoints(INITIAL_POINTS)} type="button">
          Separate pins
        </button>
      </footer>
    </section>
  );
}
