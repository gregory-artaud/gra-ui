import * as React from "react";

export interface MomentumWeaveProps {
  children: React.ReactNode;
}

interface MomentumWeaveState {
  dragging: boolean;
  order: number[];
  position: number;
  revision: number;
  signature: string;
  strands: 2 | 3;
}

interface PointerStart {
  time: number;
  x: number;
}

function signatureForPieces(pieces: readonly React.ReactNode[]) {
  return pieces
    .map((piece, index) => {
      if (React.isValidElement(piece)) {
        const element = piece as React.ReactElement<{ children?: React.ReactNode }>;

        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof piece}:${String(piece)}`;
    })
    .join("|");
}

function createState(signature: string, total: number): MomentumWeaveState {
  return {
    dragging: false,
    order: Array.from({ length: total }, (_, index) => index),
    position: 0.5,
    revision: 0,
    signature,
    strands: 2,
  };
}

function clampPosition(position: number) {
  return Math.max(0.1, Math.min(position, 0.9));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 0.5;
  }

  return clampPosition((clientX - rect.left) / rect.width);
}

function weave(order: readonly number[], strands: 2 | 3) {
  const woven: number[] = [];

  for (let strand = 0; strand < strands; strand += 1) {
    for (let index = strand; index < order.length; index += strands) {
      woven.push(order[index]);
    }
  }

  return woven;
}

function strandsForSpeed(start: PointerStart, endX: number, endTime: number): 2 | 3 {
  const distance = Math.abs(endX - start.x);
  const elapsed = Math.max(endTime - start.time, 16);

  return distance / elapsed >= 0.9 ? 3 : 2;
}

function isDirectionKey(key: string) {
  return key === "ArrowLeft" || key === "ArrowRight";
}

export function MomentumWeave({ children }: MomentumWeaveProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<MomentumWeaveState>(() =>
    createState(signature, pieces.length),
  );
  const pointerStart = React.useRef<PointerStart | null>(null);
  const current =
    state.signature === signature && state.order.length === pieces.length
      ? state
      : createState(signature, pieces.length);
  const canWeave = pieces.length > 1;

  const setDragging = (position: number, dragging: boolean) => {
    setState((previous) => {
      const base =
        previous.signature === signature && previous.order.length === pieces.length
          ? previous
          : createState(signature, pieces.length);

      return {
        ...base,
        dragging,
        position: clampPosition(position),
      };
    });
  };

  const commitWeave = (strands: 2 | 3) => {
    setState((previous) => {
      const base =
        previous.signature === signature && previous.order.length === pieces.length
          ? previous
          : createState(signature, pieces.length);

      return {
        ...base,
        dragging: false,
        order: weave(base.order, strands),
        position: 0.5,
        revision: base.revision + 1,
        strands,
      };
    });
  };

  const cancelDrag = () => {
    pointerStart.current = null;

    if (!current.dragging) {
      return;
    }

    setDragging(0.5, false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canWeave) {
      return;
    }

    if (isDirectionKey(event.key)) {
      event.preventDefault();
      commitWeave(event.key === "ArrowRight" ? 3 : 2);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setState(createState(signature, pieces.length));
    }
  };

  return (
    <section
      aria-label="Drag a shuttle to weave the children by momentum"
      className="gra-ui momentum-weave"
      data-dragging={current.dragging}
      data-state={current.revision === 0 ? "ready" : "woven"}
      data-strands={current.strands}
    >
      <header className="momentum-weave__header">
        <span>Momentum weave</span>
        <output aria-live="polite">
          {pieces.length === 0 ? "Empty" : `${current.revision} weave${current.revision === 1 ? "" : "s"}`}
        </output>
      </header>

      <div
        aria-label="Weave shuttle"
        aria-valuemax={100}
        aria-valuemin={10}
        aria-valuenow={Math.round(current.position * 100)}
        aria-valuetext={
          current.dragging
            ? "Shuttle in motion"
            : current.revision === 0
              ? "Ready to weave"
              : `Settled as a ${current.strands}-strand weave`
        }
        className="momentum-weave__track"
        onKeyDown={handleKeyDown}
        onLostPointerCapture={cancelDrag}
        onPointerCancel={cancelDrag}
        onPointerDown={(event) => {
          if (event.button !== 0 || !canWeave) {
            return;
          }

          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          pointerStart.current = { time: Date.now(), x: event.clientX };
          setDragging(
            positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
            true,
          );
        }}
        onPointerMove={(event) => {
          if (pointerStart.current) {
            setDragging(
              positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
              true,
            );
          }
        }}
        onPointerUp={(event) => {
          const start = pointerStart.current;

          if (!start) {
            return;
          }

          const strands = strandsForSpeed(start, event.clientX, Date.now());
          pointerStart.current = null;
          commitWeave(strands);

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="slider"
        style={{ "--momentum-position": `${current.position * 100}%` } as React.CSSProperties}
        tabIndex={canWeave ? 0 : -1}
      >
        <span aria-hidden="true" className="momentum-weave__rail" />
        <span aria-hidden="true" className="momentum-weave__handle" />
        <div
          aria-live="polite"
          className="momentum-weave__content"
          data-dragging={current.dragging}
          key={`${current.signature}-${current.revision}`}
        >
          {current.order.map((pieceIndex, index) => (
            <div
              className="momentum-weave__piece"
              key={`${pieceIndex}-${current.revision}`}
              style={{ "--weave-delay": `${index * 45}ms` } as React.CSSProperties}
            >
              {pieces[pieceIndex]}
            </div>
          ))}
        </div>
      </div>

      <div className="momentum-weave__footer">
        <p aria-live="polite">
          {pieces.length === 0
            ? "Give the shuttle something to weave."
            : current.dragging
              ? "Release gently for two strands or flick for three."
              : current.revision === 0
                ? "Drag the shuttle across the rail."
                : `${current.strands}-strand weave settled. The order really changed.`}
        </p>
        <button
          className="momentum-weave__reset"
          disabled={current.revision === 0}
          onClick={() => {
            pointerStart.current = null;
            setState(createState(signature, pieces.length));
          }}
          type="button"
        >
          Restore order
        </button>
      </div>
    </section>
  );
}
