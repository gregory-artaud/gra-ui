import * as React from "react";

type LengthOrderMode = "original" | "shortest" | "longest";

const MODE_LABELS: Record<LengthOrderMode, string> = {
  original: "Original order",
  shortest: "Shortest first",
  longest: "Longest first",
};

const NEXT_MODE: Record<LengthOrderMode, LengthOrderMode> = {
  original: "shortest",
  shortest: "longest",
  longest: "original",
};

export interface LengthOrderProps {
  items: readonly string[];
}

function orderItems(items: readonly string[], mode: LengthOrderMode) {
  return items
    .map((label, index) => ({ label, index }))
    .sort((left, right) => {
      if (mode === "original") {
        return left.index - right.index;
      }

      const difference = left.label.length - right.label.length;
      return (mode === "shortest" ? difference : -difference) || left.index - right.index;
    });
}

export function LengthOrder({ items }: LengthOrderProps) {
  const [mode, setMode] = React.useState<LengthOrderMode>("original");
  const nextMode = NEXT_MODE[mode];
  const orderedItems = orderItems(items, mode);

  return (
    <section
      aria-label="Length-based item order"
      className="gra-ui length-order"
      data-order={mode}
    >
      <button
        aria-label={`Change item order. Next: ${MODE_LABELS[nextMode]}`}
        className="length-order__control"
        disabled={items.length === 0}
        onClick={() => setMode(nextMode)}
        type="button"
      >
        <span className="length-order__control-label">Order by label length</span>
        <strong>{MODE_LABELS[mode]}</strong>
        <span className="length-order__next">Next: {MODE_LABELS[nextMode]}</span>
      </button>

      {items.length > 0 ? (
        <ol aria-atomic="true" aria-live="polite" className="length-order__list">
          {orderedItems.map(({ label, index }) => (
            <li className="length-order__item" key={`${label}-${index}`}>
              <span>{label}</span>
              <span
                aria-label={`${label.length} characters`}
                className="length-order__count"
              >
                {label.length}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="length-order__empty">Give it something to count.</p>
      )}
    </section>
  );
}
