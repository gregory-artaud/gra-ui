import { useState } from "react";

interface DivisionStep {
  input: number;
  quotient: number;
  remainder: number;
}

interface BinaryMarchState {
  source: number;
  remaining: number;
  bits: number[];
  divisions: DivisionStep[];
}

const normalizeValue = (value: number) => Math.max(0, Math.floor(Math.abs(value)));

const createState = (value: number): BinaryMarchState => ({
  source: value,
  remaining: value,
  bits: value === 0 ? [0] : [],
  divisions: [],
});

export interface BinaryMarchProps {
  value: number;
}

export function BinaryMarch({ value }: BinaryMarchProps) {
  const normalizedValue = normalizeValue(value);
  const [state, setState] = useState(() => createState(normalizedValue));
  const currentState = state.source === normalizedValue ? state : createState(normalizedValue);
  const complete = currentState.remaining === 0;
  const advance = () => {
    if (complete) return;

    const quotient = Math.floor(currentState.remaining / 2);
    const remainder = currentState.remaining % 2;
    setState({
      source: normalizedValue,
      remaining: quotient,
      bits: [remainder, ...currentState.bits],
      divisions: [
        ...currentState.divisions,
        { input: currentState.remaining, quotient, remainder },
      ],
    });
  };

  return (
    <section className="gra-ui binary-march" data-complete={complete} aria-label="Binary march">
      <header className="binary-march__header">
        <span>Binary march</span>
        <output aria-live="polite">{currentState.divisions.length} divisions</output>
      </header>

      <div className="binary-march__display">
        <span className="binary-march__source">Starting decimal</span>
        <strong>{normalizedValue}</strong>
        <span className="binary-march__arrow" aria-hidden="true">↓</span>
        <output aria-live="polite">{currentState.bits.join("") || "—"}</output>
        <small>{complete ? "The march has reached its least significant excuse." : `Current remainder: ${currentState.remaining}`}</small>
      </div>

      <ol className="binary-march__steps" aria-label="Division steps">
        {currentState.divisions.map((step, index) => (
          <li key={`${step.input}-${index}`}>
            <span>{step.input} ÷ 2</span>
            <b>{step.quotient}</b>
            <i>remainder {step.remainder}</i>
          </li>
        ))}
        {currentState.divisions.length === 0 ? <li className="binary-march__empty">No division has marched yet.</li> : null}
      </ol>

      <footer className="binary-march__footer">
        <span>{complete ? "A simple conversion, performed ceremonially." : "Divide again to earn the next bit."}</span>
        <div>
          <button type="button" onClick={advance} disabled={complete}>Divide by two</button>
          <button type="button" onClick={() => setState(createState(normalizedValue))} disabled={currentState.divisions.length === 0}>Restart march</button>
        </div>
      </footer>
    </section>
  );
}
