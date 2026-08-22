import * as React from "react";

const KEYS = ["Control", "Alt", "Shift", "Enter"] as const;

export interface ChordContractProps {
  children: React.ReactNode;
}

export function ChordContract({ children }: ChordContractProps) {
  const [stage, setStage] = React.useState(0);
  const complete = stage === KEYS.length;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (complete) {
      return;
    }

    if (event.key === KEYS[stage]) {
      event.preventDefault();
      setStage((current) => Math.min(KEYS.length, current + 1));
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setStage(0);
      return;
    }

    if (event.key.length > 0) {
      setStage(0);
    }
  };

  return (
    <section aria-label="Release content with an unnecessary keyboard contract" className="gra-ui chord-contract" data-state={complete ? "signed" : stage > 0 ? "drafting" : "blank"}>
      <header className="chord-contract__header">
        <span>Chord contract</span>
        <output aria-live="polite">{complete ? "Signed" : `${stage} / ${KEYS.length} keys`}</output>
      </header>

      <div
        aria-label="Keyboard contract surface"
        className="chord-contract__surface"
        onKeyDown={handleKeyDown}
        role="group"
        tabIndex={0}
      >
        <div className="chord-contract__keys" aria-live="polite">
          {KEYS.map((key, index) => (
            <kbd data-active={index < stage} data-next={index === stage && !complete} key={key}>{key}</kbd>
          ))}
        </div>
        <div className="chord-contract__document" data-signed={complete}>
          {children}
        </div>
      </div>

      <footer className="chord-contract__footer">
        <p aria-live="polite">
          {complete
            ? "The four-key contract is signed; the content has been released for no legal reason."
            : `Focus the panel and press ${KEYS[stage]} next. Any other key voids the draft.`}
        </p>
        <button className="chord-contract__reset" disabled={stage === 0} onClick={() => setStage(0)} type="button">
          Void contract
        </button>
      </footer>
    </section>
  );
}
