import * as React from "react";

const IMPRESSIONS = 4;

export interface PressureSealProps {
  children: React.ReactNode;
}

export function PressureSeal({ children }: PressureSealProps) {
  const [stage, setStage] = React.useState(0);
  const sealed = stage === IMPRESSIONS;

  return (
    <section
      aria-label="Build a pressure seal around the content"
      className="gra-ui pressure-seal"
      data-sealed={sealed}
      data-stage={stage}
    >
      <header className="pressure-seal__header">
        <span>Pressure seal</span>
        <output aria-live="polite">{sealed ? "Impressed" : `${stage} / ${IMPRESSIONS} impressions`}</output>
      </header>

      <div className="pressure-seal__paper" aria-live="polite">
        <div aria-hidden="true" className="pressure-seal__impressions">
          {Array.from({ length: stage }, (_, index) => (
            <span className="pressure-seal__impression" key={index} />
          ))}
        </div>
        <div className="pressure-seal__content">{children}</div>
      </div>

      <progress aria-label="Seal impressions" max={IMPRESSIONS} value={stage} />

      <footer className="pressure-seal__footer">
        <p>{sealed ? "The paper is officially over-impressed." : "Add one ceremonial impression to a perfectly adequate notice."}</p>
        <div className="pressure-seal__actions">
          <button disabled={sealed} onClick={() => setStage((value) => Math.min(IMPRESSIONS, value + 1))} type="button">
            Press one impression
          </button>
          <button className="pressure-seal__reset" disabled={stage === 0} onClick={() => setStage(0)} type="button">
            Flatten seal
          </button>
        </div>
      </footer>
    </section>
  );
}
