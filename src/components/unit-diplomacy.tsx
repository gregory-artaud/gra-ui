import * as React from "react";

const UNITS = [
  { id: "minutes", label: "Minutes", detail: "the small report", format: (value: number) => `${value} min` },
  { id: "hours", label: "Hours", detail: "the calmer report", format: (value: number) => `${(value / 60).toFixed(2)} h` },
  { id: "workdays", label: "Workdays", detail: "the least urgent report", format: (value: number) => `${(value / 480).toFixed(2)} days` },
] as const;

type UnitId = (typeof UNITS)[number]["id"];

function tidyNumber(value: string) {
  return value.replace(/\.00(?=\D|$)/, "");
}

export interface UnitDiplomacyProps {
  value: number;
}

export function UnitDiplomacy({ value }: UnitDiplomacyProps) {
  const [unit, setUnit] = React.useState<UnitId | null>(null);
  const selected = UNITS.find((candidate) => candidate.id === unit);
  const rendered = selected ? tidyNumber(selected.format(value)) : String(value);

  return (
    <section
      aria-label="Choose a unit for the value"
      className="gra-ui unit-diplomacy"
      data-unit={unit ?? "undecided"}
    >
      <header className="unit-diplomacy__header">
        <span>Unit diplomacy</span>
        <output aria-live="polite">{selected ? selected.label : "Unrepresented"}</output>
      </header>

      <div className="unit-diplomacy__display" aria-live="polite">
        <span className="unit-diplomacy__caption">One value, three official reports</span>
        <strong key={`${unit ?? "plain"}-${value}`}>{rendered}</strong>
        <small>{selected ? `The submitted value was ${value}.` : "Choose a unit to begin negotiations."}</small>
      </div>

      <div aria-label="Unit choices" className="unit-diplomacy__choices">
        {UNITS.map((candidate) => (
          <button
            aria-pressed={unit === candidate.id}
            className="unit-diplomacy__choice"
            data-selected={unit === candidate.id}
            key={candidate.id}
            onClick={() => setUnit(candidate.id)}
            type="button"
          >
            <strong>{candidate.label}</strong>
            <small>{candidate.detail}</small>
          </button>
        ))}
      </div>

      <footer className="unit-diplomacy__footer">
        <p>{selected ? `The value now speaks in ${selected.label.toLowerCase()}.` : "A perfectly adequate value is awaiting a unit treaty."}</p>
        <button className="unit-diplomacy__reset" disabled={!unit} onClick={() => setUnit(null)} type="button">
          End negotiations
        </button>
      </footer>
    </section>
  );
}
