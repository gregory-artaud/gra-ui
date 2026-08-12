import * as React from "react";

type DoubleEntryPass = 0 | 1 | 2;

export interface DoubleEntryProps {
  children: React.ReactNode;
}

interface DoubleEntryState {
  errorIndex: number | null;
  index: number;
  pass: DoubleEntryPass;
  signature: string;
}

function signatureForItems(items: readonly React.ReactNode[]) {
  return items
    .map((item, index) => {
      if (React.isValidElement(item)) {
        const element = item as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof item}:${String(item)}`;
    })
    .join("|");
}

function createState(signature: string): DoubleEntryState {
  return { errorIndex: null, index: 0, pass: 0, signature };
}

export function DoubleEntry({ children }: DoubleEntryProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForItems(items);
  const [state, setState] = React.useState<DoubleEntryState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.pass === 2;
  const expected = current.index;

  const choose = (index: number) => {
    if (isComplete) {
      return;
    }

    if (index !== expected) {
      setState((previous) => ({ ...previous, errorIndex: index }));
      return;
    }

    const nextIndex = expected + 1;

    if (nextIndex < items.length) {
      setState({ errorIndex: null, index: nextIndex, pass: current.pass, signature });
      return;
    }

    setState({
      errorIndex: null,
      index: 0,
      pass: current.pass === 0 ? 1 : 2,
      signature,
    });
  };

  return (
    <section
      aria-label="Check every child twice in the same order"
      className="gra-ui double-entry"
      data-pass={current.pass}
      data-state={isComplete ? "posted" : current.pass === 0 && current.index === 0 ? "ready" : "checking"}
    >
      <header className="double-entry__header">
        <span>Double entry</span>
        <output aria-live="polite">
          {items.length === 0
            ? "No entries"
            : isComplete
              ? "Posted twice"
              : `${current.pass + 1} / 2 · ${current.index} / ${items.length}`}
        </output>
      </header>

      <div className="double-entry__passes" aria-live="polite">
        {[0, 1].map((pass) => (
          <div className="double-entry__pass" data-active={current.pass === pass} key={pass}>
            <span className="double-entry__pass-label">{pass === 0 ? "First pass" : "Second pass"}</span>
            <div className="double-entry__marks">
              {items.map((item, index) => (
                <span data-checked={current.pass > pass || (current.pass === pass && index < current.index)} key={`${pass}-${index}`}>
                  {index + 1}
                  <span className="double-entry__mark-content">{item}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="double-entry__choices" aria-label="Entries to check">
        {items.length > 0 ? items.map((item, index) => (
          <button
            aria-current={!isComplete && index === expected ? "step" : undefined}
            className="double-entry__choice"
            data-error={current.errorIndex === index}
            data-expected={!isComplete && index === expected}
            disabled={isComplete}
            key={`${signature}-${index}`}
            onClick={() => choose(index)}
            type="button"
          >
            <span>{index + 1}</span>
            {item}
          </button>
        )) : <span className="double-entry__empty">Add entries to open the ledger.</span>}
      </div>

      <footer className="double-entry__footer">
        <p aria-live="polite">
          {items.length === 0
            ? "There is nothing to enter twice."
            : isComplete
              ? "Both passes match. The ledger is no more trustworthy than before."
              : current.errorIndex !== null
                ? "That entry was out of order. The current pass waits for its predecessor."
                : `Choose entry ${expected + 1} for the ${current.pass === 0 ? "first" : "second"} pass.`}
        </p>
        <button
          className="double-entry__reset"
          disabled={current.pass === 0 && current.index === 0 && current.errorIndex === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Tear up the ledger
        </button>
      </footer>
    </section>
  );
}
