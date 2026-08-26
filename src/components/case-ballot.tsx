import * as React from "react";

type CasePolicy = "quiet" | "headline" | "shout";

const POLICIES: readonly { id: CasePolicy; label: string; detail: string }[] = [
  { id: "quiet", label: "Quiet case", detail: "every word lowers its voice" },
  { id: "headline", label: "Headline case", detail: "each word reports for duty" },
  { id: "shout", label: "Shout case", detail: "the whole notice makes a scene" },
];

function headlineCase(label: string) {
  return label.toLowerCase().replace(/(^|\s)(\S)/g, (_, prefix: string, letter: string) => `${prefix}${letter.toUpperCase()}`);
}

function formatLabel(label: string, policy: CasePolicy) {
  if (policy === "quiet") return label.toLowerCase();
  if (policy === "headline") return headlineCase(label);
  return label.toUpperCase();
}

export interface CaseBallotProps {
  label: string;
}

export function CaseBallot({ label }: CaseBallotProps) {
  const groupId = React.useId();
  const [policy, setPolicy] = React.useState<CasePolicy>("quiet");
  const selected = POLICIES.find((option) => option.id === policy) ?? POLICIES[0];
  const rendered = formatLabel(label, policy);

  return (
    <section aria-label="Vote on the case of a label" className="gra-ui case-ballot" data-policy={policy}>
      <header className="case-ballot__header">
        <span>Case ballot</span>
        <output aria-live="polite">{selected.label}</output>
      </header>

      <div className="case-ballot__paper" aria-live="polite">
        <span className="case-ballot__caption">The ruling in public</span>
        <p className="case-ballot__label" key={rendered}>{rendered || "An empty label has no case to defend."}</p>
        <small>{selected.detail}</small>
      </div>

      <fieldset className="case-ballot__choices">
        <legend>Choose a case policy</legend>
        {POLICIES.map((option) => (
          <label className="case-ballot__choice" data-selected={policy === option.id} key={option.id}>
            <input checked={policy === option.id} name={groupId} onChange={() => setPolicy(option.id)} type="radio" />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <button className="case-ballot__reset" disabled={policy === "quiet"} onClick={() => setPolicy("quiet")} type="button">
        Withdraw the ballot
      </button>
    </section>
  );
}
