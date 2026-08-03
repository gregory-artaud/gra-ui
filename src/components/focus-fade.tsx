import * as React from "react";

export interface FocusFadeProps {
  children: React.ReactNode;
}

type FocusFadeState = "idle" | "fading" | "returning";

type FocusFadeAction =
  | { type: "focus" }
  | { type: "animation-end" };

function focusFadeReducer(
  state: FocusFadeState,
  action: FocusFadeAction,
): FocusFadeState {
  if (action.type === "focus" && state === "idle") {
    return "fading";
  }

  if (action.type === "animation-end" && state === "fading") {
    return "returning";
  }

  if (action.type === "animation-end" && state === "returning") {
    return "idle";
  }

  return state;
}

export function FocusFade({ children }: FocusFadeProps) {
  const [state, dispatch] = React.useReducer(focusFadeReducer, "idle");

  return (
    <section
      aria-label="Focus to make the content disappear and return"
      className="gra-ui focus-fade"
      data-state={state}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          dispatch({ type: "animation-end" });
        }
      }}
      onFocus={(event) => {
        if (event.target === event.currentTarget) {
          dispatch({ type: "focus" });
        }
      }}
      role="group"
      tabIndex={0}
    >
      {children}
    </section>
  );
}
