import * as React from "react";

export interface StackingAppealProps {
  children: React.ReactNode;
}

export function StackingAppeal({ children }: StackingAppealProps) {
  const items = React.Children.toArray(children);
  const [order, setOrder] = React.useState(() => items.map((_, index) => index));
  const visibleOrder = order.length === items.length ? order : items.map((_, index) => index);
  const isOriginal = visibleOrder.every((item, index) => item === index);

  const raise = (item: number) => {
    setOrder((previous) => {
      const current = previous.length === items.length ? previous : items.map((_, index) => index);
      return [item, ...current.filter((index) => index !== item)];
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, item: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      raise(item);
    }
  };

  return (
    <section aria-label="Raise content in a stack" className="gra-ui stacking-appeal">
      <header className="stacking-appeal__header">
        <span>Stacking appeal</span>
        <output aria-live="polite">{isOriginal ? "Unappealed" : `Item ${visibleOrder[0] + 1} is on top`}</output>
      </header>

      <div className="stacking-appeal__stage" aria-label="Stacked content">
        {visibleOrder.map((item, position) => (
          <div
            aria-label={`Raise item ${item + 1}`}
            className="stacking-appeal__card"
            data-position={position}
            key={`${item}-${items.length}`}
            onClick={() => raise(item)}
            onKeyDown={(event) => handleKeyDown(event, item)}
            role="button"
            style={{ "--stack-position": position } as React.CSSProperties}
            tabIndex={0}
          >
            <span className="stacking-appeal__index">{String(item + 1).padStart(2, "0")}</span>
            <div>{items[item]}</div>
            <small>{position === 0 ? "front of appeal" : `depth ${position}`}</small>
          </div>
        ))}
        {!items.length ? <p className="stacking-appeal__empty">No appealable content was submitted.</p> : null}
      </div>

      <footer className="stacking-appeal__footer">
        <p>{isOriginal ? "Click a card to make it win an argument about depth." : "The top card now has the only persuasive z-index."}</p>
        <button className="stacking-appeal__reset" disabled={isOriginal} onClick={() => setOrder(items.map((_, index) => index))} type="button">
          Restore stack
        </button>
      </footer>
    </section>
  );
}
