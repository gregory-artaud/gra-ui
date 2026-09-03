import * as React from "react";

type ReadingAxisMode = "line" | "column" | "sideways";

const MODES: readonly { id: ReadingAxisMode; label: string; detail: string }[] = [
  { id: "line", label: "Line", detail: "the usual direction" },
  { id: "column", label: "Column", detail: "turn the reading axis" },
  { id: "sideways", label: "Sideways", detail: "rotate the glyphs too" },
];

export interface ReadingAxisProps {
  children: React.ReactNode;
}

export function ReadingAxis({ children }: ReadingAxisProps) {
  const [mode, setMode] = React.useState<ReadingAxisMode | null>(null);
  const selected = MODES.find((option) => option.id === mode);

  return (
    <section
      aria-label="Choose an unnecessary reading axis"
      className="gra-ui reading-axis"
      data-mode={mode ?? "original"}
    >
      <header className="reading-axis__header">
        <span>Reading axis</span>
        <output aria-live="polite">{selected?.label ?? "Ordinary"}</output>
      </header>

      <div className="reading-axis__stage" aria-live="polite">
        <span className="reading-axis__caption">Current direction</span>
        <div className="reading-axis__content" data-axis={mode ?? "line"}>{children}</div>
      </div>

      <div className="reading-axis__choices" role="group" aria-label="Reading axis choices">
        {MODES.map((option) => (
          <button
            aria-pressed={mode === option.id}
            className="reading-axis__choice"
            data-selected={mode === option.id}
            key={option.id}
            onClick={() => setMode(option.id)}
            type="button"
          >
            <strong>{option.label}</strong>
            <small>{option.detail}</small>
          </button>
        ))}
      </div>

      <footer className="reading-axis__footer">
        <p aria-live="polite">
          {selected
            ? `The notice now reads on a ${selected.label.toLowerCase()} axis.`
            : "Choose a direction before the content is allowed to stay ordinary."}
        </p>
        <button disabled={mode === null} onClick={() => setMode(null)} type="button">Restore line</button>
      </footer>
    </section>
  );
}
