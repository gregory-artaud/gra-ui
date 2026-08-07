import * as React from "react";

export interface NeighborMarchProps {
  children: React.ReactNode;
}

type NeighborMarchStatus = "ready" | "marching" | "complete" | "wrong";

interface NeighborMarchState {
  signature: string;
  route: number[];
  status: NeighborMarchStatus;
}

function createSignature(items: readonly React.ReactNode[]) {
  return items
    .map((item, index) => {
      if (React.isValidElement(item)) {
        const element = item as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(item)}`;
    })
    .join("|");
}

function createState(signature: string): NeighborMarchState {
  return { signature, route: [], status: "ready" };
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function NeighborMarch({ children }: NeighborMarchProps) {
  const items = React.Children.toArray(children);
  const signature = createSignature(items);
  const [state, setState] = React.useState<NeighborMarchState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const currentIndex = current.route.at(-1) ?? null;
  const isComplete = current.status === "complete";

  const choose = (index: number) => {
    if (isComplete) {
      return;
    }

    const isFirstStep = current.route.length === 0;
    const isNeighbor = currentIndex !== null && Math.abs(index - currentIndex) === 1;
    const isNew = !current.route.includes(index);

    if ((!isFirstStep && !isNeighbor) || !isNew) {
      setState({ signature, route: [], status: "wrong" });
      return;
    }

    const route = [...current.route, index];
    setState({
      signature,
      route,
      status: route.length === items.length ? "complete" : "marching",
    });
  };

  return (
    <section
      aria-label="Choose every piece by walking to an adjacent neighbor"
      className="gra-ui neighbor-march"
      data-position={currentIndex ?? "start"}
      data-state={current.status}
    >
      <header className="neighbor-march__header">
        <span>Neighbor march</span>
        <output aria-live="polite">{current.route.length} / {items.length} visited</output>
      </header>

      <ol className="neighbor-march__row" aria-label="Adjacent pieces">
        {items.map((item, index) => {
          const visitedIndex = current.route.indexOf(index);
          const isCurrent = currentIndex === index;
          return (
            <li className="neighbor-march__piece" data-current={isCurrent ? "true" : "false"} data-visited={visitedIndex >= 0 ? "true" : "false"} key={`${signature}-${index}`}>
              <button
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Piece ${index + 1}${visitedIndex >= 0 ? `, step ${visitedIndex + 1}` : ""}`}
                className="neighbor-march__button"
                disabled={isComplete}
                onClick={() => choose(index)}
                onKeyDown={(event) => {
                  if (isActivationKey(event.key)) {
                    event.preventDefault();
                    choose(index);
                  }
                }}
                type="button"
              >
                <span className="neighbor-march__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="neighbor-march__label">{item}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="neighbor-march__footer">
        <p aria-live="polite">
          {isComplete
            ? "Every piece was visited by its immediate neighbor. The route is complete."
            : current.status === "wrong"
              ? "That jump was not adjacent. The march has returned to its first step."
              : current.route.length === 0
                ? "Start anywhere, then move only one piece left or right at a time."
                : "Choose the next untouched neighbor. Long-distance efficiency is forbidden."}
        </p>
        <button
          className="neighbor-march__reset"
          disabled={current.route.length === 0 && current.status !== "wrong"}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Reset route
        </button>
      </div>
    </section>
  );
}
