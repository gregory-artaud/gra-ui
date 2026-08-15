import { useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";

const clamp = (value: number) => Math.min(92, Math.max(8, value));

export interface ShutterPassProps {
  children: ReactNode;
}

export function ShutterPass({ children }: ShutterPassProps) {
  const [open, setOpen] = useState(42);
  const style = { "--shutter-open": `${open}%` } as CSSProperties;

  const setFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOpen(clamp(((event.clientX - bounds.left) / bounds.width) * 100));
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
      if (event.key === "Home") setOpen(8);
      else if (event.key === "End") setOpen(92);
      else setOpen((current) => clamp(current + (event.key === "ArrowRight" ? 5 : -5)));
    }
  };

  return (
    <section className="gra-ui shutter-pass" aria-label="Shutter pass">
      <header className="shutter-pass__header">
        <span>Shutter pass</span>
        <output>{Math.round(open)}% open</output>
      </header>

      <div
        className="shutter-pass__rail"
        role="slider"
        tabIndex={0}
        aria-label="Move the reading shutter"
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(open)}
        style={style}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onKeyDown={handleKeyDown}
      >
        <span className="shutter-pass__covered" aria-hidden="true">classified</span>
        <div className="shutter-pass__revealed">{children}</div>
        <span className="shutter-pass__handle" aria-hidden="true" />
      </div>

      <footer className="shutter-pass__footer">
        <span>Drag the shutter or use the arrow keys.</span>
        <button type="button" onClick={() => setOpen(42)}>Reset aperture</button>
      </footer>
    </section>
  );
}
