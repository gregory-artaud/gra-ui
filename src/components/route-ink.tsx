import * as React from "react";

type Point = {
  x: number;
  y: number;
};

const START: Point = { x: 50, y: 50 };

function clamp(value: number) {
  return Math.max(4, Math.min(96, value));
}

export interface RouteInkProps {
  children: React.ReactNode;
}

export function RouteInk({ children }: RouteInkProps) {
  const [routeState, setRouteState] = React.useState({ points: [START], active: false });
  const currentPoint = routeState.points[routeState.points.length - 1] ?? START;

  const recordPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = event.currentTarget.parentElement;
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    const x = bounds.width === 0 ? 50 : ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = bounds.height === 0 ? 50 : ((event.clientY - bounds.top) / bounds.height) * 100;
    const point = { x: clamp(x), y: clamp(y) };

    setRouteState((previous) => ({
      points: [...previous.points.slice(-23), point],
      active: true,
    }));
  };

  const nudge = (x: number, y: number) => {
    setRouteState((previous) => {
      const point = previous.points[previous.points.length - 1] ?? START;
      const nextPoint = { x: clamp(point.x + x), y: clamp(point.y + y) };
      return { points: [...previous.points.slice(-23), nextPoint], active: false };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const movements: Record<string, Point> = {
      ArrowUp: { x: 0, y: -8 },
      ArrowDown: { x: 0, y: 8 },
      ArrowLeft: { x: -8, y: 0 },
      ArrowRight: { x: 8, y: 0 },
    };
    const movement = movements[event.key];

    if (movement) {
      event.preventDefault();
      nudge(movement.x, movement.y);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setRouteState((previous) => ({ points: [...previous.points, START], active: false }));
    }
    if (event.key === "End") {
      event.preventDefault();
      setRouteState((previous) => ({ points: [...previous.points, { x: 96, y: 50 }], active: false }));
    }
  };

  return (
    <section aria-label="Draw a route for the content" className="gra-ui route-ink">
      <header className="route-ink__header">
        <span>Route ink</span>
        <output aria-live="polite">{routeState.points.length - 1} marks</output>
      </header>

      <div className="route-ink__track">
        <svg aria-hidden="true" className="route-ink__map" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polyline points={routeState.points.map((point) => `${point.x},${point.y}`).join(" ")} />
        </svg>
        <div
          aria-label="Move the route pen"
          aria-orientation="horizontal"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(currentPoint.x)}
          aria-valuetext={`${Math.round(currentPoint.x)} percent across, ${Math.round(currentPoint.y)} percent down`}
          className="route-ink__handle"
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            recordPoint(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) recordPoint(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            setRouteState((previous) => ({ ...previous, active: false }));
          }}
          role="slider"
          style={{ left: `${currentPoint.x}%`, top: `${currentPoint.y}%` }}
          tabIndex={0}
        >
          <span aria-hidden="true" />
        </div>
        <div className="route-ink__cargo" style={{ left: `${currentPoint.x}%`, top: `${currentPoint.y}%` }}>
          {children}
        </div>
      </div>

      <footer className="route-ink__footer">
        <p>{routeState.active ? "The pen is still deciding where the cargo belongs." : "The cargo keeps every arbitrary turn of the route."}</p>
        <button
          className="route-ink__reset"
          disabled={routeState.points.length === 1}
          onClick={() => setRouteState({ points: [START], active: false })}
          type="button"
        >
          Erase route
        </button>
      </footer>
    </section>
  );
}
