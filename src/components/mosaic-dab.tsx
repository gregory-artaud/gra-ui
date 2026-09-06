import * as React from "react";

const COLUMN_COUNT = 8;

interface MosaicDabState {
  cursor: number;
  label: string;
  painting: boolean;
  placements: number[];
}

export interface MosaicDabProps {
  label: string;
}

function createState(label: string): MosaicDabState {
  return { cursor: 0, label, painting: false, placements: [] };
}

function cellFromPointer(event: React.PointerEvent<HTMLDivElement>, total: number) {
  const bounds = event.currentTarget.getBoundingClientRect();
  if (bounds.width === 0 || bounds.height === 0) {
    return 0;
  }

  const columns = Math.min(COLUMN_COUNT, Math.max(1, total));
  const rows = Math.max(1, Math.ceil(total / columns));
  const column = Math.max(0, Math.min(columns - 1, Math.floor(((event.clientX - bounds.left) / bounds.width) * columns)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor(((event.clientY - bounds.top) / bounds.height) * rows)));
  return Math.min(total - 1, row * columns + column);
}

export function MosaicDab({ label }: MosaicDabProps) {
  const [state, setState] = React.useState<MosaicDabState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const characters = Array.from(label);
  const total = Math.max(1, characters.length);
  const columns = Math.min(COLUMN_COUNT, total);
  const complete = characters.length > 0 && current.placements.length === characters.length;

  const dab = (cell: number) => {
    if (characters.length === 0) {
      return;
    }

    setState((previous) => {
      const baseline = previous.label === label ? previous : createState(label);
      if (baseline.placements.includes(cell) || baseline.placements.length === characters.length) {
        return baseline;
      }

      return { ...baseline, cursor: cell, placements: [...baseline.placements, cell] };
    });
  };

  const moveCursor = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : event.key === "ArrowDown" ? columns : event.key === "ArrowUp" ? -columns : 0;
    if (direction !== 0) {
      event.preventDefault();
      setState((previous) => {
        const baseline = previous.label === label ? previous : createState(label);
        return { ...baseline, cursor: Math.max(0, Math.min(total - 1, baseline.cursor + direction)) };
      });
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dab(current.cursor);
    }
  };

  return (
    <section
      aria-label="Paint a label into a filing mosaic"
      className="gra-ui mosaic-dab"
      data-complete={complete}
      data-painting={current.painting}
    >
      <header className="mosaic-dab__header">
        <span>Mosaic dab</span>
        <output aria-live="polite">{current.placements.length} / {characters.length} tiles</output>
      </header>

      <div
        aria-label="Paint grid; drag across cells or use arrow keys and Enter"
        className="mosaic-dab__grid"
        onKeyDown={moveCursor}
        onPointerCancel={() => setState((previous) => ({ ...previous, painting: false }))}
        onPointerDown={(event) => {
          if (event.button !== 0 || characters.length === 0) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          setState((previous) => ({ ...previous, painting: true }));
          dab(cellFromPointer(event, total));
        }}
        onPointerMove={(event) => {
          if (current.painting) {
            dab(cellFromPointer(event, total));
          }
        }}
        onPointerUp={(event) => {
          dab(cellFromPointer(event, total));
          setState((previous) => ({ ...previous, painting: false }));
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        role="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        tabIndex={characters.length === 0 ? -1 : 0}
      >
        {characters.length === 0 ? <span className="mosaic-dab__empty">∅</span> : null}
        {characters.map((character, index) => {
          const placement = current.placements.indexOf(index);
          const painted = placement !== -1;
          return (
            <span
              aria-label={painted ? `Tile ${placement + 1}: ${character === " " ? "space" : character}` : `Empty tile ${index + 1}`}
              className="mosaic-dab__cell"
              data-cursor={current.cursor === index}
              data-painted={painted}
              key={`${index}-${character}`}
            >
              {painted ? (character === " " ? "·" : character) : ""}
            </span>
          );
        })}
      </div>

      <footer className="mosaic-dab__footer">
        <p aria-live="polite">
          {complete
            ? "Every glyph has been dabbed into place. The mosaic is no more useful than the sentence."
            : characters.length === 0
              ? "An empty label offers no surface for the brush."
              : "Drag the brush across the empty cells; each dab files the next glyph."}
        </p>
        <button
          className="mosaic-dab__reset"
          disabled={current.placements.length === 0}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Erase mosaic
        </button>
      </footer>
    </section>
  );
}
