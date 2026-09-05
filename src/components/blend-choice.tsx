import * as React from "react";

type BlendMode = "multiply" | "screen" | "difference";

const BLEND_OPTIONS: readonly { mode: BlendMode; label: string; detail: string }[] = [
  { mode: "multiply", label: "Ink", detail: "darkens the stamp" },
  { mode: "screen", label: "Light", detail: "washes through it" },
  { mode: "difference", label: "Inversion", detail: "argues with every pixel" },
];

export interface BlendChoiceProps {
  children: React.ReactNode;
}

export function BlendChoice({ children }: BlendChoiceProps) {
  const [mode, setMode] = React.useState<BlendMode | null>(null);
  const selected = BLEND_OPTIONS.find((option) => option.mode === mode);

  return (
    <section
      aria-label="Choose how a notice blends with its stamp"
      className="gra-ui blend-choice"
      data-mode={mode ?? "waiting"}
    >
      <header className="blend-choice__header">
        <span>Blend choice</span>
        <output aria-live="polite">{selected?.label ?? "Undecided"}</output>
      </header>

      <div className="blend-choice__stage" aria-live="polite">
        <span className="blend-choice__stamp" aria-hidden="true">OFFICIAL</span>
        <div className="blend-choice__content">{children}</div>
      </div>

      <fieldset className="blend-choice__options">
        <legend>Choose a composition</legend>
        {BLEND_OPTIONS.map((option) => (
          <button
            aria-pressed={mode === option.mode}
            className="blend-choice__option"
            data-selected={mode === option.mode ? "true" : "false"}
            key={option.mode}
            onClick={() => setMode(option.mode)}
            type="button"
          >
            <strong>{option.label}</strong>
            <small>{option.detail}</small>
          </button>
        ))}
      </fieldset>

      <footer className="blend-choice__footer">
        <p aria-live="polite">
          {selected
            ? `The child is now composed with ${selected.label.toLowerCase()} blending.`
            : "Pick a blend to let a stamp overrule ordinary compositing."}
        </p>
        <button
          className="blend-choice__reset"
          disabled={mode === null}
          onClick={() => setMode(null)}
          type="button"
        >
          Withdraw choice
        </button>
      </footer>
    </section>
  );
}
