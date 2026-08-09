import * as React from "react";

const TOTAL_LAYERS = 4;

export interface RecessDepthProps {
  children: React.ReactNode;
}

interface RecessDepthState {
  depth: number;
  signature: string;
}

function childrenSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return `${index}:${String(child.type)}:${String(child.key)}:${String(child.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("\u241f");
}

function createState(signature: string): RecessDepthState {
  return { depth: 0, signature };
}

export function RecessDepth({ children }: RecessDepthProps) {
  const signature = childrenSignature(children);
  const [state, setState] = React.useState<RecessDepthState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isBuried = current.depth === TOTAL_LAYERS;

  return (
    <section
      aria-label="Recess depth"
      className="gra-ui recess-depth"
      data-buried={isBuried}
      data-depth={current.depth}
    >
      <div className="recess-depth__header">
        <span>Filing recess</span>
        <output aria-live="polite">
          {isBuried ? "Fully recessed" : `${current.depth}/${TOTAL_LAYERS} layers`}
        </output>
      </div>

      <div className="recess-depth__well">
        <div aria-hidden="true" className="recess-depth__layers">
          {Array.from({ length: TOTAL_LAYERS }, (_, index) => (
            <span data-filed={index < current.depth} key={index}>
              layer {index + 1}
            </span>
          ))}
        </div>
        <div className="recess-depth__content">{children}</div>
      </div>

      <div className="recess-depth__actions">
        <button
          disabled={isBuried}
          onClick={() => setState({ signature, depth: Math.min(current.depth + 1, TOTAL_LAYERS) })}
          type="button"
        >
          {isBuried ? "Nothing left to file" : "File one layer"}
        </button>
        <button
          className="recess-depth__reset"
          disabled={current.depth === 0}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Unbury
        </button>
      </div>
    </section>
  );
}
