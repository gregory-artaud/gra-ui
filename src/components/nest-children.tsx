import * as React from "react";

export interface NestChildrenProps {
  children: React.ReactNode;
}

export function NestChildren({ children }: NestChildrenProps) {
  const pieces = React.Children.toArray(children);
  const [order, setOrder] = React.useState<number[]>([]);
  const activeOrder = order.filter((index) => index < pieces.length);
  const selected = new Set(activeOrder);
  const isComplete = pieces.length > 0 && activeOrder.length === pieces.length;
  const state = isComplete
    ? "complete"
    : activeOrder.length > 0
      ? "nesting"
      : "waiting";

  let nestedContent: React.ReactNode = null;

  activeOrder.forEach((index, depth) => {
    nestedContent = (
      <div className="nest-children__layer" data-depth={depth + 1} key={index}>
        <div className="nest-children__piece">{pieces[index]}</div>
        {nestedContent}
      </div>
    );
  });

  const selectPiece = (index: number) => {
    if (selected.has(index)) {
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
          ? "All children are nested. Reset to build another stack."
          : pieces.length === 0
            ? "There are no children to nest."
            : "Choose children to build a nested stack"
      }
      className="gra-ui nest-children"
      data-count={activeOrder.length}
      data-state={state}
    >
      <div className="nest-children__stage" aria-live="polite">
        {nestedContent ?? (
          <span className="nest-children__empty">
            Choose a child to start the stack
          </span>
        )}
      </div>

      {isComplete ? (
        <button
          className="nest-children__reset"
          onClick={() => setOrder([])}
          type="button"
        >
          Unnest everything
        </button>
      ) : (
        <div aria-label="Children available for nesting" className="nest-children__choices">
          {pieces.map((piece, index) =>
            selected.has(index) ? null : (
              <button
                className="nest-children__choice"
                key={index}
                onClick={() => selectPiece(index)}
                type="button"
              >
                {piece}
              </button>
            ),
          )}
        </div>
      )}

      <p className="nest-children__status">
        {pieces.length === 0
          ? "No children available"
          : isComplete
            ? "Every child is inside another child"
            : `${activeOrder.length} of ${pieces.length} children nested`}
      </p>
    </section>
  );
}
