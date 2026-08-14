import { useState } from "react";
import type { ReactNode } from "react";

const filingModes = [
  { id: "ledger", label: "Ledger", hint: "number it" },
  { id: "frame", label: "Frame", hint: "contain it" },
  { id: "echo", label: "Echo", hint: "quote it" },
] as const;

type FilingMode = (typeof filingModes)[number]["id"];

export interface FilingForkProps {
  children: ReactNode;
}

export function FilingFork({ children }: FilingForkProps) {
  const [mode, setMode] = useState<FilingMode | null>(null);

  return (
    <section className="gra-ui filing-fork" data-mode={mode ?? "waiting"}>
      <header className="filing-fork__header">
        <span>Filing fork</span>
        <output aria-live="polite">{mode ? `${mode} filing` : "Choose a shelf"}</output>
      </header>

      <nav className="filing-fork__choices" aria-label="Filing styles">
        {filingModes.map((filingMode) => (
          <button
            key={filingMode.id}
            type="button"
            aria-pressed={mode === filingMode.id}
            onClick={() => setMode(filingMode.id)}
          >
            <strong>{filingMode.label}</strong>
            <small>{filingMode.hint}</small>
          </button>
        ))}
      </nav>

      <div className="filing-fork__result">
        {mode === null ? (
          <p className="filing-fork__empty">One piece of content. Three defensible shelves.</p>
        ) : null}
        {mode === "ledger" ? (
          <ol className="filing-fork__ledger">
            <li>Entry 01</li>
            <li>{children}</li>
            <li>Filed without further action</li>
          </ol>
        ) : null}
        {mode === "frame" ? (
          <fieldset className="filing-fork__frame">
            <legend>Contained notice</legend>
            {children}
          </fieldset>
        ) : null}
        {mode === "echo" ? (
          <figure className="filing-fork__echo">
            <blockquote>{children}</blockquote>
            <figcaption>Repeated for emphasis</figcaption>
          </figure>
        ) : null}
      </div>

      <button
        type="button"
        className="filing-fork__reset"
        onClick={() => setMode(null)}
        disabled={mode === null}
      >
        Return to intake
      </button>
    </section>
  );
}
