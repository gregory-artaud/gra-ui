import * as React from "react";

const INITIAL_ANGLE = 0;

export interface CompassHingeProps {
  children: React.ReactNode;
}

interface CompassHingeState {
  angle: number;
  dragging: boolean;
}

function clampAngle(angle: number) {
  return Math.min(360, Math.max(0, angle));
}

function createState(): CompassHingeState {
  return { angle: INITIAL_ANGLE, dragging: false };
}

export function CompassHinge({ children }: CompassHingeProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<CompassHingeState>(createState);
  const current = state;
  const radians = (current.angle * Math.PI) / 180;
  const knobStyle = {
    left: `${50 + Math.sin(radians) * 38}%`,
    top: `${50 - Math.cos(radians) * 38}%`,
  };

  const angleFromPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;

    if (!stage) {
      return null;
    }

    const bounds = stage.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    const angle = (Math.atan2(x, -y) * 180) / Math.PI;
    return clampAngle(angle < 0 ? angle + 360 : angle);
  };

  const moveHinge = (event: React.PointerEvent<HTMLButtonElement>, dragging: boolean) => {
    const angle = angleFromPointer(event);

    if (angle === null) {
      return;
    }

    setState({ angle, dragging });
  };

  return (
    <section
      aria-label="Turn a compass hinge to rotate the content"
      className="gra-ui compass-hinge"
      data-dragging={current.dragging}
      data-state={current.angle === INITIAL_ANGLE ? "north" : "turned"}
    >
      <header className="compass-hinge__header">
        <span>Compass hinge</span>
        <output aria-live="polite">{Math.round(current.angle)}°</output>
      </header>

      <div className="compass-hinge__stage" ref={stageRef}>
        <div aria-hidden="true" className="compass-hinge__dial">
          <span>N</span>
          <span>E</span>
          <span>S</span>
          <span>W</span>
        </div>
        <div className="compass-hinge__content" style={{ transform: `translate(-50%, -50%) rotate(${current.angle}deg)` }}>
          {children}
        </div>
        <button
          aria-label={`Compass hinge at ${Math.round(current.angle)} degrees`}
          className="compass-hinge__knob"
          onKeyDown={(event) => {
            const change = event.key === "ArrowRight" || event.key === "ArrowDown" ? 15 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -15 : 0;

            if (change === 0) {
              return;
            }

            event.preventDefault();
            setState((previous) => ({ ...previous, angle: clampAngle(previous.angle + change) }));
          }}
          onPointerCancel={() => setState((previous) => ({ ...previous, dragging: false }))}
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            moveHinge(event, true);
          }}
          onPointerMove={(event) => {
            if (current.dragging) {
              moveHinge(event, true);
            }
          }}
          onPointerUp={(event) => {
            moveHinge(event, false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          style={knobStyle}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <footer className="compass-hinge__footer">
        <p aria-live="polite">
          {current.angle === INITIAL_ANGLE
            ? "Drag the knob. The content will pivot around an imaginary north."
            : "The page rotated because a compass was asked to have an opinion."}
        </p>
        <button
          className="compass-hinge__reset"
          disabled={current.angle === INITIAL_ANGLE && !current.dragging}
          onClick={() => setState(createState())}
          type="button"
        >
          Face north
        </button>
      </footer>
    </section>
  );
}
