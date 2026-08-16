import { useState } from "react";

const operations = [
  { id: "double", label: "Double", hint: "multiply by two", apply: (value: number) => value * 2 },
  { id: "add", label: "Add seven", hint: "invite seven more", apply: (value: number) => value + 7 },
  { id: "reverse", label: "Reverse", hint: "turn the digits around", apply: (value: number) => {
    const sign = value < 0 ? -1 : 1;
    const digits = String(Math.abs(Math.trunc(value))).split("").reverse().join("");
    return sign * Number(digits || 0);
  } },
] as const;

type OperationId = (typeof operations)[number]["id"];

export interface OperationParadeProps {
  value: number;
}

export function OperationParade({ value }: OperationParadeProps) {
  const [state, setState] = useState<{ current: number; applied: OperationId[] }>({ current: value, applied: [] });
  const complete = state.applied.length === operations.length;

  const applyOperation = (operation: (typeof operations)[number]) => {
    setState((current) => ({
      current: operation.apply(current.current),
      applied: [...current.applied, operation.id],
    }));
  };

  return (
    <section className="gra-ui operation-parade" data-complete={complete} aria-label="Operation parade">
      <header className="operation-parade__header">
        <span>Operation parade</span>
        <output aria-live="polite">{state.applied.length}/3 steps</output>
      </header>

      <div className="operation-parade__display">
        <span className="operation-parade__source">Started at {String(value)}</span>
        <strong aria-live="polite">{String(state.current)}</strong>
        <span>{complete ? "The order has issued its final number." : "The next operation is your responsibility."}</span>
      </div>

      <ol className="operation-parade__history" aria-label="Applied operations">
        {state.applied.map((id, index) => <li key={`${id}-${index}`}><span>{index + 1}</span>{operations.find((operation) => operation.id === id)?.label}</li>)}
        {state.applied.length === 0 ? <li className="operation-parade__empty">No operation has marched yet.</li> : null}
      </ol>

      <div className="operation-parade__actions" aria-label="Choose the next operation">
        {operations.map((operation) => {
          const applied = state.applied.includes(operation.id);
          return (
            <button key={operation.id} type="button" disabled={applied} onClick={() => applyOperation(operation)}>
              <strong>{operation.label}</strong>
              <small>{applied ? "already marched" : operation.hint}</small>
            </button>
          );
        })}
      </div>

      <footer className="operation-parade__footer">
        <span>{complete ? "Reverse the order to get a different answer." : "Same three buttons. Different order. Different number."}</span>
        <button type="button" onClick={() => setState({ current: value, applied: [] })} disabled={state.applied.length === 0}>Restart parade</button>
      </footer>
    </section>
  );
}
