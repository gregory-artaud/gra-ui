import * as React from "react";

export interface ScaleSweepProps {
  children: React.ReactNode;
}

type ScaleSweepState = {
  dragging: boolean;
  position: number;
  visited: number[];
};

type ScaleSweepAction =
  | {
      type: "move";
      fromIndex: number;
      index: number;
      position: number;
      total: number;
      dragging: boolean;
    }
  | { type: "end" }
  | { type: "reset" };

const INITIAL_STATE: ScaleSweepState = {
  dragging: false,
  position: 0,
  visited: [],
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(value, maximum));
}

function indexFromPosition(position: number, total: number) {
  if (total <= 1) {
    return 0;
  }

  return Math.round(clamp(position, 0, 1) * (total - 1));
}

function positionForIndex(index: number, total: number) {
  return total <= 1 ? 0.5 : index / (total - 1);
}

function visitRange(visited: number[], fromIndex: number, toIndex: number, total: number) {
  const next = new Set(visited.filter((index) => index >= 0 && index < total));
  const step = fromIndex <= toIndex ? 1 : -1;

  for (let index = fromIndex; index !== toIndex + step; index += step) {
    next.add(index);
  }

  return [...next].sort((first, second) => first - second);
}

function scaleSweepReducer(
  state: ScaleSweepState,
  action: ScaleSweepAction,
): ScaleSweepState {
  if (action.type === "reset") {
    return INITIAL_STATE;
  }

  if (action.type === "end") {
    return state.dragging ? { ...state, dragging: false } : state;
  }

  if (action.total === 0) {
    return { ...INITIAL_STATE, dragging: action.dragging };
  }

  return {
    dragging: action.dragging,
    position: clamp(action.position, 0, 1),
    visited: visitRange(state.visited, action.fromIndex, action.index, action.total),
  };
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  return clamp((clientX - rect.left) / rect.width, 0, 1);
}

function isSweepKey(key: string) {
  return key === "ArrowLeft" || key === "ArrowRight" || key === "Home" || key === "End";
}

export function ScaleSweep({ children }: ScaleSweepProps) {
  const pieces = React.Children.toArray(children);
  const total = pieces.length;
  const [state, dispatch] = React.useReducer(scaleSweepReducer, INITIAL_STATE);
  const position = total === 0 ? 0 : clamp(state.position, 0, 1);
  const currentIndex = indexFromPosition(position, total);
  const visited = state.visited.filter((index) => index < total);
  const isComplete = total > 0 && visited.length === total;
  const stateName = isComplete ? "complete" : visited.length > 0 ? "sweeping" : "ready";

  const moveTo = (nextPosition: number, dragging: boolean) => {
    const nextIndex = indexFromPosition(nextPosition, total);

    dispatch({
      type: "move",
      fromIndex: currentIndex,
      index: nextIndex,
      position: nextPosition,
      total,
      dragging,
    });
  };

  const moveFromPointer = (event: React.PointerEvent<HTMLDivElement>, dragging: boolean) => {
    moveTo(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()), dragging);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isSweepKey(event.key) || total === 0) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? total - 1
          : clamp(currentIndex + (event.key === "ArrowRight" ? 1 : -1), 0, total - 1);

    moveTo(positionForIndex(nextIndex, total), false);
  };

  return (
    <section
      aria-label="Sweep across the content to enlarge each item"
      className="gra-ui scale-sweep"
      data-state={stateName}
    >
      <div className="scale-sweep__header">
        <span>Scale sweep</span>
        <output aria-live="polite">{visited.length} / {total}</output>
      </div>

      <div
        aria-label="Sweep position"
        aria-valuemax={Math.max(total - 1, 0)}
        aria-valuemin={0}
        aria-valuenow={currentIndex}
        aria-valuetext={`${visited.length} of ${total} items enlarged`}
        className="scale-sweep__track"
        onKeyDown={handleKeyDown}
        onLostPointerCapture={() => dispatch({ type: "end" })}
        onPointerCancel={() => dispatch({ type: "end" })}
        onPointerDown={(event) => {
          if (event.button !== 0) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          moveFromPointer(event, true);
        }}
        onPointerMove={(event) => {
          if (state.dragging) {
            moveFromPointer(event, true);
          }
        }}
        onPointerUp={(event) => {
          moveFromPointer(event, false);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="slider"
        tabIndex={total === 0 ? -1 : 0}
      >
        <span aria-hidden="true" className="scale-sweep__rail" />
        <span
          aria-hidden="true"
          className="scale-sweep__handle"
          style={{ left: `${position * 100}%` }}
        />
        <div className="scale-sweep__items">
          {pieces.map((piece, index) => (
            <div
              className="scale-sweep__item"
              data-current={index === currentIndex ? "true" : "false"}
              data-visited={visited.includes(index) ? "true" : "false"}
              key={index}
            >
              {piece}
            </div>
          ))}
        </div>
      </div>

      <div className="scale-sweep__footer">
        <span aria-hidden="true" className="scale-sweep__meter">
          {pieces.map((_, index) => (
            <span data-filled={visited.includes(index) ? "true" : "false"} key={index} />
          ))}
        </span>
        <span className="scale-sweep__status">
          {total === 0
            ? "Nothing to enlarge"
            : isComplete
              ? "Every item earned its size"
              : "Drag across every item"}
        </span>
      </div>

      {visited.length > 0 ? (
        <button
          className="scale-sweep__reset"
          onClick={() => dispatch({ type: "reset" })}
          type="button"
        >
          Shrink everything
        </button>
      ) : null}
    </section>
  );
}
