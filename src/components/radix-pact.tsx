import * as React from "react";

const RADICES = [
  { id: "decimal", label: "Decimal", base: 10, detail: "the familiar count" },
  { id: "ternary", label: "Ternary", base: 3, detail: "three symbols only" },
  { id: "duodecimal", label: "Duodecimal", base: 12, detail: "a dozen-way treaty" },
] as const;

type RadixId = (typeof RADICES)[number]["id"];

function formatValue(value: number, base: number) {
  if (!Number.isFinite(value)) return "not a number";
  return Math.trunc(value).toString(base).toUpperCase();
}

export interface RadixPactProps {
  value: number;
}

export function RadixPact({ value }: RadixPactProps) {
  const [radix, setRadix] = React.useState<RadixId | null>(null);
  const selected = RADICES.find((item) => item.id === radix);
  const displayedValue = selected ? formatValue(value, selected.base) : String(value);

  return (
    <section
      aria-label="Choose a numerical radix for the value"
      className="gra-ui radix-pact"
      data-radix={radix ?? "undecided"}
    >
      <header className="radix-pact__header">
        <span>Radix pact</span>
        <output aria-live="polite">{selected ? `Base ${selected.base}` : "Unratified"}</output>
      </header>

      <div className="radix-pact__display" aria-live="polite">
        <span className="radix-pact__caption">The same value, politically reformatted</span>
        <strong key={`${radix ?? "plain"}-${displayedValue}`}>{displayedValue}</strong>
        <small>{selected ? `${value} in base ${selected.base}` : "Choose a counting system below."}</small>
      </div>

      <div aria-label="Radix choices" className="radix-pact__choices">
        {RADICES.map((item) => (
          <button
            aria-pressed={radix === item.id}
            className="radix-pact__choice"
            data-selected={radix === item.id}
            key={item.id}
            onClick={() => setRadix(item.id)}
            type="button"
          >
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>

      <footer className="radix-pact__footer">
        <p>{selected ? `The value now reports itself in ${selected.label.toLowerCase()}.` : "Three counting systems are waiting to overrule an adequate number."}</p>
        <button className="radix-pact__reset" disabled={!radix} onClick={() => setRadix(null)} type="button">
          Void the pact
        </button>
      </footer>
    </section>
  );
}
