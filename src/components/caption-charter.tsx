import * as React from "react";

const POLICIES = [
  { id: "brief", label: "Brief", detail: "keep the opening words" },
  { id: "ledger", label: "Ledger", detail: "file every word" },
  { id: "receipt", label: "Receipt", detail: "count the characters" },
] as const;

type PolicyId = (typeof POLICIES)[number]["id"];

export interface CaptionCharterProps {
  label: string;
}

export function CaptionCharter({ label }: CaptionCharterProps) {
  const [selection, setSelection] = React.useState({ label, policy: null as PolicyId | null });
  const policy = selection.label === label ? selection.policy : null;
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  const brief = words.slice(0, 4).join(" ") + (words.length > 4 ? "…" : "");

  return (
    <section
      aria-label="Choose a caption filing policy"
      className="gra-ui caption-charter"
      data-policy={policy ?? "unfiled"}
    >
      <header className="caption-charter__header">
        <span>Caption charter</span>
        <output aria-live="polite">{policy ? POLICIES.find((item) => item.id === policy)?.label : "Unfiled"}</output>
      </header>

      <div className="caption-charter__document" aria-live="polite">
        <span className="caption-charter__caption">Current document</span>
        {!policy ? <p className="caption-charter__plain">{label || "An empty caption awaits a policy."}</p> : null}
        {policy === "brief" ? <p className="caption-charter__brief">{brief || "No opening words to retain."}</p> : null}
        {policy === "ledger" ? (
          <ol className="caption-charter__ledger">
            {words.length > 0 ? words.map((word, index) => <li key={`${word}-${index}`}>{word}</li>) : <li>No words were filed.</li>}
          </ol>
        ) : null}
        {policy === "receipt" ? (
          <div className="caption-charter__receipt">
            <strong>{label.length}</strong>
            <span>characters received</span>
            <small>{label || "The receipt is blank."}</small>
          </div>
        ) : null}
      </div>

      <div className="caption-charter__policies" aria-label="Caption policies">
        {POLICIES.map((item) => (
          <button
            aria-pressed={policy === item.id}
            className="caption-charter__policy"
            data-selected={policy === item.id}
            key={item.id}
            onClick={() => setSelection({ label, policy: item.id })}
            type="button"
          >
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>

      <footer className="caption-charter__footer">
        <p>{policy ? "The words have been granted a structure they did not request." : "Choose one policy to give this caption an official shape."}</p>
        <button className="caption-charter__reset" disabled={!policy} onClick={() => setSelection({ label, policy: null })} type="button">Withdraw policy</button>
      </footer>
    </section>
  );
}
