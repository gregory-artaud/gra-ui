import * as React from "react";

export interface GlyphOffsetProps {
  label: string;
}

function offsetGlyphs(label: string) {
  return Array.from(label, (glyph) => {
    const code = glyph.codePointAt(0) ?? 0;
    if (code < 0x21 || code > 0x7e) return glyph;
    return String.fromCodePoint(code === 0x7e ? 0x21 : code + 1);
  }).join("");
}

export function GlyphOffset({ label }: GlyphOffsetProps) {
  const [offset, setOffset] = React.useState(false);
  const rendered = offset ? offsetGlyphs(label) : label;

  return (
    <section aria-label="Nudge every printable glyph by one code point" className="gra-ui glyph-offset" data-state={offset ? "offset" : "readable"}>
      <header className="glyph-offset__header">
        <span>Glyph offset</span>
        <output aria-live="polite">{offset ? "One step ahead" : "Readable"}</output>
      </header>

      <div className="glyph-offset__paper" aria-live="polite">
        <span className="glyph-offset__caption">Displayed label</span>
        <p key={rendered} className="glyph-offset__text">{rendered || "An empty label has no glyphs to offset."}</p>
        <small>{offset ? "Every printable character moved one Unicode step forward, including punctuation." : "The glyphs are waiting for an unnecessary promotion."}</small>
      </div>

      <footer className="glyph-offset__footer">
        <p aria-live="polite">{offset ? "The sentence is still shaped like a sentence, which makes this worse." : "Move the entire label one code point to the right."}</p>
        <div className="glyph-offset__actions">
          <button disabled={offset || !label} onClick={() => setOffset(true)} type="button">Offset glyphs</button>
          <button className="glyph-offset__reset" disabled={!offset} onClick={() => setOffset(false)} type="button">Restore label</button>
        </div>
      </footer>
    </section>
  );
}
