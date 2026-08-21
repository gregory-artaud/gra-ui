import * as React from "react";

const VEILS = [
  { name: "Unissued", detail: "The notice is still in the open air." },
  { name: "First veil", detail: "One layer has been assigned to the notice." },
  { name: "Second veil", detail: "The message now has a private middle." },
  { name: "Third veil", detail: "The outside world may keep guessing." },
  { name: "Fully veiled", detail: "The notice has received more privacy than it needs." },
] as const;

export interface ApportionVeilProps {
  children: React.ReactNode;
}

export function ApportionVeil({ children }: ApportionVeilProps) {
  const [stage, setStage] = React.useState(0);
  const currentVeil = VEILS[stage];

  return (
    <section
      aria-label="Apportion unnecessary veils around content"
      className="gra-ui apportion-veil"
      data-stage={stage}
    >
      <header className="apportion-veil__header">
        <span>Apportion veil</span>
        <output aria-live="polite">{stage} / 4</output>
      </header>

      <div className="apportion-veil__chamber">
        <div aria-hidden="true" className="apportion-veil__halo" />
        <div className="apportion-veil__content">{children}</div>
        {Array.from({ length: stage }, (_, index) => (
          <span aria-hidden="true" className="apportion-veil__line" key={index} />
        ))}
      </div>

      <p aria-live="polite" className="apportion-veil__detail">
        <strong>{currentVeil.name}</strong> — {currentVeil.detail}
      </p>

      <footer className="apportion-veil__footer">
        <button
          className="apportion-veil__advance"
          onClick={() => setStage((current) => (current === VEILS.length - 1 ? 0 : current + 1))}
          type="button"
        >
          {stage === VEILS.length - 1 ? "Unveil and begin again" : "Assign another veil"}
        </button>
        <button
          className="apportion-veil__reset"
          disabled={stage === 0}
          onClick={() => setStage(0)}
          type="button"
        >
          Clear veils
        </button>
      </footer>
    </section>
  );
}
