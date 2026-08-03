import type { Metadata } from "next";
import Link from "next/link";

import { componentDocs } from "@/components/component-docs";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse every component in the gra-ui catalog.",
};

export default function ComponentsPage() {
  return (
    <div className="catalog-page">
      <header className="docs-page-header">
        <p className="section-index">Component catalog</p>
        <h1>Small components.<br />Questionable purpose.</h1>
        <p>
          Eleven React components composed with shadcn/ui. Each one ships typed,
          styled, and ready to make a simple interface slightly less direct.
        </p>
      </header>

      <div className="component-grid">
        {componentDocs.map((component, index) => (
          <Link className="component-card" href={`/components/${component.slug}`} key={component.slug}>
            <div className="component-card-topline">
              <span>0{index + 1}</span>
              {component.isNew ? <span className="new-badge">New</span> : null}
            </div>
            <h2>{component.name}</h2>
            <p>{component.summary}</p>
            <span className="component-card-link">View component <span aria-hidden="true">-&gt;</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
