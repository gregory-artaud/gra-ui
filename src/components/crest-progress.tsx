import * as React from "react";

const CRESTS = ["Low water", "Rising", "High tide", "Beacon"] as const;

export interface CrestProgressProps {
  children: React.ReactNode;
}

export function CrestProgress({ children }: CrestProgressProps) {
  const [level, setLevel] = React.useState(0);
  const complete = level === CRESTS.length - 1;

  return (
    <section
      aria-label="Raise content through an unnecessary tide gauge"
      className="gra-ui crest-progress"
      data-level={level}
    >
      <header className="crest-progress__header">
        <span>Tide gauge</span>
        <output aria-live="polite">{CRESTS[level]}</output>
      </header>

      <div
        aria-label="Tide gauge progress"
        aria-valuemax={CRESTS.length - 1}
        aria-valuemin={0}
        aria-valuenow={level}
        className="crest-progress__gauge"
        role="progressbar"
      >
        {CRESTS.map((crest, index) => (
          <span data-active={index <= level} key={crest}>{index + 1}</span>
        ))}
      </div>

      <div className="crest-progress__surface">
        <div
          className="crest-progress__cargo"
          data-complete={complete}
          style={{ "--crest-level": level } as React.CSSProperties}
        >
          <span className="crest-progress__marker" aria-hidden="true">{level + 1}</span>
          <div>{children}</div>
        </div>
      </div>

      <footer className="crest-progress__footer">
        <p aria-live="polite">
          {complete
            ? "The notice has reached a beacon that no one requested."
            : "Raise the notice one crest at a time."}
        </p>
        <div className="crest-progress__actions">
          <button disabled={complete} onClick={() => setLevel((current) => Math.min(current + 1, CRESTS.length - 1))} type="button">
            Raise one crest
          </button>
          <button className="crest-progress__reset" disabled={level === 0} onClick={() => setLevel(0)} type="button">
            Lower tide
          </button>
        </div>
      </footer>
    </section>
  );
}
