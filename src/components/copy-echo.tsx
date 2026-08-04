import * as React from "react";

const MAX_ECHOES = 3;

export interface CopyEchoProps {
  label: string;
}

interface CopyEchoState {
  signature: string;
  echoes: number;
}

function createState(label: string): CopyEchoState {
  return { signature: label, echoes: 0 };
}

export function CopyEcho({ label }: CopyEchoProps) {
  const [state, setState] = React.useState<CopyEchoState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const isOfficial = current.echoes === MAX_ECHOES;

  const registerCopy = () => {
    setState((previous) => {
      const next = previous.signature === label ? previous : createState(label);

      return next.echoes === MAX_ECHOES
        ? next
        : { signature: label, echoes: next.echoes + 1 };
    });
  };

  return (
    <section
      aria-label="Copy the label to create visible echoes"
      className="gra-ui copy-echo"
      data-echoes={current.echoes}
      data-state={isOfficial ? "official" : current.echoes > 0 ? "echoing" : "ready"}
    >
      <div className="copy-echo__header">
        <span>Copy source</span>
        <output aria-live="polite">{current.echoes} / {MAX_ECHOES} echoes</output>
      </div>

      <input
        aria-label="Label to copy"
        className="copy-echo__input"
        onCopy={registerCopy}
        readOnly
        type="text"
        value={label}
      />

      <div aria-live="polite" className="copy-echo__tray">
        {current.echoes > 0 ? (
          Array.from({ length: current.echoes }, (_, index) => (
            <span
              className="copy-echo__echo"
              data-new={index === current.echoes - 1 ? "true" : "false"}
              key={`${current.signature}-${index}`}
            >
              {label}
            </span>
          ))
        ) : (
          <span className="copy-echo__empty">The copies will stay here</span>
        )}
      </div>

      <p className="copy-echo__status">
        {isOfficial
          ? "Three copies later, the label is officially over-documented."
          : current.echoes === 0
            ? "Select the label and press Ctrl/Cmd+C."
            : "The browser copied it. The component kept a souvenir."}
      </p>

      <button
        className="copy-echo__reset"
        disabled={current.echoes === 0}
        onClick={() => setState(createState(label))}
        type="button"
      >
        Erase echoes
      </button>
    </section>
  );
}
