import * as React from "react";

export interface ReorderBackProps {
  first: React.ReactNode;
  second: React.ReactNode;
}

type ReorderState = "original" | "reversed";

function reorderReducer(state: ReorderState): ReorderState {
  return state === "original" ? "reversed" : "original";
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function ReorderBack({ first, second }: ReorderBackProps) {
  const [order, swap] = React.useReducer(reorderReducer, "original");

  const swapItems = () => swap();

  return (
    <div
      aria-label="Swap the two items"
      aria-pressed={order === "reversed"}
      className="gra-ui reorder-back"
      data-order={order}
      onClick={swapItems}
      onKeyDown={(event) => {
        if (isActivationKey(event.key)) {
          event.preventDefault();
          swapItems();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="reorder-back__items">
        <div className="reorder-back__item reorder-back__item--first">
          {first}
        </div>
        <div className="reorder-back__item reorder-back__item--second">
          {second}
        </div>
      </div>
    </div>
  );
}
