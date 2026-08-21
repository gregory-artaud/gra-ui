import * as React from "react";

const VOWELS = "aeiou";

export interface VowelShiftProps {
  label: string;
}

function shiftVowels(label: string) {
  return Array.from(label, (character) => {
    const lower = character.toLowerCase();
    const vowelIndex = VOWELS.indexOf(lower);
    if (vowelIndex === -1) return character;

    const shifted = VOWELS[(vowelIndex + 1) % VOWELS.length];
    return character === lower ? shifted : shifted.toUpperCase();
  }).join("");
}

export function VowelShift({ label }: VowelShiftProps) {
  const [shifted, setShifted] = React.useState(false);
  const displayedLabel = shifted ? shiftVowels(label) : label;

  return (
    <section aria-label="Shift the vowels in a label" className="gra-ui vowel-shift" data-state={shifted ? "shifted" : "ready"}>
      <header className="vowel-shift__header">
        <span>Vowel shift</span>
        <output aria-live="polite">{shifted ? "one place over" : "ordinary spelling"}</output>
      </header>

      <div className="vowel-shift__paper" aria-live="polite">
        <span className="vowel-shift__caption">Displayed copy</span>
        <strong key={displayedLabel}>{displayedLabel}</strong>
      </div>

      <p className="vowel-shift__detail" aria-live="polite">
        {shifted ? "A becomes E, E becomes I, and the sentence has lost its legal footing." : "Every vowel is waiting to be moved to its next vowel."}
      </p>

      <footer className="vowel-shift__footer">
        <button className="vowel-shift__advance" onClick={() => setShifted(true)} type="button" disabled={shifted}>
          Shift every vowel
        </button>
        <button className="vowel-shift__reset" onClick={() => setShifted(false)} type="button" disabled={!shifted}>
          Restore label
        </button>
      </footer>
    </section>
  );
}
