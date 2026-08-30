import * as React from "react";

const NORMALIZATION_MODES = [
  { id: "NFC", label: "Compose", detail: "prefer one glyph" },
  { id: "NFD", label: "Decompose", detail: "separate its marks" },
  { id: "NFKD", label: "Flatten", detail: "discard compatibility" },
] as const;

type NormalizationMode = (typeof NORMALIZATION_MODES)[number]["id"];

function codePointLabel(character: string) {
  const codePoint = character.codePointAt(0);
  return codePoint === undefined ? "" : `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
}

export interface NormalizationReferendumProps {
  label: string;
}

export function NormalizationReferendum({ label }: NormalizationReferendumProps) {
  const [mode, setMode] = React.useState<NormalizationMode | null>(null);
  const displayedLabel = mode ? label.normalize(mode) : label;
  const characters = [...displayedLabel];
  const selectedMode = NORMALIZATION_MODES.find((item) => item.id === mode);

  return (
    <section
      aria-label="Choose a Unicode normalization policy for the label"
      className="gra-ui normalization-referendum"
      data-mode={mode ?? "unresolved"}
    >
      <header className="normalization-referendum__header">
        <span>Normalization referendum</span>
        <output aria-live="polite">{selectedMode?.id ?? "Unresolved"}</output>
      </header>

      <div className="normalization-referendum__paper" aria-live="polite">
        <p className="normalization-referendum__label">{displayedLabel || "The empty label has no glyphs to settle."}</p>
        <div className="normalization-referendum__points" aria-label="Visible code points">
          {characters.length === 0 ? <span className="normalization-referendum__empty">∅</span> : null}
          {characters.map((character, index) => (
            <span className="normalization-referendum__point" key={`${character}-${index}`}>
              <b>{character === " " ? "␠" : character}</b>
              <small>{codePointLabel(character)}</small>
            </span>
          ))}
        </div>
      </div>

      <div aria-label="Normalization policies" className="normalization-referendum__choices">
        {NORMALIZATION_MODES.map((item) => (
          <button
            aria-pressed={mode === item.id}
            className="normalization-referendum__choice"
            data-selected={mode === item.id}
            key={item.id}
            onClick={() => setMode(item.id)}
            type="button"
          >
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>

      <footer className="normalization-referendum__footer">
        <p>{mode ? `The label now obeys ${mode}, including its actual code points.` : "Three Unicode policies are waiting to overrule the label."}</p>
        <button className="normalization-referendum__reset" disabled={!mode} onClick={() => setMode(null)} type="button">
          Withdraw policy
        </button>
      </footer>
    </section>
  );
}
