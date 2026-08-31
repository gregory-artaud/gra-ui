import * as React from "react";

type SwipeDirection = "left" | "right" | null;

function wordsFromLabel(label: string) {
  return label.trim().split(/\s+/).filter(Boolean);
}

function rotateWords(words: string[], offset: number) {
  if (words.length < 2) return words;
  const normalized = ((offset % words.length) + words.length) % words.length;
  return [...words.slice(normalized), ...words.slice(0, normalized)];
}

export interface SwipeShuntProps {
  label: string;
}

export function SwipeShunt({ label }: SwipeShuntProps) {
  const [state, setState] = React.useState({ direction: null as SwipeDirection, offset: 0, startX: null as number | null, dragX: 0, moves: 0 });
  const words = wordsFromLabel(label);
  const displayedWords = rotateWords(words, state.offset);

  const shunt = (direction: Exclude<SwipeDirection, null>) => {
    setState((previous) => ({
      ...previous,
      direction,
      offset: previous.offset + (direction === "left" ? 1 : -1),
      moves: previous.moves + 1,
      dragX: 0,
      startX: null,
    }));
  };

  const finishSwipe = (clientX: number) => {
    setState((previous) => {
      if (previous.startX === null) return previous;
      const distance = clientX - previous.startX;
      if (Math.abs(distance) < 36) return { ...previous, startX: null, dragX: 0 };
      return {
        ...previous,
        direction: distance < 0 ? "left" : "right",
        offset: previous.offset + (distance < 0 ? 1 : -1),
        moves: previous.moves + 1,
        startX: null,
        dragX: 0,
      };
    });
  };

  return (
    <section aria-label="Shunt the words with a swipe" className="gra-ui swipe-shunt" data-direction={state.direction ?? "idle"}>
      <header className="swipe-shunt__header">
        <span>Swipe shunt</span>
        <output aria-live="polite">{state.moves === 0 ? "Undisturbed" : `${state.moves} shunt${state.moves === 1 ? "" : "s"}`}</output>
      </header>

      <div
        aria-label="Swipe surface for the label"
        className="swipe-shunt__surface"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            shunt(event.key === "ArrowLeft" ? "left" : "right");
          }
        }}
        onPointerCancel={() => setState((previous) => ({ ...previous, startX: null, dragX: 0 }))}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setState((previous) => ({ ...previous, startX: event.clientX, dragX: 0 }));
        }}
        onPointerMove={(event) => {
          setState((previous) => previous.startX === null ? previous : ({ ...previous, dragX: event.clientX - previous.startX }));
        }}
        onPointerUp={(event) => finishSwipe(event.clientX)}
        role="group"
        style={{ "--swipe-offset": `${state.dragX}px` } as React.CSSProperties}
        tabIndex={0}
      >
        <span className="swipe-shunt__caption">Current word order</span>
        <p className="swipe-shunt__label" aria-live="polite">
          {displayedWords.length === 0 ? "The empty label has nothing to shunt." : displayedWords.map((word, index) => (
            <span className="swipe-shunt__word" key={`${state.moves}-${word}-${index}`}>{word}</span>
          ))}
        </p>
        <small className="swipe-shunt__hint">Swipe left or right · Arrow keys also count</small>
      </div>

      <footer className="swipe-shunt__footer">
        <p>{state.direction ? `The ${state.direction === "left" ? "front" : "final"} word has been shunted across the sentence.` : "Move one word to the opposite end for no editorial gain."}</p>
        <button className="swipe-shunt__reset" disabled={state.moves === 0} onClick={() => setState({ direction: null, offset: 0, startX: null, dragX: 0, moves: 0 })} type="button">
          Restore order
        </button>
      </footer>
    </section>
  );
}
