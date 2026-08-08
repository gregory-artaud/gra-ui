import * as React from "react";

export interface BraidlineProps {
  label: string;
}

interface BraidlineState {
  signature: string;
  isBraided: boolean;
}

function createState(signature: string): BraidlineState {
  return { signature, isBraided: false };
}

export function Braidline({ label }: BraidlineProps) {
  const signature = label;
  const [state, setState] = React.useState<BraidlineState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const characters = Array.from(label);
  const upperRow = characters.filter((_, index) => index % 2 === 0);
  const lowerRow = characters.filter((_, index) => index % 2 === 1);

  return (
    <section aria-label="Braidline" className="gra-ui braidline" data-braided={current.isBraided}>
      <div className="braidline__header">
        <span>String arrangement</span>
        <output aria-live="polite">{current.isBraided ? "Interlaced" : "Straight"}</output>
      </div>

      <div className="braidline__paper">
        {!current.isBraided ? <p className="braidline__straight">{label}</p> : null}
        {current.isBraided ? (
          <div aria-label="Interlaced characters" className="braidline__rows">
            <p>{upperRow.map((character, index) => <span key={`upper-${character}-${index}`}>{character === " " ? "\u00a0" : character}</span>)}</p>
            <p>{lowerRow.map((character, index) => <span key={`lower-${character}-${index}`}>{character === " " ? "\u00a0" : character}</span>)}</p>
          </div>
        ) : null}
      </div>

      <button
        className="braidline__action"
        onClick={() => setState({ signature, isBraided: !current.isBraided })}
        type="button"
      >
        {current.isBraided ? "Unbraid the line" : "Braid the characters"}
      </button>
    </section>
  );
}
