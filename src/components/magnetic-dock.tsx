import * as React from "react";

export interface MagneticDockProps {
  children: React.ReactNode;
}

const DOCKS = [
  { label: "Left pocket", x: 18, y: 34 },
  { label: "High pocket", x: 82, y: 34 },
  { label: "Low pocket", x: 50, y: 76 },
] as const;

interface MagneticDockState {
  dock: number | null;
  dragging: boolean;
  signature: string;
  x: number;
  y: number;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): MagneticDockState {
  return { dock: null, dragging: false, signature, x: 50, y: 50 };
}

function clamp(value: number) {
  return Math.max(8, Math.min(92, value));
}

function nearestDock(x: number, y: number) {
  return DOCKS.reduce((nearest, dock, index) => {
    const distance = (dock.x - x) ** 2 + (dock.y - y) ** 2;
    return distance < nearest.distance ? { distance, index } : nearest;
  }, { distance: Number.POSITIVE_INFINITY, index: 0 }).index;
}

export function MagneticDock({ children }: MagneticDockProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<MagneticDockState>(() => createState(signature));
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const current = state.signature === signature ? state : createState(signature);

  const moveFromPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const surface = surfaceRef.current;
    if (!surface) {
      return;
    }

    const rect = surface.getBoundingClientRect();
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return {
        ...baseline,
        dock: null,
        dragging: true,
        x: clamp(((event.clientX - rect.left) / rect.width) * 100),
        y: clamp(((event.clientY - rect.top) / rect.height) * 100),
      };
    });
  };

  const dockAt = (index: number) => {
    const dock = DOCKS[index];
    setState({ dock: index, dragging: false, signature, x: dock.x, y: dock.y });
  };

  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const surface = surfaceRef.current;
    if (!surface || !current.dragging) {
      return;
    }

    const rect = surface.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100);
    dockAt(nearestDock(x, y));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const moveByKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const start = current.dock ?? 0;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    dockAt((start + direction + DOCKS.length) % DOCKS.length);
  };

  return (
    <section
      aria-label="Drag content to the nearest magnetic dock"
      className="gra-ui magnetic-dock"
      data-dock={current.dock === null ? "free" : DOCKS[current.dock].label}
      data-state={current.dragging ? "dragging" : current.dock === null ? "loose" : "docked"}
    >
      <header className="magnetic-dock__header">
        <span>Magnetic dock</span>
        <output aria-live="polite">
          {current.dock === null ? "Loose cargo" : DOCKS[current.dock].label}
        </output>
      </header>

      <div className="magnetic-dock__surface" ref={surfaceRef}>
        {DOCKS.map((dock) => (
          <span
            aria-hidden="true"
            className="magnetic-dock__port"
            data-active={current.dock === DOCKS.indexOf(dock) ? "true" : "false"}
            key={dock.label}
            style={{ left: `${dock.x}%`, top: `${dock.y}%` }}
          >
            {dock.label}
          </span>
        ))}
        <button
          aria-label="Movable cargo"
          className="magnetic-dock__cargo"
          data-dragging={current.dragging ? "true" : "false"}
          onKeyDown={moveByKeyboard}
          onLostPointerCapture={() => setState((previous) => ({ ...previous, dragging: false }))}
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            event.currentTarget.setPointerCapture(event.pointerId);
            moveFromPointer(event);
          }}
          onPointerMove={(event) => {
            if (current.dragging && event.currentTarget.hasPointerCapture(event.pointerId)) {
              moveFromPointer(event);
            }
          }}
          onPointerUp={finishDrag}
          type="button"
          style={{ left: `${current.x}%`, top: `${current.y}%` }}
        >
          {children}
        </button>
      </div>

      <div className="magnetic-dock__footer">
        <p aria-live="polite">
          {current.dock === null
            ? "Drag the cargo anywhere. It will snap to the nearest pocket when released."
            : `Cargo captured by the ${DOCKS[current.dock].label.toLowerCase()}.`}
        </p>
        <button
          className="magnetic-dock__reset"
          disabled={current.dock === null && !current.dragging}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Release cargo
        </button>
      </div>
    </section>
  );
}
