import * as React from "react";

function transformWord(token: string) {
  const match = token.match(/^(\W*)([A-Za-z]+)(\W*)$/);
  if (!match) return token;

  const [, prefix, letters, suffix] = match;
  const vowelPosition = letters.search(/[aeiou]/i);
  const transformed = vowelPosition <= 0
    ? `${letters}way`
    : `${letters.slice(vowelPosition)}${letters.slice(0, vowelPosition)}ay`;
  const cased = letters === letters.toUpperCase()
    ? transformed.toUpperCase()
    : /^[A-Z]/.test(letters)
      ? transformed.charAt(0).toUpperCase() + transformed.slice(1).toLowerCase()
      : transformed.toLowerCase();

  return `${prefix}${cased}${suffix}`;
}

function transferConsonants(label: string) {
  return label.split(/(\s+)/).map(transformWord).join("");
}

export interface ConsonantTransferProps {
  label: string;
}

export function ConsonantTransfer({ label }: ConsonantTransferProps) {
  const [transferState, setTransferState] = React.useState({ label, transferred: false });
  const transferred = transferState.label === label ? transferState.transferred : false;
  const displayedLabel = transferred ? transferConsonants(label) : label;

  return (
    <section
      aria-label="Transfer the opening consonants of each word"
      className="gra-ui consonant-transfer"
      data-state={transferred ? "transferred" : "reading"}
    >
      <header className="consonant-transfer__header">
        <span>Consonant transfer</span>
        <output aria-live="polite">{transferred ? "Transferred" : "Readable"}</output>
      </header>

      <div className="consonant-transfer__paper" aria-live="polite">
        <span className="consonant-transfer__caption">Visible wording</span>
        <p key={displayedLabel}>{displayedLabel || "The empty label has no consonants to relocate."}</p>
      </div>

      <footer className="consonant-transfer__footer">
        <p>{transferred ? "Every word has been made to travel before it may speak." : "Move each opening consonant cluster to the far end of its word."}</p>
        <div className="consonant-transfer__actions">
          <button
            disabled={transferred}
            onClick={() => setTransferState({ label, transferred: true })}
            type="button"
          >
            Transfer consonants
          </button>
          <button
            className="consonant-transfer__reset"
            disabled={!transferred}
            onClick={() => setTransferState({ label, transferred: false })}
            type="button"
          >
            Restore wording
          </button>
        </div>
      </footer>
    </section>
  );
}
