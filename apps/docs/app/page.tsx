import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { componentDocs } from "@/components/component-docs";

export default function Home() {
  const featuredComponents = componentDocs.filter((component) => component.featured);

  return (
    <main className="landing-page">
      <section className="hero">
        <div className="eyebrow"><span /> React 19 component library</div>
        <h1>Decisions are overrated.</h1>
        <p>
          Carefully composed shadcn/ui components for interfaces that need a
          little more personality than strictly necessary.
        </p>
        <div className="hero-actions">
          <div className="install-command" aria-label="Installation command">
            <span>$</span>
            <code>pnpm add gra-ui</code>
          </div>
          <Link className="primary-link" href="/components">Browse components</Link>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">01 / Selected components</p>
            <h2 id="featured-title">A few bad ideas.</h2>
          </div>
          <p>
            Start with unnecessarily opinionated interactions, including
            the newest way to make a finished content tree require manual assembly.
          </p>
        </div>
        <div className="featured-grid">
          {featuredComponents.map((component, index) => (
            <Link className="featured-card" href={`/components/${component.slug}`} key={component.slug}>
              <span className="card-index">0{index + 1}</span>
              <div>
                <h3>{component.name}</h3>
                <p>{component.summary}</p>
              </div>
              <ArrowRight className="card-arrow" aria-hidden="true" size={15} />
            </Link>
          ))}
        </div>
        <Link className="catalog-cta" href="/components">
          View all {componentDocs.length} components <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </section>
    </main>
  );
}
