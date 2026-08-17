import { useState } from "react";

const metrics = [
  { id: "ink", label: "Ink", hint: "non-space characters", measure: (label: string) => Array.from(label).filter((character) => !/\s/.test(character)).length },
  { id: "air", label: "Air", hint: "spaces in the sentence", measure: (label: string) => Array.from(label).filter((character) => /\s/.test(character)).length },
  { id: "edges", label: "Edges", hint: "word boundaries", measure: (label: string) => label.trim() ? label.trim().split(/\s+/).length + 1 : 0 },
] as const;

type MetricId = (typeof metrics)[number]["id"];

export interface MetricMandateProps {
  label: string;
}

export function MetricMandate({ label }: MetricMandateProps) {
  const [metric, setMetric] = useState<MetricId | null>(null);
  const selected = metrics.find((candidate) => candidate.id === metric);
  const amount = selected?.measure(label) ?? 0;
  const scale = selected ? Math.min(100, Math.round((amount / Math.max(Array.from(label).length, 1)) * 100)) : 0;

  return (
    <section className="gra-ui metric-mandate" data-metric={metric ?? "undecided"} aria-label="Metric mandate">
      <header className="metric-mandate__header">
        <span>Metric mandate</span>
        <output aria-live="polite">{selected ? selected.label : "No standard selected"}</output>
      </header>

      <div className="metric-mandate__paper">
        <p>{label}</p>
        <div className="metric-mandate__meter" aria-hidden="true">
          <span style={{ width: `${scale}%` }} />
        </div>
        <strong aria-live="polite">{selected ? `${amount} ${selected.label.toLowerCase()} units` : "The label awaits an arbitrary standard."}</strong>
      </div>

      <div className="metric-mandate__choices" role="group" aria-label="Choose a measurement standard">
        {metrics.map((candidate) => (
          <button key={candidate.id} type="button" aria-pressed={metric === candidate.id} onClick={() => setMetric(candidate.id)}>
            <b>{candidate.label}</b>
            <small>{candidate.hint}</small>
          </button>
        ))}
      </div>

      <footer className="metric-mandate__footer">
        <span>{selected ? "The same label now has a different official size." : "Choose what the sentence is allegedly made of."}</span>
        <button type="button" onClick={() => setMetric(null)} disabled={metric === null}>Withdraw standard</button>
      </footer>
    </section>
  );
}
