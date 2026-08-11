import * as React from "react";

export interface ReverseQueueProps {
  children: React.ReactNode;
}

interface ReverseQueueState {
  claimed: number[];
  wrong: number | null;
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

function createState(signature: string): ReverseQueueState {
  return { claimed: [], wrong: null, signature };
}

export function ReverseQueue({ children }: ReverseQueueProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<ReverseQueueState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const expected = items.length - current.claimed.length - 1;
  const isComplete = items.length > 0 && current.claimed.length === items.length;

  const boardItem = (index: number) => (
    <button
      aria-label={`Board item ${index + 1}${index === expected ? ", next in reverse order" : ""}`}
      className="reverse-queue__item"
      data-wrong={current.wrong === index}
      onClick={() => {
        if (isComplete) {
          return;
        }

        if (index !== expected) {
          setState({ claimed: current.claimed, wrong: index, signature });
          return;
        }

        setState({ claimed: [...current.claimed, index], wrong: null, signature });
      }}
      type="button"
    >
      <span className="reverse-queue__number">{index + 1}</span>
      {items[index]}
    </button>
  );

  return (
    <section
      aria-label="Board children from the last one to the first"
      className="gra-ui reverse-queue"
      data-state={isComplete ? "complete" : current.wrong === null ? "ready" : "wrong"}
    >
      <header className="reverse-queue__header">
        <span>Reverse queue</span>
        <output aria-live="polite">{current.claimed.length} / {items.length} boarded</output>
      </header>

      <div className="reverse-queue__manifest" aria-live="polite" aria-label="Boarded in reverse order">
        {current.claimed.length > 0 ? (
          current.claimed.map((index) => (
            <div className="reverse-queue__manifest-item" key={`${signature}-${index}`}>
              <span>{current.claimed.indexOf(index) + 1}</span>
              {items[index]}
            </div>
          ))
        ) : (
          <span className="reverse-queue__empty">The manifest is waiting for the last item first.</span>
        )}
      </div>

      <div className="reverse-queue__board" aria-label="Items waiting to board">
        {items.map((_, index) => (current.claimed.includes(index) ? null : boardItem(index)))}
      </div>

      <footer className="reverse-queue__footer">
        <p aria-live="polite">
          {items.length === 0
            ? "Give the queue at least one child."
            : isComplete
              ? "Every item boarded backwards. The order is now exactly less useful."
              : current.wrong !== null
                ? "That item was not last. Try the remaining items again."
                : `Board item ${expected + 1} next, because queues apparently run backwards.`}
        </p>
        <button
          className="reverse-queue__reset"
          disabled={current.claimed.length === 0 && current.wrong === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Empty the queue
        </button>
      </footer>
    </section>
  );
}
