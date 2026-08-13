import * as React from "react";

type RelayStep = 0 | 1 | 2 | 3;

export interface EventRelayProps {
  children: React.ReactNode;
}

interface EventRelayState {
  failures: number;
  signature: string;
  step: RelayStep;
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

function createState(signature: string): EventRelayState {
  return { failures: 0, signature, step: 0 };
}

export function EventRelay({ children }: EventRelayProps) {
  const items = React.Children.toArray(children);
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<EventRelayState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isComplete = current.step === 3;
  const station = current.step === 0 ? 0 : current.step === 1 ? 1 : 2;

  const advance = (expected: RelayStep) => {
    if (current.step === expected) {
      setState((previous) => ({ ...previous, step: (expected + 1) as RelayStep }));
      return;
    }

    if (!isComplete) {
      setState((previous) => ({ ...previous, failures: previous.failures + 1, step: 0 }));
    }
  };

  return (
    <section
      aria-label="Move content through a relay of unrelated browser events"
      className="gra-ui event-relay"
      data-state={isComplete ? "delivered" : current.step === 0 ? "waiting" : "in-transit"}
    >
      <header className="event-relay__header">
        <span>Event relay</span>
        <output aria-live="polite">{isComplete ? "Delivered" : `Station ${current.step + 1} / 3`}</output>
      </header>

      <div className="event-relay__route" aria-live="polite">
        {["Focus", "Wheel", "Space"].map((eventName, index) => (
          <div className="event-relay__station" data-active={station === index} data-done={current.step > index} key={eventName}>
            <span>{index + 1}</span>
            <small>{eventName}</small>
            <div className="event-relay__cargo-slot">{station === index ? items : null}</div>
          </div>
        ))}
      </div>

      <div
        aria-label="Relay control: focus, scroll, then press Space"
        className={current.failures > 0 ? "event-relay__control event-relay__control--failed" : "event-relay__control"}
        onFocus={() => advance(0)}
        onKeyDown={(event) => {
          if (event.key !== " ") {
            return;
          }

          event.preventDefault();
          advance(2);
        }}
        onWheel={(event) => {
          event.preventDefault();
          advance(1);
        }}
        role="group"
        tabIndex={0}
      >
        <strong>{isComplete ? "The relay arrived." : "Focus this panel, then scroll once and press Space."}</strong>
        <span>One browser event per station. No substitutions accepted.</span>
      </div>

      <footer className="event-relay__footer">
        <p aria-live="polite">
          {isComplete
            ? "The content completed a delivery route that a normal render would have skipped."
            : current.failures > 0
              ? "Wrong event. The cargo returned to the first station."
              : "The relay only advances when the events arrive in their appointed order."}
        </p>
        <button
          className="event-relay__reset"
          disabled={current.step === 0 && current.failures === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Recall cargo
        </button>
      </footer>
    </section>
  );
}
