import * as React from "react";

function makeRoute(length: number) {
  const firstPass = Array.from({ length }, (_, index) => index);
  return [...firstPass, ...firstPass.slice(1), ...firstPass.slice(0, 1)];
}

export interface CyclicPassageProps {
  children: React.ReactNode;
}

export function CyclicPassage({ children }: CyclicPassageProps) {
  const items = React.Children.toArray(children);
  const route = makeRoute(items.length);
  const [state, setState] = React.useState({ sourceLength: items.length, path: [] as number[], rejected: null as number | null });
  const path = state.sourceLength === items.length ? state.path : [];
  const expected = route[path.length];
  const complete = route.length > 0 && path.length === route.length;

  const visit = (index: number) => {
    if (index !== expected) {
      setState({ sourceLength: items.length, path, rejected: index });
      return;
    }
    setState({ sourceLength: items.length, path: [...path, index], rejected: null });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      visit(index);
    }
  };

  return (
    <section aria-label="Pass through content in a cyclic order" className="gra-ui cyclic-passage" data-complete={complete}>
      <header className="cyclic-passage__header">
        <span>Cyclic passage</span>
        <output aria-live="polite">{path.length} / {route.length} visits</output>
      </header>

      <div className="cyclic-passage__stations" aria-label="Passage stations">
        {items.map((item, index) => {
          const visits = path.filter((visited) => visited === index).length;
          return (
            <button
              aria-label={`Visit station ${index + 1}${expected === index ? ", expected now" : ""}`}
              className="cyclic-passage__station"
              data-rejected={state.rejected === index}
              data-visits={visits}
              key={`${index}-${items.length}`}
              onClick={() => visit(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              type="button"
            >
              <span className="cyclic-passage__number">0{index + 1}</span>
              <span>{item}</span>
              <small>{visits ? `${visits} pass${visits === 1 ? "" : "es"}` : "not passed"}</small>
            </button>
          );
        })}
        {!items.length ? <p className="cyclic-passage__empty">No stations were submitted.</p> : null}
      </div>

      <div className="cyclic-passage__manifest" aria-live="polite">
        <span className="cyclic-passage__caption">The manifest remembers the route</span>
        <div>{path.length ? path.map((index, visitIndex) => <span key={`${visitIndex}-${index}`}>{index + 1}</span>) : <i>Awaiting the first passage</i>}</div>
      </div>

      <footer className="cyclic-passage__footer">
        <p>{complete ? "The route completed a second lap from a different starting point." : state.rejected !== null ? "That station was not next; the route remains waiting." : "Pass left to right, then begin again from station two."}</p>
        <button className="cyclic-passage__reset" disabled={!path.length} onClick={() => setState({ sourceLength: items.length, path: [], rejected: null })} type="button">
          Restart passage
        </button>
      </footer>
    </section>
  );
}
