import * as React from "react";

export interface PercentParcelProps {
  label: string;
}

interface PercentParcelState {
  encoded: boolean;
  signature: string;
}

function createState(signature: string): PercentParcelState {
  return { encoded: false, signature };
}

export function PercentParcel({ label }: PercentParcelProps) {
  const [state, setState] = React.useState<PercentParcelState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const encodedLabel = encodeURIComponent(label);

  return (
    <section
      aria-label="Transform a label into a percent encoded parcel"
      className="gra-ui percent-parcel"
      data-state={current.encoded ? "encoded" : "readable"}
    >
      <header className="percent-parcel__header">
        <span>Percent parcel</span>
        <output aria-live="polite">{current.encoded ? `${Array.from(encodedLabel).length} transport marks` : "Readable cargo"}</output>
      </header>

      <div aria-live="polite" className="percent-parcel__paper">
        {current.encoded ? (
          <code>
            {Array.from(encodedLabel).map((character, index) => (
              <span data-mark={character === "%" ? "percent" : "plain"} key={`${encodedLabel}-${index}`}>{character}</span>
            ))}
          </code>
        ) : (
          <p>{label}</p>
        )}
      </div>

      <div className="percent-parcel__footer">
        <p aria-live="polite">
          {current.encoded
            ? "The readable phrase has been converted into a courier format nobody requested."
            : "Send the phrase through a URL-shaped customs office."}
        </p>
        <div className="percent-parcel__actions">
          <button
            disabled={current.encoded || label.length === 0}
            onClick={() => setState({ encoded: true, signature: label })}
            type="button"
          >
            Parcel the label
          </button>
          <button
            className="percent-parcel__reset"
            disabled={!current.encoded}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Unpack text
          </button>
        </div>
      </div>
    </section>
  );
}
