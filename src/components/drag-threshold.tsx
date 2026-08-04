import * as React from "react";

const THRESHOLDS = [0.28, 0.56, 0.84] as const;

export interface DragThresholdProps {
  children: React.ReactNode;
}

function clampPosition(position: number) {
  return Math.max(0, Math.min(position, 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 0;
  }

  return clampPosition((clientX - rect.left) / rect.width);
}

export function DragThreshold({ children }: DragThresholdProps) {
  const [stage, setStage] = React.useState(0);
  const [position, setPosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const isComplete = stage === THRESHOLDS.length;

  const commitPosition = (nextPosition: number) => {
    if (isComplete) {
      return;
    }

    const threshold = THRESHOLDS[stage];

    if (nextPosition >= threshold) {
      setStage(stage + 1);
      setPosition(threshold);
      return;
    }

    setStage(0);
    setPosition(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isComplete) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setPosition(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isComplete) {
      return;
    }

    setPosition(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const nextPosition = positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect());
    setIsDragging(false);
    commitPosition(nextPosition);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isComplete) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => clampPosition(current + (event.key === "ArrowRight" ? 0.08 : -0.08)));
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setPosition(event.key === "End" ? 1 : 0);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDragging(false);
      commitPosition(position);
    }
  };

  return (
    <section
      aria-label={isComplete ? "All drag thresholds cleared" : `Drag threshold ${stage + 1} of ${THRESHOLDS.length}`}
      className="gra-ui drag-threshold"
      data-dragging={isDragging}
      data-stage={stage}
      data-state={isComplete ? "complete" : "measuring"}
    >
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(position * 100)}
        aria-valuetext={`${stage} of ${THRESHOLDS.length} thresholds cleared`}
        className="drag-threshold__track"
        onKeyDown={handleKeyDown}
        onPointerCancel={() => {
          setIsDragging(false);
          setPosition(stage === 0 ? 0 : THRESHOLDS[stage - 1]);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        tabIndex={isComplete ? -1 : 0}
      >
        <div aria-hidden="true" className="drag-threshold__rail" />
        {THRESHOLDS.map((threshold, index) => (
          <span
            aria-hidden="true"
            className="drag-threshold__marker"
            data-reached={stage > index}
            key={threshold}
            style={{ left: `${threshold * 100}%` }}
          >
            <span>{index + 1}</span>
          </span>
        ))}
        <span
          aria-hidden="true"
          className="drag-threshold__handle"
          style={{ left: `${position * 100}%` }}
        />
        <span className="drag-threshold__content">{children}</span>
      </div>

      <div aria-hidden="true" className="drag-threshold__meter">
        {THRESHOLDS.map((threshold, index) => (
          <span data-filled={stage > index} key={threshold} />
        ))}
      </div>
      <p aria-live="polite" className="drag-threshold__status">
        {isComplete
          ? "All thresholds cleared. The content is now officially over-dragged."
          : stage === 0
            ? "Release past the first mark. Each next mark is farther away."
            : `${stage} / ${THRESHOLDS.length} thresholds cleared. Drag farther next time.`}
      </p>
      <button
        className="drag-threshold__reset"
        onClick={() => {
          setStage(0);
          setPosition(0);
          setIsDragging(false);
        }}
        type="button"
      >
        Start over
      </button>
    </section>
  );
}
