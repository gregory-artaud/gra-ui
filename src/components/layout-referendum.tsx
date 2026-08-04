import * as React from "react";

type LayoutChoice = "original" | "stack" | "reverse" | "split";

export interface LayoutReferendumProps {
  children: React.ReactNode;
}

const choices: readonly { id: Exclude<LayoutChoice, "original">; label: string }[] = [
  { id: "stack", label: "Stack everything" },
  { id: "reverse", label: "Read backwards" },
  { id: "split", label: "Split the committee" },
];

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function LayoutReferendum({ children }: LayoutReferendumProps) {
  const items = React.Children.toArray(children);
  const [layout, setLayout] = React.useState<LayoutChoice>("original");
  const isDecided = layout !== "original";

  const chooseLayout = (nextLayout: Exclude<LayoutChoice, "original">) => {
    if (!isDecided) {
      setLayout(nextLayout);
    }
  };

  return (
    <section
      aria-label="Choose an unnecessary layout for the content"
      className="gra-ui layout-referendum"
      data-layout={layout}
      data-state={isDecided ? "decided" : "open"}
    >
      <header className="layout-referendum__header">
        <span>Layout referendum</span>
        <output aria-live="polite">
          {isDecided ? "Binding result" : "Awaiting a decision"}
        </output>
      </header>

      <div className="layout-referendum__items" data-layout={layout}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="layout-referendum__item" key={index}>
              {item}
            </div>
          ))
        ) : (
          <p className="layout-referendum__empty">Add something to reorganize.</p>
        )}
      </div>

      <div className="layout-referendum__ballot" aria-label="Layout choices">
        <span className="layout-referendum__ballot-label">Choose a binding arrangement</span>
        <div className="layout-referendum__choices">
          {choices.map((choice) => (
            <button
              aria-pressed={layout === choice.id}
              className="layout-referendum__choice"
              disabled={isDecided}
              key={choice.id}
              onDoubleClick={() => chooseLayout(choice.id)}
              onKeyDown={(event) => {
                if (!event.repeat && isActivationKey(event.key)) {
                  event.preventDefault();
                  chooseLayout(choice.id);
                }
              }}
              type="button"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="layout-referendum__status">
        {isDecided
          ? "The committee has rearranged the content. It may not be appealed."
          : "Double-click a proposal to make the layout legally worse."}
      </p>

      {isDecided ? (
        <button
          className="layout-referendum__reset"
          onClick={() => setLayout("original")}
          type="button"
        >
          Reopen the ballot
        </button>
      ) : null}
    </section>
  );
}
