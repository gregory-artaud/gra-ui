import * as React from "react";

const ARTICLES = new Set(["a", "an", "the"]);

function separateArticles(label: string) {
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  return {
    kept: words.filter((word) => !ARTICLES.has(word.toLowerCase().replace(/[^a-z]/g, ""))),
    ejected: words.filter((word) => ARTICLES.has(word.toLowerCase().replace(/[^a-z]/g, ""))),
  };
}

export interface ArticleEjectorProps {
  label: string;
}

export function ArticleEjector({ label }: ArticleEjectorProps) {
  const [ejected, setEjected] = React.useState(false);
  const separated = separateArticles(label);
  const rendered = ejected ? separated.kept.join(" ") : label;

  return (
    <section aria-label="Remove articles from a label" className="gra-ui article-ejector" data-state={ejected ? "ejected" : "loaded"}>
      <header className="article-ejector__header">
        <span>Article ejector</span>
        <output aria-live="polite">{ejected ? `${separated.ejected.length} filed away` : "Loaded"}</output>
      </header>

      <div className="article-ejector__paper" aria-live="polite">
        <span className="article-ejector__caption">Visible label</span>
        <p className="article-ejector__label" key={rendered}>{rendered || "The articles took the whole sentence with them."}</p>
      </div>

      <div className="article-ejector__drawer">
        <span>Removed articles</span>
        <div>
          {ejected && separated.ejected.length > 0
            ? separated.ejected.map((article, index) => <mark key={`${article}-${index}`}>{article}</mark>)
            : <small>{ejected ? "None were found. The ejector still made a report." : "Nothing has been ejected."}</small>}
        </div>
      </div>

      <footer className="article-ejector__footer">
        <p>{ejected ? "The sentence is shorter, not wiser." : "Eject a, an and the into their own tiny archive."}</p>
        <div className="article-ejector__actions">
          <button disabled={ejected} onClick={() => setEjected(true)} type="button">Eject articles</button>
          <button className="article-ejector__reset" disabled={!ejected} onClick={() => setEjected(false)} type="button">Restore sentence</button>
        </div>
      </footer>
    </section>
  );
}
