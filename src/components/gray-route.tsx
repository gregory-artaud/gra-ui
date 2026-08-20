import * as React from "react";

export interface GrayRouteProps {
  children: React.ReactNode;
}

interface GrayRouteState {
  signature: string;
  visited: number[];
  wrong: number | null;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function routeFor(count: number) {
  return Array.from({ length: count }, (_, index) => index)
    .sort((left, right) => {
      const leftCode = left ^ (left >> 1);
      const rightCode = right ^ (right >> 1);
      return leftCode - rightCode;
    });
}

function createState(signature: string): GrayRouteState {
  return { signature, visited: [], wrong: null };
}

export function GrayRoute({ children }: GrayRouteProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForChildren(children);
  const route = routeFor(items.length);
  const [state, setState] = React.useState<GrayRouteState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const complete = items.length > 0 && current.visited.length === items.length;
  const expected = route[current.visited.length];

  const choose = (index: number) => {
    if (complete) {
      return;
    }

    if (index !== expected) {
      setState({ ...current, wrong: index });
      return;
    }

    setState({
      signature,
      visited: [...current.visited, index],
      wrong: null,
    });
  };

  return (
    <section
      aria-label="Visit content in a Gray code route"
      className="gra-ui gray-route"
      data-state={complete ? "complete" : current.visited.length > 0 ? "routing" : "ready"}
    >
      <header className="gray-route__header">
        <span>Gray route</span>
        <output aria-live="polite">
          {items.length === 0 ? "No stations" : `${current.visited.length} / ${items.length} visited`}
        </output>
      </header>

      <div aria-live="polite" className="gray-route__manifest">
        {current.visited.length === 0 ? (
          <span className="gray-route__empty">The route is waiting for its first bit.</span>
        ) : (
          current.visited.map((index, position) => (
            <span className="gray-route__visited" key={`${signature}-${index}`}>
              <b>0{position + 1}</b>
              {items[index]}
            </span>
          ))
        )}
      </div>

      <div aria-label="Route stations" className="gray-route__stations">
        {items.map((item, index) => {
          const visited = current.visited.includes(index);
          return (
            <button
              className="gray-route__station"
              data-visited={visited}
              data-wrong={current.wrong === index}
              disabled={visited || complete}
              key={`${signature}-${index}`}
              onClick={() => choose(index)}
              type="button"
            >
              <span>Station {index + 1}</span>
              <strong>{item}</strong>
              <small>{visited ? "logged" : "awaiting route"}</small>
            </button>
          );
        })}
      </div>

      <footer className="gray-route__footer">
        <p aria-live="polite">
          {complete
            ? "Every station was visited in bitwise order. The route has no destination."
            : current.wrong !== null
              ? "That station changes too many bits. Return to the highlighted route."
              : `Choose station ${(expected ?? 0) + 1}; the next Gray code step is mandatory.`}
        </p>
        <button
          className="gray-route__reset"
          disabled={current.visited.length === 0 && current.wrong === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Reset route
        </button>
      </footer>
    </section>
  );
}
