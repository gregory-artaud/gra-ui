import * as React from "react";

const LEVELS = ["Unfiled", "Noted", "Witnessed", "Cited", "Overqualified"] as const;

export interface CitationLadderProps {
  children: React.ReactNode;
}

export function CitationLadder({ children }: CitationLadderProps) {
  const [level, setLevel] = React.useState(0);
  const complete = level === LEVELS.length - 1;

  return (
    <section
      aria-label="Add unnecessary citations to content"
      className="gra-ui citation-ladder"
      data-level={level}
    >
      <header className="citation-ladder__header">
        <span>Citation ladder</span>
        <output aria-live="polite">{LEVELS[level]} · {level} / 4</output>
      </header>

      <div className="citation-ladder__notice" aria-live="polite">
        <div className="citation-ladder__copy">
          {children}
          {Array.from({ length: level }, (_, index) => (
            <sup className="citation-ladder__mark" key={index} aria-label={`Citation ${index + 1}`}>
              {index + 1}
            </sup>
          ))}
        </div>
        {level > 0 ? (
          <ol className="citation-ladder__references" aria-label="Accumulated citations">
            {LEVELS.slice(1, level + 1).map((name, index) => (
              <li key={name}><span>[{index + 1}]</span> {name} was earned by clicking.</li>
            ))}
          </ol>
        ) : (
          <p className="citation-ladder__empty">No source has been invented yet.</p>
        )}
      </div>

      <footer className="citation-ladder__footer">
        <p aria-live="polite">
          {complete
            ? "The note is fully cited, although no source has become more credible."
            : "Add one citation at a time until an ordinary note looks academically overprepared."}
        </p>
        <div className="citation-ladder__actions">
          <button disabled={complete} onClick={() => setLevel((current) => Math.min(LEVELS.length - 1, current + 1))} type="button">
            Add citation
          </button>
          <button className="citation-ladder__reset" disabled={level === 0} onClick={() => setLevel(0)} type="button">
            Remove citations
          </button>
        </div>
      </footer>
    </section>
  );
}
