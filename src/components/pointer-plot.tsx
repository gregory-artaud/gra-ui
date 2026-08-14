import { useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";

type Point = { x: number; y: number };

const clamp = (value: number) => Math.min(92, Math.max(8, value));

export interface PointerPlotProps {
  children: ReactNode;
}

export function PointerPlot({ children }: PointerPlotProps) {
  const [point, setPoint] = useState<Point>({ x: 50, y: 50 });

  const placeAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPoint({
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 100),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 100),
    });
  };

  const nudgeWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    const next = { ...point };

    if (event.key === "ArrowLeft") next.x -= step;
    if (event.key === "ArrowRight") next.x += step;
    if (event.key === "ArrowUp") next.y -= step;
    if (event.key === "ArrowDown") next.y += step;
    if (next.x === point.x && next.y === point.y) return;

    event.preventDefault();
    setPoint({ x: clamp(next.x), y: clamp(next.y) });
  };

  const positionStyle = {
    "--plot-x": `${point.x}%`,
    "--plot-y": `${point.y}%`,
  } as CSSProperties;

  return (
    <section className="gra-ui pointer-plot" aria-label="Pointer plot">
      <header className="pointer-plot__header">
        <span>Pointer plot</span>
        <output aria-live="polite">{Math.round(point.x)} / {Math.round(point.y)}</output>
      </header>

      <div
        className="pointer-plot__surface"
        role="button"
        tabIndex={0}
        aria-label="Place the cargo on the plot"
        onPointerDown={placeAtPointer}
        onKeyDown={nudgeWithKeyboard}
        style={positionStyle}
      >
        <span className="pointer-plot__crosshair" aria-hidden="true" />
        <span className="pointer-plot__cargo">{children}</span>
      </div>

      <footer className="pointer-plot__footer">
        <span>Click a coordinate or use the arrow keys.</span>
        <button type="button" onClick={() => setPoint({ x: 50, y: 50 })}>
          Recenter cargo
        </button>
      </footer>
    </section>
  );
}
