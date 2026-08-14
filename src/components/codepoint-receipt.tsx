import { useState } from "react";
import type { CSSProperties } from "react";

export interface CodepointReceiptProps {
  label: string;
}

export function CodepointReceipt({ label }: CodepointReceiptProps) {
  const [issued, setIssued] = useState(false);
  const points = Array.from(label).map((character) => ({
    character,
    codePoint: character.codePointAt(0) ?? 0,
  }));

  return (
    <section className="gra-ui codepoint-receipt" data-issued={issued}>
      <header className="codepoint-receipt__header">
        <span>Codepoint receipt</span>
        <output>{points.length} glyphs</output>
      </header>

      {issued ? (
        <ol className="codepoint-receipt__ledger" aria-label="Codepoint receipt lines">
          {points.map(({ character, codePoint }, index) => {
            const width = 18 + (codePoint % 78);

            return (
              <li key={`${character}-${index}`}>
                <span className="codepoint-receipt__glyph" aria-label={character === " " ? "space" : character}>
                  {character === " " ? "·" : character}
                </span>
                <code>U+{codePoint.toString(16).toUpperCase().padStart(4, "0")}</code>
                <i style={{ "--receipt-width": `${width}%` } as CSSProperties} aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="codepoint-receipt__original">{label}</p>
      )}

      <p className="codepoint-receipt__status" aria-live="polite">
        {issued ? "The sentence has been itemized into machine-legible evidence." : "The sentence is still readable."}
      </p>

      <button type="button" onClick={() => setIssued((current) => !current)}>
        {issued ? "Restore sentence" : "Issue receipt"}
      </button>
    </section>
  );
}
