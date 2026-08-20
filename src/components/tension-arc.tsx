import * as React from "react";

export interface TensionArcProps {
  children: React.ReactNode;
}

export function TensionArc({ children }: TensionArcProps) {
  const items = React.Children.toArray(children);
  const [tension, setTension] = React.useState(0);
  const divisor = Math.max(1, items.length - 1);

  return (
    <section
      aria-label="Bend a row of content into an unnecessary arc"
      className="gra-ui tension-arc"
      data-state={tension === 0 ? "straight" : "bending"}
    >
      <header className="tension-arc__header">
        <span>Tension arc</span>
        <output aria-live="polite">{tension}% sag</output>
      </header>

      <div className="tension-arc__stage">
        <div aria-hidden="true" className="tension-arc__rail" />
        <div className="tension-arc__items">
          {items.length > 0 ? items.map((item, index) => {
            const offset = Math.round(Math.sin((index / divisor) * Math.PI) * tension * 0.42);

            return (
              <div
                className="tension-arc__item"
                key={`${index}-${String(item)}`}
                style={{ "--arc-offset": `${offset}px` } as React.CSSProperties}
              >
                {item}
              </div>
            );
          }) : (
            <span className="tension-arc__empty">Add content to give the arc something to bend.</span>
          )}
        </div>
      </div>

      <label className="tension-arc__control">
        <span>Pull the tension</span>
        <input
          aria-label="Pull the tension across the row"
          max="100"
          min="0"
          onChange={(event) => setTension(Number(event.target.value))}
          type="range"
          value={tension}
        />
        <span aria-hidden="true">100</span>
      </label>

      <footer className="tension-arc__footer">
        <p aria-live="polite">
          {tension === 0
            ? "Drag the control. A straight row is apparently too emotionally stable."
            : "The middle is sagging while the content remains exactly the same."}
        </p>
        <button
          className="tension-arc__reset"
          disabled={tension === 0}
          onClick={() => setTension(0)}
          type="button"
        >
          Release tension
        </button>
      </footer>
    </section>
  );
}
