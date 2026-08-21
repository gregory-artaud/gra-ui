import * as React from "react";

const FATES = [
  { id: "notice", label: "Notice", hint: "keep it plain" },
  { id: "parcel", label: "Parcel", hint: "file it away" },
  { id: "monument", label: "Monument", hint: "make it grand" },
] as const;

type FateId = (typeof FATES)[number]["id"];

export interface FatePanelProps {
  children: React.ReactNode;
}

export function FatePanel({ children }: FatePanelProps) {
  const [fate, setFate] = React.useState<FateId | null>(null);

  return (
    <section
      aria-label="Choose a questionable fate for content"
      className="gra-ui fate-panel"
      data-fate={fate ?? "undecided"}
    >
      <header className="fate-panel__header">
        <span>Fate panel</span>
        <output aria-live="polite">{fate ? `Assigned: ${fate}` : "Awaiting a ruling"}</output>
      </header>

      <div className="fate-panel__result" aria-live="polite">
        {fate === null ? <p className="fate-panel__empty">One child. Three unnecessarily final destinations.</p> : null}
        {fate === "notice" ? (
          <aside className="fate-panel__notice">
            <span>ordinary notice</span>
            <strong>{children}</strong>
          </aside>
        ) : null}
        {fate === "parcel" ? (
          <dl className="fate-panel__parcel">
            <dt>Filed object</dt>
            <dd>{children}</dd>
            <dd><small>Kept under a label nobody requested.</small></dd>
          </dl>
        ) : null}
        {fate === "monument" ? (
          <figure className="fate-panel__monument">
            <blockquote>{children}</blockquote>
            <figcaption>Declared too important to remain inline</figcaption>
          </figure>
        ) : null}
      </div>

      <div aria-label="Content fates" className="fate-panel__choices" role="group">
        {FATES.map((option) => (
          <button
            aria-pressed={fate === option.id}
            className="fate-panel__choice"
            data-selected={fate === option.id}
            key={option.id}
            onClick={() => setFate(option.id)}
            type="button"
          >
            <strong>{option.label}</strong>
            <small>{option.hint}</small>
          </button>
        ))}
      </div>

      <button
        className="fate-panel__reset"
        disabled={fate === null}
        onClick={() => setFate(null)}
        type="button"
      >
        Return to uncertainty
      </button>
    </section>
  );
}
