import * as React from "react";

export interface VowelHingeProps {
  label: string;
}

interface VowelHingeState {
  label: string;
  hinged: number;
}

function createState(label: string): VowelHingeState {
  return { label, hinged: 0 };
}

function splitAtFirstVowel(word: string) {
  const letters = Array.from(word);
  const vowelIndex = letters.findIndex((letter) => "aeiouy".includes(letter.toLowerCase()));

  if (vowelIndex === -1) {
    return { before: letters.join(""), vowel: "·", after: "" };
  }

  return {
    before: letters.slice(0, vowelIndex).join(""),
    vowel: letters[vowelIndex],
    after: letters.slice(vowelIndex + 1).join(""),
  };
}

export function VowelHinge({ label }: VowelHingeProps) {
  const [state, setState] = React.useState<VowelHingeState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const tokens = label.split(/(\s+)/).filter(Boolean);
  const words = tokens.filter((token) => !/^\s+$/.test(token));
  const isComplete = current.hinged === words.length;

  return (
    <section
      aria-label="Remove one vowel from each word and hang it beside the sentence"
      className="gra-ui vowel-hinge"
      data-hinged={current.hinged}
      data-state={isComplete ? "complete" : current.hinged > 0 ? "hinging" : "ready"}
    >
      <header className="vowel-hinge__header">
        <span>Vowel hinge</span>
        <output aria-live="polite">{current.hinged} / {words.length} hinged</output>
      </header>

      <div className="vowel-hinge__sentence" aria-live="polite">
        {tokens.map((token, tokenIndex) => {
          if (/^\s+$/.test(token)) {
            return <span aria-hidden="true" key={`${label}-space-${tokenIndex}`}>{token}</span>;
          }

          const index = tokens
            .slice(0, tokenIndex)
            .filter((value) => !/^\s+$/.test(value)).length;
          const isHinged = index < current.hinged;

          if (!isHinged) {
            return <span className="vowel-hinge__word" key={`${label}-${tokenIndex}`}>{token}</span>;
          }

          const split = splitAtFirstVowel(token);

          return (
            <span
              aria-label={token}
              className="vowel-hinge__word"
              data-hinged="true"
              key={`${label}-${tokenIndex}`}
            >
              <span>{split.before}</span>
              <span aria-hidden="true" className="vowel-hinge__gap">_</span>
              <span>{split.after}</span>
              <mark className="vowel-hinge__vowel">{split.vowel}</mark>
            </span>
          );
        })}
      </div>

      <div className="vowel-hinge__footer">
        <p aria-live="polite">
          {isComplete
            ? "Every word has surrendered one vowel to the hinge tray."
            : "Detach the first vowel from the next word and hang it beside the gap."}
        </p>
        <div className="vowel-hinge__actions">
          <button
            disabled={isComplete || words.length === 0}
            onClick={() => setState({ label, hinged: Math.min(words.length, current.hinged + 1) })}
            type="button"
          >
            Hinge next vowel
          </button>
          <button
            className="vowel-hinge__reset"
            disabled={current.hinged === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore words
          </button>
        </div>
      </div>
    </section>
  );
}
