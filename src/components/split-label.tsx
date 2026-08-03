import * as React from "react";

export interface SplitLabelProps {
  label: string;
}

type SplitLabelState =
  | "whole"
  | "split"
  | "split-left"
  | "split-right"
  | "reuniting";

type LabelHalf = "left" | "right";

export function SplitLabel({ label }: SplitLabelProps) {
  const [state, setState] = React.useState<SplitLabelState>("whole");
  const midpoint = Math.ceil(label.length / 2);
  const leftHalf = label.slice(0, midpoint);
  const rightHalf = label.slice(midpoint);

  const split = () => {
    if (state === "whole") {
      setState("split");
    }
  };

  const selectHalf = (half: LabelHalf) => {
    if (state === "split") {
      setState(half === "left" ? "split-left" : "split-right");
    } else if (
      (state === "split-left" && half === "right") ||
      (state === "split-right" && half === "left")
    ) {
      setState("reuniting");
    }
  };

  return (
    <section
      aria-label={
        state === "whole"
          ? "Double-click to split the label"
          : "Click both halves to reunite the label"
      }
      className="gra-ui split-label"
      data-state={state}
    >
      {state === "whole" ? (
        <button
          className="split-label__whole"
          onDoubleClick={split}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              split();
            }
          }}
          type="button"
        >
          {label}
        </button>
      ) : (
        <span
          className="split-label__parts"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && state === "reuniting") {
              setState("whole");
            }
          }}
        >
          <button
            aria-label={`Select first half${leftHalf ? `: ${leftHalf}` : ""}`}
            aria-pressed={state === "split-left"}
            className="split-label__part"
            data-picked={state === "split-left" ? "true" : undefined}
            data-part="left"
            onClick={() => selectHalf("left")}
            type="button"
          >
            {leftHalf}
          </button>
          <button
            aria-label={`Select second half${rightHalf ? `: ${rightHalf}` : ""}`}
            aria-pressed={state === "split-right"}
            className="split-label__part"
            data-picked={state === "split-right" ? "true" : undefined}
            data-part="right"
            onClick={() => selectHalf("right")}
            type="button"
          >
            {rightHalf}
          </button>
        </span>
      )}
    </section>
  );
}
