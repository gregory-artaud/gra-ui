import * as React from "react";

export interface DocketSequenceProps {
  children: React.ReactNode;
}

type DocketPhase = 0 | 1 | 2 | 3;

interface DocketSequenceState {
  signature: string;
  phase: DocketPhase;
  evidence: string;
}

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

function createState(signature: string): DocketSequenceState {
  return { signature, phase: 0, evidence: "" };
}

export function DocketSequence({ children }: DocketSequenceProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<DocketSequenceState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isFiled = current.phase === 3;

  const openDocket = () => {
    if (current.phase === 0) {
      setState({ signature, phase: 1, evidence: "" });
    }
  };

  const recordEvidence = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (current.phase !== 1) {
      return;
    }

    const evidence = event.currentTarget.value.replace(/\s/g, "").slice(0, 1);
    setState({ signature, phase: evidence ? 2 : 1, evidence });
  };

  return (
    <section
      aria-label="Move content through a three-step docket sequence"
      className="gra-ui docket-sequence"
      data-phase={current.phase}
      data-state={isFiled ? "filed" : `step-${current.phase + 1}`}
    >
      <header className="docket-sequence__header">
        <span>Docket sequence</span>
        <output aria-live="polite">{isFiled ? "Filed" : `Step ${current.phase + 1} / 4`}</output>
      </header>

      <div
        className="docket-sequence__track"
        aria-live="polite"
        style={{ "--docket-travel": `${current.phase * 100}%` } as React.CSSProperties}
      >
        {[
          ["Open", "awaiting"],
          ["Initial", "awaiting"],
          ["File", "awaiting"],
          ["Filed", "awaiting"],
        ].map(([label], index) => (
          <div className="docket-sequence__station" data-active={current.phase === index ? "true" : "false"} key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
          </div>
        ))}
        <div className="docket-sequence__cargo">{children}</div>
      </div>

      <div className="docket-sequence__controls">
        <button disabled={current.phase !== 0} onClick={openDocket} type="button">
          Open docket
        </button>
        <label>
          <span>One-character evidence</span>
          <input
            aria-label="One-character evidence"
            disabled={current.phase !== 1}
            maxLength={1}
            onChange={recordEvidence}
            value={current.evidence}
          />
        </label>
        <button
          disabled={current.phase !== 2}
          onClick={() => setState({ signature, phase: 3, evidence: current.evidence })}
          type="button"
        >
          File with evidence
        </button>
      </div>

      <div className="docket-sequence__footer">
        <p aria-live="polite">
          {isFiled
            ? `Filed under the letter ${current.evidence}. The sequence was technically successful.`
            : current.phase === 0
              ? "Open the docket before the evidence field is allowed to exist."
              : current.phase === 1
                ? "Now type exactly one character."
                : "The docket has evidence. File it to finish the ceremony."}
        </p>
        <button
          className="docket-sequence__reset"
          disabled={current.phase === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Clear docket
        </button>
      </div>
    </section>
  );
}
