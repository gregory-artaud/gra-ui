import * as React from "react";

const GATES = [
  { id: 0, label: "Scan", detail: "inspect the label" },
  { id: 1, label: "Stamp", detail: "mark the file" },
  { id: 2, label: "File", detail: "shelve the result" },
  { id: 3, label: "Release", detail: "let it leave" },
] as const;

export interface GateSequenceProps {
  label: string;
}

export function GateSequence({ label }: GateSequenceProps) {
  const [sequenceState, setSequenceState] = React.useState({ label, step: 0, wrong: false });
  const current = sequenceState.label === label
    ? sequenceState
    : { label, step: 0, wrong: false };
  const { step, wrong } = current;
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  const offset = words.length % GATES.length;
  const order = GATES.map((_, index) => (index + offset) % GATES.length);
  const complete = step === GATES.length;

  const chooseGate = (id: number) => {
    if (complete) return;
    if (id !== order[step]) {
      setSequenceState({ label, step: 0, wrong: true });
      return;
    }
    setSequenceState({ label, step: step + 1, wrong: false });
  };

  return (
    <section
      aria-label="Pass four gates in the order imposed by a caption"
      className="gra-ui gate-sequence"
      data-state={complete ? "released" : wrong ? "rejected" : "waiting"}
    >
      <header className="gate-sequence__header">
        <span>Gate sequence</span>
        <output aria-live="polite">{complete ? "Released" : `${step} / ${GATES.length} gates`}</output>
      </header>

      <div className="gate-sequence__cargo" aria-live="polite">
        <span className="gate-sequence__caption">Cargo</span>
        <strong>{label || "An empty label still needs a route."}</strong>
        <small>{complete ? "The cargo escaped the filing system." : wrong ? "Wrong gate. The cargo returned to intake." : `The ${GATES[order[step]].label.toLowerCase()} gate is waiting.`}</small>
      </div>

      <div className="gate-sequence__gates" aria-label="Available gates">
        {GATES.map((gate, index) => (
          <button
            aria-current={index === order[step] && !complete ? "step" : undefined}
            className="gate-sequence__gate"
            data-complete={order.slice(0, step).includes(index)}
            disabled={complete}
            key={gate.id}
            onClick={() => chooseGate(gate.id)}
            type="button"
          >
            <span>{String.fromCharCode(65 + index)}</span>
            <strong>{gate.label}</strong>
            <small>{gate.detail}</small>
          </button>
        ))}
      </div>

      <footer className="gate-sequence__footer">
        <p>{complete ? "Four clicks opened a door that was already visible." : "The required gate moves with the number of words in the cargo."}</p>
        <button className="gate-sequence__reset" disabled={step === 0 && !wrong} onClick={() => setSequenceState({ label, step: 0, wrong: false })} type="button">Reset route</button>
      </footer>
    </section>
  );
}
