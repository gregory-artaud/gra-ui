import * as React from "react";

export interface HoldPositionProps {
  children: React.ReactNode;
}

const POSITION_COUNT = 3;

function clampPosition(position: number) {
  return Math.max(0, Math.min(position, POSITION_COUNT - 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  const ratio = (clientX - rect.left) / rect.width;
  return clampPosition(Math.round(ratio * (POSITION_COUNT - 1)));
}

function isHoldKey(key: string) {
  return key === "Enter" || key === " ";
}

export function HoldPosition({ children }: HoldPositionProps) {
  const [position, setPosition] = React.useState(1);
  const [isHeld, setIsHeld] = React.useState(false);

  const moveToPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    setPosition(positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
  };

  const releasePointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsHeld(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <button
      aria-label={isHeld ? "Release the content to keep its position" : "Hold and move the content"}
      aria-pressed={isHeld}
      className="gra-ui hold-position"
      data-held={isHeld ? "true" : "false"}
      data-position={position}
      onKeyDown={(event) => {
        if (isHoldKey(event.key)) {
          event.preventDefault();
          setIsHeld(true);
          return;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setIsHeld(true);
          setPosition((currentPosition) =>
            clampPosition(currentPosition + (event.key === "ArrowRight" ? 1 : -1)),
          );
        }
      }}
      onKeyUp={(event) => {
        if (isHoldKey(event.key) || event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setIsHeld(false);
        }
      }}
      onLostPointerCapture={() => setIsHeld(false)}
      onPointerCancel={releasePointer}
      onPointerDown={(event) => {
        if (event.button !== 0) {
          return;
        }

        event.currentTarget.setPointerCapture(event.pointerId);
        setIsHeld(true);
        moveToPointer(event);
      }}
      onPointerMove={(event) => {
        if (isHeld) {
          moveToPointer(event);
        }
      }}
      onPointerUp={releasePointer}
      type="button"
    >
      <span className="hold-position__track" aria-hidden="true">
        <span className="hold-position__slot" />
        <span className="hold-position__slot" />
        <span className="hold-position__slot" />
        <span className="hold-position__content">{children}</span>
      </span>
      <span aria-live="polite" className="hold-position__status">
        {isHeld ? "Moving" : `Position ${position + 1} / ${POSITION_COUNT}`}
      </span>
    </button>
  );
}
