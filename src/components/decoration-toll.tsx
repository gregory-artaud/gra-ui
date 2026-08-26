import * as React from "react";

const PASSES = ["Unmarked", "Underline", "Double line", "Crossed", "Stamped"] as const;

export interface DecorationTollProps {
  children: React.ReactNode;
}

export function DecorationToll({ children }: DecorationTollProps) {
  const [passes, setPasses] = React.useState(0);
  const complete = passes === PASSES.length - 1;

  return (
    <section
      aria-label="Accumulate unnecessary typographic ink"
      className="gra-ui decoration-toll"
      data-passes={passes}
    >
      <header className="decoration-toll__header">
        <span>Decoration toll</span>
        <output aria-live="polite">{PASSES[passes]}</output>
      </header>

      <div
        aria-label="Decoration toll progress"
        aria-valuemax={PASSES.length - 1}
        aria-valuemin={0}
        aria-valuenow={passes}
        className="decoration-toll__meter"
        role="progressbar"
      >
        {PASSES.map((pass, index) => (
          <span data-active={index <= passes} key={pass}>{index + 1}</span>
        ))}
      </div>

      <div className="decoration-toll__stage" aria-live="polite">
        <div className="decoration-toll__notice" key={passes}>
          {children}
        </div>
      </div>

      <footer className="decoration-toll__footer">
        <p>
          {complete
            ? "The notice has paid every typographic fee and gained no authority."
            : "Pay one more ink fee to make the notice harder to justify."}
        </p>
        <div className="decoration-toll__actions">
          <button disabled={complete} onClick={() => setPasses((current) => Math.min(current + 1, PASSES.length - 1))} type="button">
            Add one ink pass
          </button>
          <button className="decoration-toll__reset" disabled={passes === 0} onClick={() => setPasses(0)} type="button">
            Remove ink
          </button>
        </div>
      </footer>
    </section>
  );
}
