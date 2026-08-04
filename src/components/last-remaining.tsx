import * as React from "react";

export interface LastRemainingProps {
  items: readonly string[];
}

interface LastRemainingState {
  signature: string;
  eliminated: number[];
}

export function LastRemaining({ items }: LastRemainingProps) {
  const itemsSignature = items.join("\u0000");
  const [state, setState] = React.useState<LastRemainingState>(() => ({
    signature: itemsSignature,
    eliminated: [],
  }));
  const eliminated = state.signature === itemsSignature ? state.eliminated : [];
  const activeCount = items.reduce(
    (count, _, index) => count + (eliminated.includes(index) ? 0 : 1),
    0,
  );
  const isWinner = items.length > 0 && activeCount === 1;

  const eliminate = (index: number) => {
    setState((current) => {
      const currentEliminated = current.signature === itemsSignature
        ? current.eliminated
        : [];

      if (currentEliminated.includes(index) || activeCount <= 1) {
        return current;
      }

      return {
        signature: itemsSignature,
        eliminated: [...currentEliminated, index],
      };
    });
  };

  return (
    <section
      aria-label={
        isWinner
          ? "Last remaining item selected. Reset to eliminate again."
          : "Eliminate items until one remains"
      }
      className="gra-ui last-remaining"
      data-count={activeCount}
      data-state={isWinner ? "winner" : items.length === 0 ? "empty" : "eliminating"}
    >
      <div className="last-remaining__heading">
        <span className="last-remaining__label">
          {isWinner ? "Last remaining" : "Eliminate options"}
        </span>
        <span className="last-remaining__count" aria-live="polite">
          {activeCount} / {items.length}
        </span>
      </div>

      <ul className="last-remaining__list">
        {items.map((item, index) => {
          const isEliminated = eliminated.includes(index);
          const isItemWinner = isWinner && !isEliminated;

          return (
            <li
              className="last-remaining__item"
              data-eliminated={isEliminated}
              data-winner={isItemWinner}
              key={index}
            >
              <button
                aria-label={
                  isEliminated
                    ? `${item} eliminated`
                    : isItemWinner
                      ? `${item} is the last remaining item`
                      : `Eliminate ${item}`
                }
                className="last-remaining__option"
                disabled={isEliminated || isWinner}
                onClick={() => eliminate(index)}
                type="button"
              >
                <span>{item}</span>
                <span aria-hidden="true" className="last-remaining__action">
                  {isEliminated ? "Removed" : isItemWinner ? "Winner" : "Eliminate"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="last-remaining__status">
        {items.length === 0
          ? "No items supplied"
          : isWinner
            ? "One item survived the process."
            : `${activeCount} items still need to be reduced.`}
      </p>

      <button
        className="last-remaining__reset"
        onClick={() => setState({ signature: itemsSignature, eliminated: [] })}
        type="button"
      >
        Start over
      </button>
    </section>
  );
}
