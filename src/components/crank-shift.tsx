import { Children, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";

const DIAL_STEPS = 8;

export interface CrankShiftProps {
  children: ReactNode;
}

export function CrankShift({ children }: CrankShiftProps) {
  const cargo = Children.toArray(children);
  const [turn, setTurn] = useState(0);
  const offset = cargo.length === 0 ? 0 : turn % cargo.length;
  const rotated = [...cargo.slice(offset), ...cargo.slice(0, offset)];
  const dialStyle = { "--crank-angle": `${turn * 45}deg` } as CSSProperties;

  const setFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const angle = Math.atan2(event.clientY - (bounds.top + bounds.height / 2), event.clientX - (bounds.left + bounds.width / 2)) * 180 / Math.PI + 90;
    const normalized = (angle + 360) % 360;
    setTurn(Math.round(normalized / 45) % DIAL_STEPS);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) setFromPointer(event);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") setTurn(0);
    else if (event.key === "ArrowUp" || event.key === "ArrowRight") setTurn((current) => (current + 1) % DIAL_STEPS);
    else setTurn((current) => (current + DIAL_STEPS - 1) % DIAL_STEPS);
  };

  return (
    <section className="gra-ui crank-shift" data-turn={turn} aria-label="Crank shift">
      <header className="crank-shift__header">
        <span>Crank shift</span>
        <output aria-live="polite">{cargo.length ? `Turn ${turn}/7` : "No cargo"}</output>
      </header>

      <div className="crank-shift__stage">
        <div
          className="crank-shift__dial"
          role="slider"
          tabIndex={0}
          aria-label="Turn the crank to rotate the cargo order"
          aria-valuemin={0}
          aria-valuemax={7}
          aria-valuenow={turn}
          aria-valuetext={`${turn} quarter-turns; cargo order shifted by ${offset}`}
          style={dialStyle}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onKeyDown={handleKeyDown}
        >
          <span className="crank-shift__arm" aria-hidden="true"><i /></span>
          <span className="crank-shift__hub" aria-hidden="true" />
          <span className="crank-shift__hint">TURN</span>
        </div>

        <ol className="crank-shift__cargo" aria-label="Shifted cargo">
          {rotated.map((item, index) => <li key={`${index}-${offset}`}>{item}</li>)}
          {rotated.length === 0 ? <li className="crank-shift__empty">Add cargo to the crank.</li> : null}
        </ol>
      </div>

      <footer className="crank-shift__footer">
        <span>Drag the dial, or use the arrow keys.</span>
        <button type="button" onClick={() => setTurn(0)} disabled={turn === 0}>Return to intake</button>
      </footer>
    </section>
  );
}
