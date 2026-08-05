import * as React from "react";

export interface SpaceStapleProps {
  label: string;
}

interface SpaceStapleState {
  signature: string;
  position: number;
  stapledGap: number | null;
  dragging: boolean;
}

const HANDLE_INSET = 0.06;

function clamp(value: number) {
  return Math.max(0, Math.min(value, 1));
}

function countSpaces(label: string) {
  let count = 0;

  for (let index = 0; index < label.length; index += 1) {
    if (label[index] === " ") {
      count += 1;
    }
  }

  return count;
}

function positionForGap(gap: number, gapCount: number) {
  return gapCount < 2
    ? 0.5
    : HANDLE_INSET + (gap / (gapCount - 1)) * (1 - HANDLE_INSET * 2);
}

function gapForPosition(position: number, gapCount: number) {
  if (gapCount < 2) {
    return 0;
  }

  const normalized = clamp(
    (clamp(position) - HANDLE_INSET) / (1 - HANDLE_INSET * 2),
  );

  return Math.round(normalized * (gapCount - 1));
}

function positionFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) {
    return 0.5;
  }

  return Math.max(
    HANDLE_INSET,
    Math.min(1 - HANDLE_INSET, (clientX - rect.left) / rect.width),
  );
}

function removeSpaceAt(label: string, gap: number) {
  let seen = -1;

  for (let index = 0; index < label.length; index += 1) {
    if (label[index] !== " ") {
      continue;
    }

    seen += 1;

    if (seen === gap) {
      return `${label.slice(0, index)}${label.slice(index + 1)}`;
    }
  }

  return label;
}

function createState(label: string): SpaceStapleState {
  const gapCount = countSpaces(label);
  const initialGap = Math.floor(gapCount / 2);

  return {
    signature: label,
    position: gapCount === 0 ? 0.5 : positionForGap(initialGap, gapCount),
    stapledGap: null,
    dragging: false,
  };
}

export function SpaceStaple({ label }: SpaceStapleProps) {
  const gapCount = countSpaces(label);
  const [state, setState] = React.useState<SpaceStapleState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const canStaple = gapCount > 0;
  const displayedLabel =
    current.stapledGap === null ? label : removeSpaceAt(label, current.stapledGap);

  const updatePosition = (position: number, dragging: boolean) => {
    setState((previous) => {
      const next = previous.signature === label ? previous : createState(label);

      return {
        ...next,
        position: clamp(position),
        dragging,
      };
    });
  };

  const commitPosition = (position: number) => {
    if (!canStaple) {
      return;
    }

    const gap = gapForPosition(position, gapCount);

    setState((previous) => {
      const next = previous.signature === label ? previous : createState(label);

      return {
        ...next,
        position: positionForGap(gap, gapCount),
        stapledGap: gap,
        dragging: false,
      };
    });
  };

  const cancelDrag = () => {
    setState((previous) => {
      const next = previous.signature === label ? previous : createState(label);

      if (!next.dragging) {
        return next;
      }

      return {
        ...next,
        position:
          next.stapledGap === null
            ? createState(label).position
            : positionForGap(next.stapledGap, gapCount),
        dragging: false,
      };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canStaple) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextGap = Math.max(
        0,
        Math.min(gapCount - 1, gapForPosition(current.position, gapCount) + direction),
      );
      commitPosition(positionForGap(nextGap, gapCount));
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      commitPosition(event.key === "End" ? 1 : 0);
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
      event.preventDefault();
      commitPosition(current.position);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !canStaple) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(
      positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
      true,
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!current.dragging) {
      return;
    }

    const position = positionFromPointer(
      event.clientX,
      event.currentTarget.getBoundingClientRect(),
    );
    commitPosition(position);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      aria-label={
        canStaple
          ? "Drag the staple to remove one space from the label"
          : "The label has no spaces to staple"
      }
      className="gra-ui space-staple"
      data-gap={current.stapledGap ?? "open"}
      data-state={
        current.dragging
          ? "dragging"
          : current.stapledGap === null
            ? canStaple
              ? "ready"
              : "empty"
            : "stapled"
      }
    >
      <header className="space-staple__header">
        <span>Space staple</span>
        <output aria-live="polite">
          {canStaple ? `${gapCount} gap${gapCount === 1 ? "" : "s"}` : "No gaps"}
        </output>
      </header>

      <div className="space-staple__paper">
        <output
          aria-live="polite"
          className="space-staple__label"
          key={current.stapledGap ?? "open"}
        >
          {displayedLabel || "(empty label)"}
        </output>
        <div
          aria-disabled={!canStaple}
          aria-label="Staple position"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(current.position * 100)}
          aria-valuetext={
            !canStaple
              ? "No spaces available"
              : current.stapledGap === null
                ? "No space stapled"
                : `Gap ${current.stapledGap + 1} stapled`
          }
          className="space-staple__track"
          onKeyDown={handleKeyDown}
          onLostPointerCapture={cancelDrag}
          onPointerCancel={cancelDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={(event) => {
            if (current.dragging) {
              updatePosition(
                positionFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()),
                true,
              );
            }
          }}
          onPointerUp={handlePointerUp}
          role="slider"
          tabIndex={canStaple ? 0 : -1}
        >
          <span aria-hidden="true" className="space-staple__rail" />
          <span
            aria-hidden="true"
            className="space-staple__handle"
            style={{ left: `${current.position * 100}%` }}
          >
            <span>+</span>
          </span>
        </div>
      </div>

      <p aria-live="polite" className="space-staple__status">
        {!canStaple
          ? "Use a label with at least one space."
          : current.dragging
            ? "Release the staple at a gap to remove it."
            : current.stapledGap === null
              ? "Drag the staple across the rail. One gap will be declared unnecessary."
              : `Gap ${current.stapledGap + 1} removed. The words are now stuck together.`}
      </p>

      <button
        className="space-staple__reset"
        disabled={!canStaple || current.stapledGap === null}
        onClick={() => setState(createState(label))}
        type="button"
      >
        Unstaple the label
      </button>
    </section>
  );
}
