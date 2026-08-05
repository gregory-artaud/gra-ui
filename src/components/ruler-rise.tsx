import * as React from "react";

export interface RulerRiseProps {
  children: React.ReactNode;
}

interface RulerRiseState {
  signature: string;
  position: number;
  progress: number;
  dragging: boolean;
}

function signatureForPieces(pieces: readonly React.ReactNode[]) {
  return pieces
    .map((piece, index) => {
      if (React.isValidElement(piece)) {
        const element = piece as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof piece}:${String(piece)}`;
    })
    .join("|");
}

function createState(signature: string): RulerRiseState {
  return { signature, position: 0, progress: 0, dragging: false };
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

function progressForPosition(position: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.min(total, Math.floor(position * (total + 1)));
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function RulerRise({ children }: RulerRiseProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<RulerRiseState>(() => createState(signature));
  const activePointerId = React.useRef<number | null>(null);
  const visibleState = state.signature === signature ? state : createState(signature);
  const isComplete = pieces.length > 0 && visibleState.progress === pieces.length;

  const commitPosition = (position: number, dragging: boolean) => {
    setState((current) => {
      const baseline = current.signature === signature ? current : createState(signature);
      const nextPosition = clampPosition(position);

      return {
        signature,
        position: nextPosition,
        progress: Math.max(
          baseline.progress,
          progressForPosition(nextPosition, pieces.length),
        ),
        dragging,
      };
    });
  };

  const advance = () => {
    if (isComplete) {
      return;
    }

    const nextProgress = Math.min(visibleState.progress + 1, pieces.length);
    const nextPosition = pieces.length === 0 ? 0 : nextProgress / (pieces.length + 1);
    commitPosition(nextPosition, false);
  };

  return (
    <section
      aria-label={
        isComplete
          ? "Every child has risen. Reset to lower the staircase."
          : pieces.length === 0
            ? "No children available to raise."
            : "Drag the ruler across the rail to raise each child in order."
      }
      className="gra-ui ruler-rise"
      data-count={visibleState.progress}
      data-state={isComplete ? "complete" : visibleState.progress > 0 ? "rising" : "ready"}
    >
      <div className="ruler-rise__stage">
        <div className="ruler-rise__steps" aria-label="Raised children" aria-live="polite">
          {pieces.length > 0 ? (
            pieces.map((piece, index) => {
              const isRaised = index < visibleState.progress;
              const rise = isRaised ? (pieces.length - index) * 12 + 14 : 0;

              return (
                <div
                  className="ruler-rise__item"
                  data-raised={isRaised ? "true" : "false"}
                  key={index}
                  style={{ transform: `translateY(-${rise}px)` }}
                >
                  {piece}
                </div>
              );
            })
          ) : (
            <span className="ruler-rise__empty">No children to raise.</span>
          )}
        </div>

        <div className="ruler-rise__rail-wrap">
          <div
            aria-disabled={isComplete || pieces.length === 0}
            aria-label="Raising ruler"
            aria-valuemax={pieces.length}
            aria-valuemin={0}
            aria-valuenow={visibleState.progress}
            aria-valuetext={`${visibleState.progress} of ${pieces.length} children raised`}
            className="ruler-rise__rail"
            data-dragging={visibleState.dragging ? "true" : "false"}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || isActivationKey(event.key)) {
                event.preventDefault();
                advance();
              }

              if (event.key === "ArrowLeft") {
                event.preventDefault();
                commitPosition(visibleState.position - 1 / (pieces.length + 1), false);
              }
            }}
            onPointerCancel={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              activePointerId.current = null;
              setState((current) =>
                current.signature === signature ? { ...current, dragging: false } : current,
              );
            }}
            onPointerDown={(event) => {
              if (isComplete || pieces.length === 0) {
                return;
              }

              activePointerId.current = event.pointerId;
              event.currentTarget.setPointerCapture(event.pointerId);
              commitPosition(
                positionFromPointer(
                  event.clientX,
                  event.currentTarget.getBoundingClientRect(),
                ),
                true,
              );
            }}
            onPointerMove={(event) => {
              if (
                activePointerId.current !== event.pointerId ||
                !event.currentTarget.hasPointerCapture(event.pointerId)
              ) {
                return;
              }

              commitPosition(
                positionFromPointer(
                  event.clientX,
                  event.currentTarget.getBoundingClientRect(),
                ),
                true,
              );
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              activePointerId.current = null;
              setState((current) =>
                current.signature === signature ? { ...current, dragging: false } : current,
              );
            }}
            role="slider"
            tabIndex={isComplete || pieces.length === 0 ? -1 : 0}
          >
            <span aria-hidden="true" className="ruler-rise__rail-line" />
            {pieces.map((_, index) => (
              <span
                aria-hidden="true"
                className="ruler-rise__marker"
                data-passed={index < visibleState.progress ? "true" : "false"}
                key={index}
                style={{ left: `${((index + 1) / (pieces.length + 1)) * 100}%` }}
              />
            ))}
            <span
              aria-hidden="true"
              className="ruler-rise__handle"
              style={{ left: `${visibleState.position * 100}%` }}
            >
              <span />
            </span>
          </div>
        </div>
      </div>

      <div className="ruler-rise__footer">
        <span aria-live="polite">
          {pieces.length === 0
            ? "No children"
            : isComplete
              ? "Staircase complete"
              : `${visibleState.progress} / ${pieces.length} raised`}
        </span>
        <button
          className="ruler-rise__reset"
          disabled={visibleState.progress === 0 && visibleState.position === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Lower all
        </button>
      </div>
    </section>
  );
}
