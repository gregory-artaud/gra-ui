import * as React from "react";

export interface DropSiloProps {
  children: React.ReactNode;
}

const SILOS = [
  { id: "inbox", label: "Inbox", note: "The least committed destination." },
  { id: "vault", label: "Vault", note: "For content that wants a heavier door." },
  { id: "quarantine", label: "Quarantine", note: "For content nobody will explain." },
] as const;

type SiloId = (typeof SILOS)[number]["id"];

interface DropSiloState {
  signature: string;
  silo: SiloId | null;
  dragging: boolean;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(child.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): DropSiloState {
  return { signature, silo: null, dragging: false };
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function DropSilo({ children }: DropSiloProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<DropSiloState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const selectedSilo = SILOS.find((silo) => silo.id === current.silo);

  const moveTo = (silo: SiloId) => {
    setState({ signature, silo, dragging: false });
  };

  const startDragging = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", "gra-ui-drop-silo");
    setState({ ...current, dragging: true });
  };

  const cargo = (
    <div
      aria-label="Movable cargo"
      className="drop-silo__cargo"
      draggable
      onDragEnd={() => setState((previous) => ({ ...previous, dragging: false }))}
      onDragStart={startDragging}
      role="button"
      tabIndex={0}
    >
      <span className="drop-silo__cargo-tag">Cargo</span>
      {children}
    </div>
  );

  return (
    <section
      aria-label="Move content into one of three drop silos"
      className="gra-ui drop-silo"
      data-silo={current.silo ?? "loose"}
      data-state={current.dragging ? "dragging" : current.silo ? "stored" : "loose"}
    >
      <header className="drop-silo__header">
        <span>Drop silo</span>
        <output aria-live="polite">{selectedSilo?.label ?? "Loose cargo"}</output>
      </header>

      <div className="drop-silo__surface">
        {current.silo === null ? cargo : null}

        <div className="drop-silo__lanes" aria-label="Drop destinations">
          {SILOS.map((silo) => (
            <div
              aria-label={`Move cargo to ${silo.label}`}
              className="drop-silo__lane"
              data-active={current.silo === silo.id ? "true" : "false"}
              key={silo.id}
              onClick={() => moveTo(silo.id)}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event) => {
                event.preventDefault();
                moveTo(silo.id);
              }}
              onKeyDown={(event) => {
                if (isActivationKey(event.key)) {
                  event.preventDefault();
                  moveTo(silo.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <strong>{silo.label}</strong>
              <small>{silo.note}</small>
              {current.silo === silo.id ? cargo : <span className="drop-silo__hint">Drop or press</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="drop-silo__footer">
        <p aria-live="polite">
          {selectedSilo
            ? `Cargo is now in the ${selectedSilo.label.toLowerCase()}. It has learned nothing.`
            : "Drag the cargo into a silo, or focus a silo and press Enter."}
        </p>
        <button
          className="drop-silo__reset"
          disabled={current.silo === null}
          onClick={() => setState(createState(signature))}
          type="button"
        >
          Release cargo
        </button>
      </div>
    </section>
  );
}
