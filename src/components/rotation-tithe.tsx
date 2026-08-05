import * as React from "react";

export interface RotationTitheProps {
  label: string;
}

interface RotationTitheState {
  signature: string;
  bank: number;
  turns: number;
  lastPosition: number | null;
}

function createState(label: string): RotationTitheState {
  return { signature: label, bank: 0, turns: 0, lastPosition: null };
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 0;
  }

  return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
}

function addDistance(state: RotationTitheState, distance: number): RotationTitheState {
  const total = state.bank + distance;
  const newTurns = Math.floor(total);

  return {
    ...state,
    bank: total - newTurns,
    turns: state.turns + newTurns,
  };
}

export function RotationTithe({ label }: RotationTitheProps) {
  const [state, setState] = React.useState<RotationTitheState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const visibleTurn = current.turns % 8;
  const bankPercent = Math.round(current.bank * 100);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const position = positionFromPointer(
      event.clientX,
      event.currentTarget.getBoundingClientRect(),
    );

    setState((previous) => {
      const base = previous.signature === label ? previous : createState(label);

      if (base.lastPosition === null) {
        return { ...base, lastPosition: position };
      }

      return {
        ...addDistance(base, Math.abs(position - base.lastPosition)),
        lastPosition: position,
      };
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    setState((previous) => {
      const base = previous.signature === label ? previous : createState(label);
      return addDistance(base, 0.25);
    });
  }

  return (
    <section
      aria-label="Rotate a label by spending pointer distance"
      className="gra-ui rotation-tithe"
      data-state={current.turns === 0 ? "ready" : "turning"}
    >
      <header className="rotation-tithe__header">
        <span>Rotation tithe</span>
        <output aria-live="polite">
          {current.turns === 0
            ? "No turns paid"
            : `${current.turns} ${current.turns === 1 ? "turn" : "turns"} paid`}
        </output>
      </header>

      <div
        aria-label="Move the pointer sideways across this surface to rotate the label"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={bankPercent}
        className="rotation-tithe__surface"
        data-turns={visibleTurn}
        onKeyDown={handleKeyDown}
        onPointerLeave={() => {
          setState((previous) => (
            previous.lastPosition === null ? previous : { ...previous, lastPosition: null }
          ));
        }}
        onPointerMove={handlePointerMove}
        role="slider"
        tabIndex={label ? 0 : -1}
      >
        <span aria-hidden="true" className="rotation-tithe__rail">
          <span className="rotation-tithe__rail-line" />
          <span className="rotation-tithe__rail-caption">Spend a full width</span>
        </span>
        <span className="rotation-tithe__label" aria-live="polite">{label || "An empty receipt"}</span>
      </div>

      <div className="rotation-tithe__footer">
        <p aria-live="polite">
          {label.length === 0
            ? "Give the tithe a label."
            : current.turns === 0
              ? "Move left and right across the receipt. Every full width buys a 45° turn."
              : `${bankPercent}% of the next turn is currently in the till.`}
        </p>
        <button
          className="rotation-tithe__reset"
          disabled={current.turns === 0 && current.bank === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Return receipt
        </button>
      </div>
    </section>
  );
}
