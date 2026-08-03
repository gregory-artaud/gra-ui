import * as React from "react";

const HOLD_DURATION = 900;

type TimedReleaseState = "idle" | "holding" | "early" | "complete";

export interface TimedReleaseProps {
  children: React.ReactNode;
}

function isHoldKey(key: string) {
  return key === "Enter" || key === " ";
}

export function TimedRelease({ children }: TimedReleaseProps) {
  const [state, setState] = React.useState<TimedReleaseState>("idle");
  const startedAt = React.useRef<number | null>(null);

  const beginHold = (event?: React.PointerEvent<HTMLButtonElement>) => {
    if (state !== "idle") {
      setState("idle");
      return;
    }

    if (event) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    startedAt.current = Date.now();
    setState("holding");
  };

  const finishHold = (event?: React.PointerEvent<HTMLButtonElement>) => {
    if (state !== "holding") {
      return;
    }

    const elapsed = Date.now() - (startedAt.current ?? Date.now());
    startedAt.current = null;

    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setState(elapsed >= HOLD_DURATION ? "complete" : "early");
  };

  return (
    <button
      aria-label={
        state === "idle"
          ? "Hold and release the content to choose a result"
          : state === "holding"
            ? "Keep holding to reach the second result"
            : "Press again to reset the result"
      }
      aria-pressed={state === "holding"}
      className="gra-ui timed-release"
      data-state={state}
      onKeyDown={(event) => {
        if (event.repeat || !isHoldKey(event.key)) {
          return;
        }

        event.preventDefault();
        if (state === "idle") {
          beginHold();
        } else if (state !== "holding") {
          setState("idle");
        }
      }}
      onKeyUp={(event) => {
        if (isHoldKey(event.key)) {
          event.preventDefault();
          finishHold();
        }
      }}
      onLostPointerCapture={() => {
        if (startedAt.current !== null) {
          startedAt.current = null;
          setState("idle");
        }
      }}
      onPointerCancel={() => {
        startedAt.current = null;
        setState("idle");
      }}
      onPointerDown={(event) => {
        if (event.button === 0) {
          beginHold(event);
        }
      }}
      onPointerUp={finishHold}
      type="button"
    >
      <span className="timed-release__track" aria-hidden="true">
        <span className="timed-release__destination timed-release__destination--early" />
        <span className="timed-release__destination timed-release__destination--complete" />
        <span className="timed-release__content">{children}</span>
      </span>
      <span className="timed-release__meter" aria-hidden="true">
        <span className="timed-release__fill" />
      </span>
      <span aria-live="polite" className="timed-release__status">
        {state === "idle"
          ? "Hold to choose"
          : state === "holding"
            ? "Keep holding"
            : state === "early"
              ? "Released early"
              : "Held long enough"}
      </span>
    </button>
  );
}
