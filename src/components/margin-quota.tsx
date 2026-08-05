import * as React from "react";

export interface MarginQuotaProps {
  label: string;
}

interface MarginQuotaState {
  label: string;
  reserved: boolean;
}

export function MarginQuota({ label }: MarginQuotaProps) {
  const [state, setState] = React.useState<MarginQuotaState>(() => ({
    label,
    reserved: false,
  }));
  const current = state.label === label ? state : { label, reserved: false };
  const characters = Array.from(label);
  const quotaWidth = Math.min(54, Math.max(22, characters.length * 3.2));
  const stageStyle = {
    "--margin-quota-width": `${quotaWidth}%`,
  } as React.CSSProperties;
  const displayLabel = label || "(empty label)";

  return (
    <section
      aria-label="Reserve a margin based on the label length"
      className="gra-ui margin-quota"
      data-state={current.reserved ? "reserved" : "ready"}
      style={stageStyle}
    >
      <header className="margin-quota__header">
        <span>Margin quota</span>
        <output aria-live="polite">
          {current.reserved ? `${characters.length} slots reserved` : "Unreserved"}
        </output>
      </header>

      <div className="margin-quota__stage">
        <div aria-hidden="true" className="margin-quota__margin">
          {current.reserved ? (
            characters.map((character, index) => (
              <span className="margin-quota__slot" data-space={character === " "} key={index}>
                {character === " " ? "·" : character}
              </span>
            ))
          ) : (
            <span className="margin-quota__empty">No margin claimed</span>
          )}
        </div>

        <div className="margin-quota__label-surface">
          <output aria-live="polite" className="margin-quota__label">
            {displayLabel}
          </output>
        </div>
      </div>

      <div className="margin-quota__footer">
        <p>
          {current.reserved
            ? "The label has rented one visible slot for every character."
            : "A label this long has not earned its margin yet."}
        </p>
        <div className="margin-quota__actions">
          <button
            disabled={current.reserved}
            onClick={() => setState({ label, reserved: true })}
            type="button"
          >
            Reserve the margin
          </button>
          <button
            className="margin-quota__reset"
            disabled={!current.reserved}
            onClick={() => setState({ label, reserved: false })}
            type="button"
          >
            Reclaim space
          </button>
        </div>
      </div>
    </section>
  );
}
