import * as React from "react";
import type { CSSProperties } from "react";

const MAX_RADIUS = 48;

export interface RadiusDialProps {
  children: React.ReactNode;
}

interface RadiusDialState {
  dragging: boolean;
  radius: number;
  signature: string;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): RadiusDialState {
  return { dragging: false, radius: 8, signature };
}

function clampRadius(value: number) {
  return Math.max(0, Math.min(MAX_RADIUS, Math.round(value)));
}

function radiusFromPointer(event: React.PointerEvent<HTMLButtonElement>, surface: HTMLElement) {
  const bounds = surface.getBoundingClientRect();
  const horizontal = bounds.width === 0 ? 0 : (event.clientX - bounds.left) / bounds.width;
  const vertical = bounds.height === 0 ? 0 : (event.clientY - bounds.top) / bounds.height;
  const distanceFromCorner = Math.max(horizontal, vertical);
  return clampRadius((1 - Math.max(0, Math.min(1, distanceFromCorner))) * MAX_RADIUS);
}

export function RadiusDial({ children }: RadiusDialProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<RadiusDialState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const handlePosition = 30 + ((MAX_RADIUS - current.radius) / MAX_RADIUS) * 62;
  const contentStyle = { "--radius-dial": `${current.radius}px` } as CSSProperties;

  const updateFromPointer = (event: React.PointerEvent<HTMLButtonElement>, dragging: boolean) => {
    const surface = event.currentTarget.parentElement;
    if (!surface) {
      return;
    }

    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return { ...baseline, dragging, radius: radiusFromPointer(event, surface) };
    });
  };

  return (
    <section
      aria-label="Drag a corner handle to round the content"
      className="gra-ui radius-dial"
      data-dragging={current.dragging}
      data-radius={current.radius}
    >
      <header className="radius-dial__header">
        <span>Radius dial</span>
        <output aria-live="polite">{current.radius}px corner radius</output>
      </header>

      <div className="radius-dial__surface">
        <div className="radius-dial__content" style={contentStyle}>
          <span className="radius-dial__caption">Molded content</span>
          <div>{children}</div>
        </div>
        <button
          aria-label="Corner radius handle"
          aria-valuemax={MAX_RADIUS}
          aria-valuemin={0}
          aria-valuenow={current.radius}
          aria-valuetext={`${current.radius} pixel corner radius`}
          className="radius-dial__handle"
          onKeyDown={(event) => {
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault();
              setState((previous) => {
                const baseline = previous.signature === signature ? previous : createState(signature);
                return { ...baseline, radius: clampRadius(baseline.radius + 4) };
              });
            }
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault();
              setState((previous) => {
                const baseline = previous.signature === signature ? previous : createState(signature);
                return { ...baseline, radius: clampRadius(baseline.radius - 4) };
              });
            }
            if (event.key === "Home") {
              event.preventDefault();
              setState((previous) => {
                const baseline = previous.signature === signature ? previous : createState(signature);
                return { ...baseline, radius: 0 };
              });
            }
            if (event.key === "End") {
              event.preventDefault();
              setState((previous) => {
                const baseline = previous.signature === signature ? previous : createState(signature);
                return { ...baseline, radius: MAX_RADIUS };
              });
            }
          }}
          onPointerCancel={() => setState((previous) => {
            const baseline = previous.signature === signature ? previous : createState(signature);
            return { ...baseline, dragging: false };
          })}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event, true);
          }}
          onPointerMove={(event) => {
            if (current.dragging) {
              updateFromPointer(event, true);
            }
          }}
          onPointerUp={(event) => {
            updateFromPointer(event, false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          role="slider"
          style={{ left: `${handlePosition}%`, top: `${handlePosition}%` }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <footer className="radius-dial__footer">
        <p aria-live="polite">
          {current.radius === 0
            ? "The corners are square and no wiser."
            : current.radius === MAX_RADIUS
              ? "The notice is now almost a capsule for no structural reason."
              : "Drag the handle toward the center to round an ordinary notice."}
        </p>
        <button disabled={current.radius === 8 && !current.dragging} onClick={() => setState(createState(signature))} type="button">
          Restore corners
        </button>
      </footer>
    </section>
  );
}
