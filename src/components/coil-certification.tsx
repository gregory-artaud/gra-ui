import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const stageNotes = [
  "The notice is still uncoiled.",
  "One loop has established a provisional perimeter.",
  "Two loops imply that the perimeter has a committee.",
  "Three loops leave very little room for an unapproved edge.",
  "Fully coiled. The notice is now certified by geometry.",
] as const;

export interface CoilCertificationProps {
  children: ReactNode;
}

export function CoilCertification({ children }: CoilCertificationProps) {
  const [stage, setStage] = useState(0);

  return (
    <section className="gra-ui coil-certification" data-stage={stage} aria-label="Coil certification">
      <header className="coil-certification__header">
        <span>Coil certification</span>
        <output aria-label={`${stage} of 4 loops`}>{stage}/4 loops</output>
      </header>

      <div className="coil-certification__chamber">
        {Array.from({ length: stage }, (_, index) => (
          <span className="coil-certification__loop" key={index} style={{ "--loop-index": index } as CSSProperties} aria-hidden="true" />
        ))}
        <div className="coil-certification__cargo">{children}</div>
      </div>

      <p className="coil-certification__note" aria-live="polite">{stageNotes[stage]}</p>

      <footer className="coil-certification__footer">
        <button type="button" onClick={() => setStage((current) => (current === 4 ? 0 : current + 1))}>
          {stage === 4 ? "Uncoil and begin again" : "Wind another loop"}
        </button>
        <button type="button" onClick={() => setStage(0)} disabled={stage === 0}>
          Remove certification
        </button>
      </footer>
    </section>
  );
}
