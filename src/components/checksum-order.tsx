import * as React from "react";

type ChecksumToken = "count" | "first" | "last";

const TOKENS: readonly { id: ChecksumToken; label: string }[] = [
  { id: "count", label: "Count words" },
  { id: "first", label: "Read first" },
  { id: "last", label: "Read last" },
];

export interface ChecksumOrderProps {
  label: string;
}

interface ChecksumOrderState {
  label: string;
  attempt: ChecksumToken[];
}

function expectedOrder(label: string): ChecksumToken[] {
  const words = label.trim().split(/\s+/).filter(Boolean);
  const checksum = words.reduce((total, word) => total + Array.from(word).length, 0);
  return checksum % 3 === 0 ? ["first", "last", "count"] : checksum % 3 === 1 ? ["last", "count", "first"] : ["count", "first", "last"];
}

export function ChecksumOrder({ label }: ChecksumOrderProps) {
  const [state, setState] = React.useState<ChecksumOrderState>({ label, attempt: [] });
  const current = state.label === label ? state : { label, attempt: [] };
  const attempt = current.attempt;
  const order = expectedOrder(label);
  const complete = attempt.length === order.length;
  const next = order[attempt.length];
  const words = label.trim().split(/\s+/).filter(Boolean);

  const choose = (token: ChecksumToken) => {
    if (complete) return;
    if (token === next) {
      setState((previous) => {
        const baseline = previous.label === label ? previous.attempt : [];
        return { label, attempt: [...baseline, token] };
      });
    } else {
      setState({ label, attempt: [] });
    }
  };

  return (
    <section aria-label="Submit a label in checksum order" className="gra-ui checksum-order" data-state={complete ? "posted" : attempt.length ? "draft" : "waiting"}>
      <header className="checksum-order__header">
        <span>Checksum order</span>
        <output aria-live="polite">{complete ? "Posted" : `${attempt.length} / ${order.length} steps`}</output>
      </header>

      <div className="checksum-order__ledger" aria-live="polite">
        <div className="checksum-order__label"><span>Incoming label</span><strong>{label || "No words submitted."}</strong></div>
        <div className="checksum-order__checksum"><span>Word checksum</span><strong>{words.reduce((total, word) => total + Array.from(word).length, 0) || 0}</strong></div>
      </div>

      <div className="checksum-order__tokens" aria-label="Checksum steps" role="group">
        {TOKENS.map((token) => (
          <button
            aria-pressed={attempt.includes(token.id)}
            className="checksum-order__token"
            data-complete={attempt.includes(token.id)}
            data-next={token.id === next}
            disabled={complete}
            key={token.id}
            onClick={() => choose(token.id)}
            type="button"
          >
            <span>{attempt.indexOf(token.id) + 1 || "·"}</span>
            {token.label}
          </button>
        ))}
      </div>

      <footer className="checksum-order__footer">
        <p aria-live="polite">
          {complete ? "The label has been posted after obeying a checksum that could have stayed invisible." : `Next: ${TOKENS.find((token) => token.id === next)?.label}. A wrong step voids the draft.`}
        </p>
        <button className="checksum-order__reset" disabled={attempt.length === 0} onClick={() => setState({ label, attempt: [] })} type="button">
          Void draft
        </button>
      </footer>
    </section>
  );
}
