import * as React from "react";

type ReferendumId = "gentle" | "official" | "urgent";

const RULINGS: readonly {
  id: ReferendumId;
  label: string;
  prefix: string;
  detail: string;
}[] = [
  { id: "gentle", label: "Suggest", prefix: "Perhaps", detail: "The label is offered as a polite possibility." },
  { id: "official", label: "Declare", prefix: "It is hereby", detail: "The label has been promoted to an unnecessary decree." },
  { id: "urgent", label: "Escalate", prefix: "Immediately", detail: "The label now behaves as though waiting were impossible." },
];

export interface PrefixReferendumProps {
  label: string;
}

export function PrefixReferendum({ label }: PrefixReferendumProps) {
  const [ruling, setRuling] = React.useState<ReferendumId | null>(null);
  const selected = RULINGS.find((option) => option.id === ruling);

  return (
    <section aria-label="Choose an unnecessary prefix" className="gra-ui prefix-referendum" data-ruling={ruling ?? "undecided"}>
      <header className="prefix-referendum__header">
        <span>Prefix referendum</span>
        <output aria-live="polite">{selected?.label ?? "No prefix"}</output>
      </header>

      <div className="prefix-referendum__stage" aria-live="polite">
        <span className="prefix-referendum__caption">Submitted label</span>
        {selected ? (
          <p className="prefix-referendum__result"><strong>{selected.prefix}</strong> {label}</p>
        ) : (
          <p className="prefix-referendum__waiting">{label || "An empty label awaits a ruling."}</p>
        )}
        <p className="prefix-referendum__detail">{selected?.detail ?? "Three prefixes are waiting to overrule the original tone."}</p>
      </div>

      <div aria-label="Prefix choices" className="prefix-referendum__choices" role="group">
        {RULINGS.map((option) => (
          <button
            aria-pressed={ruling === option.id}
            className="prefix-referendum__choice"
            data-selected={ruling === option.id}
            key={option.id}
            onClick={() => setRuling(option.id)}
            type="button"
          >
            <strong>{option.label}</strong>
            <small>{option.prefix}</small>
          </button>
        ))}
      </div>

      <footer className="prefix-referendum__footer">
        <p aria-live="polite">{selected ? `The label now begins with “${selected.prefix}”, which settles nothing.` : "Vote to add a tone the label did not request."}</p>
        <button className="prefix-referendum__reset" disabled={ruling === null} onClick={() => setRuling(null)} type="button">
          Reopen the wording
        </button>
      </footer>
    </section>
  );
}
