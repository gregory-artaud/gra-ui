import * as React from "react";

const INITIAL_GAP = 34;
const MIN_GAP = 8;
const MAX_GAP = 108;

function clampGap(value: number) {
  return Math.max(MIN_GAP, Math.min(MAX_GAP, Math.round(value)));
}

export interface GapTetherProps {
  children: React.ReactNode;
}

export function GapTether({ children }: GapTetherProps) {
  const items = React.Children.toArray(children);
  const splitIndex = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, splitIndex);
  const rightItems = items.slice(splitIndex);
  const [gap, setGap] = React.useState(INITIAL_GAP);

  const moveTether = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rail = event.currentTarget.parentElement;
    if (!rail) return;
    const bounds = rail.getBoundingClientRect();
    const ratio = bounds.width === 0 ? 0.5 : (event.clientX - bounds.left) / bounds.width;
    setGap(clampGap(MIN_GAP + ratio * (MAX_GAP - MIN_GAP)));
  };

  const nudgeTether = (amount: number) => setGap((value) => clampGap(value + amount));

  return (
    <section
      aria-label="Drag the tether to set an unnecessary gap between the content shelves"
      className="gra-ui gap-tether"
      data-gap={gap}
    >
      <header className="gap-tether__header">
        <span>Gap tether</span>
        <output aria-live="polite">{gap} px of separation</output>
      </header>

      <div className="gap-tether__board">
        <div className="gap-tether__shelves" style={{ "--gap-tether-size": `${gap}px` } as React.CSSProperties}>
          <div className="gap-tether__shelf">
            {leftItems.map((item, index) => <div className="gap-tether__item" key={`left-${index}`}>{item}</div>)}
          </div>
          <div className="gap-tether__shelf">
            {rightItems.map((item, index) => <div className="gap-tether__item" key={`right-${index}`}>{item}</div>)}
          </div>
        </div>
        <div
          aria-label="Gap control"
          className="gap-tether__rail"
          style={{ "--gap-tether-position": `${((gap - MIN_GAP) / (MAX_GAP - MIN_GAP)) * 100}%` } as React.CSSProperties}
        >
          <span aria-hidden="true" className="gap-tether__cable" style={{ width: `${gap}px` }} />
          <button
            aria-label="Set the gap between the shelves"
            aria-valuemax={MAX_GAP}
            aria-valuemin={MIN_GAP}
            aria-valuenow={gap}
            className="gap-tether__handle"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                event.preventDefault();
                nudgeTether(-8);
              }
              if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                event.preventDefault();
                nudgeTether(8);
              }
              if (event.key === "Home") {
                event.preventDefault();
                setGap(MIN_GAP);
              }
              if (event.key === "End") {
                event.preventDefault();
                setGap(MAX_GAP);
              }
            }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              moveTether(event);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) moveTether(event);
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            role="slider"
            type="button"
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <footer className="gap-tether__footer">
        <p>The shelves obey the handle, even though the content has nowhere useful to go.</p>
        <button className="gap-tether__reset" disabled={gap === INITIAL_GAP} onClick={() => setGap(INITIAL_GAP)} type="button">
          Re-tether
        </button>
      </footer>
    </section>
  );
}
