import * as React from "react";

export interface IndexSumProps {
  children: React.ReactNode;
}

function targetForCount(count: number) {
  const total = (count * (count + 1)) / 2;

  return Math.max(1, Math.ceil(total / 2));
}

export function IndexSum({ children }: IndexSumProps) {
  const pieces = React.Children.toArray(children);
  const target = targetForCount(pieces.length);
  const [selected, setSelected] = React.useState<number[]>([]);
  const activeSelected = selected.filter((index) => index < pieces.length);
  const total = activeSelected.reduce((sum, index) => sum + index + 1, 0);
  const isSolved = pieces.length > 0 && total === target;
  const isOver = total > target;
  const state = isSolved ? "solved" : isOver ? "over" : "choosing";

  const togglePiece = (index: number) => {
    if (isSolved) {
      return;
    }

    setSelected((currentSelected) =>
      currentSelected.includes(index)
        ? currentSelected.filter((current) => current !== index)
        : [...currentSelected, index],
    );
  };

  return (
    <section
      aria-label={`Choose items whose position values add to ${target}`}
      className="gra-ui index-sum"
      data-state={state}
      data-target={target}
      data-total={total}
    >
      <div className="index-sum__header">
        <span>Position sum</span>
        <strong aria-live="polite">{total} / {target}</strong>
      </div>

      <div aria-label="Items to add" className="index-sum__items" role="group">
        {pieces.map((piece, index) => {
          const isSelected = activeSelected.includes(index);

          return (
            <button
              aria-label={`Choose item ${index + 1}, worth ${index + 1}`}
              aria-pressed={isSelected}
              className="index-sum__item"
              data-selected={isSelected ? "true" : "false"}
              data-value={index + 1}
              disabled={isSolved}
              key={index}
              onClick={() => togglePiece(index)}
              type="button"
            >
              <span aria-hidden="true" className="index-sum__value">{index + 1}</span>
              <span className="index-sum__content">{piece}</span>
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className="index-sum__meter">
        {Array.from({ length: target }, (_, index) => (
          <span data-filled={index < Math.min(total, target) ? "true" : "false"} key={index} />
        ))}
      </div>

      <p aria-live="polite" className="index-sum__status">
        {isSolved
          ? "Exact sum. The chosen positions are now official."
          : isOver
            ? "Too much. Remove a position to get back under the target."
            : "Select any positions until the total matches."}
      </p>

      <button
        className="index-sum__reset"
        onClick={() => setSelected([])}
        type="button"
      >
        Start again
      </button>
    </section>
  );
}
