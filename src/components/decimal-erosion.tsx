import * as React from "react";

const MAX_PLACES = 4;

function normalizeValue(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(-999999, Math.min(999999, value));
}

function formatValue(value: number, places: number) {
  const formatted = value.toFixed(places);
  return formatted === "-0" ? "0" : formatted;
}

export interface DecimalErosionProps {
  value: number;
}

export function DecimalErosion({ value }: DecimalErosionProps) {
  const seed = normalizeValue(value);
  const [erosionState, setErosionState] = React.useState({ seed, stage: 0 });
  const current = erosionState.seed === seed ? erosionState : { seed, stage: 0 };
  const precision = MAX_PLACES - current.stage;
  const complete = current.stage === MAX_PLACES;
  const displayedValue = formatValue(current.seed, precision);

  const erodeOnePlace = () => {
    setErosionState((previous) => {
      const state = previous.seed === seed ? previous : { seed, stage: 0 };
      return { seed, stage: Math.min(MAX_PLACES, state.stage + 1) };
    });
  };

  return (
    <section
      aria-label="Erode a number's decimal precision"
      className="gra-ui decimal-erosion"
      data-stage={current.stage}
    >
      <header className="decimal-erosion__header">
        <span>Decimal erosion</span>
        <output aria-live="polite">{complete ? "Fully eroded" : `${precision} places left`}</output>
      </header>

      <div className="decimal-erosion__display" aria-live="polite">
        <span className="decimal-erosion__caption">Current precision</span>
        <strong key={displayedValue}>{displayedValue}</strong>
      </div>

      <div className="decimal-erosion__scale" aria-hidden="true">
        {Array.from({ length: MAX_PLACES + 1 }, (_, index) => (
          <span data-active={index <= current.stage} key={index} />
        ))}
      </div>
      <progress aria-label="Decimal places eroded" max={MAX_PLACES} value={current.stage} />

      <footer className="decimal-erosion__footer">
        <p>{complete ? "The number survived by becoming an integer." : "Remove one decimal place and call the loss progress."}</p>
        <div className="decimal-erosion__actions">
          <button disabled={complete} onClick={erodeOnePlace} type="button">
            Erode one place
          </button>
          <button
            className="decimal-erosion__reset"
            disabled={current.stage === 0}
            onClick={() => setErosionState({ seed, stage: 0 })}
            type="button"
          >
            Restore precision
          </button>
        </div>
      </footer>
    </section>
  );
}
