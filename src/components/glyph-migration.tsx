import * as React from "react";

export interface GlyphMigrationProps {
  label: string;
}

interface GlyphMigrationState {
  label: string;
  migrated: number;
}

function createState(label: string): GlyphMigrationState {
  return { label, migrated: 0 };
}

function visibleGlyph(character: string) {
  return character === " " ? "·" : character;
}

export function GlyphMigration({ label }: GlyphMigrationProps) {
  const [state, setState] = React.useState<GlyphMigrationState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const glyphs = Array.from(label);
  const migratedGlyphs = glyphs.slice(0, current.migrated);
  const remainingLabel = glyphs.slice(current.migrated).join("");
  const complete = glyphs.length > 0 && current.migrated === glyphs.length;

  const migrateNext = () => {
    setState((previous) => {
      const baseline = previous.label === label ? previous : createState(label);
      return {
        label,
        migrated: Math.min(glyphs.length, baseline.migrated + 1),
      };
    });
  };

  return (
    <section
      aria-label="Migrate a label one glyph at a time"
      className="gra-ui glyph-migration"
      data-state={complete ? "complete" : current.migrated > 0 ? "migrating" : "ready"}
    >
      <header className="glyph-migration__header">
        <span>Glyph migration</span>
        <output aria-live="polite">{current.migrated} / {glyphs.length} transferred</output>
      </header>

      <div className="glyph-migration__line" aria-live="polite">
        <span className="glyph-migration__caption">Still in the sentence</span>
        <strong>{remainingLabel || "∅"}</strong>
      </div>

      <div className="glyph-migration__archive" aria-live="polite" aria-label="Transferred glyphs">
        <span className="glyph-migration__caption">Unnecessary archive</span>
        {migratedGlyphs.length > 0 ? (
          <div className="glyph-migration__glyphs">
            {migratedGlyphs.map((glyph, index) => (
              <span className="glyph-migration__glyph" key={`${label}-${index}`}>
                {visibleGlyph(glyph)}
              </span>
            ))}
          </div>
        ) : (
          <span className="glyph-migration__empty">Nothing has been transferred.</span>
        )}
      </div>

      <footer className="glyph-migration__footer">
        <p aria-live="polite">
          {glyphs.length === 0
            ? "An empty label has no glyphs to migrate."
            : complete
              ? "Every glyph has left the sentence and entered the archive."
              : "Move the next glyph out of the sentence, one tiny administrative decision at a time."}
        </p>
        <div className="glyph-migration__actions">
          <button disabled={complete || glyphs.length === 0} onClick={migrateNext} type="button">
            Migrate next glyph
          </button>
          <button
            className="glyph-migration__reset"
            disabled={current.migrated === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Return glyphs
          </button>
        </div>
      </footer>
    </section>
  );
}
