import * as React from "react";

const ROUTE = ["east", "south", "west", "north"] as const;

type Direction = (typeof ROUTE)[number];

const DIRECTIONS: readonly { id: Direction; symbol: string; label: string }[] = [
  { id: "north", symbol: "↑", label: "North" },
  { id: "east", symbol: "→", label: "East" },
  { id: "south", symbol: "↓", label: "South" },
  { id: "west", symbol: "←", label: "West" },
];

export interface VectorRitualProps {
  children: React.ReactNode;
}

export function VectorRitual({ children }: VectorRitualProps) {
  const [state, setState] = React.useState({ progress: 0, wrong: false });
  const complete = state.progress === ROUTE.length;
  const step = complete ? 0 : state.progress;
  const position = [
    { x: 50, y: 50 },
    { x: 76, y: 50 },
    { x: 76, y: 76 },
    { x: 24, y: 76 },
  ][step];

  const move = (direction: Direction) => {
    setState((previous) => {
      const expected = ROUTE[previous.progress];
      if (direction !== expected) return { progress: 0, wrong: true };
      return { progress: previous.progress + 1, wrong: false };
    });
  };

  return (
    <section
      aria-label="Complete a directional ritual in the prescribed order"
      className="gra-ui vector-ritual"
      data-complete={complete}
      data-wrong={state.wrong}
    >
      <header className="vector-ritual__header">
        <span>Vector ritual</span>
        <output aria-live="polite">{complete ? "Route closed" : `${state.progress} / ${ROUTE.length} turns`}</output>
      </header>

      <div className="vector-ritual__board" aria-live="polite">
        <div className="vector-ritual__route" aria-hidden="true">
          {ROUTE.map((direction, index) => <span data-active={index < state.progress} key={direction}>{DIRECTIONS.find((item) => item.id === direction)?.symbol}</span>)}
        </div>
        <div className="vector-ritual__cargo" style={{ left: `${position.x}%`, top: `${position.y}%` }}>{children}</div>
      </div>

      <div aria-label="Directional ritual controls" className="vector-ritual__controls">
        {DIRECTIONS.map((direction) => (
          <button disabled={complete} key={direction.id} onClick={() => move(direction.id)} type="button">
            <span aria-hidden="true">{direction.symbol}</span>
            {direction.label}
          </button>
        ))}
      </div>

      <footer className="vector-ritual__footer">
        <p>{state.wrong ? "That vector broke the ritual. The cargo returned to its origin." : complete ? "The cargo completed its four-sided pilgrimage." : `Next vector: ${DIRECTIONS.find((item) => item.id === ROUTE[state.progress])?.label}.`}</p>
        <button className="vector-ritual__reset" disabled={state.progress === 0 && !state.wrong} onClick={() => setState({ progress: 0, wrong: false })} type="button">
          Reset vectors
        </button>
      </footer>
    </section>
  );
}
