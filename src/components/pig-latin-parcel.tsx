import * as React from "react";

export interface PigLatinParcelProps {
  label: string;
}

type PigLatinParcelState = {
  packed: boolean;
  signature: string;
};

function pigLatinWord(word: string) {
  const match = word.match(/^(\W*)([A-Za-z]+)(\W*)$/);
  if (!match) {
    return word;
  }

  const [, prefix, letters, suffix] = match;
  const vowelIndex = letters.search(/[aeiou]/i);
  const transformed = vowelIndex <= 0
    ? `${letters}way`
    : `${letters.slice(vowelIndex)}${letters.slice(0, vowelIndex)}ay`;

  return `${prefix}${transformed}${suffix}`;
}

function toPigLatin(label: string) {
  return label.split(/(\s+)/).map((part) => (/\s+/.test(part) ? part : pigLatinWord(part))).join("");
}

export function PigLatinParcel({ label }: PigLatinParcelProps) {
  const [state, setState] = React.useState<PigLatinParcelState>({ packed: false, signature: label });
  const packed = state.signature === label && state.packed;
  const parcel = packed ? toPigLatin(label) : label;

  return (
    <section className="gra-ui pig-latin-parcel" data-state={packed ? "packed" : "readable"} aria-label="Pack a label into Pig Latin">
      <header className="pig-latin-parcel__header">
        <span>Pig Latin parcel</span>
        <output aria-live="polite">{packed ? "Packed" : "Readable"}</output>
      </header>

      <div className="pig-latin-parcel__paper" aria-live="polite">
        <span className="pig-latin-parcel__caption">Visible wording</span>
        <strong key={packed ? "packed" : "readable"}>{parcel || "No label submitted."}</strong>
      </div>

      <footer className="pig-latin-parcel__footer">
        <p aria-live="polite">
          {packed
            ? "The sentence changed syllable jurisdiction without becoming more useful."
            : "Pack the label into a dialect no interface requested."}
        </p>
        <div className="pig-latin-parcel__actions">
          <button disabled={packed || label.length === 0} onClick={() => setState({ packed: true, signature: label })} type="button">
            Pack wording
          </button>
          <button disabled={!packed} onClick={() => setState({ packed: false, signature: label })} type="button">Restore label</button>
        </div>
      </footer>
    </section>
  );
}
