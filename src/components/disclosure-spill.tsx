import * as React from "react";

export interface DisclosureSpillProps {
  children: React.ReactNode;
}

export function DisclosureSpill({ children }: DisclosureSpillProps) {
  const pieces = React.Children.toArray(children);
  const escapedPiece = pieces.at(-1);
  const isEmpty = pieces.length === 0;
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <section
      aria-label="Disclosure that spills its last child when closed"
      className="gra-ui disclosure-spill"
      data-state={isOpen ? "filed" : "spilled"}
    >
      <details
        open={isOpen}
        onToggle={(event) => setIsOpen(event.currentTarget.open)}
      >
        <summary className="disclosure-spill__summary">
          <span>
            {isOpen ? "Close the filing" : "Reopen the filing"}
          </span>
          <span aria-hidden="true" className="disclosure-spill__mark">
            {isOpen ? "−" : "+"}
          </span>
        </summary>
        <div className="disclosure-spill__body" aria-live="polite">
          {isEmpty ? (
            <span className="disclosure-spill__empty">Nothing filed yet.</span>
          ) : (
            pieces.map((piece, index) => (
              <div className="disclosure-spill__item" key={index}>
                {piece}
              </div>
            ))
          )}
        </div>
      </details>

      {!isOpen && escapedPiece ? (
        <div aria-live="polite" className="disclosure-spill__escaped">
          <span className="disclosure-spill__escaped-label">Escaped last</span>
          <span className="disclosure-spill__escaped-piece">{escapedPiece}</span>
        </div>
      ) : null}

      <p aria-live="polite" className="disclosure-spill__status">
        {isEmpty
          ? "Give the filing something to spill."
          : isOpen
            ? "Every child is safely filed. Closing risks one escape."
            : "The last child escaped. Open the filing to put it back."}
      </p>
    </section>
  );
}
