import * as React from "react";

export interface SlugMangleProps {
  label: string;
}

function makeSlug(label: string) {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SlugMangle({ label }: SlugMangleProps) {
  const [mangled, setMangled] = React.useState(false);
  const result = makeSlug(label);

  return (
    <section aria-label="Mangle a label into a URL slug" className="gra-ui slug-mangle" data-state={mangled ? "mangled" : "readable"}>
      <header className="slug-mangle__header">
        <span>Slug mangle</span>
        <output aria-live="polite">{mangled ? "URL-shaped" : "Readable"}</output>
      </header>

      <div className="slug-mangle__paper" aria-live="polite">
        <span className="slug-mangle__caption">Displayed label</span>
        <p key={mangled ? result : label}>{mangled ? result || "empty-slug" : label || "An empty label has nothing to mangle."}</p>
        {mangled ? <small>Case, accents and punctuation were discarded to satisfy a very small address bar.</small> : <small>The readable phrase is waiting to lose its personality.</small>}
      </div>

      <footer className="slug-mangle__footer">
        <p aria-live="polite">{mangled ? "The copy now fits a URL, but it no longer speaks like a sentence." : "Compress the label into a route-shaped artifact."}</p>
        <div className="slug-mangle__actions">
          <button disabled={mangled || !label} onClick={() => setMangled(true)} type="button">Mangle into slug</button>
          <button className="slug-mangle__reset" disabled={!mangled} onClick={() => setMangled(false)} type="button">Restore label</button>
        </div>
      </footer>
    </section>
  );
}
