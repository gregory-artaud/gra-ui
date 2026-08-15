import { useState } from "react";

export interface AcronymForgeProps {
  label: string;
}

export function AcronymForge({ label }: AcronymForgeProps) {
  const [forged, setForged] = useState(false);
  const words = label.trim().split(/\s+/).filter(Boolean);
  const initials = words.map((word) => Array.from(word)[0] ?? "").join("").toUpperCase();

  return (
    <section className="gra-ui acronym-forge" data-forged={forged}>
      <header className="acronym-forge__header">
        <span>Acronym forge</span>
        <output aria-live="polite">{forged ? `${words.length} words reduced` : "Full phrase"}</output>
      </header>

      {forged ? (
        <div className="acronym-forge__forged">
          <strong aria-label={`Acronym ${initials}`}>{initials || "∅"}</strong>
          <ol aria-label="Acronym sources">
            {words.map((word, index) => <li key={`${word}-${index}`}><b>{Array.from(word)[0] ?? ""}</b>{word.slice(1)}</li>)}
          </ol>
        </div>
      ) : (
        <p className="acronym-forge__original">{label}</p>
      )}

      <p className="acronym-forge__status" aria-live="polite">
        {forged ? "The readable phrase has been reduced to its opening letters." : "The phrase is still carrying all of its words."}
      </p>

      <button type="button" onClick={() => setForged((current) => !current)}>
        {forged ? "Restore phrase" : "Forge acronym"}
      </button>
    </section>
  );
}
