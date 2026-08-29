import * as React from "react";

const MANDATES = [
  { id: "shelf", label: "Shelf", detail: "one quiet column" },
  { id: "pyramid", label: "Pyramid", detail: "a ranking nobody requested" },
  { id: "orbit", label: "Orbit", detail: "everything circles the middle" },
] as const;

type MandateId = (typeof MANDATES)[number]["id"];

export interface MosaicMandateProps {
  children: React.ReactNode;
}

export function MosaicMandate({ children }: MosaicMandateProps) {
  const items = React.Children.toArray(children);
  const [selection, setSelection] = React.useState<{ count: number; mandate: MandateId | null }>({
    count: items.length,
    mandate: null,
  });
  const mandate = selection.count === items.length ? selection.mandate : null;

  const choose = (next: MandateId) => setSelection({ count: items.length, mandate: next });

  return (
    <section
      aria-label="Choose an unnecessary arrangement for the children"
      className="gra-ui mosaic-mandate"
      data-mandate={mandate ?? "undecided"}
    >
      <header className="mosaic-mandate__header">
        <span>Mosaic mandate</span>
        <output aria-live="polite">{mandate ? MANDATES.find((item) => item.id === mandate)?.label : "Unarranged"}</output>
      </header>

      <div className={`mosaic-mandate__canvas mosaic-mandate__canvas--${mandate ?? "waiting"}`} aria-live="polite">
        {!mandate ? <p className="mosaic-mandate__empty">Choose a policy before the pieces may occupy a shape.</p> : null}
        {mandate === "shelf" ? (
          <ul className="mosaic-mandate__shelf">
            {items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        ) : null}
        {mandate === "pyramid" ? (
          <ol className="mosaic-mandate__pyramid">
            {items.map((item, index) => <li key={index} style={{ "--mosaic-index": index } as React.CSSProperties}>{item}</li>)}
          </ol>
        ) : null}
        {mandate === "orbit" ? (
          <figure className="mosaic-mandate__orbit">
            {items.map((item, index) => <span key={index} style={{ "--mosaic-index": index } as React.CSSProperties}>{item}</span>)}
            <figcaption>central filing gravity</figcaption>
          </figure>
        ) : null}
      </div>

      <div aria-label="Arrangement mandates" className="mosaic-mandate__choices">
        {MANDATES.map((item) => (
          <button
            aria-pressed={mandate === item.id}
            className="mosaic-mandate__choice"
            data-selected={mandate === item.id}
            key={item.id}
            onClick={() => choose(item.id)}
            type="button"
          >
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>

      <footer className="mosaic-mandate__footer">
        <p>{mandate ? "The same pieces now obey a different actual geometry." : "Three layouts are competing for custody of the pieces."}</p>
        <button className="mosaic-mandate__reset" disabled={!mandate} onClick={() => setSelection({ count: items.length, mandate: null })} type="button">
          Revoke mandate
        </button>
      </footer>
    </section>
  );
}
