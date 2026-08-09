import * as React from "react";

export interface CenterOutProps {
  label: string;
}

interface CenterOutState {
  isUnfurled: boolean;
  signature: string;
}

function createState(signature: string): CenterOutState {
  return { isUnfurled: false, signature };
}

function centerOutCharacters(characters: readonly string[]) {
  if (characters.length === 0) {
    return [];
  }

  const result: Array<{ character: string; index: number }> = [];
  let left = Math.floor((characters.length - 1) / 2);
  let right = left + 1;

  result.push({ character: characters[left], index: left });
  while (right < characters.length || left > 0) {
    if (right < characters.length) {
      result.push({ character: characters[right], index: right });
      right += 1;
    }

    if (left > 0) {
      left -= 1;
      result.push({ character: characters[left], index: left });
    }
  }

  return result;
}

export function CenterOut({ label }: CenterOutProps) {
  const signature = label;
  const [state, setState] = React.useState<CenterOutState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const characters = Array.from(label);
  const displayedCharacters = current.isUnfurled
    ? centerOutCharacters(characters)
    : characters.map((character, index) => ({ character, index }));

  return (
    <section aria-label="Center out" className="gra-ui center-out" data-unfurled={current.isUnfurled}>
      <div className="center-out__header">
        <span>Reading order</span>
        <output aria-live="polite">{current.isUnfurled ? "Center outward" : "Ordinary"}</output>
      </div>

      <div className="center-out__paper">
        <p aria-live="polite">
          {displayedCharacters.map(({ character, index }) => (
            <span data-source-index={index} key={`${index}-${character}`}>
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </p>
      </div>

      <div className="center-out__actions">
        <button
          onClick={() => setState({ isUnfurled: !current.isUnfurled, signature })}
          type="button"
        >
          {current.isUnfurled ? "Straighten the sentence" : "Read from the middle"}
        </button>
      </div>
    </section>
  );
}
