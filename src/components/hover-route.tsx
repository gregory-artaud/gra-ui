import * as React from "react";

const ROUTE_LENGTH = 4;

type HoverRouteFeedback = "ready" | "moving" | "reset" | "complete";

export interface HoverRouteProps {
  children: React.ReactNode;
}

export function HoverRoute({ children }: HoverRouteProps) {
  const [progress, setProgress] = React.useState(0);
  const [feedback, setFeedback] = React.useState<HoverRouteFeedback>("ready");
  const isComplete = progress === ROUTE_LENGTH;

  const visitStep = (step: number) => {
    if (isComplete || step < progress) {
      return;
    }

    if (step === progress) {
      const nextProgress = progress + 1;
      setProgress(nextProgress);
      setFeedback(nextProgress === ROUTE_LENGTH ? "complete" : "moving");
      return;
    }

    setProgress(0);
    setFeedback("reset");
  };

  const reset = () => {
    setProgress(0);
    setFeedback("ready");
  };

  const status =
    feedback === "complete"
      ? "Route complete. The content has stopped moving."
      : feedback === "reset"
        ? "Wrong step. The route starts over."
        : progress === 0
          ? "Hover step 1 to start"
          : `${progress} / ${ROUTE_LENGTH} steps completed`;

  return (
    <section
      aria-label="Content that follows a fixed hover route"
      className="gra-ui hover-route"
      data-feedback={feedback}
      data-state={isComplete ? "complete" : "moving"}
      data-step={progress}
    >
      <div className="hover-route__stage">
        <div className="hover-route__path" aria-label="Hover route steps">
          {Array.from({ length: ROUTE_LENGTH }, (_, step) => {
            const isVisited = step < progress;
            const isNext = step === progress;

            return (
              <button
                aria-label={`Hover route step ${step + 1} of ${ROUTE_LENGTH}`}
                aria-pressed={isVisited}
                className="hover-route__step"
                data-next={isNext ? "true" : "false"}
                data-visited={isVisited ? "true" : "false"}
                key={step}
                onClick={() => visitStep(step)}
                onPointerEnter={() => visitStep(step)}
                type="button"
              >
                <span aria-hidden="true">{step + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="hover-route__traveler" data-step={progress}>
          <span className="hover-route__content">{children}</span>
        </div>
      </div>

      <div className="hover-route__footer">
        <span aria-live="polite">{status}</span>
        {progress > 0 || feedback === "reset" ? (
          <button className="hover-route__reset" onClick={reset} type="button">
            Start over
          </button>
        ) : null}
      </div>
    </section>
  );
}
