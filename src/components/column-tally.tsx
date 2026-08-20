import * as React from "react";

const MAX_COLUMNS = 4;

export interface ColumnTallyProps {
  children: React.ReactNode;
}

export function ColumnTally({ children }: ColumnTallyProps) {
  const childCount = React.Children.count(children);
  const [columns, setColumns] = React.useState(1);
  const targetColumns = Math.min(MAX_COLUMNS, Math.max(1, childCount));
  const currentColumns = Math.min(columns, targetColumns);
  const complete = currentColumns === targetColumns;

  return (
    <section
      aria-label="Add unnecessary columns to a group of content"
      className="gra-ui column-tally"
      data-columns={currentColumns}
      data-state={complete ? "complete" : "counting"}
    >
      <header className="column-tally__header">
        <span>Column tally</span>
        <output aria-live="polite">
          {currentColumns} / {targetColumns} columns
        </output>
      </header>

      <div
        className="column-tally__grid"
        style={{ "--column-count": currentColumns } as React.CSSProperties}
      >
        {React.Children.map(children, (child, index) => (
          <div className="column-tally__cell" key={index}>
            <span className="column-tally__index">0{index + 1}</span>
            {child}
          </div>
        ))}
      </div>

      <footer className="column-tally__footer">
        <p aria-live="polite">
          {complete
            ? "The children have reached their final column allocation. Nothing was optimized."
            : "Award one more column and make the grid rearrange itself."}
        </p>
        <div className="column-tally__actions">
          <button
            disabled={complete}
            onClick={() => setColumns((current) => Math.min(MAX_COLUMNS, current + 1))}
            type="button"
          >
            Award a column
          </button>
          <button
            className="column-tally__reset"
            disabled={currentColumns === 1}
            onClick={() => setColumns(1)}
            type="button"
          >
            Return to one
          </button>
        </div>
      </footer>
    </section>
  );
}
