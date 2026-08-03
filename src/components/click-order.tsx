import * as React from "react";

export interface ClickOrderProps {
  children: React.ReactNode;
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function ClickOrder({ children }: ClickOrderProps) {
  const pieces = React.Children.toArray(children);
  const [order, setOrder] = React.useState<number[]>([]);
  const activeOrder = order.filter((index) => index < pieces.length);
  const selected = new Set(activeOrder);
  const isComplete = pieces.length > 0 && activeOrder.length === pieces.length;
  const state = isComplete
    ? "complete"
    : activeOrder.length > 0
      ? "building"
      : "waiting";

  const selectPiece = (index: number) => {
    if (isComplete || selected.has(index)) {
      return;
    }

    setOrder((currentOrder) =>
      currentOrder.includes(index) ? currentOrder : [...currentOrder, index],
    );
  };

  return (
    <section
      aria-label={
        isComplete
          ? "Click order complete. Press reset to choose another order."
          : "Choose content in the order it should appear"
      }
      className="gra-ui click-order"
      data-count={activeOrder.length}
      data-state={state}
    >
      <div aria-live="polite" className="click-order__result">
        {activeOrder.length > 0 ? (
          activeOrder.map((index, position) => (
            <span className="click-order__result-piece" key={index}>
              <span aria-hidden="true" className="click-order__result-number">
                {position + 1}
              </span>
              <span>{pieces[index]}</span>
            </span>
          ))
        ) : (
          <span className="click-order__placeholder">
            The chosen order will appear here
          </span>
        )}
      </div>

      <div aria-label="Available content" className="click-order__pieces">
        {pieces.map((piece, index) =>
          selected.has(index) ? null : (
            <button
              aria-label={`Place item ${index + 1} next`}
              className="click-order__piece"
              key={index}
              onClick={() => selectPiece(index)}
              onKeyDown={(event) => {
                if (isActivationKey(event.key)) {
                  event.preventDefault();
                  selectPiece(index);
                }
              }}
              type="button"
            >
              {piece}
            </button>
          ),
        )}
      </div>

      {isComplete ? (
        <button
          className="click-order__reset"
          onClick={() => setOrder([])}
          type="button"
        >
          Choose again
        </button>
      ) : (
        <p className="click-order__status">
          {pieces.length === 0
            ? "Add at least one piece"
            : `${activeOrder.length} of ${pieces.length} placed`}
        </p>
      )}
    </section>
  );
}
