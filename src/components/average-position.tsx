import * as React from "react";

const SAMPLE_COUNT = 3;
const DEFAULT_POSITION = 0.5;

export interface AveragePositionProps {
  children: React.ReactNode;
}

function clampPosition(position: number) {
  return Math.max(0, Math.min(position, 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return DEFAULT_POSITION;
  }

  return clampPosition((clientX - rect.left) / rect.width);
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function AveragePosition({ children }: AveragePositionProps) {
  const [points, setPoints] = React.useState<number[]>([]);
  const [position, setPosition] = React.useState(DEFAULT_POSITION);
  const isSettled = points.length === SAMPLE_COUNT;

  const recordPoint = (point: number) => {
    if (isSettled) {
      return;
    }

    const nextPoints = [...points, clampPosition(point)];
    setPoints(nextPoints);

    if (nextPoints.length === SAMPLE_COUNT) {
      const average = nextPoints.reduce((sum, current) => sum + current, 0) / SAMPLE_COUNT;
      setPosition(average);
    }
  };

  return (
    <section
      aria-label={
        isSettled
          ? "Average position chosen. Reset to mark three new points."
          : `Mark ${SAMPLE_COUNT - points.length} more point${SAMPLE_COUNT - points.length === 1 ? "" : "s"} to place the content`
      }
      className="gra-ui average-position"
      data-count={points.length}
      data-state={isSettled ? "settled" : "marking"}
    >
      <div
        aria-disabled={isSettled}
        aria-label="Mark a position"
        className="average-position__track"
        onClick={(event) => {
          recordPoint(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
        }}
        onKeyDown={(event) => {
          if (isActivationKey(event.key)) {
            event.preventDefault();
            recordPoint(DEFAULT_POSITION);
          }

          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            recordPoint(event.key === "ArrowLeft" ? 0.25 : 0.75);
          }
        }}
        role="button"
        tabIndex={isSettled ? -1 : 0}
      >
        <span aria-hidden="true" className="average-position__rail" />
        {points.map((point, index) => (
          <span
            aria-hidden="true"
            className="average-position__point"
            key={`${point}-${index}`}
            style={{ left: `${point * 100}%` }}
          />
        ))}
        <div
          className="average-position__content"
          style={{ left: `${position * 100}%` }}
        >
          {children}
        </div>
      </div>

      <div className="average-position__footer">
        <span aria-live="polite">
          {isSettled ? "Average settled" : `${points.length} / ${SAMPLE_COUNT} points marked`}
        </span>
        <button
          className="average-position__reset"
          onClick={() => {
            setPoints([]);
            setPosition(DEFAULT_POSITION);
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
