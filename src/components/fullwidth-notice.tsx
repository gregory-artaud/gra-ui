import * as React from "react";

export interface FullwidthNoticeProps {
  label: string;
}

interface FullwidthNoticeState {
  signature: string;
  wide: boolean;
}

function createState(signature: string): FullwidthNoticeState {
  return { signature, wide: false };
}

function toFullwidth(label: string) {
  return Array.from(label, (character) => {
    const codePoint = character.codePointAt(0) ?? 0;

    if (codePoint === 0x20) {
      return "\u3000";
    }

    if (codePoint >= 0x21 && codePoint <= 0x7e) {
      return String.fromCodePoint(codePoint + 0xfee0);
    }

    return character;
  }).join("");
}

export function FullwidthNotice({ label }: FullwidthNoticeProps) {
  const [state, setState] = React.useState<FullwidthNoticeState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const displayed = current.wide ? toFullwidth(label) : label;

  return (
    <section
      aria-label="Convert a notice into Unicode fullwidth characters"
      className="gra-ui fullwidth-notice"
      data-state={current.wide ? "expanded" : "ascii"}
    >
      <header className="fullwidth-notice__header">
        <span>Fullwidth notice</span>
        <output aria-live="polite">{current.wide ? "Unicode expanded" : "ASCII ordinary"}</output>
      </header>

      <div className="fullwidth-notice__paper" aria-live="polite">
        <span className="fullwidth-notice__caption">Rendered characters</span>
        <p key={current.wide ? "wide" : "ascii"}>{displayed || "No label submitted."}</p>
        <code>{current.wide ? "U+FFxx width forms" : "U+00xx width forms"}</code>
      </div>

      <footer className="fullwidth-notice__footer">
        <p aria-live="polite">
          {current.wide
            ? "Every basic glyph took a wider Unicode seat without adding meaning."
            : "Expand the label into characters designed to occupy more room."}
        </p>
        <div className="fullwidth-notice__actions">
          <button disabled={current.wide || label.length === 0} onClick={() => setState({ signature: label, wide: true })} type="button">
            Expand glyphs
          </button>
          <button disabled={!current.wide} onClick={() => setState(createState(label))} type="button">
            Restore ASCII
          </button>
        </div>
      </footer>
    </section>
  );
}
