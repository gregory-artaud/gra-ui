import * as React from "react";

export interface PatternLatchProps {
  children: React.ReactNode;
}

const PATTERN = ["triangle", "circle", "square", "circle"] as const;
const SYMBOLS = ["triangle", "circle", "square"] as const;

type PatternResult = "ready" | "wrong" | "open";

interface PatternLatchState {
  attempts: number;
  progress: number;
  result: PatternResult;
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

function createState(signature: string): PatternLatchState {
  return { attempts: 0, progress: 0, result: "ready", signature };
}

export function PatternLatch({ children }: PatternLatchProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<PatternLatchState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isOpen = current.result === "open";

  const choose = (symbol: (typeof SYMBOLS)[number]) => {
    if (isOpen) {
      return;
    }

    setState((previous) => {
      const baseline = previous.signature === signature ? previous : createState(signature);
      const expected = PATTERN[baseline.progress];
      if (symbol !== expected) {
        return {
          attempts: baseline.attempts + 1,
          progress: 0,
          result: "wrong",
          signature,
        };
      }

      const progress = baseline.progress + 1;
      return {
        attempts: baseline.attempts + 1,
        progress,
        result: progress === PATTERN.length ? "open" : "ready",
        signature,
      };
    });
  };

  return (
    <section
      aria-label="Open the content by entering a four-symbol pattern"
      className="gra-ui pattern-latch"
      data-progress={current.progress}
      data-result={current.result}
    >
      <header className="pattern-latch__header">
        <span>Pattern latch</span>
        <output aria-live="polite">
          {isOpen ? "Open" : `${current.progress} / ${PATTERN.length}`}
        </output>
      </header>

      <div className="pattern-latch__lock" aria-live="polite">
        <div className="pattern-latch__dial" data-progress={current.progress}>
          <span className="pattern-latch__dial-mark" aria-hidden="true" />
          <div className="pattern-latch__payload">{children}</div>
        </div>
        <p>
          {isOpen
            ? "The correct pattern opened a perfectly ordinary notice."
            : current.result === "wrong"
              ? "Wrong symbol. The latch has forgotten everything."
              : "A four-symbol lock for content that was already available."}
        </p>
      </div>

      <div className="pattern-latch__symbols" role="group" aria-label="Pattern symbols">
        {SYMBOLS.map((symbol) => (
          <button
            aria-label={`Choose ${symbol}`}
            className="pattern-latch__symbol"
            data-symbol={symbol}
            disabled={isOpen}
            key={symbol}
            onClick={() => choose(symbol)}
            type="button"
          >
            <span aria-hidden="true" />
            {symbol}
          </button>
        ))}
      </div>

      <div className="pattern-latch__footer">
        <span aria-live="polite">
          {current.attempts === 0 ? "No attempts yet" : `${current.attempts} symbol${current.attempts === 1 ? "" : "s"} entered`}
        </span>
        <button
          className="pattern-latch__reset"
          disabled={current.attempts === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Forget pattern
        </button>
      </div>
    </section>
  );
}
