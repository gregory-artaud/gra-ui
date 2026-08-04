import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentDemo } from "@/components/component-demo";
import { componentDocs, getComponentDoc } from "@/components/component-docs";

type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return componentDocs.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    return {};
  }

  return {
    title: component.name,
    description: component.summary,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    notFound();
  }

  return (
    <article className="component-page">
      <header className="component-page-header">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/components">Components</Link>
          <ChevronRight className="breadcrumb-separator" aria-hidden="true" size={14} />
          <span>{component.name}</span>
        </nav>
        <div className="component-title-row">
          <div>
            <p className="section-index">Component</p>
            <h1>{component.name}</h1>
          </div>
          {component.isNew ? <span className="new-badge">New</span> : null}
        </div>
        <p>{component.description}</p>
        {component.useCase || component.alternative ? (
          <div className="component-context">
            {component.useCase ? (
              <div>
                <p className="section-index">Possible use</p>
                <p>{component.useCase}</p>
              </div>
            ) : null}
            {component.alternative ? (
              <div>
                <p className="section-index">Reasonable alternative</p>
                <p>{component.alternative}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </header>

      <section className="doc-section" aria-labelledby="preview-heading">
        <div className="doc-section-heading">
          <p className="section-index">01 / Preview</p>
          <h2 id="preview-heading">Try it yourself.</h2>
        </div>
        <ComponentDemo kind={component.demo} />
      </section>

      <section className="doc-section" aria-labelledby="usage-heading">
        <div className="doc-section-heading">
          <p className="section-index">02 / Usage</p>
          <h2 id="usage-heading">Put it somewhere.</h2>
        </div>
        <div className="code-block">
          <div className="code-header">
            <span>example.tsx</span>
            <span>TSX</span>
          </div>
          <pre><code>{component.usage}</code></pre>
        </div>
      </section>

      <section className="doc-section" aria-labelledby="api-heading">
        <div className="doc-section-heading">
          <p className="section-index">03 / API</p>
          <h2 id="api-heading">Small surface area.</h2>
        </div>
        <div className="api-table" role="table" aria-label={`${component.name} API`}>
          <div className="api-row api-header" role="row">
            <span role="columnheader">Prop</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Description</span>
          </div>
          {component.api.map((prop) => (
            <div className="api-row" role="row" key={prop.name}>
              <code role="cell">{prop.name}</code>
              <span className="api-type" role="cell">{prop.type}</span>
              <span role="cell">{prop.description}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
