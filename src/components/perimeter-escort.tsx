import * as React from "react";

const clamp = (value: number) => Math.max(4, Math.min(96, value));

export interface PerimeterEscortProps {
  children: React.ReactNode;
}

export function PerimeterEscort({ children }: PerimeterEscortProps) {
  const [position, setPosition] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(clamp(((event.clientX - bounds.left) / bounds.width) * 100));
  };

  const moveByKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => clamp(current + (event.key === "ArrowRight" ? 6 : -6)));
    }
  };

  return (
    <section aria-label="Escort content along an unnecessary perimeter" className="gra-ui perimeter-escort">
      <header className="perimeter-escort__header">
        <span>Perimeter escort</span>
        <output aria-live="polite">{Math.round(position)}% along</output>
      </header>

      <div
        aria-label="Perimeter rail; drag the escort or use the arrow keys"
        className="perimeter-escort__rail"
        onKeyDown={moveByKey}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          updateFromPointer(event);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        role="slider"
        tabIndex={0}
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(position)}
      >
        <span className="perimeter-escort__track" aria-hidden="true" />
        <div className="perimeter-escort__cargo" data-dragging={dragging} style={{ left: `${position}%` }}>
          <span className="perimeter-escort__pin" aria-hidden="true" />
          <div>{children}</div>
        </div>
      </div>

      <footer className="perimeter-escort__footer">
        <p aria-live="polite">The cargo has moved {Math.round(position - 50) === 0 ? "nowhere" : `${Math.abs(Math.round(position - 50))}% away from center`} for no operational gain.</p>
        <button className="perimeter-escort__reset" disabled={position === 50} onClick={() => setPosition(50)} type="button">
          Return to center
        </button>
      </footer>
    </section>
  );
}
