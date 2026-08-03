"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { componentDocs } from "@/components/component-docs";

export function DocsSidebar() {
  const pathname = usePathname().replace(/\/$/, "");

  return (
    <nav className="docs-nav" aria-label="Component catalog">
      <p className="docs-nav-label">Catalog</p>
      <Link
        aria-current={pathname.endsWith("/components") ? "page" : undefined}
        href="/components"
      >
        Overview
      </Link>
      {componentDocs.map((component) => {
        const href = `/components/${component.slug}`;
        const isActive = pathname.endsWith(href);

        return (
          <Link aria-current={isActive ? "page" : undefined} href={href} key={component.slug}>
            {component.name}
            {component.isNew ? <span>New</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
