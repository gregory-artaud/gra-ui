import * as React from "react";

export interface CellularDriftProps {
  children: React.ReactNode;
}

interface CellularDriftState {
  cell: number;
  signature: string;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): CellularDriftState {
  return { cell: 4, signature };
}

export function CellularDrift({ children }: CellularDriftProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<CellularDriftState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const row = Math.floor(current.cell / 3) + 1;
  const column = (current.cell % 3) + 1;

  return (
    <section
      aria-label="Place content in one cell of a nine-cell drift board"
      className="gra-ui cellular-drift"
      data-cell={current.cell + 1}
    >
      <header className="cellular-drift__header">
        <span>Cellular drift</span>
        <output aria-live="polite">Cell {current.cell + 1} / 9</output>
      </header>

      <div className="cellular-drift__board">
        {Array.from({ length: 9 }, (_, index) => (
          <div className="cellular-drift__cell" data-active={index === current.cell} key={index}>
            <button
              aria-label={`Place content in cell ${index + 1}`}
              aria-pressed={index === current.cell}
              onClick={() => setState({ cell: index, signature })}
              type="button"
            >
              {index + 1}
            </button>
          </div>
        ))}
        <div
          aria-live="polite"
          className="cellular-drift__cargo"
          style={{ "--drift-column": column, "--drift-row": row } as React.CSSProperties}
        >
          {children}
        </div>
      </div>

      <footer className="cellular-drift__footer">
        <p>Click any cell. The content will obey the grid instead of normal layout.</p>
        <button
          className="cellular-drift__reset"
          disabled={current.cell === 4}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Return to the middle
        </button>
      </footer>
    </section>
  );
}
