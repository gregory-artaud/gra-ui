import * as React from "react";

interface TracePoint {
  x: number;
  y: number;
}

export interface TraceReceiptProps {
  children: React.ReactNode;
}

function pointFromPointer(event: React.PointerEvent<HTMLDivElement>): TracePoint {
  const bounds = event.currentTarget.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
    y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
  };
}

function pointFromKey(point: TracePoint, key: string): TracePoint {
  const step = 8;
  const horizontal = key === "ArrowRight" ? step : key === "ArrowLeft" ? -step : 0;
  const vertical = key === "ArrowDown" ? step : key === "ArrowUp" ? -step : 0;
  return {
    x: Math.max(0, Math.min(100, point.x + horizontal)),
    y: Math.max(0, Math.min(100, point.y + vertical)),
  };
}

export function TraceReceipt({ children }: TraceReceiptProps) {
  const [points, setPoints] = React.useState<TracePoint[]>([]);
  const lastPoint = points.at(-1) ?? { x: 50, y: 50 };
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");

  const addPointerPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    setPoints((current) => [...current, pointFromPointer(event)].slice(-80));
  };

  return (
    <section
      aria-label="Draw a needless receipt around content"
      className="gra-ui trace-receipt"
      data-state={points.length > 0 ? "traced" : "waiting"}
    >
      <header className="trace-receipt__header">
        <span>Trace receipt</span>
        <output aria-live="polite">{points.length} marks</output>
      </header>

      <div
        aria-label="Trace surface; use pointer or arrow keys to draw"
        className="trace-receipt__surface"
        onKeyDown={(event) => {
          if (!(event.key in { ArrowUp: true, ArrowDown: true, ArrowLeft: true, ArrowRight: true })) {
            return;
          }

          event.preventDefault();
          setPoints((current) => [...current, pointFromKey(current.at(-1) ?? { x: 50, y: 50 }, event.key)].slice(-80));
        }}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          addPointerPoint(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            addPointerPoint(event);
          }
        }}
        onPointerUp={(event) => {
          addPointerPoint(event);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="application"
        tabIndex={0}
      >
        <svg aria-hidden="true" className="trace-receipt__ink" viewBox="0 0 100 100" preserveAspectRatio="none">
          {path ? <polyline points={path} /> : null}
          {points.at(-1) ? <circle cx={lastPoint.x} cy={lastPoint.y} r="2.5" /> : null}
        </svg>
        <div className="trace-receipt__content">{children}</div>
        {points.length === 0 ? <span className="trace-receipt__hint">Draw a line around the evidence.</span> : null}
      </div>

      <footer className="trace-receipt__footer">
        <p aria-live="polite">
          {points.length === 0
            ? "A pointer trail is waiting to become an official border."
            : "The trace is recorded as actual geometry; it still proves nothing."}
        </p>
        <button className="trace-receipt__reset" disabled={points.length === 0} onClick={() => setPoints([])} type="button">
          Erase trace
        </button>
      </footer>
    </section>
  );
}
