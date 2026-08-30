import * as React from "react";

const KEYBOARD_ROWS = ["1234567890", "qwertyuiop", "asdfghjkl", "zxcvbnm"];

function locateCharacter(character: string) {
  const normalized = character.toLowerCase();
  for (const [rowIndex, row] of KEYBOARD_ROWS.entries()) {
    const columnIndex = row.indexOf(normalized);
    if (columnIndex !== -1) return `R${rowIndex + 1} · C${columnIndex + 1}`;
  }
  return "off map";
}

export interface KeyboardCartographyProps {
  label: string;
}

export function KeyboardCartography({ label }: KeyboardCartographyProps) {
  const [mappedState, setMappedState] = React.useState({ label, active: false });
  const active = mappedState.label === label && mappedState.active;
  const characters = [...label];

  return (
    <section
      aria-label="Map every label character to its keyboard coordinate"
      className="gra-ui keyboard-cartography"
      data-state={active ? "mapped" : "readable"}
    >
      <header className="keyboard-cartography__header">
        <span>Keyboard cartography</span>
        <output aria-live="polite">{active ? "Mapped" : "Readable"}</output>
      </header>

      <div className="keyboard-cartography__paper" aria-live="polite">
        {!active ? (
          <p className="keyboard-cartography__label">{label || "The empty label has no terrain."}</p>
        ) : (
          <div className="keyboard-cartography__map">
            {characters.length === 0 ? <span className="keyboard-cartography__empty">∅</span> : null}
            {characters.map((character, index) => (
              <span className="keyboard-cartography__coordinate" key={`${character}-${index}`}>
                <b>{character === " " ? "␠" : character}</b>
                <small>{locateCharacter(character)}</small>
              </span>
            ))}
          </div>
        )}
      </div>

      <footer className="keyboard-cartography__footer">
        <p>{active ? "Every character has been assigned a tiny address it never requested." : "Give each glyph a coordinate before allowing it to remain readable."}</p>
        <div className="keyboard-cartography__actions">
          <button disabled={active} onClick={() => setMappedState({ label, active: true })} type="button">
            Map the keyboard
          </button>
          <button className="keyboard-cartography__reset" disabled={!active} onClick={() => setMappedState({ label, active: false })} type="button">
            Restore wording
          </button>
        </div>
      </footer>
    </section>
  );
}
