import * as React from "react";

export interface AtbashNoticeProps {
  label: string;
}

interface AtbashNoticeState {
  encoded: boolean;
  signature: string;
}

function atbashCharacter(character: string) {
  const code = character.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(90 - (code - 65));
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(122 - (code - 97));
  }

  return character;
}

function mirrorAlphabet(label: string) {
  return Array.from(label, atbashCharacter).join("");
}

function createState(label: string): AtbashNoticeState {
  return { encoded: false, signature: label };
}

export function AtbashNotice({ label }: AtbashNoticeProps) {
  const [state, setState] = React.useState<AtbashNoticeState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const visible = current.encoded ? mirrorAlphabet(label) : label;

  return (
    <section
      aria-label="Mirror a notice through the alphabet"
      className="gra-ui atbash-notice"
      data-state={current.encoded ? "mirrored" : "readable"}
    >
      <header className="atbash-notice__header">
        <span>Alphabet mirror</span>
        <output aria-live="polite">{current.encoded ? "Mirrored" : "Readable"}</output>
      </header>

      <div aria-live="polite" className="atbash-notice__paper">
        {Array.from(visible).map((character, index) => (
          <span key={`${visible}-${index}`} data-space={character === " "}>
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </div>

      <footer className="atbash-notice__footer">
        <p aria-live="polite">
          {current.encoded
            ? "The notice is legible only if everyone agrees to use the same unnecessary cipher."
            : "Mirror every letter so a readable notice can develop a secret identity."}
        </p>
        <div className="atbash-notice__actions">
          <button
            disabled={current.encoded || label.length === 0}
            onClick={() => setState({ encoded: true, signature: label })}
            type="button"
          >
            Mirror alphabet
          </button>
          <button
            className="atbash-notice__reset"
            disabled={!current.encoded}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore notice
          </button>
        </div>
      </footer>
    </section>
  );
}
