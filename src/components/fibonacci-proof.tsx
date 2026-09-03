import * as React from "react";

const FIBONACCI = [1, 2, 3, 5, 8] as const;

type FibonacciProofState = {
  draft: string;
  stage: number;
  status: "ready" | "wrong" | "complete";
};

export interface FibonacciProofProps {
  children: React.ReactNode;
}

function initialState(): FibonacciProofState {
  return { draft: "", stage: 0, status: "ready" };
}

export function FibonacciProof({ children }: FibonacciProofProps) {
  const [state, setState] = React.useState<FibonacciProofState>(initialState);
  const complete = state.stage === FIBONACCI.length;

  const verify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (complete) {
      return;
    }

    if (state.draft.trim() === String(FIBONACCI[state.stage])) {
      const stage = state.stage + 1;
      setState({ draft: "", stage, status: stage === FIBONACCI.length ? "complete" : "ready" });
      return;
    }

    setState((current) => ({ ...current, draft: "", status: "wrong" }));
  };

  return (
    <section
      aria-label="Verify content with an unnecessary Fibonacci proof"
      className="gra-ui fibonacci-proof"
      data-stage={state.stage}
      data-status={state.status}
    >
      <header className="fibonacci-proof__header">
        <span>Fibonacci proof</span>
        <output aria-live="polite">{complete ? "Proved" : `${state.stage} / ${FIBONACCI.length}`}</output>
      </header>

      <figure className="fibonacci-proof__paper">
        <div className="fibonacci-proof__cargo">{children}</div>
        <figcaption>
          {complete
            ? "The notice survived a numerical ceremony."
            : "A perfectly readable notice awaits its next number."}
        </figcaption>
      </figure>

      <ol className="fibonacci-proof__steps" aria-label="Verified sequence">
        {FIBONACCI.map((number, index) => (
          <li data-seen={index < state.stage} key={number}>
            <span>{index + 1}</span>
            <strong>{index < state.stage ? number : "?"}</strong>
          </li>
        ))}
      </ol>

      <form className="fibonacci-proof__form" onSubmit={verify}>
        <label>
          <span>Next Fibonacci number</span>
          <input
            aria-label="Next Fibonacci number"
            disabled={complete}
            inputMode="numeric"
            onChange={(event) => setState((current) => ({ ...current, draft: event.target.value, status: "ready" }))}
            value={state.draft}
          />
        </label>
        <button disabled={complete} type="submit">{complete ? "Proof complete" : "Verify number"}</button>
      </form>

      <footer className="fibonacci-proof__footer">
        <p aria-live="polite">
          {state.status === "wrong"
            ? "That number was rejected. The notice remains unproven."
            : complete
              ? "Five numbers were typed to authorize one small piece of content."
              : `Enter ${FIBONACCI[state.stage]} next, because ordinary rendering lacks sufficient evidence.`}
        </p>
        <button disabled={state.stage === 0 && state.status !== "wrong"} onClick={() => setState(initialState())} type="button">
          Restart proof
        </button>
      </footer>
    </section>
  );
}
