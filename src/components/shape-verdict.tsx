import * as React from "react";

type Shape = "coin" | "ticket" | "flag";

const SHAPES: readonly { id: Shape; label: string; detail: string }[] = [
  { id: "coin", label: "Coin", detail: "round enough to approve" },
  { id: "ticket", label: "Ticket", detail: "notched for filing" },
  { id: "flag", label: "Flag", detail: "pointed for emphasis" },
];

export interface ShapeVerdictProps {
  children: React.ReactNode;
}

export function ShapeVerdict({ children }: ShapeVerdictProps) {
  const [shape, setShape] = React.useState<Shape>("coin");
  const selected = SHAPES.find((option) => option.id === shape) ?? SHAPES[0];

  return (
    <section
      aria-label="Choose an unnecessary shape for content"
      className="gra-ui shape-verdict"
      data-shape={shape}
    >
      <header className="shape-verdict__header">
        <span>Shape verdict</span>
        <output aria-live="polite">{selected.label}</output>
      </header>

      <div className="shape-verdict__stage" aria-live="polite">
        <div className="shape-verdict__content">
          <span className="shape-verdict__seal" aria-hidden="true">{shape === "coin" ? "○" : shape === "ticket" ? "▤" : "⚑"}</span>
          <div>{children}</div>
        </div>
      </div>

      <label className="shape-verdict__select">
        <span>Issue a shape</span>
        <select aria-label="Shape verdict" onChange={(event) => setShape(event.currentTarget.value as Shape)} value={shape}>
          {SHAPES.map((option) => (
            <option key={option.id} value={option.id}>{option.label} · {option.detail}</option>
          ))}
        </select>
      </label>

      <p className="shape-verdict__note" aria-live="polite">
        The words stay the same; the geometry now claims a different authority.
      </p>
    </section>
  );
}
