import * as React from "react";

function isKnightMove(from: number, to: number, columns: number) {
  const fromRow = Math.floor(from / columns);
  const fromColumn = from % columns;
  const toRow = Math.floor(to / columns);
  const toColumn = to % columns;
  const rowDistance = Math.abs(fromRow - toRow);
  const columnDistance = Math.abs(fromColumn - toColumn);
  return rowDistance * columnDistance === 2;
}

export interface KnightTourProps {
  children: React.ReactNode;
}

export function KnightTour({ children }: KnightTourProps) {
  const cells = React.Children.toArray(children);
  const columns = Math.max(1, Math.ceil(Math.sqrt(cells.length)));
  const [state, setState] = React.useState({ count: cells.length, path: [] as number[], rejected: null as number | null });
  const path = state.count === cells.length ? state.path : [];
  const complete = cells.length > 0 && path.length === cells.length;

  const choose = (index: number) => {
    const valid = !path.includes(index) && (path.length === 0 || isKnightMove(path[path.length - 1], index, columns));
    if (!valid) {
      setState({ count: cells.length, path, rejected: index });
      return;
    }
    setState({ count: cells.length, path: [...path, index], rejected: null });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(index);
    }
  };

  return (
    <section aria-label="Walk the content by knight moves" className="gra-ui knight-tour" data-complete={complete}>
      <header className="knight-tour__header">
        <span>Knight tour</span>
        <output aria-live="polite">{complete ? "Tour complete" : `${path.length} / ${cells.length} visited`}</output>
      </header>

      <div
        aria-label="Knight tour board"
        className="knight-tour__board"
        role="grid"
        style={{ "--knight-columns": columns } as React.CSSProperties}
      >
        {cells.map((child, index) => {
          const visit = path.indexOf(index);
          return (
            <div
              aria-label={`Visit cell ${index + 1}${visit >= 0 ? `, move ${visit + 1}` : ""}`}
              className="knight-tour__cell"
              data-rejected={state.rejected === index}
              data-visited={visit >= 0}
              key={`${index}-${cells.length}`}
              onClick={() => choose(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="gridcell"
              tabIndex={0}
            >
              <span className="knight-tour__number">{visit >= 0 ? visit + 1 : index + 1}</span>
              <div>{child}</div>
            </div>
          );
        })}
        {!cells.length ? <p className="knight-tour__empty">A tour needs at least one cell.</p> : null}
      </div>

      <footer className="knight-tour__footer">
        <p>{complete ? "The content has completed an L-shaped pilgrimage." : state.rejected !== null ? "That cell is not a legal knight move." : "Choose any first cell, then keep moving in Ls."}</p>
        <button className="knight-tour__reset" disabled={path.length === 0} onClick={() => setState({ count: cells.length, path: [], rejected: null })} type="button">
          Restart tour
        </button>
      </footer>
    </section>
  );
}
