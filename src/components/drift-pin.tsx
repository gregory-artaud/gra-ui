import * as React from "react";

const PIN_COUNT = 7;
const DEFAULT_PIN = 3;

export interface DriftPinProps {
  children: React.ReactNode;
}

function pinFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return DEFAULT_PIN;
  }

  return Math.max(0, Math.min(PIN_COUNT - 1, Math.round(((clientX - rect.left) / rect.width) * (PIN_COUNT - 1))));
}

function moveWithKey(current: number, key: string) {
  if (key === "ArrowLeft") return Math.max(0, current - 1);
  if (key === "ArrowRight") return Math.min(PIN_COUNT - 1, current + 1);
  if (key === "Home") return 0;
  if (key === "End") return PIN_COUNT - 1;
  return current;
}

export function DriftPin({ children }: DriftPinProps) {
  const [pin, setPin] = React.useState(DEFAULT_PIN);

  return (
    <section aria-label="Drag content along an unnecessary pin rail" className="gra-ui drift-pin" data-pin={pin}>
      <header className="drift-pin__header">
        <span>Drift pin</span>
        <output aria-live="polite">slot {pin + 1} / {PIN_COUNT}</output>
      </header>

      <div
        aria-label="Move the content pin"
        aria-valuemax={PIN_COUNT - 1}
        aria-valuemin={0}
        aria-valuenow={pin}
        className="drift-pin__rail"
        onKeyDown={(event) => {
          const next = moveWithKey(pin, event.key);
          if (next !== pin) {
            event.preventDefault();
            setPin(next);
          }
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setPin(pinFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            setPin(pinFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
          }
        }}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="slider"
        tabIndex={0}
      >
        <div aria-hidden="true" className="drift-pin__markers">
          {Array.from({ length: PIN_COUNT }, (_, index) => <i key={index} data-active={index === pin} />)}
        </div>
        <div className="drift-pin__cargo" style={{ gridColumn: pin + 1 }}>{children}</div>
      </div>

      <footer className="drift-pin__footer">
        <p aria-live="polite">The cargo is parked at a real slot, although the rail has no destination.</p>
        <button className="drift-pin__reset" onClick={() => setPin(DEFAULT_PIN)} type="button">Center pin</button>
      </footer>
    </section>
  );
}
