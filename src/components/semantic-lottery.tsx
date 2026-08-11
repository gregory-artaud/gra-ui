import * as React from "react";

export interface SemanticLotteryProps {
  children: React.ReactNode;
}

type SemanticMode = "article" | "ledger" | "aside";

interface SemanticLotteryState {
  mode: SemanticMode | null;
  signature: string;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): SemanticLotteryState {
  return { mode: null, signature };
}

const OPTIONS: readonly { id: SemanticMode; label: string; hint: string }[] = [
  { id: "article", label: "Briefing", hint: "an article with a headline" },
  { id: "ledger", label: "Ledger", hint: "a definition row" },
  { id: "aside", label: "Aside", hint: "a side note" },
];

export function SemanticLottery({ children }: SemanticLotteryProps) {
  const signature = signatureForChildren(children);
  const groupId = React.useId();
  const [state, setState] = React.useState<SemanticLotteryState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const selected = OPTIONS.find((option) => option.id === current.mode);

  return (
    <section
      aria-label="Choose a semantic wrapper for the content"
      className="gra-ui semantic-lottery"
      data-mode={current.mode ?? "undecided"}
    >
      <header className="semantic-lottery__header">
        <span>Semantic lottery</span>
        <output aria-live="polite">{selected ? selected.label : "Undecided"}</output>
      </header>

      <div className="semantic-lottery__stage" aria-live="polite">
        {current.mode === null ? (
          <div className="semantic-lottery__waiting">One piece of content awaits an unnecessarily official noun.</div>
        ) : current.mode === "article" ? (
          <article className="semantic-lottery__article">
            <span>Briefing</span>
            <h3>Formal briefing</h3>
            <div>{children}</div>
          </article>
        ) : current.mode === "ledger" ? (
          <dl className="semantic-lottery__ledger">
            <dt>Filed item</dt>
            <dd>{children}</dd>
          </dl>
        ) : (
          <aside className="semantic-lottery__aside">
            <span>Side note</span>
            <div>{children}</div>
          </aside>
        )}
      </div>

      <fieldset className="semantic-lottery__choices">
        <legend>Choose a wrapper</legend>
        {OPTIONS.map((option) => (
          <label className="semantic-lottery__choice" key={option.id}>
            <input
              checked={current.mode === option.id}
              name={`semantic-lottery-${groupId}`}
              onChange={() => setState({ mode: option.id, signature })}
              type="radio"
            />
            <span>
              <strong>{option.label}</strong>
              <small>{option.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <footer className="semantic-lottery__footer">
        <p>{selected ? `The same child is now wearing ${selected.hint}.` : "Select one of three equally unnecessary meanings."}</p>
        <button
          className="semantic-lottery__reset"
          disabled={current.mode === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Return to plain content
        </button>
      </footer>
    </section>
  );
}
