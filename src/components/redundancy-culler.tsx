import { useState } from "react";

export interface RedundancyCullerProps {
  label: string;
}

export function RedundancyCuller({ label }: RedundancyCullerProps) {
  const [culled, setCulled] = useState(false);
  const words = label.trim().split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const uniqueWords: string[] = [];
  const removedWords: string[] = [];

  for (const word of words) {
    const key = word.toLowerCase();
    if (seen.has(key)) removedWords.push(word);
    else {
      seen.add(key);
      uniqueWords.push(word);
    }
  }

  return (
    <section className="gra-ui redundancy-culler" data-culled={culled} aria-label="Redundancy culler">
      <header className="redundancy-culler__header">
        <span>Redundancy culler</span>
        <output aria-live="polite">{culled ? `${removedWords.length} repeats removed` : `${words.length} words intact`}</output>
      </header>

      <div className="redundancy-culler__paper">
        <p aria-live="polite">{culled ? uniqueWords.join(" ") || "∅" : label}</p>
        {culled ? (
          <dl className="redundancy-culler__drawer">
            <div><dt>Removed</dt><dd>{removedWords.length ? removedWords.join(" · ") : "Nothing. An unusually efficient sentence."}</dd></div>
          </dl>
        ) : <span className="redundancy-culler__stamp">Duplicates are currently tolerated.</span>}
      </div>

      <footer className="redundancy-culler__footer">
        <span>{culled ? "The sentence is shorter, but no wiser." : "Repeated words remain in their original places."}</span>
        <button type="button" onClick={() => setCulled((current) => !current)}>
          {culled ? "Restore repetitions" : "Cull repeats"}
        </button>
      </footer>
    </section>
  );
}
