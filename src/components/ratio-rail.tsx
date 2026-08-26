import * as React from "react";

const clamp = (value: number) => Math.max(22, Math.min(78, value));

export interface RatioRailProps {
  children: React.ReactNode;
}

export function RatioRail({ children }: RatioRailProps) {
  const [ratio, setRatio] = React.useState(50);
  const pieces = React.Children.toArray(children);
  const splitAt = Math.ceil(pieces.length / 2);
  const leftPieces = pieces.slice(0, splitAt);
  const rightPieces = pieces.slice(splitAt);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setRatio(clamp(((event.clientX - bounds.left) / bounds.width) * 100));
  };

  const moveByKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return setRatio(22);
    if (event.key === "End") return setRatio(78);
    const amount = event.shiftKey ? 10 : 3;
    setRatio((current) => clamp(current + (event.key === "ArrowRight" ? amount : -amount)));
  };

  return (
    <section aria-label="Drag a rail to redistribute content" className="gra-ui ratio-rail">
      <header className="ratio-rail__header">
        <span>Ratio rail</span>
        <output aria-live="polite">{Math.round(ratio)} / {100 - Math.round(ratio)}</output>
      </header>

      <div
        aria-label="Adjust the proportion between the two content shelves"
        aria-valuemax={78}
        aria-valuemin={22}
        aria-valuenow={Math.round(ratio)}
        aria-valuetext={`${Math.round(ratio)} percent left shelf`}
        className="ratio-rail__surface"
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
        role="slider"
        style={{ "--ratio-left": `${ratio}%` } as React.CSSProperties}
        tabIndex={0}
      >
        <div className="ratio-rail__shelf ratio-rail__shelf--left">
          <span className="ratio-rail__shelf-label">Left shelf</span>
          {leftPieces.map((piece, index) => <div key={`left-${index}`}>{piece}</div>)}
        </div>
        <div className="ratio-rail__shelf ratio-rail__shelf--right">
          <span className="ratio-rail__shelf-label">Right shelf</span>
          {rightPieces.map((piece, index) => <div key={`right-${index}`}>{piece}</div>)}
        </div>
        <span aria-hidden="true" className="ratio-rail__handle" />
      </div>

      <footer className="ratio-rail__footer">
        <p>Drag the divider. The words stay filed, but their room allocation becomes a policy.</p>
        <button className="ratio-rail__reset" disabled={ratio === 50} onClick={() => setRatio(50)} type="button">
          Balance the shelves
        </button>
      </footer>
    </section>
  );
}
