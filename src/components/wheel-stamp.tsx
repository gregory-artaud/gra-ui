import * as React from "react";

export interface WheelStampProps {
  children: React.ReactNode;
}

interface WheelStampState {
  signature: string;
  stamps: number;
}

const MAX_STAMPS = 5;

function createSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): WheelStampState {
  return { signature, stamps: 0 };
}

export function WheelStamp({ children }: WheelStampProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<WheelStampState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.stamps === MAX_STAMPS;

  const changeStamps = (delta: number) => {
    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return {
        signature,
        stamps: Math.min(MAX_STAMPS, Math.max(0, baseline.stamps + delta)),
      };
    });
  };

  return (
    <section
      aria-label="Roll a paper wheel to stamp the content five times"
      className="gra-ui wheel-stamp"
      data-level={current.stamps}
      data-state={isComplete ? "overqualified" : current.stamps > 0 ? "stamping" : "unstamped"}
    >
      <header className="wheel-stamp__header">
        <span>Wheel stamp</span>
        <output aria-live="polite">{current.stamps} / {MAX_STAMPS} stamps</output>
      </header>

      <div
        aria-label="Stamping progress; use the mouse wheel or arrow keys"
        aria-valuemax={MAX_STAMPS}
        aria-valuemin={0}
        aria-valuenow={current.stamps}
        className="wheel-stamp__surface"
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            event.preventDefault();
            changeStamps(1);
          }
          if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
            event.preventDefault();
            changeStamps(-1);
          }
        }}
        onWheel={(event) => {
          event.preventDefault();
          changeStamps(event.deltaY < 0 ? 1 : -1);
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="wheel-stamp__paper">
          <div className="wheel-stamp__content">{children}</div>
          <div aria-hidden="true" className="wheel-stamp__seals">
            {Array.from({ length: MAX_STAMPS }, (_, index) => (
              <span className="wheel-stamp__seal" data-stamped={index < current.stamps ? "true" : "false"} key={index}>
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="wheel-stamp__footer">
        <p aria-live="polite">
          {isComplete
            ? "The content is fully stamped and no more authority has been gained."
            : current.stamps === 0
              ? "Roll over the paper to begin an unnecessarily official review."
              : "Keep rolling. Each notch adds a permanent paper seal."}
        </p>
        <button
          className="wheel-stamp__reset"
          disabled={current.stamps === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Remove stamps
        </button>
      </div>
    </section>
  );
}
