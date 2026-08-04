import * as React from "react";

const ALPHABET_SIZE = 26;
const MAX_SHIFTS = 12;

export interface AlphabetTreadmillProps {
  label: string;
}

function shiftCharacter(character: string, shift: number) {
  const code = character.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(65 + ((code - 65 + shift) % ALPHABET_SIZE));
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(97 + ((code - 97 + shift) % ALPHABET_SIZE));
  }

  return character;
}

function shiftLabel(label: string, shift: number) {
  return Array.from(label, (character) => shiftCharacter(character, shift)).join("");
}

export function AlphabetTreadmill({ label }: AlphabetTreadmillProps) {
  const [shift, setShift] = React.useState(0);
  const isComplete = shift === MAX_SHIFTS;
  const displayedLabel = shiftLabel(label, shift);

  return (
    <section
      aria-label="Advance a label through the alphabet"
      className="gra-ui alphabet-treadmill"
      data-shift={shift}
      data-state={isComplete ? "complete" : shift > 0 ? "moving" : "ready"}
    >
      <header className="alphabet-treadmill__header">
        <span>Alphabet treadmill</span>
        <output aria-live="polite">{shift} / {MAX_SHIFTS} turns</output>
      </header>

      <div aria-live="polite" className="alphabet-treadmill__display">
        <span className="alphabet-treadmill__label" key={shift}>
          {displayedLabel || "(empty label)"}
        </span>
      </div>

      <div className="alphabet-treadmill__controls">
        <button
          className="alphabet-treadmill__advance"
          disabled={isComplete}
          onClick={() => setShift((current) => Math.min(current + 1, MAX_SHIFTS))}
          type="button"
        >
          {isComplete ? "Treadmill complete" : "Advance one letter"}
        </button>
        {shift > 0 ? (
          <button
            className="alphabet-treadmill__reset"
            onClick={() => setShift(0)}
            type="button"
          >
            Restore original
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className="alphabet-treadmill__status">
        {isComplete
          ? "The label has walked twelve letters forward and is now resting."
          : shift === 0
            ? "Each turn advances every letter by one place, for no editorial reason."
            : `${MAX_SHIFTS - shift} turns remain before the label is allowed to stop.`}
      </p>
    </section>
  );
}
