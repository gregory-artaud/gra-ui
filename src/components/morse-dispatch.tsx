import * as React from "react";

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", ":": "---...", ";": "-.-.-.", "-": "-....-", "(": "-.--.", ")": "-.--.-",
};

interface MorseDispatchState {
  dispatched: boolean;
  label: string;
}

export interface MorseDispatchProps {
  label: string;
}

function createState(label: string): MorseDispatchState {
  return { dispatched: false, label };
}

function encodeCharacter(character: string) {
  return MORSE[character.toUpperCase()] ?? "?";
}

export function MorseDispatch({ label }: MorseDispatchProps) {
  const [state, setState] = React.useState<MorseDispatchState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const characters = Array.from(label);

  return (
    <section
      aria-label="Dispatch a label as Morse code"
      className="gra-ui morse-dispatch"
      data-state={current.dispatched ? "coded" : "readable"}
    >
      <header className="morse-dispatch__header">
        <span>Morse dispatch</span>
        <output aria-live="polite">{current.dispatched ? "Coded" : "Readable"}</output>
      </header>

      <div className="morse-dispatch__paper" aria-live="polite">
        {current.dispatched ? (
          <div className="morse-dispatch__code" aria-label={`Morse code for ${label}`}>
            {characters.map((character, index) => character === " " ? (
              <span className="morse-dispatch__gap" aria-hidden="true" key={`${index}-space`}>/</span>
            ) : (
              <span className="morse-dispatch__token" key={`${index}-${character}`}>
                <b>{character}</b><code>{encodeCharacter(character)}</code>
              </span>
            ))}
          </div>
        ) : (
          <p className="morse-dispatch__label">{label || "∅"}</p>
        )}
      </div>

      <footer className="morse-dispatch__footer">
        <p aria-live="polite">
          {current.dispatched
            ? "The wording has become a radio transmission without traveling anywhere."
            : "Dispatch the label into dots, dashes and an unnecessary silence mark."}
        </p>
        <div className="morse-dispatch__actions">
          <button
            disabled={current.dispatched}
            onClick={() => setState({ dispatched: true, label })}
            type="button"
          >
            Encode dispatch
          </button>
          <button
            className="morse-dispatch__reset"
            disabled={!current.dispatched}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore wording
          </button>
        </div>
      </footer>
    </section>
  );
}
