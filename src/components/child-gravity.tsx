import * as React from "react";

export interface ChildGravityProps {
  children: React.ReactNode;
}

function pressureForCount(count: number) {
  return 12 + count * 4;
}

export function ChildGravity({ children }: ChildGravityProps) {
  const pieces = React.Children.toArray(children);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const activeIndex =
    selectedIndex !== null && selectedIndex < pieces.length ? selectedIndex : null;
  const pressure = pieces.length > 0 ? pressureForCount(pieces.length) : 0;
  const isSettled = activeIndex !== null;

  return (
    <section
      aria-label="Choose a child to create a calculated gravity gap"
      className="gra-ui child-gravity"
      data-state={pieces.length === 0 ? "empty" : isSettled ? "settled" : "ready"}
    >
      <div className="child-gravity__header">
        <span>Calculated gravity</span>
        <output aria-live="polite">
          {isSettled ? `${pressure}px gap` : "Idle"}
        </output>
      </div>

      <div aria-label="Children to position" className="child-gravity__items" role="group">
        {pieces.map((piece, index) => {
          const shift = isSettled ? (index - activeIndex) * pressure : 0;
          const itemStyle = {
            "--child-gravity-shift": `${shift}px`,
          } as React.CSSProperties;

          return (
            <button
              aria-pressed={activeIndex === index}
              className="child-gravity__item"
              data-anchor={activeIndex === index ? "true" : "false"}
              data-shift={shift}
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={itemStyle}
              type="button"
            >
              <span className="child-gravity__content">{piece}</span>
              <span aria-hidden="true" className="child-gravity__distance">
                {isSettled ? (shift === 0 ? "anchor" : `${shift > 0 ? "+" : "−"}${Math.abs(shift)}px`) : "ready"}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="child-gravity__status">
        {pieces.length === 0
          ? "Add a child to give gravity something to judge."
          : isSettled
            ? `Child ${activeIndex + 1} is holding the anchor. Every sibling has been moved by its ordinal gap.`
            : "Click one child. Its siblings will retreat by a calculated distance."}
      </p>

      {isSettled ? (
        <button className="child-gravity__reset" onClick={() => setSelectedIndex(null)} type="button">
          Release gravity
        </button>
      ) : null}
    </section>
  );
}
