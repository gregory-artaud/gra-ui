import * as React from "react";

const CHECKPOINTS = [0.28, 0.56, 0.84] as const;

export interface CheckpointQueueProps {
  children: React.ReactNode;
}

type QueueState = {
  dragging: boolean;
  order: number[];
  position: number;
  progress: number;
  signature: string;
  turn: number;
};

type QueueAction =
  | {
      type: "move";
      dragging: boolean;
      position: number;
      signature: string;
      total: number;
    }
  | {
      type: "release";
      position: number;
      signature: string;
      total: number;
    }
  | {
      type: "cancel";
      signature: string;
      total: number;
    }
  | {
      type: "reset";
      signature: string;
      total: number;
    };

function clampPosition(position: number) {
  return Math.max(0, Math.min(position, 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 0;
  }

  return clampPosition((clientX - rect.left) / rect.width);
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

function createState(signature: string, total: number): QueueState {
  return {
    dragging: false,
    order: Array.from({ length: total }, (_, index) => index),
    position: 0,
    progress: 0,
    signature,
    turn: 0,
  };
}

function checkpointAt(position: number) {
  return CHECKPOINTS.filter((checkpoint) => checkpoint <= position).length;
}

function settledPosition(progress: number) {
  return progress === CHECKPOINTS.length ? 1 : progress === 0 ? 0 : CHECKPOINTS[progress - 1];
}

function advanceState(state: QueueState, position: number, total: number) {
  const nextPosition = clampPosition(position);
  const nextProgress = Math.max(state.progress, checkpointAt(nextPosition));
  const nextOrder = state.order.length === total
    ? [...state.order]
    : Array.from({ length: total }, (_, index) => index);

  for (let index = state.progress; index < nextProgress; index += 1) {
    const first = nextOrder.shift();

    if (first !== undefined) {
      nextOrder.push(first);
    }
  }

  return {
    ...state,
    order: nextOrder,
    position: nextPosition,
    progress: nextProgress,
    turn: state.turn + (nextProgress - state.progress),
  };
}

function currentState(state: QueueState, signature: string, total: number) {
  return state.signature === signature && state.order.length === total
    ? state
    : createState(signature, total);
}

function queueReducer(state: QueueState, action: QueueAction): QueueState {
  const base = currentState(state, action.signature, action.total);

  if (action.type === "reset") {
    return createState(action.signature, action.total);
  }

  if (action.type === "cancel") {
    return {
      ...base,
      dragging: false,
      position: settledPosition(base.progress),
    };
  }

  const advanced = advanceState(base, action.position, action.total);

  if (action.type === "release") {
    return {
      ...advanced,
      dragging: false,
      position: settledPosition(advanced.progress),
    };
  }

  return { ...advanced, dragging: action.dragging };
}

export function CheckpointQueue({ children }: CheckpointQueueProps) {
  const pieces = React.Children.toArray(children);
  const total = pieces.length;
  const signature = signatureForPieces(pieces);
  const [state, dispatch] = React.useReducer(
    queueReducer,
    { signature, total },
    ({ signature: initialSignature, total: initialTotal }) =>
      createState(initialSignature, initialTotal),
  );
  const active = currentState(state, signature, total);
  const isComplete = total > 0 && active.progress === CHECKPOINTS.length;
  const stateName = total === 0
    ? "empty"
    : isComplete
      ? "complete"
      : active.dragging
        ? "moving"
        : active.progress > 0
          ? "waiting"
          : "ready";

  const dispatchMove = (position: number, dragging: boolean) => {
    dispatch({
      type: "move",
      dragging,
      position,
      signature,
      total,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isComplete || total === 0) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      dispatchMove(
        active.position + (event.key === "ArrowRight" ? 0.08 : -0.08),
        false,
      );
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      dispatchMove(event.key === "End" ? 1 : 0, false);
    }
  };

  return (
    <section
      aria-label="Drag the queue seal through three checkpoints"
      className="gra-ui checkpoint-queue"
      data-progress={active.progress}
      data-state={stateName}
    >
      <header className="checkpoint-queue__header">
        <span>Checkpoint queue</span>
        <output aria-live="polite">
          {isComplete ? "Filed" : `${active.progress} / ${CHECKPOINTS.length} checks`}
        </output>
      </header>

      <ol aria-live="polite" className="checkpoint-queue__items">
        {active.order.map((pieceIndex) => (
          <li
            className="checkpoint-queue__item"
            data-position={active.order.indexOf(pieceIndex)}
            key={`${pieceIndex}-${active.turn}`}
          >
            {pieces[pieceIndex]}
          </li>
        ))}
      </ol>

      <div
        aria-label="Queue checkpoint position"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(active.position * 100)}
        aria-valuetext={`${active.progress} of ${CHECKPOINTS.length} checkpoints reached`}
        className="checkpoint-queue__track"
        onKeyDown={handleKeyDown}
        onLostPointerCapture={() => dispatch({ type: "cancel", signature, total })}
        onPointerCancel={() => dispatch({ type: "cancel", signature, total })}
        onPointerDown={(event) => {
          if (event.button !== 0 || isComplete || total === 0) {
            return;
          }

          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          dispatchMove(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()), true);
        }}
        onPointerMove={(event) => {
          if (active.dragging) {
            dispatchMove(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()), true);
          }
        }}
        onPointerUp={(event) => {
          if (!active.dragging) {
            return;
          }

          dispatch({
            type: "release",
            position: positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
            signature,
            total,
          });

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="slider"
        tabIndex={isComplete || total === 0 ? -1 : 0}
      >
        <span aria-hidden="true" className="checkpoint-queue__rail" />
        {CHECKPOINTS.map((checkpoint, index) => (
          <span
            aria-hidden="true"
            className="checkpoint-queue__checkpoint"
            data-reached={active.progress > index}
            key={checkpoint}
            style={{ left: `${checkpoint * 100}%` }}
          >
            <span>{index + 1}</span>
          </span>
        ))}
        <span
          aria-hidden="true"
          className="checkpoint-queue__handle"
          style={{ left: `${active.position * 100}%` }}
        />
      </div>

      <div className="checkpoint-queue__footer">
        <p aria-live="polite">
          {total === 0
            ? "Add children to start the queue."
            : isComplete
              ? "Every checkpoint is filed. The queue will not restore itself."
              : active.progress === 0
                ? "Drag the seal past each mark. Every mark sends the first child to the back."
                : `Checkpoint ${active.progress} filed. Release or drag farther to continue.`}
        </p>
        {active.progress > 0 ? (
          <button
            className="checkpoint-queue__reset"
            onClick={() => dispatch({ type: "reset", signature, total })}
            type="button"
          >
            Restore the queue
          </button>
        ) : null}
      </div>
    </section>
  );
}
