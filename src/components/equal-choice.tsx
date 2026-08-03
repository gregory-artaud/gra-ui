import * as React from "react";

export interface EqualChoiceProps {
  children: React.ReactNode;
}

type ChoiceState = "idle" | "choose" | "left" | "right";

export function EqualChoice({ children }: EqualChoiceProps) {
  const [state, setState] = React.useState<ChoiceState>("idle");
  const isChoosing = state === "choose";
  const isAnimating = state === "left" || state === "right";

  const openChoice = () => {
    if (state === "idle") {
      setState("choose");
    }
  };

  return (
    <div
      aria-label={isChoosing ? "Choose either side" : "Double-click to choose a side"}
      className="gra-ui equal-choice"
      data-state={state}
      onDoubleClick={openChoice}
      onKeyDown={(event) => {
        if (!isChoosing && !isAnimating && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          openChoice();
        }
      }}
      role={isChoosing || isAnimating ? "group" : "button"}
      tabIndex={isChoosing || isAnimating ? -1 : 0}
    >
      <div
        className="equal-choice__content"
        data-side={isAnimating ? state : undefined}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) {
            setState("idle");
          }
        }}
      >
        {children}
      </div>
      {isChoosing ? (
        <div className="equal-choice__choices" aria-label="Equal choices">
          <button
            aria-label="Choose the left side"
            className="equal-choice__side"
            onClick={() => setState("left")}
            type="button"
          />
          <button
            aria-label="Choose the right side"
            className="equal-choice__side"
            onClick={() => setState("right")}
            type="button"
          />
        </div>
      ) : null}
    </div>
  );
}
