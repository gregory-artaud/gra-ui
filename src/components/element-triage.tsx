import * as React from "react";

const DESTINATIONS = [
  { id: "heading", label: "Heading", note: "promote the wording" },
  { id: "aside", label: "Aside", note: "keep it to the side" },
  { id: "footnote", label: "Footnote", note: "make it small" },
] as const;

type Destination = (typeof DESTINATIONS)[number]["id"];

interface ElementTriageState {
  choice: Destination | null;
  signature: string;
}

export interface ElementTriageProps {
  children: React.ReactNode;
}

function createState(signature: string): ElementTriageState {
  return { choice: null, signature };
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

export function ElementTriage({ children }: ElementTriageProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<ElementTriageState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const selected = DESTINATIONS.find((destination) => destination.id === current.choice);

  const renderedContent = current.choice === "heading"
    ? <h3 className="element-triage__heading"><span>Filed as headline</span>{children}</h3>
    : current.choice === "aside"
      ? <aside className="element-triage__aside"><span>Filed at the edge</span>{children}</aside>
      : current.choice === "footnote"
        ? <small className="element-triage__footnote"><sup>†</sup>{children}</small>
        : <p className="element-triage__plain">{children}</p>;

  return (
    <section
      aria-label="Choose an unnecessary HTML destiny for the content"
      className="gra-ui element-triage"
      data-choice={current.choice ?? "undecided"}
    >
      <header className="element-triage__header">
        <span>Element triage</span>
        <output aria-live="polite">{selected?.label ?? "Unfiled"}</output>
      </header>

      <div className="element-triage__stage" aria-live="polite">
        {renderedContent}
      </div>

      <div className="element-triage__choices" role="group" aria-label="HTML destinies">
        {DESTINATIONS.map((destination) => (
          <button
            aria-pressed={current.choice === destination.id}
            className="element-triage__choice"
            data-selected={current.choice === destination.id}
            key={destination.id}
            onClick={() => setState({ choice: destination.id, signature })}
            type="button"
          >
            <strong>{destination.label}</strong>
            <small>{destination.note}</small>
          </button>
        ))}
      </div>

      <footer className="element-triage__footer">
        <p aria-live="polite">
          {selected
            ? `The content is now an actual ${selected.label.toLowerCase()}. The words did not earn it.`
            : "Choose a semantic destination for content that already had one."}
        </p>
        <button
          className="element-triage__reset"
          disabled={current.choice === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Return to intake
        </button>
      </footer>
    </section>
  );
}
