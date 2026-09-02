import * as React from "react";

function rotateLetter(character: string) {
  const code = character.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + 13) % 26) + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + 13) % 26) + 97);
  return character;
}

function caesar(value: string) {
  return Array.from(value, rotateLetter).join("");
}

export interface CaesarReceiptProps {
  label: string;
}

export function CaesarReceipt({ label }: CaesarReceiptProps) {
  const [state, setState] = React.useState({ source: label, sealed: false });
  const sealed = state.source === label ? state.sealed : false;
  const displayed = sealed ? caesar(label) : label;

  return (
    <section aria-label="Rotate a label through a Caesar receipt" className="gra-ui caesar-receipt" data-sealed={sealed}>
      <header className="caesar-receipt__header">
        <span>Caesar receipt</span>
        <output aria-live="polite">{sealed ? "Shifted thirteen" : "Readable"}</output>
      </header>

      <div className="caesar-receipt__paper" aria-live="polite">
        <span className="caesar-receipt__caption">The alphabet has been asked to relocate</span>
        <code key={`${label}-${sealed}`}>{displayed || "∅"}</code>
        <small>{sealed ? "Every Latin letter is thirteen places from where it started." : "Punctuation stays put while the letters wait."}</small>
      </div>

      <footer className="caesar-receipt__footer">
        <p>{sealed ? "A readable label now requires a private historical agreement." : "Issue a reversible alphabetic detour."}</p>
        <div className="caesar-receipt__actions">
          <button disabled={sealed} onClick={() => setState({ source: label, sealed: true })} type="button">Shift the alphabet</button>
          <button className="caesar-receipt__reset" disabled={!sealed} onClick={() => setState({ source: label, sealed: false })} type="button">Restore wording</button>
        </div>
      </footer>
    </section>
  );
}
