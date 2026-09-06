import * as React from "react";

const PRIME_LIMITS = [0, 5, 11, 17] as const;

export interface PrimeRevealProps {
  label: string;
}

interface PrimeRevealState {
  label: string;
  stage: number;
}

function createState(label: string): PrimeRevealState {
  return { label, stage: 0 };
}

function isPrime(position: number) {
  if (position < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= position; divisor += 1) {
    if (position % divisor === 0) {
      return false;
    }
  }

  return true;
}

function isVisible(position: number, stage: number) {
  if (stage === PRIME_LIMITS.length) {
    return true;
  }

  return stage > 0 && (position === 1 || (position <= PRIME_LIMITS[stage - 1] && isPrime(position)));
}

export function PrimeReveal({ label }: PrimeRevealProps) {
  const [state, setState] = React.useState<PrimeRevealState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const characters = Array.from(label);
  const complete = current.stage === PRIME_LIMITS.length;
  const visibleCount = characters.reduce(
    (count, _, index) => count + (isVisible(index + 1, current.stage) ? 1 : 0),
    0,
  );

  const advance = () => {
    setState((previous) => {
      const baseline = previous.label === label ? previous : createState(label);
      return { label, stage: Math.min(PRIME_LIMITS.length, baseline.stage + 1) };
    });
  };

  return (
    <section
      aria-label="Reveal a label according to prime-numbered positions"
      className="gra-ui prime-reveal"
      data-stage={current.stage}
      data-state={complete ? "settled" : current.stage === 0 ? "waiting" : "sieving"}
    >
      <header className="prime-reveal__header">
        <span>Prime reveal</span>
        <output aria-live="polite">{visibleCount} / {characters.length} glyphs</output>
      </header>

      <div aria-label={complete ? label : "Some glyphs are waiting for a prime ruling"} className="prime-reveal__paper" aria-live="polite">
        <span className="prime-reveal__rule" aria-hidden="true" />
        <p>
          {characters.length === 0 ? "∅" : characters.map((character, index) => {
            const visible = isVisible(index + 1, current.stage);
            return (
              <span aria-hidden={!visible} className="prime-reveal__glyph" data-visible={visible} key={`${index}-${character}`}>
                {visible ? character : "·"}
              </span>
            );
          })}
        </p>
      </div>

      <div className="prime-reveal__steps" aria-label="Prime thresholds">
        {PRIME_LIMITS.map((limit, index) => (
          <span data-active={current.stage > index} data-current={current.stage === index} key={limit}>
            {index === PRIME_LIMITS.length - 1 ? "Composite" : `≤ ${limit}`}
          </span>
        ))}
      </div>

      <footer className="prime-reveal__footer">
        <p aria-live="polite">
          {complete
            ? "The composite glyphs have been admitted. Nothing became more important."
            : current.stage === 0
              ? "Only position one is provisionally legible."
              : `Prime positions through ${PRIME_LIMITS[current.stage - 1]} have been admitted.`}
        </p>
        <div className="prime-reveal__actions">
          <button disabled={complete} onClick={advance} type="button">
            {complete ? "All positions admitted" : current.stage === PRIME_LIMITS.length - 1 ? "Admit composites" : "Apply next prime"}
          </button>
          <button
            className="prime-reveal__reset"
            disabled={current.stage === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Clear ruling
          </button>
        </div>
      </footer>
    </section>
  );
}
