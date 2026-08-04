import * as React from "react";

type SplitSide = "left" | "right";

export interface SideSplitProps {
  children: React.ReactNode;
}

export function SideSplit({ children }: SideSplitProps) {
  const pieces = React.Children.toArray(children);
  const [assignments, setAssignments] = React.useState<SplitSide[]>([]);
  const activeAssignments = assignments.slice(0, pieces.length);
  const nextIndex = activeAssignments.length;
  const hasNext = nextIndex < pieces.length;
  const isComplete = pieces.length > 0 && !hasNext;
  const leftPieces = pieces
    .map((piece, index) => ({ piece, index }))
    .filter(({ index }) => activeAssignments[index] === "left");
  const rightPieces = pieces
    .map((piece, index) => ({ piece, index }))
    .filter(({ index }) => activeAssignments[index] === "right");

  const assignNext = (side: SplitSide) => {
    setAssignments((currentAssignments) => {
      const current = currentAssignments.slice(0, pieces.length);

      return current.length < pieces.length ? [...current, side] : current;
    });
  };

  return (
    <section
      aria-label="Sort each piece into a side"
      className="gra-ui side-split"
      data-state={isComplete ? "complete" : pieces.length === 0 ? "empty" : "routing"}
    >
      <div className="side-split__heading">
        <span>Route the next piece</span>
        <output aria-live="polite">
          {isComplete ? "Complete" : `${nextIndex} / ${pieces.length}`}
        </output>
      </div>

      <div aria-live="polite" className="side-split__incoming">
        <span className="side-split__incoming-label">
          {hasNext ? `Piece ${nextIndex + 1}` : pieces.length === 0 ? "No pieces" : "Every piece routed"}
        </span>
        {hasNext ? (
          <span className="side-split__incoming-piece" key={nextIndex}>
            {pieces[nextIndex]}
          </span>
        ) : null}
      </div>

      <div className="side-split__lanes">
        <section aria-label="Left side" className="side-split__lane" data-side="left">
          <div className="side-split__lane-heading">
            <h3>Left side</h3>
            <span>{leftPieces.length}</span>
          </div>
          <div aria-label="Pieces on the left" className="side-split__items">
            {leftPieces.map(({ piece, index }) => (
              <span className="side-split__item" key={`left-${index}`}>
                {piece}
              </span>
            ))}
          </div>
          <button
            disabled={!hasNext}
            onClick={() => assignNext("left")}
            type="button"
          >
            Place next here <span aria-hidden="true">←</span>
          </button>
        </section>

        <section aria-label="Right side" className="side-split__lane" data-side="right">
          <div className="side-split__lane-heading">
            <h3>Right side</h3>
            <span>{rightPieces.length}</span>
          </div>
          <div aria-label="Pieces on the right" className="side-split__items">
            {rightPieces.map(({ piece, index }) => (
              <span className="side-split__item" key={`right-${index}`}>
                {piece}
              </span>
            ))}
          </div>
          <button
            disabled={!hasNext}
            onClick={() => assignNext("right")}
            type="button"
          >
            Place next here <span aria-hidden="true">→</span>
          </button>
        </section>
      </div>

      <div className="side-split__footer">
        <span>
          {isComplete
            ? "The split is now permanent."
            : pieces.length === 0
              ? "Give the component something to divide."
              : "Choose a side for each piece."}
        </span>
        {activeAssignments.length > 0 ? (
          <button onClick={() => setAssignments([])} type="button">
            Start over
          </button>
        ) : null}
      </div>
    </section>
  );
}
