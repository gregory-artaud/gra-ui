import * as React from "react";

export interface LensRailProps {
  label: string;
}

interface LensRailState {
  signature: string;
  position: number;
}

function createState(signature: string): LensRailState {
  return { signature, position: 0 };
}

export function LensRail({ label }: LensRailProps) {
  const characters = Array.from(label);
  const signature = label;
  const maximum = Math.max(0, characters.length - 1);
  const [state, setState] = React.useState<LensRailState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const position = Math.min(current.position, maximum);
  const excerpt = characters.slice(position, position + 7).join("") || "∅";

  return (
    <section aria-label="Lens rail" className="gra-ui lens-rail" data-position={position}>
      <div className="lens-rail__header">
        <span>Local lens</span>
        <output aria-live="polite">{position + 1} / {Math.max(1, characters.length)}</output>
      </div>

      <div className="lens-rail__track" aria-label="Content rail">
        {characters.map((character, index) => (
          <span data-lensed={index === position} key={`${character}-${index}`}>
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </div>

      <div className="lens-rail__window">
        <span>Current excerpt</span>
        <strong aria-live="polite">{excerpt}</strong>
      </div>

      <label className="lens-rail__control">
        <span>Move the lens</span>
        <input
          aria-label="Move the lens along the label"
          max={maximum}
          min="0"
          onChange={(event) => setState({ signature, position: Number(event.target.value) })}
          type="range"
          value={position}
        />
      </label>

      <button
        className="lens-rail__reset"
        disabled={position === 0}
        onClick={() => setState(createState(signature))}
        type="button"
      >
        Return lens to the start
      </button>
    </section>
  );
}
