import * as React from "react";

export interface FreeDriftProps {
  children: React.ReactNode;
}

interface FreeDriftPosition {
  x: number;
  y: number;
}

interface FreeDriftState {
  signature: string;
  position: FreeDriftPosition;
  dragging: boolean;
}

const INITIAL_POSITION: FreeDriftPosition = { x: 50, y: 50 };

function createSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): FreeDriftState {
  return { signature, position: INITIAL_POSITION, dragging: false };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function positionFromPointer(event: React.PointerEvent<HTMLDivElement>, surface: HTMLDivElement) {
  const bounds = surface.getBoundingClientRect();

  return {
    x: clamp(((event.clientX - bounds.left) / bounds.width) * 100, 14, 86),
    y: clamp(((event.clientY - bounds.top) / bounds.height) * 100, 20, 80),
  };
}

export function FreeDrift({ children }: FreeDriftProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<FreeDriftState>(() => createState(signature));
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const current = state.signature === signature ? state : createState(signature);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const surface = surfaceRef.current;

    if (!surface) {
      return;
    }

    const position = positionFromPointer(event, surface);
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return { ...baseline, position };
    });
  };

  const moveByKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const steps = 5;
    const delta = {
      x: event.key === "ArrowRight" ? steps : event.key === "ArrowLeft" ? -steps : 0,
      y: event.key === "ArrowDown" ? steps : event.key === "ArrowUp" ? -steps : 0,
    };

    if (delta.x === 0 && delta.y === 0) {
      return;
    }

    event.preventDefault();
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return {
        ...baseline,
        position: {
          x: clamp(baseline.position.x + delta.x, 14, 86),
          y: clamp(baseline.position.y + delta.y, 20, 80),
        },
      };
    });
  };

  return (
    <section
      aria-label="Move content freely around a bounded surface"
      className="gra-ui free-drift"
      data-dragging={current.dragging ? "true" : "false"}
      data-state={current.position.x === 50 && current.position.y === 50 ? "centered" : "drifting"}
    >
      <header className="free-drift__header">
        <span>Free drift</span>
        <output aria-live="polite">
          {Math.round(current.position.x)} / {Math.round(current.position.y)}
        </output>
      </header>

      <div className="free-drift__surface" ref={surfaceRef}>
        <span aria-hidden="true" className="free-drift__crosshair" />
        <div
          aria-grabbed={current.dragging}
          aria-label="Drifting content; use arrow keys to move it"
          className="free-drift__cargo"
          data-dragging={current.dragging ? "true" : "false"}
          onKeyDown={moveByKeyboard}
          onPointerCancel={() => setState((previous) => ({ ...previous, dragging: false }))}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event);
            setState((previous) => ({ ...previous, dragging: true }));
          }}
          onPointerMove={(event) => {
            if (current.dragging) {
              updateFromPointer(event);
            }
          }}
          onPointerUp={(event) => {
            updateFromPointer(event);
            setState((previous) => ({ ...previous, dragging: false }));
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          role="button"
          style={{
            "--free-drift-x": `${current.position.x}%`,
            "--free-drift-y": `${current.position.y}%`,
          } as React.CSSProperties}
          tabIndex={0}
        >
          {children}
        </div>
      </div>

      <div className="free-drift__footer">
        <p aria-live="polite">
          {current.position.x === 50 && current.position.y === 50
            ? "Drag the content wherever it feels least appointed."
            : "It has chosen coordinates and will defend them."}
        </p>
        <button
          className="free-drift__reset"
          disabled={current.position.x === 50 && current.position.y === 50}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Return to center
        </button>
      </div>
    </section>
  );
}
