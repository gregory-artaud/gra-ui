import * as React from "react";

const PASTE_STAGES = ["Unsubmitted", "Received", "Indexed", "Stamped", "Accredited"] as const;

export interface PasteAccreditationProps {
  children: React.ReactNode;
}

interface PasteAccreditationState {
  draft: string;
  signature: string;
  stage: number;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): PasteAccreditationState {
  return { draft: "", signature, stage: 0 };
}

export function PasteAccreditation({ children }: PasteAccreditationProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<PasteAccreditationState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const stage = Math.min(current.stage, PASTE_STAGES.length - 1);
  const complete = stage === PASTE_STAGES.length - 1;

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").trim();

    if (!pasted || complete) {
      return;
    }

    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      return { draft: pasted, signature, stage: baseline.stage + 1 };
    });
  };

  return (
    <section
      aria-label="Paste a packet through five unnecessary accreditation stages"
      className="gra-ui paste-accreditation"
      data-stage={stage}
      data-state={complete ? "accredited" : stage > 0 ? "processing" : "waiting"}
    >
      <header className="paste-accreditation__header">
        <span>Paste accreditation</span>
        <output aria-live="polite">{PASTE_STAGES[stage]}</output>
      </header>

      <label className="paste-accreditation__inbox">
        <span>Paste packet here</span>
        <textarea
          aria-label="Paste packet here"
          onChange={(event) => setState((previous) => {
            const baseline = previous.signature === signature ? previous : createState(signature);
            return { ...baseline, draft: event.currentTarget.value };
          })}
          onPaste={handlePaste}
          placeholder="Paste anything, once per stage"
          rows={2}
          value={current.draft}
        />
      </label>

      <div className="paste-accreditation__filing" aria-live="polite">
        <div className="paste-accreditation__stagebar" aria-hidden="true">
          {PASTE_STAGES.map((stageName, index) => (
            <span data-filled={index < stage} key={stageName}>{index + 1}</span>
          ))}
        </div>
        <ol className="paste-accreditation__pieces" aria-label="Accredited child pieces">
          {pieces.slice(0, stage).map((piece, index) => (
            <li key={`${signature}-${index}`}>
              <span>{index + 1}</span>
              <div>{piece}</div>
            </li>
          ))}
        </ol>
        {stage === 0 ? <p className="paste-accreditation__empty">The child pieces await their first paste.</p> : null}
      </div>

      <footer className="paste-accreditation__footer">
        <p aria-live="polite">
          {complete
            ? "Four paste events gave an ordinary notice an accreditation number."
            : `Paste ${PASTE_STAGES.length - 1 - stage} more time${PASTE_STAGES.length - 1 - stage === 1 ? "" : "s"} to continue filing.`}
        </p>
        <button disabled={stage === 0 && current.draft === ""} onClick={() => setState(createState(signature))} type="button">
          Clear accreditation
        </button>
      </footer>
    </section>
  );
}
