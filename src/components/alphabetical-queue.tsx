import * as React from "react";

export interface AlphabeticalQueueProps {
  items: readonly string[];
}

interface AlphabeticalQueueState {
  picked: number[];
  signature: string;
  wrong: number | null;
}

function signatureForItems(items: readonly string[]) {
  return items.join("\u0000");
}

function createState(signature: string): AlphabeticalQueueState {
  return { picked: [], signature, wrong: null };
}

function orderFor(items: readonly string[]) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const a = left.item.toLocaleLowerCase();
      const b = right.item.toLocaleLowerCase();
      return a < b ? -1 : a > b ? 1 : left.index - right.index;
    })
    .map(({ index }) => index);
}

export function AlphabeticalQueue({ items }: AlphabeticalQueueProps) {
  const signature = signatureForItems(items);
  const order = orderFor(items);
  const [state, setState] = React.useState<AlphabeticalQueueState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const complete = current.picked.length === items.length && items.length > 0;
  const expected = order[current.picked.length];

  const choose = (index: number) => {
    if (complete) {
      return;
    }

    if (index !== expected) {
      setState({ ...current, wrong: index });
      return;
    }

    setState({ signature, picked: [...current.picked, index], wrong: null });
  };

  return (
    <section
      aria-label="Queue labels in alphabetical order"
      className="gra-ui alphabetical-queue"
      data-state={complete ? "complete" : current.wrong === null ? "waiting" : "wrong"}
    >
      <header className="alphabetical-queue__header">
        <span>Alphabetical queue</span>
        <output aria-live="polite">{current.picked.length} / {items.length} queued</output>
      </header>

      <div className="alphabetical-queue__manifest" aria-live="polite">
        {current.picked.length === 0 ? <span className="alphabetical-queue__empty">The manifest is waiting for A.</span> : null}
        <ol>
          {current.picked.map((index, position) => <li key={`${signature}-${index}`}><b>{position + 1}</b>{items[index]}</li>)}
        </ol>
      </div>

      <div className="alphabetical-queue__choices" aria-label="Available labels">
        {items.map((item, index) => {
          const picked = current.picked.includes(index);
          return (
            <button
              className="alphabetical-queue__choice"
              data-picked={picked ? "true" : "false"}
              data-wrong={current.wrong === index ? "true" : "false"}
              disabled={picked || complete}
              key={`${signature}-${index}`}
              onClick={() => choose(index)}
              type="button"
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="alphabetical-queue__footer">
        <p aria-live="polite">
          {complete
            ? "The labels are alphabetized. The queue has no operational purpose."
            : current.wrong !== null
              ? "That label jumped the queue. Try the earliest remaining letter."
              : "Choose the next label alphabetically. Efficiency is being monitored."}
        </p>
        <button
          className="alphabetical-queue__reset"
          disabled={current.picked.length === 0 && current.wrong === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Empty queue
        </button>
      </div>
    </section>
  );
}
