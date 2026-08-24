import * as React from "react";

const clamp = (value: number) => Math.max(0, Math.min(78, value));

export interface IndentTetherProps {
  children: React.ReactNode;
}

export function IndentTether({ children }: IndentTetherProps) {
  const [indent, setIndent] = React.useState(0);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setIndent(clamp(((event.clientX - bounds.left) / bounds.width) * 78));
  };

  const moveByKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (event.key === "Home") setIndent(0);
      else if (event.key === "End") setIndent(78);
      else setIndent((current) => clamp(current + (event.key === "ArrowRight" ? 6 : -6)));
    }
  };

  return (
    <section aria-label="Tether content to an arbitrary indentation" className="gra-ui indent-tether" data-indent={Math.round(indent)}>
      <header className="indent-tether__header">
        <span>Indent tether</span>
        <output aria-live="polite">{Math.round(indent)}% from the margin</output>
      </header>

      <div className="indent-tether__surface">
        <div className="indent-tether__paper" style={{ paddingInlineStart: `${indent}%` }} aria-live="polite">
          <div className="indent-tether__content">{children}</div>
        </div>
      </div>

      <div
        aria-label="Indent ruler; drag the tether or use the arrow keys"
        aria-valuemax={78}
        aria-valuemin={0}
        aria-valuenow={Math.round(indent)}
        className="indent-tether__ruler"
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
        tabIndex={0}
      >
        <span className="indent-tether__track" aria-hidden="true" />
        <span className="indent-tether__pin" style={{ left: `${indent}%` }} aria-hidden="true" />
      </div>

      <footer className="indent-tether__footer">
        <p aria-live="polite">The notice has been dragged {Math.round(indent) === 0 ? "nowhere" : "away from its perfectly adequate margin"}.</p>
        <button className="indent-tether__reset" disabled={indent === 0} onClick={() => setIndent(0)} type="button">Return to margin</button>
      </footer>
    </section>
  );
}
