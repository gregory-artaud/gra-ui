import * as React from "react";

type SliceChoice = "opening" | "middle" | "closing";

const CHOICES: readonly { id: SliceChoice; label: string; hint: string }[] = [
  { id: "opening", label: "Opening", hint: "Keep the first half" },
  { id: "middle", label: "Middle", hint: "Keep the central clause" },
  { id: "closing", label: "Closing", hint: "Keep the last half" },
];

export interface SliceReferendumProps {
  label: string;
}

interface SliceReferendumState {
  choice: SliceChoice | null;
  label: string;
}

function createState(label: string): SliceReferendumState {
  return { choice: null, label };
}

function sliceFor(label: string, choice: SliceChoice) {
  const words = label.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "";
  }

  if (choice === "opening") {
    return words.slice(0, Math.ceil(words.length / 2)).join(" ");
  }

  if (choice === "middle") {
    const start = Math.floor((words.length - 1) / 2);
    return words.slice(start, start + 1 + (words.length % 2 === 0 ? 1 : 0)).join(" ");
  }

  return words.slice(Math.floor(words.length / 2)).join(" ");
}

export function SliceReferendum({ label }: SliceReferendumProps) {
  const groupId = React.useId();
  const [state, setState] = React.useState<SliceReferendumState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const selected = CHOICES.find((choice) => choice.id === current.choice);
  const excerpt = selected && current.choice ? sliceFor(label, current.choice) : null;

  return (
    <section
      aria-label="Choose which part of a label deserves to survive"
      className="gra-ui slice-referendum"
      data-choice={current.choice ?? "undecided"}
    >
      <header className="slice-referendum__header">
        <span>Slice referendum</span>
        <output aria-live="polite">{selected ? selected.label : "Undecided"}</output>
      </header>

      <div className="slice-referendum__paper" aria-live="polite">
        {excerpt === null ? (
          <p className="slice-referendum__waiting">The full label awaits an editorial cut.</p>
        ) : (
          <blockquote>
            <span>Surviving excerpt</span>
            <strong>{excerpt || "An empty excerpt"}</strong>
          </blockquote>
        )}
      </div>

      <fieldset className="slice-referendum__choices">
        <legend>Choose the surviving slice</legend>
        {CHOICES.map((choice) => (
          <label className="slice-referendum__choice" key={choice.id}>
            <input
              checked={current.choice === choice.id}
              name={`slice-referendum-${groupId}`}
              onChange={() => setState({ choice: choice.id, label })}
              type="radio"
            />
            <span>
              <strong>{choice.label}</strong>
              <small>{choice.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <footer className="slice-referendum__footer">
        <p aria-live="polite">
          {selected
            ? `The ${selected.label.toLowerCase()} survives. The rest was not consulted.`
            : "Three cuts are available, and none is more editorial than the others."}
        </p>
        <button
          className="slice-referendum__reset"
          disabled={current.choice === null}
          onClick={() => setState(createState(label))}
          type="button"
        >
          Reopen the whole label
        </button>
      </footer>
    </section>
  );
}
