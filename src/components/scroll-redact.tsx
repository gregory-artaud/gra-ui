import * as React from "react";

const REDACTION_STEPS = 5;

export interface ScrollRedactProps {
  children: React.ReactNode;
}

function clampCoverage(value: number) {
  return Math.max(0, Math.min(value, REDACTION_STEPS));
}

function coverageLabel(covered: number) {
  if (covered === 0) {
    return "Uncovered";
  }

  if (covered === REDACTION_STEPS) {
    return "Fully redacted";
  }

  return "Partly redacted";
}

export function ScrollRedact({ children }: ScrollRedactProps) {
  const [covered, setCovered] = React.useState(0);
  const isFullyRedacted = covered === REDACTION_STEPS;

  const moveCoverage = (amount: number) => {
    setCovered((currentCoverage) => clampCoverage(currentCoverage + amount));
  };

  return (
    <section
      aria-label="Scroll to redact the content"
      className="gra-ui scroll-redact"
      data-covered={covered}
      data-state={isFullyRedacted ? "redacted" : covered > 0 ? "covering" : "open"}
    >
      <div
        aria-valuemax={REDACTION_STEPS}
        aria-valuemin={0}
        aria-valuenow={covered}
        aria-valuetext={`${coverageLabel(covered)}: ${covered} of ${REDACTION_STEPS} bands`}
        className="scroll-redact__surface"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            moveCoverage(1);
          }

          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            moveCoverage(-1);
          }

          if (event.key === "Home") {
            event.preventDefault();
            setCovered(0);
          }

          if (event.key === "End") {
            event.preventDefault();
            setCovered(REDACTION_STEPS);
          }
        }}
        onWheel={(event) => {
          if (event.deltaY === 0) {
            return;
          }

          event.preventDefault();
          moveCoverage(event.deltaY > 0 ? 1 : -1);
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="scroll-redact__content">{children}</div>
        <div aria-hidden="true" className="scroll-redact__bands">
          {Array.from({ length: covered }, (_, index) => (
            <span
              className="scroll-redact__band"
              data-fresh={index === covered - 1 ? "true" : "false"}
              data-row={index}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="scroll-redact__footer">
        <output aria-live="polite">{coverageLabel(covered)}</output>
        <div aria-hidden="true" className="scroll-redact__meter">
          {Array.from({ length: REDACTION_STEPS }, (_, index) => (
            <span data-filled={index < covered ? "true" : "false"} key={index} />
          ))}
        </div>
      </div>

      {covered > 0 ? (
        <button
          className="scroll-redact__reset"
          onClick={() => setCovered(0)}
          type="button"
        >
          Remove bands
        </button>
      ) : null}
    </section>
  );
}
