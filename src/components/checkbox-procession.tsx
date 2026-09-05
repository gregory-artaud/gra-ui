import * as React from "react";

interface CheckboxProcessionState {
  signature: string;
  accepted: number[];
  wrong: number | null;
}

export interface CheckboxProcessionProps {
  items: readonly string[];
}

function signatureForItems(items: readonly string[]) {
  return items.join("\u0000");
}

function filingOrder(items: readonly string[]) {
  return items
    .map((item, index) => ({ item, index, score: Array.from(item.trim().toLowerCase())[0]?.charCodeAt(0) ?? 0 }))
    .sort((left, right) => left.score - right.score || left.index - right.index)
    .map(({ index }) => index);
}

function createState(signature: string): CheckboxProcessionState {
  return { signature, accepted: [], wrong: null };
}

export function CheckboxProcession({ items }: CheckboxProcessionProps) {
  const signature = signatureForItems(items);
  const order = filingOrder(items);
  const [state, setState] = React.useState<CheckboxProcessionState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const complete = current.accepted.length === items.length && items.length > 0;
  const next = order[current.accepted.length];

  const toggle = (index: number) => {
    if (complete) {
      return;
    }

    if (index !== next) {
      setState({ ...current, wrong: index });
      return;
    }

    setState({ signature, accepted: [...current.accepted, index], wrong: null });
  };

  return (
    <section
      aria-label="Complete a checkbox filing procession"
      className="gra-ui checkbox-procession"
      data-state={complete ? "complete" : current.wrong === null ? "waiting" : "wrong"}
    >
      <header className="checkbox-procession__header">
        <span>Checkbox procession</span>
        <output aria-live="polite">{current.accepted.length} / {items.length} filed</output>
      </header>

      <div className="checkbox-procession__hint" aria-live="polite">
        {complete ? "Every box has been filed." : next === undefined ? "Nothing can be filed." : <>Next: <strong>{items[next]}</strong></>}
      </div>

      <fieldset className="checkbox-procession__list">
        <legend>File these labels in their hidden alphabetical order</legend>
        {items.map((item, index) => {
          const accepted = current.accepted.includes(index);
          return (
            <label className="checkbox-procession__item" data-wrong={current.wrong === index ? "true" : "false"} key={`${signature}-${index}`}>
              <input checked={accepted} disabled={complete || accepted} onChange={() => toggle(index)} type="checkbox" />
              <span>{item}</span>
              {accepted ? <small>filed {current.accepted.indexOf(index) + 1}</small> : null}
            </label>
          );
        })}
      </fieldset>

      <footer className="checkbox-procession__footer">
        <p aria-live="polite">
          {complete
            ? "The labels are checked. The order was the only new information."
            : current.wrong !== null
              ? "That checkbox was premature. The procession remains in place."
              : "Check the named next label; an ordinary checklist would have been sufficient."}
        </p>
        <button
          className="checkbox-procession__reset"
          disabled={current.accepted.length === 0 && current.wrong === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Empty procession
        </button>
      </footer>
    </section>
  );
}
