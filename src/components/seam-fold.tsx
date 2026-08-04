import * as React from "react";

export interface SeamFoldProps {
  children: React.ReactNode;
}

function activationLabel(crease: number, maximum: number) {
  if (crease === 0) {
    return "The children are unfolded";
  }

  return `Crease ${crease} of ${maximum} · the lower row returns in reverse`;
}

export function SeamFold({ children }: SeamFoldProps) {
  const pieces = React.Children.toArray(children);
  const maximumCrease = Math.max(0, pieces.length - 1);
  const [crease, setCrease] = React.useState(0);
  const activeCrease = Math.min(crease, maximumCrease);
  const isFolded = activeCrease > 0;
  const upperPieces = pieces.slice(0, activeCrease);
  const lowerPieces = pieces.slice(activeCrease).reverse();

  return (
    <section
      aria-label="Move a crease through the children to fold their order"
      className="gra-ui seam-fold"
      data-crease={activeCrease}
      data-state={isFolded ? "folded" : "unfolded"}
    >
      <header className="seam-fold__header">
        <span>Paperwork</span>
        <output aria-live="polite">{isFolded ? `Crease ${activeCrease}/${maximumCrease}` : "Unfolded"}</output>
      </header>

      <ol className="seam-fold__paper" aria-live="polite">
        {!isFolded ? (
          <li className="seam-fold__row seam-fold__row--flat" key="flat">
            <ol className="seam-fold__row-list" aria-label="Unfolded children">
              {pieces.map((piece, index) => (
                <li className="seam-fold__item" key={index}>
                  {piece}
                </li>
              ))}
            </ol>
          </li>
        ) : (
          <>
            <li className="seam-fold__row" key="upper">
              <ol className="seam-fold__row-list" aria-label="Upper fold">
                {upperPieces.map((piece, index) => (
                  <li className="seam-fold__item" key={`upper-${index}`}>
                    {piece}
                  </li>
                ))}
              </ol>
            </li>
            <li aria-hidden="true" className="seam-fold__crease" key="crease">
              <span />
              <span>crease</span>
              <span />
            </li>
            <li className="seam-fold__row seam-fold__row--returned" key="lower">
              <ol className="seam-fold__row-list" aria-label="Returned fold">
                {lowerPieces.map((piece, index) => (
                  <li className="seam-fold__item" key={`lower-${index}`}>
                    {piece}
                  </li>
                ))}
              </ol>
            </li>
          </>
        )}
      </ol>

      <label className="seam-fold__control">
        <span>
          <span>Move the crease</span>
          <output>{activationLabel(activeCrease, maximumCrease)}</output>
        </span>
        <input
          aria-label="Move the crease through the children"
          aria-valuetext={activationLabel(activeCrease, maximumCrease)}
          disabled={maximumCrease === 0}
          max={maximumCrease}
          min="0"
          onChange={(event) => setCrease(Number(event.currentTarget.value))}
          type="range"
          value={activeCrease}
        />
      </label>

      <button
        className="seam-fold__reset"
        disabled={!isFolded}
        onClick={() => setCrease(0)}
        type="button"
      >
        Flatten the paperwork
      </button>
    </section>
  );
}
