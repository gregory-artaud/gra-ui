import * as React from "react";

const WINNING_WEIGHT = 3;

export interface WeightVoteProps {
  children: React.ReactNode;
}

function emptyWeights(count: number) {
  return Array.from({ length: count }, () => 0);
}

export function WeightVote({ children }: WeightVoteProps) {
  const choices = React.Children.toArray(children);
  const [weights, setWeights] = React.useState<number[]>(() => emptyWeights(choices.length));
  const activeWeights = weights.length === choices.length ? weights : emptyWeights(choices.length);
  const winner = activeWeights.findIndex((weight) => weight === WINNING_WEIGHT);
  const isSettled = winner !== -1;
  const totalWeight = activeWeights.reduce((sum, weight) => sum + weight, 0);

  const addWeight = (index: number) => {
    if (isSettled) {
      return;
    }

    setWeights((currentWeights) => {
      const nextWeights = currentWeights.length === choices.length
        ? [...currentWeights]
        : emptyWeights(choices.length);

      nextWeights[index] = Math.min(nextWeights[index] + 1, WINNING_WEIGHT);
      return nextWeights;
    });
  };

  return (
    <section
      aria-label={
        isSettled
          ? `Choice ${winner + 1} received the most weight. Reset to vote again.`
          : "Click a choice three times to give it the most weight"
      }
      className="gra-ui weight-vote"
      data-state={isSettled ? "settled" : totalWeight > 0 ? "voting" : "ready"}
    >
      <div className="weight-vote__choices">
        {choices.map((choice, index) => {
          const weight = activeWeights[index];
          const isWinner = index === winner;

          return (
            <button
              aria-label={`Give choice ${index + 1} one weight (${weight} of ${WINNING_WEIGHT})`}
              aria-pressed={isWinner}
              className="weight-vote__choice"
              data-weight={weight}
              data-winner={isWinner ? "true" : "false"}
              disabled={isSettled}
              key={index}
              onClick={() => addWeight(index)}
              type="button"
            >
              <span className="weight-vote__content">{choice}</span>
              <span aria-hidden="true" className="weight-vote__meter">
                {Array.from({ length: WINNING_WEIGHT }, (_, meterIndex) => (
                  <span
                    data-filled={meterIndex < weight ? "true" : "false"}
                    key={meterIndex}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="weight-vote__footer">
        <output aria-live="polite">
          {isSettled ? `Choice ${winner + 1} wins after three clicks.` : `${totalWeight} weight${totalWeight === 1 ? "" : "s"} assigned`}
        </output>
        <button
          className="weight-vote__reset"
          onClick={() => setWeights(emptyWeights(choices.length))}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
