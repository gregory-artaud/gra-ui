import * as React from "react";

type MixedClickPhase = "ready" | "armed" | "verified" | "released";

export interface MixedClickProps {
  children: React.ReactNode;
}

const phaseProgress: Record<MixedClickPhase, number> = {
  ready: 0,
  armed: 1,
  verified: 2,
  released: 3,
};

function primaryLabel(phase: MixedClickPhase) {
  if (phase === "armed") {
    return "Left click resets the sequence";
  }

  if (phase === "verified") {
    return "Left click releases the content";
  }

  if (phase === "released") {
    return "Click to start over";
  }

  return "Left click to begin the sequence";
}

export function MixedClick({ children }: MixedClickProps) {
  const statusId = React.useId();
  const [phase, setPhase] = React.useState<MixedClickPhase>("ready");
  const progress = phaseProgress[phase];

  const handlePrimary = () => {
    setPhase((currentPhase) => {
      if (currentPhase === "ready") {
        return "armed";
      }

      if (currentPhase === "verified") {
        return "released";
      }

      return "ready";
    });
  };

  const handleSecondary = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPhase((currentPhase) => (currentPhase === "armed" ? "verified" : "ready"));
  };

  return (
    <section
      aria-label="Complete a left click, right click, left click sequence"
      className="gra-ui mixed-click"
      data-state={phase}
    >
      <button
        aria-describedby={statusId}
        aria-label={primaryLabel(phase)}
        className="mixed-click__button"
        onClick={handlePrimary}
        onContextMenu={handleSecondary}
        onKeyDown={(event) => {
          if (event.key === "ContextMenu" || (event.key === "Enter" && event.shiftKey)) {
            handleSecondary(event);
          }
        }}
        type="button"
      >
        <span aria-hidden="true" className="mixed-click__lane">
          {[0, 1, 2].map((step) => (
            <span
              className="mixed-click__slot"
              data-active={step < progress ? "true" : "false"}
              data-current={step === progress && phase !== "released" ? "true" : "false"}
              key={step}
            />
          ))}
        </span>
        <span className="mixed-click__content">{children}</span>
      </button>
      <output aria-live="polite" className="mixed-click__status" id={statusId}>
        {phase === "released"
          ? "Sequence completed · click to restart"
          : `${progress + 1} / 3 · ${phase === "armed" ? "right click" : phase === "verified" ? "left click" : "left click"}`}
      </output>
    </section>
  );
}
