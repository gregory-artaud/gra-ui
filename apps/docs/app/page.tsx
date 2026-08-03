import { Playground } from "@/components/playground";

const usageCode = `import { IndecisiveButton } from "gra-ui";
import "gra-ui/styles.css";

<IndecisiveButton
  choices={["Ship it", "Wait", "Ship it anyway"]}
  interval={900}
  onDecision={(choice) => console.log(choice)}
>
  Decide
</IndecisiveButton>`;

const api = [
  ["children", "ReactNode", "The stable label shown while the button is idle."],
  ["choices", "readonly string[]", "Labels cycled while the button is active."],
  ["interval", "number", "Delay between choices. Defaults to 900 ms."],
  ["onDecision", "(choice, index, event) => void", "Called with the visible choice on click."],
  ["variant", "Button variant", "Any shadcn Button visual variant."],
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="gra-ui home">
          <span className="wordmark-mark">g</span>
          ra-ui
        </a>
        <nav aria-label="Primary navigation">
          <a href="#playground">Component</a>
          <a href="#usage">Usage</a>
          <a href="https://github.com/gregory-artaud/gra-ui">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> React 19 component library</div>
        <h1>Decisions are overrated.</h1>
        <p>
          Carefully composed shadcn/ui components for interfaces that need a
          little more personality than strictly necessary.
        </p>
        <div className="install-command" aria-label="Installation command">
          <span>$</span>
          <code>pnpm add gra-ui</code>
        </div>
      </section>

      <section className="component-section" id="playground">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / Component</p>
            <h2>IndecisiveButton</h2>
          </div>
          <p>
            A button that considers every option before committing to the one
            under your cursor.
          </p>
        </div>
        <Playground />
      </section>

      <section className="details-grid" id="usage">
        <article>
          <p className="section-index">02 / Usage</p>
          <h2>One import.<br />Several opinions.</h2>
          <p className="detail-copy">
            Import the compiled stylesheet once. Your application does not need
            Tailwind or additional source scanning.
          </p>
        </article>
        <div className="code-block">
          <div className="code-header">
            <span>example.tsx</span>
            <span>TSX</span>
          </div>
          <pre><code>{usageCode}</code></pre>
        </div>
      </section>

      <section className="api-section">
        <div className="section-heading api-heading">
          <div>
            <p className="section-index">03 / API</p>
            <h2>Small surface area.</h2>
          </div>
          <p>
            Native button props, refs, sizes and variants are forwarded. The
            component adds only what its indecision requires.
          </p>
        </div>
        <div className="api-table" role="table" aria-label="IndecisiveButton API">
          {api.map(([name, type, description]) => (
            <div className="api-row" role="row" key={name}>
              <code role="cell">{name}</code>
              <span className="api-type" role="cell">{type}</span>
              <span role="cell">{description}</span>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <span>gra-ui</span>
        <p>Composed with shadcn/ui. Built for unnecessary choices.</p>
        <span>MIT 2026</span>
      </footer>
    </main>
  );
}
