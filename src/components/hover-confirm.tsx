import * as React from "react";

export interface HoverConfirmProps {
  children: React.ReactNode;
}

const REQUIRED_PASSES = 3;

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function HoverConfirm({ children }: HoverConfirmProps) {
  const [passCount, setPassCount] = React.useState(0);
  const isConfirmed = passCount === REQUIRED_PASSES;

  const recordPass = () => {
    setPassCount((currentCount) =>
      Math.min(currentCount + 1, REQUIRED_PASSES),
    );
  };

  return (
    <section
      aria-label={
        isConfirmed
          ? "Confirmed. Click to reset."
          : `Hover over this content ${REQUIRED_PASSES - passCount} more ${
              REQUIRED_PASSES - passCount === 1 ? "time" : "times"
            } to confirm it.`
      }
      aria-pressed={isConfirmed}
      className="gra-ui hover-confirm"
      data-count={passCount}
      data-state={isConfirmed ? "confirmed" : "counting"}
      onClick={() => {
        if (isConfirmed) {
          setPassCount(0);
        }
      }}
      onKeyDown={(event) => {
        if (event.repeat || !isActivationKey(event.key)) {
          return;
        }

        event.preventDefault();
        if (isConfirmed) {
          setPassCount(0);
        } else {
          recordPass();
        }
      }}
      onPointerEnter={() => {
        if (!isConfirmed) {
          recordPass();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className="hover-confirm__content">{children}</span>
      <span aria-live="polite" className="hover-confirm__status">
        {isConfirmed ? "Confirmed" : `Pass ${passCount} / ${REQUIRED_PASSES}`}
      </span>
      <span aria-hidden="true" className="hover-confirm__meter">
        <span data-filled={passCount >= 1 ? "true" : undefined} />
        <span data-filled={passCount >= 2 ? "true" : undefined} />
        <span data-filled={passCount >= 3 ? "true" : undefined} />
      </span>
    </section>
  );
}
