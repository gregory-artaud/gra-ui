import * as React from "react";

export interface OrbitStowProps {
  children: React.ReactNode;
}

const ORBIT_SLOTS = 8;
const ORBIT_ANGLES = Array.from({ length: ORBIT_SLOTS }, (_, index) => index * 45);

function slotFromPointer(event: React.PointerEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - (bounds.left + bounds.width / 2);
  const y = event.clientY - (bounds.top + bounds.height / 2);
  const angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
  return Math.round((angle + 360) / 45) % ORBIT_SLOTS;
}

function nextSlot(slot: number, direction: number) {
  return (slot + direction + ORBIT_SLOTS) % ORBIT_SLOTS;
}

export function OrbitStow({ children }: OrbitStowProps) {
  const [slot, setSlot] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const setSlotFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    setSlot(slotFromPointer(event));
  };

  return (
    <section
      aria-label="Drag the content around an orbital storage ring"
      className="gra-ui orbit-stow"
      data-dragging={isDragging ? "true" : "false"}
      data-slot={slot}
    >
      <header className="orbit-stow__header">
        <span>Orbit stow</span>
        <output aria-live="polite">Dock {slot + 1} / {ORBIT_SLOTS}</output>
      </header>

      <div
        aria-label="Orbital storage ring"
        aria-valuemax={ORBIT_SLOTS - 1}
        aria-valuemin={0}
        aria-valuenow={slot}
        className="orbit-stow__orbit"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setSlot((current) => nextSlot(current, event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onPointerCancel={() => setIsDragging(false)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsDragging(true);
          setSlotFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (isDragging) {
            setSlotFromPointer(event);
          }
        }}
        onPointerUp={(event) => {
          setSlotFromPointer(event);
          setIsDragging(false);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="slider"
        tabIndex={0}
      >
        <span aria-hidden="true" className="orbit-stow__ring" />
        {ORBIT_ANGLES.map((angle, index) => (
          <span
            aria-hidden="true"
            className="orbit-stow__dock"
            data-active={slot === index ? "true" : "false"}
            key={angle}
            style={{ "--orbit-dock-angle": `${angle}deg` } as React.CSSProperties}
          >
            {index + 1}
          </span>
        ))}
        <div
          className="orbit-stow__cargo"
          style={{ "--orbit-cargo-angle": `${ORBIT_ANGLES[slot]}deg` } as React.CSSProperties}
        >
          {children}
        </div>
      </div>

      <div className="orbit-stow__footer">
        <p aria-live="polite">
          Drag the cargo around the ring or use the arrow keys. It will stay parked at the last dock.
        </p>
        <button
          className="orbit-stow__reset"
          disabled={slot === 0}
          onClick={() => {
            setSlot(0);
            setIsDragging(false);
          }}
          type="button"
        >
          Return to dock 1
        </button>
      </div>
    </section>
  );
}
