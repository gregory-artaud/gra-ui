import { useState } from "react";
import type { ReactNode } from "react";

const stageNotes = [
  "The notice has not earned a notch.",
  "One notch says the notice was briefly considered.",
  "Two notches suggest an unnecessary committee.",
  "Three notches make the border look official.",
  "Four notches leave almost no room for doubt.",
  "Fully notarized. The notice may now be read.",
] as const;

export interface NotchProgressProps {
  children: ReactNode;
}

export function NotchProgress({ children }: NotchProgressProps) {
  const [stage, setStage] = useState(0);

  return (
    <section className="gra-ui notch-progress" data-stage={stage} aria-label="Notch progress">
      <header className="notch-progress__header">
        <span>Notch progress</span>
        <output aria-label={`${stage} of 5 notches`}>{stage}/5</output>
      </header>

      <figure className="notch-progress__seal">
        <ol aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <li key={index} data-filled={index < stage}>
              {index + 1}
            </li>
          ))}
        </ol>
        <figcaption>{children}</figcaption>
      </figure>

      <p className="notch-progress__note" aria-live="polite">
        {stageNotes[stage]}
      </p>

      <footer className="notch-progress__footer">
        <button
          type="button"
          className="notch-progress__advance"
          onClick={() => setStage((current) => (current === 5 ? 0 : current + 1))}
        >
          {stage === 5 ? "Begin again" : "Add a notch"}
        </button>
        <button
          type="button"
          className="notch-progress__reset"
          onClick={() => setStage(0)}
          disabled={stage === 0}
        >
          Clear seal
        </button>
      </footer>
    </section>
  );
}
