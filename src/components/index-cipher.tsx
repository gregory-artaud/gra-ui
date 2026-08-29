import * as React from "react";

function shiftLetter(letter: string, amount: number) {
  const code = letter.charCodeAt(0);
  const lower = letter >= "a" && letter <= "z";
  const upper = letter >= "A" && letter <= "Z";
  if (!lower && !upper) return letter;

  const start = lower ? 97 : 65;
  return String.fromCharCode(start + ((code - start + amount) % 26));
}

function applyIndexCipher(label: string) {
  let wordIndex = 0;
  return label.split(/(\s+)/).map((token) => {
    if (/^\s+$/.test(token) || token.length === 0) return token;
    const shifted = [...token].map((character) => shiftLetter(character, wordIndex + 1)).join("");
    wordIndex += 1;
    return shifted;
  }).join("");
}

export interface IndexCipherProps {
  label: string;
}

export function IndexCipher({ label }: IndexCipherProps) {
  const [cipherState, setCipherState] = React.useState({ label, active: false });
  const active = cipherState.label === label && cipherState.active;
  const displayedLabel = active ? applyIndexCipher(label) : label;

  return (
    <section
      aria-label="Apply a word-index cipher to the label"
      className="gra-ui index-cipher"
      data-state={active ? "ciphered" : "readable"}
    >
      <header className="index-cipher__header">
        <span>Index cipher</span>
        <output aria-live="polite">{active ? "Indexed" : "Readable"}</output>
      </header>

      <div className="index-cipher__paper" aria-live="polite">
        <span className="index-cipher__caption">Visible wording</span>
        <p key={displayedLabel}>{displayedLabel || "The empty label has no letters to index."}</p>
      </div>

      <footer className="index-cipher__footer">
        <p>{active ? "Each word moved its letters by its own place in line." : "Let every word shift farther than the word before it."}</p>
        <div className="index-cipher__actions">
          <button disabled={active} onClick={() => setCipherState({ label, active: true })} type="button">
            Apply index cipher
          </button>
          <button className="index-cipher__reset" disabled={!active} onClick={() => setCipherState({ label, active: false })} type="button">
            Restore wording
          </button>
        </div>
      </footer>
    </section>
  );
}
