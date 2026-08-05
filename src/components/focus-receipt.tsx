import * as React from "react";

export interface FocusReceiptProps {
  children: React.ReactNode;
}

interface FocusReceiptState {
  focusedIndex: number | null;
  receipts: number[];
  signature: string;
}

const MAX_RECEIPTS = 8;

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

function createState(signature: string): FocusReceiptState {
  return { focusedIndex: null, receipts: [], signature };
}

export function FocusReceipt({ children }: FocusReceiptProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<FocusReceiptState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isFull = pieces.length > 0 && current.receipts.length >= pieces.length;

  const recordFocus = (index: number) => {
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);

      return {
        focusedIndex: index,
        receipts: [...baseline.receipts, index].slice(-MAX_RECEIPTS),
        signature,
      };
    });
  };

  return (
    <section
      aria-label="Focus receipt that duplicates focused children"
      className="gra-ui focus-receipt"
      data-count={current.receipts.length}
      data-state={isFull ? "full" : current.receipts.length > 0 ? "recording" : "ready"}
    >
      <header className="focus-receipt__header">
        <span>Focus receipt</span>
        <output aria-live="polite">
          {current.receipts.length === 0
            ? "No copies issued"
            : `${current.receipts.length} ${current.receipts.length === 1 ? "copy" : "copies"} issued`}
        </output>
      </header>

      <div
        aria-label="Focusable original children"
        className="focus-receipt__originals"
        style={{ "--focus-receipt-columns": Math.max(pieces.length, 1) } as React.CSSProperties}
      >
        {pieces.length > 0 ? (
          pieces.map((piece, index) => (
            <div
              aria-current={current.focusedIndex === index ? "true" : undefined}
              aria-label={`Focus item ${index + 1}`}
              className="focus-receipt__original"
              data-focused={current.focusedIndex === index ? "true" : "false"}
              key={`${signature}-original-${index}`}
              onFocus={(event) => {
                if (event.target === event.currentTarget) {
                  recordFocus(index);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {piece}
            </div>
          ))
        ) : (
          <span className="focus-receipt__empty">No children to receipt.</span>
        )}
      </div>

      <div className="focus-receipt__receipt" aria-label="Issued copies" aria-live="polite">
        <div className="focus-receipt__receipt-heading">
          <span>Copies by original position</span>
          <span aria-hidden="true">↳</span>
        </div>
        <div
          className="focus-receipt__stations"
          style={{ "--focus-receipt-columns": Math.max(pieces.length, 1) } as React.CSSProperties}
        >
          {pieces.length > 0 ? (
            pieces.map((piece, index) => {
              const copies = current.receipts.filter((receipt) => receipt === index).length;

              return (
                <div className="focus-receipt__station" key={`${signature}-station-${index}`}>
                  <span className="focus-receipt__station-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="focus-receipt__stack">
                    {Array.from({ length: copies }, (_, copyIndex) => (
                      <div
                        aria-hidden="true"
                        className="focus-receipt__copy"
                        key={`${signature}-copy-${index}-${copyIndex}`}
                      >
                        {piece}
                      </div>
                    ))}
                    {copies === 0 ? <span className="focus-receipt__vacant">—</span> : null}
                  </div>
                </div>
              );
            })
          ) : (
            <span className="focus-receipt__empty">Focus a child to issue its copy.</span>
          )}
        </div>
      </div>

      <footer className="focus-receipt__footer">
        <span aria-live="polite">
          {pieces.length === 0
            ? "No children"
            : current.focusedIndex === null
              ? "Focus a child to print a copy"
              : `Item ${current.focusedIndex + 1} was focused last`}
        </span>
        <button
          className="focus-receipt__reset"
          disabled={current.receipts.length === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Clear receipt
        </button>
      </footer>
    </section>
  );
}
