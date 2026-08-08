import * as React from "react";

const quotaFor = (index: number) => (index % 3) + 1;

export interface QuotaProcessionProps {
  children: React.ReactNode;
}

interface QuotaProcessionState {
  signature: string;
  currentIndex: number;
  taps: number;
}

function childrenSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return `${index}:${String(child.type)}:${String(child.props.children ?? child.key ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("\u241f");
}

function createState(signature: string): QuotaProcessionState {
  return { signature, currentIndex: 0, taps: 0 };
}

export function QuotaProcession({ children }: QuotaProcessionProps) {
  const items = React.Children.toArray(children);
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<QuotaProcessionState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = items.length > 0 && current.currentIndex >= items.length;
  const activeIndex = Math.min(current.currentIndex, Math.max(0, items.length - 1));

  const advance = () => {
    if (isComplete || items.length === 0) {
      return;
    }

    const nextTaps = current.taps + 1;
    const required = quotaFor(activeIndex);
    setState({
      signature,
      currentIndex: nextTaps === required ? activeIndex + 1 : activeIndex,
      taps: nextTaps === required ? 0 : nextTaps,
    });
  };

  return (
    <section
      aria-label="Quota procession"
      className="gra-ui quota-procession"
      data-complete={isComplete}
      data-current={activeIndex}
    >
      <div className="quota-procession__header">
        <span>Procession</span>
        <output aria-live="polite">
          {isComplete ? "All quotas met" : `Stage ${activeIndex + 1} · ${current.taps}/${quotaFor(activeIndex)}`}
        </output>
      </div>

      <div className="quota-procession__track">
        {items.map((item, index) => {
          const isDone = index < current.currentIndex;
          const isActive = index === activeIndex && !isComplete;
          const quota = quotaFor(index);

          return (
            <button
              aria-current={isActive ? "step" : undefined}
              className="quota-procession__step"
              data-active={isActive}
              data-done={isDone}
              disabled={!isActive}
              key={index}
              onClick={advance}
              type="button"
            >
              <span className="quota-procession__step-index">0{index + 1}</span>
              <span className="quota-procession__step-content">{item}</span>
              <span className="quota-procession__marks" aria-label={`${quota} required taps`}>
                {Array.from({ length: quota }, (_, mark) => (
                  <i data-filled={isDone || (isActive && mark < current.taps)} key={mark} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <button
        className="quota-procession__reset"
        disabled={current.currentIndex === 0 && current.taps === 0}
        onClick={() => setState(createState(signature))}
        type="button"
      >
        Return to the first stage
      </button>
    </section>
  );
}
