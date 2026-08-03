import * as React from "react";

export interface KeystrokeStackProps {
  label: string;
}

function isCharacterKey(event: React.KeyboardEvent<HTMLButtonElement>) {
  return (
    event.key.length === 1 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey
  );
}

export function KeystrokeStack({ label }: KeystrokeStackProps) {
  const [stackedCount, setStackedCount] = React.useState(0);
  const characters = Array.from(label);
  const visibleCount = Math.min(stackedCount, characters.length);
  const state =
    visibleCount === 0
      ? "flat"
      : visibleCount === characters.length
        ? "complete"
        : "stacking";

  return (
    <button
      aria-label="Press character keys to stack the label"
      className="gra-ui keystroke-stack"
      data-state={state}
      onKeyDown={(event) => {
        if (!isCharacterKey(event) || characters.length === 0) {
          return;
        }

        event.preventDefault();
        setStackedCount((currentCount) =>
          currentCount >= characters.length ? 0 : currentCount + 1,
        );
      }}
      type="button"
    >
      <span className="keystroke-stack__rows" data-state={state}>
        {visibleCount === 0 ? (
          <span className="keystroke-stack__row keystroke-stack__row--whole">
            {label}
          </span>
        ) : (
          <>
            {characters.slice(0, visibleCount).map((character, index) => (
              <span
                className="keystroke-stack__row"
                key={`${visibleCount}-${index}`}
              >
                {character}
              </span>
            ))}
            {visibleCount < characters.length ? (
              <span
                className="keystroke-stack__row keystroke-stack__row--remaining"
                key={`remaining-${visibleCount}`}
              >
                {characters.slice(visibleCount)}
              </span>
            ) : null}
          </>
        )}
      </span>
    </button>
  );
}
