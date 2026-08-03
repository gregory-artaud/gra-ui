import * as React from "react";

export interface DragDuplicateProps {
  children: React.ReactNode;
}

type DragDuplicateState = "idle" | "duplicating" | "returning";

type DragDuplicateAction =
  | { type: "start" }
  | { type: "end" }
  | { type: "settle" };

function dragDuplicateReducer(
  state: DragDuplicateState,
  action: DragDuplicateAction,
): DragDuplicateState {
  if (action.type === "start" && state === "idle") {
    return "duplicating";
  }

  if (action.type === "end" && state === "duplicating") {
    return "returning";
  }

  if (action.type === "settle" && state === "returning") {
    return "idle";
  }

  return state;
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function DragDuplicate({ children }: DragDuplicateProps) {
  const [state, dispatch] = React.useReducer(
    dragDuplicateReducer,
    "idle",
  );
  const hasCopy = state !== "idle";

  const endInteraction = () => dispatch({ type: "end" });

  return (
    <div
      aria-label={
        state === "idle"
          ? "Drag to make a duplicate"
          : "Release to merge the duplicates"
      }
      className="gra-ui drag-duplicate"
      data-state={state}
      draggable
      onBlur={() => {
        if (state === "duplicating") {
          endInteraction();
        }
      }}
      onDragEnd={endInteraction}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        dispatch({ type: "start" });
      }}
      onKeyDown={(event) => {
        if (isActivationKey(event.key) && !event.repeat && state === "idle") {
          event.preventDefault();
          dispatch({ type: "start" });
        }
      }}
      onKeyUp={(event) => {
        if (isActivationKey(event.key) && state === "duplicating") {
          event.preventDefault();
          endInteraction();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="drag-duplicate__original">{children}</div>
      {hasCopy ? (
        <div
          aria-hidden="true"
          className="drag-duplicate__copy"
          inert
          onAnimationEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              state === "returning"
            ) {
              dispatch({ type: "settle" });
            }
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
