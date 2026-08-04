import * as React from "react";

export interface CursorProofProps {
  label: string;
}

interface CursorProofState {
  signature: string;
  cursor: number;
  revealed: number[];
}

function createState(label: string): CursorProofState {
  return { signature: label, cursor: 0, revealed: [] };
}

function clampIndex(index: number, length: number) {
  return Math.max(0, Math.min(index, Math.max(length - 1, 0)));
}

function indexFromPointer(clientX: number, rect: DOMRect, length: number) {
  if (rect.width === 0 || length === 0) {
    return 0;
  }

  return clampIndex(Math.floor(((clientX - rect.left) / rect.width) * length), length);
}

function isCursorKey(key: string) {
  return key === "ArrowLeft" || key === "ArrowRight" || key === "Home" || key === "End";
}

export function CursorProof({ label }: CursorProofProps) {
  const [state, setState] = React.useState<CursorProofState>(() => createState(label));
  const characters = Array.from(label);
  const current = state.signature === label ? state : createState(label);
  const isComplete = characters.length > 0 && current.revealed.length === characters.length;
  const cursorPosition = characters.length <= 1
    ? 50
    : ((current.cursor + 0.5) / characters.length) * 100;

  const revealAt = (index: number) => {
    setState((previous) => {
      const base = previous.signature === label ? previous : createState(label);
      const nextIndex = clampIndex(index, characters.length);

      if (base.cursor === nextIndex && base.revealed.includes(nextIndex)) {
        return base;
      }

      return {
        signature: label,
        cursor: nextIndex,
        revealed: base.revealed.includes(nextIndex)
          ? base.revealed
          : [...base.revealed, nextIndex].sort((first, second) => first - second),
      };
    });
  };

  return (
    <section
      aria-label="Move a proofing cursor across a label"
      className="gra-ui cursor-proof"
      data-state={isComplete ? "complete" : "proofing"}
    >
      <header className="cursor-proof__header">
        <span>Cursor proof</span>
        <output aria-live="polite">
          {current.revealed.length} / {characters.length}
        </output>
      </header>

      <div
        aria-label="Proofing cursor"
        aria-valuemax={Math.max(characters.length - 1, 0)}
        aria-valuemin={0}
        aria-valuenow={current.cursor}
        aria-valuetext={`${current.revealed.length} of ${characters.length} characters uncovered`}
        className="cursor-proof__surface"
        onKeyDown={(event) => {
          if (!isCursorKey(event.key) || characters.length === 0) {
            return;
          }

          event.preventDefault();
          const nextIndex =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? characters.length - 1
                : current.cursor + (event.key === "ArrowRight" ? 1 : -1);

          revealAt(nextIndex);
        }}
        onPointerMove={(event) => {
          revealAt(indexFromPointer(
            event.clientX,
            event.currentTarget.getBoundingClientRect(),
            characters.length,
          ));
        }}
        role="slider"
        style={{ "--cursor-position": `${cursorPosition}%` } as React.CSSProperties}
        tabIndex={characters.length === 0 ? -1 : 0}
      >
        <span aria-hidden="true" className="cursor-proof__rail" />
        <span aria-hidden="true" className="cursor-proof__cursor" />
        <p aria-label={label} className="cursor-proof__label" aria-live="polite">
          {characters.map((character, index) => (
            <span
              aria-hidden="true"
              className="cursor-proof__character"
              data-revealed={current.revealed.includes(index) ? "true" : "false"}
              data-space={character === " " ? "true" : "false"}
              key={`${current.signature}-${index}`}
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </p>
      </div>

      <div className="cursor-proof__footer">
        <p aria-live="polite">
          {characters.length === 0
            ? "There is no label to proof."
            : isComplete
              ? "The label is legible. The proof was unnecessary."
              : `${characters.length - current.revealed.length} character${characters.length - current.revealed.length === 1 ? "" : "s"} still hidden`}
        </p>
        <button
          className="cursor-proof__reset"
          disabled={current.revealed.length === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
