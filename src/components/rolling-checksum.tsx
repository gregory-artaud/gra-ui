import * as React from "react";

function checksum(value: string) {
  return Array.from(value).reduce(
    (hash, character) => (hash * 33 + character.charCodeAt(0)) % 65536,
    5381,
  );
}

export interface RollingChecksumProps {
  label: string;
}

export function RollingChecksum({ label }: RollingChecksumProps) {
  const [state, setState] = React.useState({ source: label, processed: 0 });
  const characters = Array.from(label);
  const processed = state.source === label ? Math.min(state.processed, characters.length) : 0;
  const complete = processed === characters.length;
  const prefix = characters.slice(0, processed).join("");
  const digest = checksum(prefix).toString(16).padStart(4, "0").toUpperCase();

  return (
    <section
      aria-label="Process a label into a rolling checksum"
      className="gra-ui rolling-checksum"
      data-complete={complete}
    >
      <header className="rolling-checksum__header">
        <span>Rolling checksum</span>
        <output aria-live="polite">{processed} / {characters.length} characters</output>
      </header>

      <div className="rolling-checksum__receipt" aria-live="polite">
        <span className="rolling-checksum__caption">The label must earn its digest</span>
        <div className="rolling-checksum__glyphs">
          {characters.map((character, index) => (
            <span
              className="rolling-checksum__glyph"
              data-processed={index < processed}
              key={`${character}-${index}`}
            >
              {index < processed ? character : "·"}
            </span>
          ))}
          {!label ? <span className="rolling-checksum__empty">No characters submitted</span> : null}
        </div>
        <strong key={`${label}-${processed}`}>{digest}</strong>
        <small>{complete ? "Digest complete" : "The visible prefix is the only part counted."}</small>
      </div>

      <progress aria-label="Checksum progress" max={Math.max(characters.length, 1)} value={processed} />

      <footer className="rolling-checksum__footer">
        <p>{complete ? "The label has been thoroughly hashed for no operational reason." : "Process one character to extend the live digest."}</p>
        <div className="rolling-checksum__actions">
          <button
            disabled={complete}
            onClick={() => setState({ source: label, processed: processed + 1 })}
            type="button"
          >
            Process next
          </button>
          <button
            className="rolling-checksum__reset"
            disabled={processed === 0}
            onClick={() => setState({ source: label, processed: 0 })}
            type="button"
          >
            Clear ledger
          </button>
        </div>
      </footer>
    </section>
  );
}
