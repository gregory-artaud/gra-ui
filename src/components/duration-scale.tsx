import * as React from "react";

const SAMPLE_LIMIT = 3;
const MIN_DURATION = 120;
const MAX_DURATION = 1_200;

type DurationScaleState = "ready" | "holding" | "settled";

export interface DurationScaleProps {
  children: React.ReactNode;
}

function isHoldKey(key: string) {
  return key === "Enter" || key === " ";
}

function clampDuration(duration: number) {
  return Math.max(MIN_DURATION, Math.min(duration, MAX_DURATION));
}

function scaleForAverage(duration: number) {
  const progress = (duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION);

  return 0.84 + progress * 0.34;
}

export function DurationScale({ children }: DurationScaleProps) {
  const [samples, setSamples] = React.useState<number[]>([]);
  const [state, setState] = React.useState<DurationScaleState>("ready");
  const startedAt = React.useRef<number | null>(null);
  const averageDuration = samples.length
    ? samples.reduce((total, sample) => total + sample, 0) / samples.length
    : 0;
  const scale = samples.length ? scaleForAverage(averageDuration) : 1;
  const contentStyle = { "--duration-scale": `${scale}` } as React.CSSProperties;

  const beginHold = (event?: React.PointerEvent<HTMLButtonElement>) => {
    if (state !== "ready") {
      return;
    }

    if (event) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    startedAt.current = Date.now();
    setState("holding");
  };

  const finishHold = () => {
    if (state !== "holding") {
      return;
    }

    const duration = clampDuration(Date.now() - (startedAt.current ?? Date.now()));
    const nextSampleCount = samples.length + 1;

    startedAt.current = null;
    setSamples((currentSamples) => [...currentSamples, duration].slice(-SAMPLE_LIMIT));
    setState(nextSampleCount >= SAMPLE_LIMIT ? "settled" : "ready");
  };

  const cancelHold = () => {
    if (state === "holding") {
      startedAt.current = null;
      setState("ready");
    }
  };

  return (
    <section
      aria-label="Measure three hold durations to choose a content scale"
      className="gra-ui duration-scale"
      data-sample-count={samples.length}
      data-state={state}
    >
      <button
        aria-pressed={state === "holding"}
        className="duration-scale__button"
        onBlur={cancelHold}
        onKeyDown={(event) => {
          if (!event.repeat && isHoldKey(event.key)) {
            event.preventDefault();
            beginHold();
          }
        }}
        onKeyUp={(event) => {
          if (isHoldKey(event.key)) {
            event.preventDefault();
            finishHold();
          }
        }}
        onLostPointerCapture={cancelHold}
        onPointerCancel={cancelHold}
        onPointerDown={(event) => {
          if (event.button === 0) {
            beginHold(event);
          }
        }}
        onPointerUp={finishHold}
        style={contentStyle}
        type="button"
      >
        <span className="duration-scale__content">{children}</span>
        <span aria-hidden="true" className="duration-scale__samples">
          {Array.from({ length: SAMPLE_LIMIT }, (_, index) => (
            <span
              className="duration-scale__sample"
              data-filled={index < samples.length ? "true" : "false"}
              key={index}
            />
          ))}
        </span>
        <output aria-live="polite" className="duration-scale__status">
          {state === "holding"
            ? "Release to record"
            : samples.length === 0
              ? "Hold three times"
              : `${samples.length}/${SAMPLE_LIMIT} holds · average ${Math.round(averageDuration)} ms`}
        </output>
      </button>
      {state === "settled" ? (
        <button
          className="duration-scale__reset"
          onClick={() => {
            startedAt.current = null;
            setSamples([]);
            setState("ready");
          }}
          type="button"
        >
          Measure again
        </button>
      ) : null}
    </section>
  );
}
