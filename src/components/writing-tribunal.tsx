import * as React from "react";

type WritingVerdict = "row" | "column" | "mirror";

const VERDICTS: readonly {
  id: WritingVerdict;
  label: string;
  hint: string;
}[] = [
  { id: "row", label: "Row", hint: "read normally" },
  { id: "column", label: "Column", hint: "stack from above" },
  { id: "mirror", label: "Mirror", hint: "start from the other edge" },
];

export interface WritingTribunalProps {
  children: React.ReactNode;
}

export function WritingTribunal({ children }: WritingTribunalProps) {
  const [verdict, setVerdict] = React.useState<WritingVerdict | null>(null);
  const selected = VERDICTS.find((option) => option.id === verdict);
  const contentStyle: React.CSSProperties = verdict === "column"
    ? { writingMode: "vertical-rl", textOrientation: "mixed" }
    : verdict === "mirror"
      ? { direction: "rtl", unicodeBidi: "bidi-override" }
      : {};

  return (
    <section
      aria-label="Choose an unnecessary writing direction"
      className="gra-ui writing-tribunal"
      data-verdict={verdict ?? "undecided"}
    >
      <header className="writing-tribunal__header">
        <span>Writing tribunal</span>
        <output aria-live="polite">{selected ? selected.label : "No direction ruled"}</output>
      </header>

      <div className="writing-tribunal__stage" aria-live="polite">
        <span className="writing-tribunal__caption">The submitted content</span>
        {verdict === null ? (
          <div className="writing-tribunal__waiting">Awaiting a direction with no editorial justification.</div>
        ) : (
          <div className="writing-tribunal__content" key={verdict} style={contentStyle}>
            {children}
          </div>
        )}
      </div>

      <div aria-label="Writing directions" className="writing-tribunal__choices" role="group">
        {VERDICTS.map((option) => (
          <button
            aria-pressed={verdict === option.id}
            className="writing-tribunal__choice"
            data-selected={verdict === option.id}
            key={option.id}
            onClick={() => setVerdict(option.id)}
            type="button"
          >
            <strong>{option.label}</strong>
            <small>{option.hint}</small>
          </button>
        ))}
      </div>

      <footer className="writing-tribunal__footer">
        <p aria-live="polite">
          {selected
            ? `The content now reads by ${selected.label.toLowerCase()}, regardless of its meaning.`
            : "Three directions are waiting to overrule ordinary reading."}
        </p>
        <button
          className="writing-tribunal__reset"
          disabled={verdict === null}
          onClick={() => setVerdict(null)}
          type="button"
        >
          Reopen the hearing
        </button>
      </footer>
    </section>
  );
}
