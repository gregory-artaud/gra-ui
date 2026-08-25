import * as React from "react";

const FOLDS = ["Left flap", "Middle flap", "Right flap"] as const;

export interface FoldOrderProps {
  children: React.ReactNode;
}

export function FoldOrder({ children }: FoldOrderProps) {
  const [step, setStep] = React.useState(0);
  const [wrong, setWrong] = React.useState(false);
  const complete = step === FOLDS.length;
  const cargoIndex = Math.min(step, FOLDS.length - 1);

  return (
    <section aria-label="Open folding panels in a prescribed order" className="gra-ui fold-order" data-state={complete ? "flat" : wrong ? "creased" : "waiting"}>
      <header className="fold-order__header">
        <span>Fold order</span>
        <output aria-live="polite">{complete ? "Flat" : `${step} / ${FOLDS.length} folds`}</output>
      </header>

      <div className="fold-order__panels">
        {FOLDS.map((fold, index) => (
          <details
            className="fold-order__panel"
            key={fold}
            onToggle={(event) => {
              if (!event.currentTarget.open) return;
              if (index === step) {
                setStep(index + 1);
                setWrong(false);
              } else {
                setStep(0);
                setWrong(true);
              }
            }}
            open={index < step}
          >
            <summary><span>{index + 1}</span>{fold}</summary>
            <div className="fold-order__inside">
              {index === cargoIndex && !complete ? children : index === FOLDS.length - 1 && complete ? children : <span>{index < step ? "Fold accepted." : "Waiting for its turn."}</span>}
            </div>
          </details>
        ))}
      </div>

      <footer className="fold-order__footer">
        <p aria-live="polite">
          {complete ? "The paper is flat again, having learned nothing." : wrong ? "That flap was early. Every fold has been undone." : "Open each flap in order; the paper is needlessly strict."}
        </p>
        <button className="fold-order__reset" disabled={step === 0 && !wrong} onClick={() => { setStep(0); setWrong(false); }} type="button">
          Unfold everything
        </button>
      </footer>
    </section>
  );
}
