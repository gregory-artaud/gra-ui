import { Children, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";

const clamp = (value: number) => Math.min(92, Math.max(8, value));

export interface BeltCollectorProps {
  children: ReactNode;
}

export function BeltCollector({ children }: BeltCollectorProps) {
  const cargo = Children.toArray(children);
  const [position, setPosition] = useState(8);
  const [collected, setCollected] = useState<number[]>([]);

  const moveCollector = (value: number) => {
    const nextPosition = clamp(value);
    const target = cargo.length === 0
      ? -1
      : Math.min(cargo.length - 1, Math.max(0, Math.round(((nextPosition - 8) / 84) * (cargo.length - 1))));

    setPosition(nextPosition);
    if (target >= 0) {
      setCollected((current) => current.includes(target) ? current : [...current, target]);
    }
  };

  const setFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    moveCollector((event.clientX - bounds.left) / bounds.width * 100);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) setFromPointer(event);
  };

  const releasePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (event.key === "Home") moveCollector(8);
      else if (event.key === "End") moveCollector(92);
      else moveCollector(position + (event.key === "ArrowRight" ? 8 : -8));
    }
  };

  const collectedSet = new Set(collected);
  const collectedCargo = collected.filter((index) => index < cargo.length);
  const collectorStyle = { "--collector-position": `${position}%` } as CSSProperties;

  return (
    <section className="gra-ui belt-collector" data-collected={collected.length} aria-label="Belt collector">
      <header className="belt-collector__header">
        <span>Belt collector</span>
        <output aria-live="polite">{collected.length}/{cargo.length} collected</output>
      </header>

      <div
        className="belt-collector__surface"
        role="slider"
        tabIndex={0}
        aria-label="Drag the collector along the belt"
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${collected.length} of ${cargo.length} pieces collected`}
        style={collectorStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onKeyDown={handleKeyDown}
      >
        <div className="belt-collector__lane" aria-label="Uncollected pieces">
          {cargo.map((item, index) => collectedSet.has(index) ? null : (
            <div className="belt-collector__piece" key={index}>{item}</div>
          ))}
          {collected.length === cargo.length ? <span className="belt-collector__empty">The belt has been needlessly cleared.</span> : null}
        </div>
        <div className="belt-collector__picker" aria-hidden="true">
          <span>COLLECT</span>
          <i />
        </div>
      </div>

      <div className="belt-collector__tray" aria-label="Collected pieces">
        <span className="belt-collector__tray-label">Pickup tray</span>
        <div className="belt-collector__stack">
          {collectedCargo.map((index) => <div className="belt-collector__collected" key={index}>{cargo[index]}</div>)}
          {collectedCargo.length === 0 ? <span className="belt-collector__vacant">Nothing has been captured yet.</span> : null}
        </div>
      </div>

      <footer className="belt-collector__footer">
        <span>Drag, or use the arrow keys.</span>
        <button type="button" onClick={() => { setPosition(8); setCollected([]); }} disabled={collected.length === 0 && position === 8}>Reset belt</button>
      </footer>
    </section>
  );
}
