import * as React from "react";

export interface LassoLockProps {
  children: React.ReactNode;
}

type Point = {
  x: number;
  y: number;
};

type Selection = {
  start: Point;
  end: Point;
};

interface LassoLockState {
  draft: Selection | null;
  locked: number[];
  signature: string;
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

function emptyState(signature: string): LassoLockState {
  return {
    draft: null,
    locked: [],
    signature,
  };
}

function pointFromEvent(event: React.PointerEvent<HTMLDivElement>): Point {
  const rect = event.currentTarget.getBoundingClientRect();

  return {
    x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
    y: Math.max(0, Math.min(rect.height, event.clientY - rect.top)),
  };
}

function normalizedSelection(selection: Selection) {
  return {
    bottom: Math.max(selection.start.y, selection.end.y),
    left: Math.min(selection.start.x, selection.end.x),
    right: Math.max(selection.start.x, selection.end.x),
    top: Math.min(selection.start.y, selection.end.y),
  };
}

function isInsideSelection(
  item: HTMLElement,
  stage: HTMLDivElement,
  selection: ReturnType<typeof normalizedSelection>,
) {
  const stageRect = stage.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const centerX = (itemRect.left + itemRect.right) / 2 - stageRect.left;
  const centerY = (itemRect.top + itemRect.bottom) / 2 - stageRect.top;

  return (
    centerX >= selection.left &&
    centerX <= selection.right &&
    centerY >= selection.top &&
    centerY <= selection.bottom
  );
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function LassoLock({ children }: LassoLockProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<LassoLockState>(() => emptyState(signature));
  const current = state.signature === signature ? state : emptyState(signature);
  const locked = current.locked.filter((index) => index >= 0 && index < pieces.length);
  const lockedSet = new Set(locked);
  const isLocked = locked.length >= 2;
  const stateName = isLocked
    ? "locked"
    : current.draft
      ? "drawing"
      : pieces.length === 0
        ? "empty"
        : "ready";

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    if (!current.draft || isLocked) {
      return;
    }

    const selection = normalizedSelection({
      end: pointFromEvent(event),
      start: current.draft.start,
    });
    const selected =
      selection.right - selection.left > 8 && selection.bottom - selection.top > 8
        ? Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[data-lasso-index]"))
            .filter((item) => isInsideSelection(item, event.currentTarget, selection))
            .map((item) => Number(item.dataset.lassoIndex))
        : [];

    setState({
      draft: null,
      locked: selected.length >= 2 ? selected : [],
      signature,
    });
  };

  const reset = () => {
    setState(emptyState(signature));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isActivationKey(event.key) || isLocked || pieces.length < 2) {
      return;
    }

    event.preventDefault();
    setState({
      draft: null,
      locked: pieces.slice(0, 2).map((_, index) => index),
      signature,
    });
  };

  const status =
    pieces.length === 0
      ? "There are no pieces to lock."
      : isLocked
        ? `${locked.length} pieces locked together. Reset to draw another box.`
        : current.draft
          ? "Release to lock the pieces inside the box."
          : "Draw a box around at least two pieces, or press Space to lock the first two.";

  const draftStyle = current.draft
    ? ({
        "--lasso-bottom": `${normalizedSelection(current.draft).bottom}px`,
        "--lasso-left": `${normalizedSelection(current.draft).left}px`,
        "--lasso-right": `${normalizedSelection(current.draft).right}px`,
        "--lasso-top": `${normalizedSelection(current.draft).top}px`,
      } as React.CSSProperties)
    : undefined;

  return (
    <section
      aria-label="Draw a box around pieces to lock them together"
      className="gra-ui lasso-lock"
      data-state={stateName}
    >
      <header className="lasso-lock__header">
        <span>Lasso lock</span>
        <output aria-live="polite">{isLocked ? `${locked.length} locked` : `${pieces.length} loose`}</output>
      </header>

      <div
        aria-label={`Pieces to enclose. ${status}`}
        className="lasso-lock__stage"
        onKeyDown={handleKeyDown}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          setState((previous) =>
            previous.signature === signature ? { ...previous, draft: null } : previous,
          );
        }}
        onPointerDown={(event) => {
          if (isLocked || event.button !== 0) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          const point = pointFromEvent(event);
          setState((previous) => {
            const base = previous.signature === signature ? previous : emptyState(signature);

            return {
              ...base,
              draft: { end: point, start: point },
            };
          });
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
          }

          const point = pointFromEvent(event);
          setState((previous) => {
            if (previous.signature !== signature || !previous.draft) {
              return previous;
            }

            return {
              ...previous,
              draft: { ...previous.draft, end: point },
            };
          });
        }}
        onPointerUp={finishPointer}
        role="group"
        tabIndex={isLocked || pieces.length < 2 ? -1 : 0}
        style={draftStyle}
      >
        <div className="lasso-lock__field" aria-live="polite">
          {pieces.map((piece, index) =>
            lockedSet.has(index) ? null : (
              <div className="lasso-lock__item" data-lasso-index={index} key={index}>
                {piece}
              </div>
            ),
          )}
        </div>

        <div className="lasso-lock__tray" aria-live="polite">
          {locked.length > 0 ? (
            <div className="lasso-lock__bundle">
              {locked.map((index) => (
                <div className="lasso-lock__item lasso-lock__item--locked" key={index}>
                  {pieces[index]}
                </div>
              ))}
            </div>
          ) : (
            <span className="lasso-lock__empty">Open tray</span>
          )}
        </div>

        {current.draft ? <span aria-hidden="true" className="lasso-lock__marquee" /> : null}
      </div>

      <div className="lasso-lock__footer">
        <p aria-live="polite">{status}</p>
        <button disabled={!isLocked} onClick={reset} type="button">
          Reset
        </button>
      </div>
    </section>
  );
}
