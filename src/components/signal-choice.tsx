import * as React from "react";

export interface SignalChoiceProps {
  label: string;
}

type SignalMode = "morse" | "braille" | "ledger";

interface SignalChoiceState {
  label: string;
  mode: SignalMode | null;
}

const MORSE: Readonly<Record<string, string>> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---",
  "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};

const BRAILLE: Readonly<Record<string, string>> = {
  a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋", g: "⠛", h: "⠓", i: "⠊", j: "⠚",
  k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕", p: "⠏", q: "⠟", r: "⠗", s: "⠎", t: "⠞",
  u: "⠥", v: "⠧", w: "⠺", x: "⠭", y: "⠽", z: "⠵",
};

const MODES: readonly { id: SignalMode; label: string; description: string }[] = [
  { id: "morse", label: "Morse", description: "Dots and dashes, because a label needs a signal." },
  { id: "braille", label: "Braille", description: "One tactile glyph per letter, on a screen." },
  { id: "ledger", label: "Ledger", description: "Numbered initials and terminal letters." },
];

function createState(label: string): SignalChoiceState {
  return { label, mode: null };
}

function encode(label: string, mode: SignalMode) {
  if (mode === "morse") {
    return Array.from(label.toUpperCase())
      .map((character) => character === " " ? "/" : MORSE[character] ?? "?")
      .join(" ");
  }

  if (mode === "braille") {
    return Array.from(label.toLowerCase())
      .map((character) => character === " " ? "  " : BRAILLE[character] ?? "⠿")
      .join("");
  }

  return label
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => `${String(index + 1).padStart(2, "0")} ${word[0] ?? ""}${word.length > 1 ? `…${word.at(-1)}` : ""}`)
    .join("  ·  ");
}

export function SignalChoice({ label }: SignalChoiceProps) {
  const [state, setState] = React.useState<SignalChoiceState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const selectedMode = MODES.find((mode) => mode.id === current.mode);

  return (
    <section
      aria-label="Choose an encoding that changes the label"
      className="gra-ui signal-choice"
      data-mode={current.mode ?? "none"}
      data-state={current.mode ? "encoded" : "original"}
    >
      <header className="signal-choice__header">
        <span>Signal choice</span>
        <output aria-live="polite">{selectedMode?.label ?? "Original"}</output>
      </header>

      <div className="signal-choice__output" aria-live="polite">
        <span className="signal-choice__caption">{selectedMode ? selectedMode.description : "Choose a format for the same message."}</span>
        <code>{selectedMode ? encode(label, selectedMode.id) : label}</code>
      </div>

      <div className="signal-choice__choices" aria-label="Encoding choices">
        {MODES.map((mode) => (
          <button
            aria-pressed={current.mode === mode.id}
            className="signal-choice__choice"
            key={mode.id}
            onClick={() => setState({ label, mode: mode.id })}
            type="button"
          >
            <strong>{mode.label}</strong>
            <small>{mode.description}</small>
          </button>
        ))}
      </div>

      <div className="signal-choice__footer">
        <p aria-live="polite">
          {selectedMode
            ? `The label now exists as ${selectedMode.label.toLowerCase()}, which was not requested.`
            : "Select one of three incompatible ways to record the message."}
        </p>
        <button
          className="signal-choice__reset"
          disabled={current.mode === null}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Restore label
        </button>
      </div>
    </section>
  );
}
