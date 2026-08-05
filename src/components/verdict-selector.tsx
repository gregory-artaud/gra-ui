import * as React from "react";

export interface VerdictSelectorProps {
  label: string;
}

type Verdict = "headline" | "ledger" | "whisper";

interface VerdictSelectorState {
  signature: string;
  verdict: Verdict | null;
}

const VERDICTS: readonly { id: Verdict; label: string; note: string }[] = [
  { id: "headline", label: "Headline", note: "The last word takes command." },
  { id: "ledger", label: "Ledger", note: "Every word becomes an entry." },
  { id: "whisper", label: "Whisper", note: "Only the initials are allowed through." },
];

function createState(label: string): VerdictSelectorState {
  return { signature: label, verdict: null };
}

function renderVerdict(label: string, verdict: Verdict) {
  const words = label.trim().split(/\s+/).filter(Boolean);

  if (verdict === "headline") {
    return words.length > 0 ? `${words.at(-1)} — ${words.slice(0, -1).join(" ")}` : label;
  }

  if (verdict === "ledger") {
    return words.map((word, index) => `${index + 1}. ${word}`).join(" · ");
  }

  return words.map((word) => Array.from(word)[0]).filter(Boolean).join(" ") || label;
}

export function VerdictSelector({ label }: VerdictSelectorProps) {
  const [state, setState] = React.useState<VerdictSelectorState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const selectedVerdict = VERDICTS.find((verdict) => verdict.id === current.verdict);

  return (
    <section
      aria-label="Choose one of three materially different verdicts for a label"
      className="gra-ui verdict-selector"
      data-state={current.verdict ?? "undecided"}
    >
      <header className="verdict-selector__header">
        <span>Verdict selector</span>
        <output aria-live="polite">{selectedVerdict?.label ?? "No verdict"}</output>
      </header>

      <div className="verdict-selector__result" aria-live="polite">
        {selectedVerdict ? (
          <>
            <span className="verdict-selector__result-label">{selectedVerdict.note}</span>
            <strong key={`${label}-${current.verdict}`}>{renderVerdict(label, selectedVerdict.id)}</strong>
          </>
        ) : (
          <>
            <span className="verdict-selector__result-label">The panel refuses to interpret it.</span>
            <strong>{label || "No label supplied"}</strong>
          </>
        )}
      </div>

      <div className="verdict-selector__choices" aria-label="Verdict choices">
        {VERDICTS.map((verdict) => (
          <button
            aria-pressed={current.verdict === verdict.id}
            className="verdict-selector__choice"
            key={verdict.id}
            onClick={() => setState({ signature: label, verdict: verdict.id })}
            type="button"
          >
            <span>{verdict.label}</span>
            <small>{verdict.note}</small>
          </button>
        ))}
      </div>

      <button
        className="verdict-selector__reset"
        disabled={current.verdict === null}
        onClick={() => setState(createState(label))}
        type="button"
      >
        Reopen the case
      </button>
    </section>
  );
}
