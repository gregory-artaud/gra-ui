import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="gra-ui home">
        <span className="wordmark-mark">g</span>
        ra-ui
      </Link>
      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href="/components">Components</Link>
        <a href="https://github.com/gregory-artaud/gra-ui">
          GitHub
          <ExternalLink aria-hidden="true" size={13} />
        </a>
      </nav>
    </header>
  );
}
