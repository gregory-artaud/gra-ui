import * as React from "react";

export interface ParityPurgeProps {
  children: React.ReactNode;
}

type Parity = "even" | "odd";

interface ParityPurgeState {
  signature: string;
  parity: Parity | null;
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

function createState(signature: string): ParityPurgeState {
  return { signature, parity: null };
}

function belongsToParity(index: number, parity: Parity) {
  const oneBasedPosition = index + 1;

  return parity === "odd" ? oneBasedPosition % 2 === 1 : oneBasedPosition % 2 === 0;
}

export function ParityPurge({ children }: ParityPurgeProps) {
  const pieces = React.Children.toArray(children);
  const positionedPieces = pieces.map((piece, index) => ({ piece, index }));
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<ParityPurgeState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isPurged = current.parity !== null;
  const keptPieces = isPurged
    ? positionedPieces.filter(({ index }) => belongsToParity(index, current.parity as Parity))
    : positionedPieces;
  const purgedPieces = isPurged
    ? positionedPieces.filter(({ index }) => !belongsToParity(index, current.parity as Parity))
    : [];

  function chooseParity(parity: Parity) {
    setState((previous) => {
      const base = previous.signature === signature ? previous : createState(signature);

      return base.parity === parity ? base : { signature, parity };
    });
  }

  return (
    <section
      aria-label="Choose which child positions survive"
      className="gra-ui parity-purge"
      data-parity={current.parity ?? "none"}
      data-state={isPurged ? "purged" : "waiting"}
    >
      <header className="parity-purge__header">
        <span>Parity purge</span>
        <output aria-live="polite">
          {isPurged
            ? `${keptPieces.length} kept · ${purgedPieces.length} purged`
            : `${pieces.length} positions waiting`}
        </output>
      </header>

      {!isPurged ? (
        <div className="parity-purge__lane parity-purge__supply" role="list" aria-label="Unfiled content">
          <span className="parity-purge__lane-label">Unfiled positions</span>
          {pieces.length > 0 ? (
            pieces.map((piece, index) => (
              <div className="parity-purge__item" key={`${signature}-waiting-${index}`} role="listitem">
                <span className="parity-purge__position">{index + 1}</span>
                {piece}
              </div>
            ))
          ) : (
            <span className="parity-purge__empty">No children to sort.</span>
          )}
        </div>
      ) : (
        <div className="parity-purge__result" aria-live="polite">
          <div className="parity-purge__lane parity-purge__kept" role="list" aria-label="Kept positions">
            <span className="parity-purge__lane-label">Kept positions</span>
            {keptPieces.map(({ piece, index }) => (
              <div className="parity-purge__item" key={`${signature}-${current.parity}-kept-${index}`} role="listitem">
                <span className="parity-purge__position">{index + 1}</span>
                {piece}
              </div>
            ))}
          </div>
          <div className="parity-purge__lane parity-purge__discarded" role="list" aria-label="Purged positions">
            <span className="parity-purge__lane-label">Purged positions</span>
            {purgedPieces.map(({ piece, index }) => (
              <div className="parity-purge__item" key={`${signature}-${current.parity}-purged-${index}`} role="listitem">
                <span className="parity-purge__position">{index + 1}</span>
                {piece}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="parity-purge__choices" role="group" aria-label="Choose a parity rule">
        <button
          aria-pressed={current.parity === "odd"}
          className="parity-purge__choice"
          disabled={isPurged || pieces.length === 0}
          onClick={() => chooseParity("odd")}
          type="button"
        >
          Keep odd positions
        </button>
        <button
          aria-pressed={current.parity === "even"}
          className="parity-purge__choice"
          disabled={isPurged || pieces.length === 0}
          onClick={() => chooseParity("even")}
          type="button"
        >
          Keep even positions
        </button>
      </div>

      <div className="parity-purge__footer">
        <p aria-live="polite">
          {!isPurged
            ? "Choose a rule and the other positions will be formally removed."
            : `The ${current.parity} positions remain. The others have been given a separate tray.`}
        </p>
        <button
          className="parity-purge__reset"
          disabled={!isPurged}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Restore all
        </button>
      </div>
    </section>
  );
}
