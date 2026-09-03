import * as React from "react";

export interface SpacingWinchProps {
  children: React.ReactNode;
}

export function SpacingWinch({ children }: SpacingWinchProps) {
  const [spacing, setSpacing] = React.useState(0);

  return (
    <section className="gra-ui spacing-winch" data-spacing={spacing} aria-label="Wind an unnecessary amount of space into content">
      <header className="spacing-winch__header">
        <span>Spacing winch</span>
        <output aria-live="polite">{spacing} turns</output>
      </header>

      <div className="spacing-winch__stage">
        <span className="spacing-winch__caption">Current tension</span>
        <div className="spacing-winch__paper" data-spacing={spacing}>{children}</div>
      </div>

      <label className="spacing-winch__control">
        <span>Wind the letters apart</span>
        <input
          aria-label="Wind the letters apart"
          max={6}
          min={0}
          onChange={(event) => setSpacing(Number(event.target.value))}
          type="range"
          value={spacing}
        />
        <span className="spacing-winch__ticks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
      </label>

      <footer className="spacing-winch__footer">
        <p aria-live="polite">
          {spacing === 0
            ? "The words are touching at the factory setting."
            : `The child now pays ${spacing} turns of literal letter distance.`}
        </p>
        <button disabled={spacing === 0} onClick={() => setSpacing(0)} type="button">Release winch</button>
      </footer>
    </section>
  );
}
