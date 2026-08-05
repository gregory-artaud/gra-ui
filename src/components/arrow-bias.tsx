import * as React from "react";

export interface ArrowBiasProps {
  children: React.ReactNode;
}

type Direction = "left" | "right";

interface ArrowBiasState {
  signature: string;
  directions: readonly Direction[];
}

const MAX_STEPS = 3;

function signatureForPieces(pieces: readonly React.ReactNode[]) {
  return pieces
    .map((piece, index) => {
      if (React.isValidElement(piece)) {
        const element = piece as React.ReactElement<{ children?: React.ReactNode }>;

        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof piece}:${String(piece)}`;
    })
    .join("|");
}

function createState(signature: string): ArrowBiasState {
  return { signature, directions: [] };
}

export function ArrowBias({ children }: ArrowBiasProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<ArrowBiasState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const leftVotes = current.directions.filter((direction) => direction === "left").length;
  const rightVotes = current.directions.length - leftVotes;
  const bias = leftVotes === rightVotes ? "neutral" : leftVotes > rightVotes ? "left" : "right";
  const isLocked = current.directions.length === MAX_STEPS;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      if (current.directions.length > 0) {
        event.preventDefault();
        setState(createState(signature));
      }
      return;
    }

    const direction: Direction | null =
      event.key === "ArrowLeft" ? "left" : event.key === "ArrowRight" ? "right" : null;

    if (!direction || isLocked || pieces.length === 0) {
      return;
    }

    event.preventDefault();
    setState((previous) => {
      const previousDirections = previous.signature === signature ? previous.directions : [];

      if (previousDirections.length >= MAX_STEPS) {
        return previous;
      }

      return {
        signature,
        directions: [...previousDirections, direction],
      };
    });
  }

  return (
    <section
      aria-label="Keyboard direction bias"
      className="gra-ui arrow-bias"
      data-bias={bias}
      data-locked={isLocked}
      data-step={current.directions.length}
    >
      <div
        aria-keyshortcuts="ArrowLeft ArrowRight Escape"
        className="arrow-bias__stage"
        onKeyDown={handleKeyDown}
        role="group"
        tabIndex={0}
      >
        <div className="arrow-bias__content">
          {pieces.map((piece, index) => (
            <div className="arrow-bias__item" key={`arrow-bias-${index}-${signature}`}>
              {piece}
            </div>
          ))}
        </div>
      </div>

      <div className="arrow-bias__footer">
        <output aria-live="polite">{current.directions.length}/{MAX_STEPS}</output>
        <div aria-hidden="true" className="arrow-bias__steps">
          {Array.from({ length: MAX_STEPS }, (_, index) => (
            <span data-filled={index < current.directions.length} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
