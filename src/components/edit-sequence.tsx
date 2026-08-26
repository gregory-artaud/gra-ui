import * as React from "react";

const STEPS = [
  { id: "trim", label: "Trim edges", detail: "remove the ceremonial whitespace" },
  { id: "capitalize", label: "Raise first letter", detail: "give the sentence one modest hat" },
  { id: "punctuate", label: "Issue full stop", detail: "close the file with a period" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function applyStep(value: string, step: StepId) {
  if (step === "trim") return value.trim();
  if (step === "capitalize") return value.replace(/^(\s*)(\S)/, (_, prefix: string, letter: string) => `${prefix}${letter.toUpperCase()}`);
  return /[.!?]$/.test(value.trim()) ? value : `${value}.`;
}

export interface EditSequenceProps {
  label: string;
}

export function EditSequence({ label }: EditSequenceProps) {
  const [step, setStep] = React.useState(0);
  const [wrong, setWrong] = React.useState(false);
  const rendered = STEPS.slice(0, step).reduce((value, current) => applyStep(value, current.id), label);
  const complete = step === STEPS.length;

  const chooseStep = (index: number) => {
    if (index !== step) {
      setStep(0);
      setWrong(true);
      return;
    }
    setStep((current) => current + 1);
    setWrong(false);
  };

  return (
    <section aria-label="Apply editorial edits in a prescribed order" className="gra-ui edit-sequence" data-state={complete ? "filed" : wrong ? "rejected" : "draft"}>
      <header className="edit-sequence__header">
        <span>Edit sequence</span>
        <output aria-live="polite">{complete ? "Filed" : `${step} / ${STEPS.length} edits`}</output>
      </header>

      <div className="edit-sequence__paper" aria-live="polite">
        <span className="edit-sequence__caption">Current wording</span>
        <p className="edit-sequence__label" key={`${step}-${rendered}`}>{rendered || "An empty draft has no edit trail."}</p>
      </div>

      <div className="edit-sequence__steps" aria-label="Editorial sequence">
        {STEPS.map((current, index) => (
          <button
            aria-current={index === step ? "step" : undefined}
            className="edit-sequence__step"
            data-complete={index < step}
            disabled={complete}
            key={current.id}
            onClick={() => chooseStep(index)}
            type="button"
          >
            <span>{index + 1}</span>
            {current.label}
          </button>
        ))}
      </div>

      <footer className="edit-sequence__footer">
        <p aria-live="polite">
          {complete ? "The file is closed. The order mattered more than the sentence." : wrong ? "That edit was premature. The draft has been reopened." : "Choose the next edit in order; editorial freedom is suspended."}
        </p>
        <button className="edit-sequence__reset" disabled={step === 0 && !wrong} onClick={() => { setStep(0); setWrong(false); }} type="button">
          Reopen draft
        </button>
      </footer>
    </section>
  );
}
