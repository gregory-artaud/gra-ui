import * as React from "react";

const MAX_DEBT = 4;

export interface ClarityDebtProps {
  children: React.ReactNode;
}

interface ClarityDebtState {
  signature: string;
  debt: number;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): ClarityDebtState {
  return { signature, debt: 0 };
}

export function ClarityDebt({ children }: ClarityDebtProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<ClarityDebtState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isMaxed = current.debt === MAX_DEBT;

  return (
    <section
      aria-label="Accumulate clarity debt against the content"
      className="gra-ui clarity-debt"
      data-debt={current.debt}
      data-state={isMaxed ? "overdue" : current.debt === 0 ? "clear" : "blurred"}
    >
      <header className="clarity-debt__header">
        <span>Clarity debt</span>
        <output aria-live="polite">{current.debt} / {MAX_DEBT} charges</output>
      </header>

      <div className="clarity-debt__stage">
        <div aria-hidden="true" className="clarity-debt__meter">
          {Array.from({ length: MAX_DEBT }, (_, index) => (
            <span data-paid={index < current.debt} key={index} />
          ))}
        </div>
        <div
          aria-live="polite"
          className="clarity-debt__content"
          style={{ "--clarity-debt-blur": `${current.debt * 1.8}px` } as React.CSSProperties}
        >
          {children}
        </div>
      </div>

      <footer className="clarity-debt__footer">
        <p aria-live="polite">
          {isMaxed
            ? "The content is fully obscured. The debt has earned nothing."
            : current.debt === 0
              ? "Charge the content once for a little less clarity."
              : "Every charge makes a readable thing harder to read."}
        </p>
        <div className="clarity-debt__actions">
          <button
            disabled={isMaxed}
            onClick={() => setState({ signature, debt: Math.min(MAX_DEBT, current.debt + 1) })}
            type="button"
          >
            {isMaxed ? "Debt complete" : "Charge clarity"}
          </button>
          <button
            className="clarity-debt__reset"
            disabled={current.debt === 0}
            onClick={() => setState(createState(signature))}
            type="button"
          >
            Clear debt
          </button>
        </div>
      </footer>
    </section>
  );
}
