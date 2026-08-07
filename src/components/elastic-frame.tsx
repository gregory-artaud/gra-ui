import * as React from "react";

export interface ElasticFrameProps {
  children: React.ReactNode;
}

interface ElasticFrameState {
  signature: string;
  width: number;
  dragging: boolean;
}

const INITIAL_WIDTH = 68;

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

function createState(signature: string): ElasticFrameState {
  return { signature, width: INITIAL_WIDTH, dragging: false };
}

function clampWidth(value: number) {
  return Math.min(96, Math.max(32, value));
}

export function ElasticFrame({ children }: ElasticFrameProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<ElasticFrameState>(() => createState(signature));
  const railRef = React.useRef<HTMLDivElement>(null);
  const current = state.signature === signature ? state : createState(signature);

  const widthFromPointer = (clientX: number) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const bounds = rail.getBoundingClientRect();
    const width = ((clientX - bounds.left) / bounds.width) * 100;
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return { ...baseline, width: clampWidth(width) };
    });
  };

  const moveByKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") {
      return;
    }

    event.preventDefault();
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      const width = event.key === "Home"
        ? 32
        : event.key === "End"
          ? 96
          : clampWidth(baseline.width + (event.key === "ArrowRight" ? 4 : -4));
      return { ...baseline, width };
    });
  };

  return (
    <section
      aria-label="Resize a frame around the content directly"
      className="gra-ui elastic-frame"
      data-dragging={current.dragging ? "true" : "false"}
      data-state={current.width === INITIAL_WIDTH ? "neutral" : "reshaped"}
    >
      <header className="elastic-frame__header">
        <span>Elastic frame</span>
        <output aria-live="polite">{Math.round(current.width)}% wide</output>
      </header>

      <div
        className="elastic-frame__rail"
        ref={railRef}
        style={{ "--elastic-frame-width": `${current.width}%` } as React.CSSProperties}
      >
        <div className="elastic-frame__body" style={{ "--elastic-frame-width": `${current.width}%` } as React.CSSProperties}>
          <div className="elastic-frame__content">{children}</div>
        </div>
        <button
          aria-label="Resize frame"
          className="elastic-frame__handle"
          onKeyDown={moveByKeyboard}
          onPointerCancel={(event) => {
            setState((previous) => ({ ...previous, dragging: false }));
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            widthFromPointer(event.clientX);
            setState((previous) => ({ ...previous, dragging: true }));
          }}
          onPointerMove={(event) => {
            if (current.dragging) {
              widthFromPointer(event.clientX);
            }
          }}
          onPointerUp={(event) => {
            widthFromPointer(event.clientX);
            setState((previous) => ({ ...previous, dragging: false }));
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="elastic-frame__footer">
        <p aria-live="polite">
          {current.width === INITIAL_WIDTH
            ? "Pull the frame until the content has a suitably inconvenient width."
            : "The frame has accepted your measurement and will not improve the layout."}
        </p>
        <button
          className="elastic-frame__reset"
          disabled={current.width === INITIAL_WIDTH}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Restore frame
        </button>
      </div>
    </section>
  );
}
