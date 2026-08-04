import * as React from "react";

const REQUIRED_LETTERS = 6;

type CaseGateStatus = "locked" | "rejected" | "unlocked";

type CaseGateState = {
  sequence: string;
  status: CaseGateStatus;
};

const INITIAL_STATE: CaseGateState = {
  sequence: "",
  status: "locked",
};

export interface CaseGateProps {
  children: React.ReactNode;
}

function isLetter(value: string) {
  return value.length === 1 && value.toLowerCase() !== value.toUpperCase();
}

function isUppercase(value: string) {
  return value === value.toUpperCase();
}

export function CaseGate({ children }: CaseGateProps) {
  const statusId = React.useId();
  const [state, setState] = React.useState<CaseGateState>(INITIAL_STATE);
  const isUnlocked = state.status === "unlocked";
  const canReset = state.sequence.length > 0 || state.status !== "locked";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.length !== 1 || isUnlocked) {
      return;
    }

    event.preventDefault();

    const previous = state.sequence.at(-1);
    const alternates =
      previous === undefined || isUppercase(previous) !== isUppercase(event.key);

    if (!isLetter(event.key) || !alternates) {
      setState({
        sequence: "",
        status: "rejected",
      });
      return;
    }

    const sequence = state.sequence + event.key;
    setState({
      sequence,
      status: sequence.length === REQUIRED_LETTERS ? "unlocked" : "locked",
    });
  };

  return (
    <section
      aria-label="Type alternating letter cases to unlock the content"
      className="gra-ui case-gate"
      data-state={state.status}
    >
      <div className="case-gate__stage">
        <div aria-hidden={!isUnlocked} className="case-gate__content">
          {children}
        </div>
        <div aria-hidden="true" className="case-gate__veil">
          <span>{isUnlocked ? "Unlocked" : "Case pattern required"}</span>
        </div>
      </div>

      <label className="case-gate__input-label">
        <span>Alternating case</span>
        <input
          aria-describedby={statusId}
          aria-invalid={state.status === "rejected"}
          className="case-gate__input"
          onKeyDown={handleKeyDown}
          placeholder="Type here: aBcDeF"
          readOnly
          type="text"
          value={state.sequence}
        />
      </label>

      <div aria-hidden="true" className="case-gate__progress">
        {Array.from({ length: REQUIRED_LETTERS }, (_, index) => (
          <span
            className="case-gate__slot"
            data-filled={index < state.sequence.length ? "true" : "false"}
            key={`${index}-${state.sequence[index] ?? "empty"}`}
          >
            {state.sequence[index] ?? "·"}
          </span>
        ))}
      </div>

      <p aria-live="polite" className="case-gate__status" id={statusId}>
        {isUnlocked
          ? "The content is available. Six keys were enough."
          : state.status === "rejected"
            ? "Wrong case or non-letter. The sequence starts over."
            : `${state.sequence.length} of ${REQUIRED_LETTERS} alternating letters accepted.`}
      </p>

      {canReset ? (
        <button
          className="case-gate__reset"
          onClick={() => setState(INITIAL_STATE)}
          type="button"
        >
          Start over
        </button>
      ) : null}
    </section>
  );
}
