import * as React from "react";

interface Point {
  x: number;
  y: number;
}

const clamp = (value: number) => Math.max(8, Math.min(92, value));

export interface VanishingPointProps {
  children: React.ReactNode;
}

export function VanishingPoint({ children }: VanishingPointProps) {
  const [point, setPoint] = React.useState<Point>({ x: 50, y: 50 });

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPoint({
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 100),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 100),
    });
  };

  const moveByKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const amount = event.shiftKey ? 10 : 5;

    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    if (event.key === "Home") {
      setPoint({ x: 50, y: 50 });
      return;
    }

    setPoint((current) => ({
      x: clamp(current.x + (event.key === "ArrowRight" ? amount : event.key === "ArrowLeft" ? -amount : 0)),
      y: clamp(current.y + (event.key === "ArrowDown" ? amount : event.key === "ArrowUp" ? -amount : 0)),
    }));
  };

  return (
    <section aria-label="Drag a vanishing point around the content" className="gra-ui vanishing-point">
      <header className="vanishing-point__header">
        <span>Vanishing point</span>
        <output aria-live="polite">{Math.round(point.x)}% / {Math.round(point.y)}%</output>
      </header>

      <div
        aria-label="Perspective control; drag the point or use the arrow keys"
        className="vanishing-point__surface"
        onKeyDown={moveByKey}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          updateFromPointer(event);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        role="application"
        tabIndex={0}
        style={{
          "--vanishing-x": `${point.x}%`,
          "--vanishing-y": `${point.y}%`,
          "--vanishing-tilt-x": `${(50 - point.y) * 0.18}deg`,
          "--vanishing-tilt-y": `${(point.x - 50) * 0.18}deg`,
        } as React.CSSProperties}
      >
        <span className="vanishing-point__crosshair" aria-hidden="true" />
        <div className="vanishing-point__card">{children}</div>
      </div>

      <footer className="vanishing-point__footer">
        <p aria-live="polite">The copy has not moved. Its imagined camera has.</p>
        <button className="vanishing-point__reset" disabled={point.x === 50 && point.y === 50} onClick={() => setPoint({ x: 50, y: 50 })} type="button">
          Return to center
        </button>
      </footer>
    </section>
  );
}
