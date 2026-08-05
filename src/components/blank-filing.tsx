import * as React from "react";

export interface BlankFilingProps {
  children: React.ReactNode;
}

type SubmissionResult = "empty" | "full" | null;

interface BlankFilingState {
  signature: string;
  filed: number;
  lastSubmission: SubmissionResult;
}

function signatureForPieces(pieces: readonly React.ReactNode[]) {
  return pieces
    .map((piece, index) => {
      if (React.isValidElement(piece)) {
        const element = piece as React.ReactElement<{ children?: React.ReactNode }>;

        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof piece}:${String(piece)}`;
    })
    .join("|");
}

function createState(signature: string): BlankFilingState {
  return { signature, filed: 0, lastSubmission: null };
}

export function BlankFiling({ children }: BlankFilingProps) {
  const pieces = React.Children.toArray(children);
  const signature = signatureForPieces(pieces);
  const [state, setState] = React.useState<BlankFilingState>(() => createState(signature));
  const [draft, setDraft] = React.useState("");
  const current = state.signature === signature ? state : createState(signature);
  const filed = Math.min(current.filed, pieces.length);
  const waiting = pieces.slice(filed);
  const filedPieces = pieces.slice(0, filed);
  const isComplete = pieces.length > 0 && filed === pieces.length;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const wasBlank = draft.trim().length === 0;

    setState((previous) => {
      const base = previous.signature === signature ? previous : createState(signature);

      return {
        signature,
        filed: wasBlank ? Math.min(base.filed + 1, pieces.length) : base.filed,
        lastSubmission: wasBlank ? "empty" : "full",
      };
    });
  }

  return (
    <section
      aria-label="File children by submitting an empty form"
      className="gra-ui blank-filing"
      data-state={isComplete ? "complete" : filed > 0 ? "filing" : "waiting"}
      data-last-submission={current.lastSubmission ?? "none"}
    >
      <header className="blank-filing__header">
        <span>Blank filing</span>
        <output aria-live="polite">
          {pieces.length === 0 ? "Empty" : `${filed}/${pieces.length} filed`}
        </output>
      </header>

      <div className="blank-filing__board">
        <div aria-label="Children waiting to be filed" className="blank-filing__lane" role="list">
          <span className="blank-filing__lane-label">Waiting room</span>
          {waiting.length > 0 ? (
            waiting.map((piece, index) => (
              <div className="blank-filing__item" key={`piece-${filed + index}-${signature}`} role="listitem">
                {piece}
              </div>
            ))
          ) : (
            <span className="blank-filing__empty">Nothing left to submit.</span>
          )}
        </div>

        <div aria-label="Children filed by an empty submission" className="blank-filing__lane blank-filing__filed" role="list">
          <span className="blank-filing__lane-label">Filed by nothing</span>
          {filedPieces.length > 0 ? (
            filedPieces.map((piece, index) => (
              <div
                className="blank-filing__item"
                data-fresh={index === filed - 1}
                key={`piece-${index}-${signature}`}
                role="listitem"
              >
                {piece}
              </div>
            ))
          ) : (
            <span className="blank-filing__empty">The void is still vacant.</span>
          )}
        </div>
      </div>

      <form className="blank-filing__form" onSubmit={handleSubmit}>
        <label className="blank-filing__input-label">
          <span>Evidence</span>
          <input
            aria-label="Evidence for the filing"
            onChange={(event) => setDraft(event.currentTarget.value)}
            placeholder="Leave this empty"
            type="text"
            value={draft}
          />
        </label>
        <button disabled={isComplete} type="submit">
          Submit blank
        </button>
      </form>

      <footer className="blank-filing__footer">
        <p aria-live="polite">
          {pieces.length === 0
            ? "Give the filing something to move."
            : current.lastSubmission === "full"
              ? "That submission contained evidence, so nothing moved."
              : isComplete
                ? "Every child has been filed by the absence of a reason."
                : filed === 0
                  ? "Submit the empty field to file the next child."
                  : `${waiting.length} ${waiting.length === 1 ? "child remains" : "children remain"} in the waiting room.`}
        </p>
        <button
          className="blank-filing__reset"
          disabled={filed === 0 && current.lastSubmission === null}
          onClick={() => {
            setDraft("");
            setState(createState(signature));
          }}
          type="button"
        >
          Reset filing
        </button>
      </footer>
    </section>
  );
}
