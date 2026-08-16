import { useState } from "react";
import type { ReactNode } from "react";

const levels = [
  { label: "Plain", note: "The notice has not earned a more official container." },
  { label: "Sectioned", note: "A section now implies that the notice belongs somewhere." },
  { label: "Articled", note: "An article has promoted the notice to a complete account." },
  { label: "Aside", note: "The notice has become important enough to interrupt the page." },
  { label: "Quoted", note: "A blockquote now insists that the notice deserves attribution." },
] as const;

export interface MarkupPromotionProps {
  children: ReactNode;
}

export function MarkupPromotion({ children }: MarkupPromotionProps) {
  const [level, setLevel] = useState(0);
  const current = levels[level];

  const promotedContent = level === 0 ? (
    <div className="markup-promotion__content">{children}</div>
  ) : level === 1 ? (
    <section className="markup-promotion__content">{children}</section>
  ) : level === 2 ? (
    <article className="markup-promotion__content">{children}</article>
  ) : level === 3 ? (
    <aside className="markup-promotion__content">{children}</aside>
  ) : (
    <blockquote className="markup-promotion__content">{children}</blockquote>
  );

  return (
    <section className="gra-ui markup-promotion" data-level={level} aria-label="Markup promotion">
      <header className="markup-promotion__header">
        <span>Markup promotion</span>
        <output aria-live="polite">{level}/4 promotions</output>
      </header>

      <div className="markup-promotion__stage">{promotedContent}</div>

      <p className="markup-promotion__note" aria-live="polite">{current.note}</p>

      <footer className="markup-promotion__footer">
        <button type="button" onClick={() => setLevel((value) => (value === levels.length - 1 ? 0 : value + 1))}>
          {level === levels.length - 1 ? "Demote to plain" : `Promote to ${levels[level + 1].label.toLowerCase()}`}
        </button>
        <button type="button" onClick={() => setLevel(0)} disabled={level === 0}>
          Clear promotions
        </button>
      </footer>
    </section>
  );
}
