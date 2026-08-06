import * as React from "react";

export interface MaskBallotProps {
  children: React.ReactNode;
}

type MaskChoice = "round" | "ticket" | "slit";

interface MaskBallotState {
  signature: string;
  mask: MaskChoice | null;
}

const MASKS: readonly { id: MaskChoice; label: string; description: string }[] = [
  { id: "round", label: "Round", description: "A polite circular opening." },
  { id: "ticket", label: "Ticket", description: "Perforated corners for no reason." },
  { id: "slit", label: "Slit", description: "Only the middle is permitted." },
];

function createSignature(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): MaskBallotState {
  return { signature, mask: null };
}

export function MaskBallot({ children }: MaskBallotProps) {
  const signature = createSignature(children);
  const [state, setState] = React.useState<MaskBallotState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const selectedMask = MASKS.find((mask) => mask.id === current.mask);

  return (
    <section
      aria-label="Choose a physical mask for the content"
      className="gra-ui mask-ballot"
      data-mask={current.mask ?? "none"}
      data-state={current.mask ? "masked" : "unmasked"}
    >
      <header className="mask-ballot__header">
        <span>Mask ballot</span>
        <output aria-live="polite">{selectedMask?.label ?? "No stencil"}</output>
      </header>

      <div className="mask-ballot__window" aria-live="polite">
        <div className="mask-ballot__content">{children}</div>
      </div>

      <div className="mask-ballot__choices" aria-label="Stencil choices">
        {MASKS.map((mask) => (
          <button
            aria-pressed={current.mask === mask.id}
            className="mask-ballot__choice"
            key={mask.id}
            onClick={() => setState({ signature, mask: mask.id })}
            type="button"
          >
            <span>{mask.label}</span>
            <small>{mask.description}</small>
          </button>
        ))}
      </div>

      <div className="mask-ballot__footer">
        <p aria-live="polite">
          {selectedMask
            ? `${selectedMask.label} has been legally applied to the content.`
            : "Choose one stencil. The content has not consented to any of them."}
        </p>
        <button
          className="mask-ballot__reset"
          disabled={current.mask === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Remove stencil
        </button>
      </div>
    </section>
  );
}
