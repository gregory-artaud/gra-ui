import * as React from "react";

const POSITION_COUNT = 5;

export interface CounterweightProps {
  children: React.ReactNode;
}

interface CounterweightState {
  dragging: boolean;
  position: number;
  signature: string;
}

function childrenSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return `${index}:${String(child.type)}:${String(child.key)}:${String(child.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("\u241f");
}

function clampPosition(position: number) {
  return Math.max(0, Math.min(position, POSITION_COUNT - 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 2;
  }

  return clampPosition(Math.round(((clientX - rect.left) / rect.width) * (POSITION_COUNT - 1)));
}

function createState(signature: string): CounterweightState {
  return { dragging: false, position: 2, signature };
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function Counterweight({ children }: CounterweightProps) {
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<CounterweightState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const mirroredPosition = POSITION_COUNT - 1 - current.position;

  const moveToPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    setState({
      dragging: true,
      position: positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
      signature,
    });
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    setState({ ...current, dragging: false, signature });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const moveByKeyboard = (amount: number) => {
    setState({
      dragging: false,
      position: clampPosition(current.position + amount),
      signature,
    });
  };

  return (
    <section aria-label="Counterweight" className="gra-ui counterweight" data-dragging={current.dragging} data-position={current.position}>
      <div className="counterweight__header">
        <span>Counterweight rail</span>
        <output aria-live="polite">Cargo at slot {mirroredPosition + 1}</output>
      </div>

      <div
        aria-label="Move the counterweight"
        className="counterweight__track"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            moveByKeyboard(event.key === "ArrowRight" ? 1 : -1);
          }

          if (isActivationKey(event.key)) {
            event.preventDefault();
            moveByKeyboard(current.position === POSITION_COUNT - 1 ? -current.position : 1);
          }
        }}
        onPointerCancel={stopDragging}
        onPointerDown={(event) => {
          if (event.button !== 0) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          moveToPointer(event);
        }}
        onPointerMove={(event) => {
          if (current.dragging) {
            moveToPointer(event);
          }
        }}
        onPointerUp={stopDragging}
        role="button"
        tabIndex={0}
      >
        {Array.from({ length: POSITION_COUNT }, (_, index) => <span aria-hidden="true" className="counterweight__slot" key={index} />)}
        <span aria-hidden="true" className="counterweight__weight">weight</span>
        <div className="counterweight__cargo" data-mirrored-position={mirroredPosition}>{children}</div>
      </div>

      <div className="counterweight__footer">
        <span>{current.dragging ? "Balancing" : "Drag the weight; the cargo takes the opposite slot."}</span>
        <button
          className="counterweight__reset"
          disabled={current.position === 2}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Recenter
        </button>
      </div>
    </section>
  );
}
