import * as React from "react";

type SortMandateMode = "original" | "opening" | "vowels" | "ending";

export interface SortMandateProps {
  items: readonly string[];
}

interface SortMandateState {
  signature: string;
  mode: SortMandateMode;
}

function createState(signature: string): SortMandateState {
  return { signature, mode: "original" };
}

function vowelCount(value: string) {
  return Array.from(value).filter((character) => "aeiouy".includes(character.toLowerCase())).length;
}

function mandatedItems(items: readonly string[], mode: SortMandateMode) {
  if (mode === "original") {
    return items;
  }

  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftValue = mode === "opening"
        ? left.item.trim().toLocaleLowerCase().charCodeAt(0) || 0
        : mode === "ending"
          ? left.item.trim().toLocaleLowerCase().charCodeAt(left.item.trim().length - 1) || 0
          : vowelCount(left.item);
      const rightValue = mode === "opening"
        ? right.item.trim().toLocaleLowerCase().charCodeAt(0) || 0
        : mode === "ending"
          ? right.item.trim().toLocaleLowerCase().charCodeAt(right.item.trim().length - 1) || 0
          : vowelCount(right.item);

      if (leftValue !== rightValue) {
        return mode === "vowels" ? rightValue - leftValue : leftValue - rightValue;
      }

      return left.index - right.index;
    })
    .map(({ item }) => item);
}

export function SortMandate({ items }: SortMandateProps) {
  const signature = items.join("\u241f");
  const [state, setState] = React.useState<SortMandateState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const displayedItems = mandatedItems(items, current.mode);

  const choose = (mode: Exclude<SortMandateMode, "original">) => {
    setState({ signature, mode });
  };

  return (
    <section aria-label="Sort mandate" className="gra-ui sort-mandate" data-mode={current.mode}>
      <div className="sort-mandate__header">
        <span>Roster under review</span>
        <output aria-live="polite">
          {current.mode === "original" ? "No mandate" : `Mandate: ${current.mode}`}
        </output>
      </div>

      <ol className="sort-mandate__roster">
        {displayedItems.map((item, index) => (
          <li className="sort-mandate__item" key={`${current.mode}-${item}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </li>
        ))}
      </ol>

      <div aria-label="Sorting mandates" className="sort-mandate__choices" role="group">
        <button
          aria-pressed={current.mode === "opening"}
          onClick={() => choose("opening")}
          type="button"
        >
          First letter
        </button>
        <button
          aria-pressed={current.mode === "vowels"}
          onClick={() => choose("vowels")}
          type="button"
        >
          Most vowels
        </button>
        <button
          aria-pressed={current.mode === "ending"}
          onClick={() => choose("ending")}
          type="button"
        >
          Last letter
        </button>
        <button
          className="sort-mandate__reset"
          disabled={current.mode === "original"}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Withdraw
        </button>
      </div>
    </section>
  );
}
