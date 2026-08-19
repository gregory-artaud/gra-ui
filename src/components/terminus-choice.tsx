import * as React from "react";

export interface TerminusChoiceProps {
  label: string;
}

type Terminus = "first" | "middle" | "last";

interface TerminusChoiceState {
  signature: string;
  terminus: Terminus | null;
}

function createState(signature: string): TerminusChoiceState {
  return { signature, terminus: null };
}

function extractWord(word: string, terminus: Terminus) {
  const letters = Array.from(word).filter((character) => /[\p{L}\p{N}]/u.test(character));
  if (letters.length === 0) {
    return word;
  }

  if (terminus === "first") {
    return letters[0];
  }

  if (terminus === "last") {
    return letters.at(-1);
  }

  return letters[Math.floor((letters.length - 1) / 2)];
}

function extractLabel(label: string, terminus: Terminus) {
  return label
    .split(/(\s+)/u)
    .map((part) => (/\s/u.test(part) ? part : extractWord(part, terminus)))
    .join("");
}

export function TerminusChoice({ label }: TerminusChoiceProps) {
  const groupId = React.useId();
  const [state, setState] = React.useState<TerminusChoiceState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const output = current.terminus ? extractLabel(label, current.terminus) : label;

  return (
    <section
      aria-label="Choose which part of every word survives"
      className="gra-ui terminus-choice"
      data-choice={current.terminus ?? "undecided"}
    >
      <header className="terminus-choice__header">
        <span>Terminus choice</span>
        <output aria-live="polite">{current.terminus ? `${current.terminus} matter` : "No ruling"}</output>
      </header>

      <div aria-live="polite" className="terminus-choice__paper">
        <p>{output}</p>
        <small>{current.terminus ? "The other letters have been dismissed." : "The whole phrase is still on trial."}</small>
      </div>

      <fieldset className="terminus-choice__choices">
        <legend>Choose the surviving position</legend>
        {(["first", "middle", "last"] as const).map((terminus) => (
          <label className="terminus-choice__choice" data-selected={current.terminus === terminus ? "true" : "false"} key={terminus}>
            <input
              checked={current.terminus === terminus}
              name={groupId}
              onChange={() => setState({ signature: label, terminus })}
              type="radio"
            />
            <span>{terminus === "first" ? "First letters" : terminus === "middle" ? "Middle letters" : "Last letters"}</span>
          </label>
        ))}
      </fieldset>

      <div className="terminus-choice__footer">
        <p aria-live="polite">
          {current.terminus
            ? `Every word now reports only its ${current.terminus} letter.`
            : "Choose one position and the sentence will lose the rest."}
        </p>
        <button
          className="terminus-choice__reset"
          disabled={current.terminus === null}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Restore whole phrase
        </button>
      </div>
    </section>
  );
}
