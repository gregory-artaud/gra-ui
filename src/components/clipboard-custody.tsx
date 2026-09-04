import * as React from "react";

type ClipboardPhase = "home" | "departed" | "returned";

export interface ClipboardCustodyProps {
  label: string;
}

interface ClipboardCustodyState {
  phase: ClipboardPhase;
  signature: string;
}

function createState(signature: string): ClipboardCustodyState {
  return { phase: "home", signature };
}

export function ClipboardCustody({ label }: ClipboardCustodyProps) {
  const [state, setState] = React.useState<ClipboardCustodyState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const isDeparted = current.phase === "departed";

  const cutLabel = () => {
    if (current.phase === "home") {
      setState({ phase: "departed", signature: label });
    }
  };

  const pasteLabel = () => {
    if (isDeparted) {
      setState({ phase: "returned", signature: label });
    }
  };

  return (
    <section
      aria-label="Send a label away and bring it back in clipboard order"
      className="gra-ui clipboard-custody"
      data-phase={current.phase}
    >
      <header className="clipboard-custody__header">
        <span>Clipboard custody</span>
        <output aria-live="polite">{current.phase === "home" ? "At home" : current.phase === "departed" ? "Away" : "Returned"}</output>
      </header>

      <div className="clipboard-custody__case" aria-live="polite">
        <span className="clipboard-custody__caption">Current document</span>
        <textarea
          aria-label="Label under clipboard custody"
          onChange={() => undefined}
          onCut={(event) => {
            event.preventDefault();
            cutLabel();
          }}
          onPaste={(event) => {
            event.preventDefault();
            pasteLabel();
          }}
          readOnly
          rows={2}
          value={isDeparted ? "" : label}
        />
        <span className="clipboard-custody__stamp">{current.phase === "returned" ? "PASTED IN ORDER" : "NO STAMP"}</span>
      </div>

      <div className="clipboard-custody__actions" role="group" aria-label="Clipboard custody steps">
        <button disabled={current.phase !== "home"} onClick={cutLabel} type="button">Cut the label</button>
        <button disabled={!isDeparted} onClick={pasteLabel} type="button">Paste it back</button>
      </div>

      <footer className="clipboard-custody__footer">
        <p aria-live="polite">
          {current.phase === "home"
            ? "Cut first, then paste. The document is waiting for a two-step journey."
            : current.phase === "departed"
              ? "The label has left the case. Paste it back to complete custody."
              : "The label returned in order and received a stamp it did not need."}
        </p>
        <button disabled={current.phase === "home"} onClick={() => setState(createState(label))} type="button">
          Reset custody
        </button>
      </footer>
    </section>
  );
}
