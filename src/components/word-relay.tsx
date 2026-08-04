import * as React from "react";

export interface WordRelayProps {
  label: string;
}

interface WordRelayState {
  signature: string;
  words: string[];
  rounds: number;
}

type WordRelayAction =
  | { type: "relay"; signature: string; words: string[] }
  | { type: "reset"; signature: string; words: string[] };

function wordsFromLabel(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  return words.length > 0 ? words : [""];
}

function relayWords(words: readonly string[]) {
  if (words.length < 2) {
    return [...words];
  }

  const nextWords = words.map(() => "");

  words.forEach((word, index) => {
    const letters = Array.from(word);
    const lastLetter = letters.pop();

    nextWords[index] = letters.join("");

    if (lastLetter) {
      const nextIndex = (index + 1) % words.length;
      nextWords[nextIndex] = `${lastLetter}${nextWords[nextIndex]}`;
    }
  });

  return nextWords;
}

function createWordRelayState(label: string): WordRelayState {
  return { signature: label, words: wordsFromLabel(label), rounds: 0 };
}

function wordRelayReducer(
  state: WordRelayState,
  action: WordRelayAction,
): WordRelayState {
  if (action.type === "reset") {
    return { signature: action.signature, words: action.words, rounds: 0 };
  }

  return {
    signature: action.signature,
    words: action.words,
    rounds: state.signature === action.signature ? state.rounds + 1 : 1,
  };
}

export function WordRelay({ label }: WordRelayProps) {
  const [state, dispatch] = React.useReducer(
    wordRelayReducer,
    label,
    createWordRelayState,
  );
  const current = state.signature === label ? state : createWordRelayState(label);
  const canRelay = current.words.length > 1 && current.words.some(Boolean);

  const relay = () => {
    if (!canRelay) {
      return;
    }

    dispatch({
      type: "relay",
      signature: label,
      words: relayWords(current.words),
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
      signature: label,
      words: wordsFromLabel(label),
    });
  };

  return (
    <section className="gra-ui word-relay" data-rounds={current.rounds}>
      <header className="word-relay__header">
        <span>Word relay</span>
        <strong>{current.rounds === 0 ? "Original" : `Round ${current.rounds}`}</strong>
      </header>

      <ol className="word-relay__words" aria-label="Transformed words" aria-live="polite">
        {current.words.map((word, index) => (
          <li className="word-relay__word" key={`${index}-${current.rounds}`}>
            {word || "·"}
          </li>
        ))}
      </ol>

      <button className="word-relay__control" type="button" disabled={!canRelay} onClick={relay}>
        Pass the last letters
      </button>

      <p className="word-relay__status">
        {!canRelay
          ? "Use at least two words to start the relay."
          : current.rounds === 0
            ? "Every word is waiting for a handoff."
            : "Each word has handed its last letter to the next one."}
      </p>

      <button className="word-relay__reset" type="button" disabled={current.rounds === 0} onClick={reset}>
        Return the letters
      </button>
    </section>
  );
}
