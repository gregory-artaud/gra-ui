import * as React from "react";

const MORSE: Readonly<Record<string, string>> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
  5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", ".": ".-.-.-", ",": "--..--",
  "?": "..--..", "!": "-.-.--",
};

export interface SignalTranscriptProps {
  label: string;
}

interface SignalTranscriptState {
  label: string;
  transmitted: boolean;
}

function createState(label: string): SignalTranscriptState {
  return { label, transmitted: false };
}

function encodeCharacter(character: string) {
  if (character === " ") {
    return "/";
  }

  return MORSE[character.toUpperCase()] ?? "·";
}

export function SignalTranscript({ label }: SignalTranscriptProps) {
  const [state, setState] = React.useState<SignalTranscriptState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const encoded = Array.from(label).map(encodeCharacter);

  return (
    <section
      aria-label="Transmit a label as a Morse transcript"
      className="gra-ui signal-transcript"
      data-state={current.transmitted ? "transmitted" : "ready"}
    >
      <header className="signal-transcript__header">
        <span>Signal transcript</span>
        <output aria-live="polite">{current.transmitted ? `${encoded.length} signals` : "Plain text"}</output>
      </header>

      <div className="signal-transcript__paper" aria-live="polite">
        {current.transmitted ? (
          <ol aria-label="Morse transcript" className="signal-transcript__signals">
            {encoded.map((signal, index) => (
              <li key={`${label}-${index}`} style={{ "--signal-delay": `${index * 35}ms` } as React.CSSProperties}>
                <span>{signal}</span>
                <small>{Array.from(label)[index] === " " ? "space" : Array.from(label)[index]}</small>
              </li>
            ))}
          </ol>
        ) : (
          <p className="signal-transcript__original">{label || "An empty message waits for a transmitter."}</p>
        )}
      </div>

      <footer className="signal-transcript__footer">
        <p aria-live="polite">
          {current.transmitted
            ? "The label is now a sequence of dots, dashes and one unnecessary slash per space."
            : "Transmit the label so every character can become a signal."}
        </p>
        <div className="signal-transcript__actions">
          <button
            disabled={current.transmitted || label.length === 0}
            onClick={() => setState({ label, transmitted: true })}
            type="button"
          >
            Transmit label
          </button>
          <button
            className="signal-transcript__reset"
            disabled={!current.transmitted}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore text
          </button>
        </div>
      </footer>
    </section>
  );
}
