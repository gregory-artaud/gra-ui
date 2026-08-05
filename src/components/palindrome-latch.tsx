import * as React from "react";

export interface PalindromeLatchProps {
  children: React.ReactNode;
}

interface PalindromeLatchState {
  signature: string;
  sequence: number[];
}

function signatureForItems(items: readonly React.ReactNode[]) {
  return items
    .map((item, index) => {
      if (React.isValidElement(item)) {
        const element = item as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${typeof element.type}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof item}:${String(item)}`;
    })
    .join("|");
}

function createState(signature: string): PalindromeLatchState {
  return { sequence: [], signature };
}

function palindromeFor(length: number) {
  const ascending = Array.from({ length }, (_, index) => index);
  return [...ascending, ...ascending.slice(0, -1).reverse()];
}

export function PalindromeLatch({ children }: PalindromeLatchProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForItems(items);
  const [state, setState] = React.useState<PalindromeLatchState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const pattern = palindromeFor(items.length);
  const expected = pattern[current.sequence.length];
  const isLatched = pattern.length > 0 && current.sequence.length === pattern.length;

  const choose = (index: number) => {
    if (isLatched) {
      return;
    }

    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      const nextExpected = pattern[baseline.sequence.length];

      return nextExpected === index
        ? { signature, sequence: [...baseline.sequence, index] }
        : { signature, sequence: [] };
    });
  };

  return (
    <section
      aria-label="Latch the children by activating them in a palindrome"
      className="gra-ui palindrome-latch"
      data-progress={current.sequence.length}
      data-state={isLatched ? "latched" : current.sequence.length > 0 ? "latching" : "ready"}
    >
      <header className="palindrome-latch__header">
        <span>Palindrome latch</span>
        <output aria-live="polite">
          {items.length === 0 ? "No pieces" : `${current.sequence.length} / ${pattern.length} clicks`}
        </output>
      </header>

      <div className="palindrome-latch__tray" aria-live="polite" aria-label="Latch sequence">
        {current.sequence.length > 0 ? (
          current.sequence.map((index, sequenceIndex) => (
            <span className="palindrome-latch__token" key={`${signature}-${sequenceIndex}`}>
              {items[index]}
            </span>
          ))
        ) : (
          <span className="palindrome-latch__empty">The latch is waiting for its first side.</span>
        )}
      </div>

      <div className="palindrome-latch__pieces" aria-label="Pieces to activate">
        {items.length > 0 ? (
          items.map((item, index) => (
            <button
              aria-label={`Activate piece ${index + 1}`}
              aria-pressed={current.sequence.includes(index)}
              className="palindrome-latch__piece"
              data-expected={expected === index ? "true" : "false"}
              data-used={current.sequence.includes(index) ? "true" : "false"}
              disabled={isLatched}
              key={`${signature}-piece-${index}`}
              onClick={() => choose(index)}
              type="button"
            >
              {item}
            </button>
          ))
        ) : (
          <span className="palindrome-latch__empty">Add pieces to create a latch.</span>
        )}
      </div>

      <div className="palindrome-latch__footer">
        <p aria-live="polite">
          {isLatched
            ? "The sequence reads the same from both ends. The latch is sealed."
            : current.sequence.length === 0
              ? "Choose the first piece, then mirror the route back to it."
              : "Keep mirroring the route. One wrong piece clears the latch."}
        </p>
        <button
          className="palindrome-latch__reset"
          disabled={current.sequence.length === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Clear sequence
        </button>
      </div>
    </section>
  );
}
