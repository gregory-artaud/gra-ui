import { useState } from "react";
import type { ReactNode } from "react";

const placements = [
  { id: "lead", label: "Lead", hint: "witness first" },
  { id: "side", label: "Side", hint: "witness beside" },
  { id: "tail", label: "Tail", hint: "witness after" },
] as const;

type Placement = (typeof placements)[number]["id"];

export interface WitnessChoiceProps {
  children: ReactNode;
}

export function WitnessChoice({ children }: WitnessChoiceProps) {
  const [placement, setPlacement] = useState<Placement | null>(null);

  return (
    <section className="gra-ui witness-choice" data-placement={placement ?? "waiting"}>
      <header className="witness-choice__header">
        <span>Witness choice</span>
        <output aria-live="polite">{placement ? `${placement} witness` : "Choose a position"}</output>
      </header>

      <nav className="witness-choice__choices" aria-label="Witness positions">
        {placements.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={placement === option.id}
            onClick={() => setPlacement(option.id)}
          >
            <strong>{option.label}</strong>
            <small>{option.hint}</small>
          </button>
        ))}
      </nav>

      <div className="witness-choice__result">
        {placement === null ? <p className="witness-choice__empty">The notice is waiting for an unnecessary witness.</p> : null}
        {placement === "lead" ? (
          <article className="witness-choice__lead">
            <span className="witness-choice__witness">WITNESS A</span>
            <div>{children}</div>
          </article>
        ) : null}
        {placement === "side" ? (
          <div className="witness-choice__side">
            <div>{children}</div>
            <span className="witness-choice__witness">WITNESS B</span>
          </div>
        ) : null}
        {placement === "tail" ? (
          <figure className="witness-choice__tail">
            <div>{children}</div>
            <figcaption><span className="witness-choice__witness">WITNESS C</span> follows the evidence.</figcaption>
          </figure>
        ) : null}
      </div>

      <button className="witness-choice__reset" type="button" onClick={() => setPlacement(null)} disabled={placement === null}>
        Return to unwitnessed
      </button>
    </section>
  );
}
