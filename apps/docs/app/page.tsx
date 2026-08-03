import { Playground } from "@/components/playground";
import { Button, CountedClone, RepeatChildren } from "gra-ui";

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

const components = [
  {
    name: "Button",
    description: "A conventional button with the usual variants.",
    signature: "ButtonProps extends ComponentPropsWithoutRef<\"button\">",
    props: "variant, size, asChild, native button props",
    example: '<Button>Click</Button>',
    href: "#button-reference",
  },
  {
    name: "IndecisiveButton",
    description: "A button that cycles through labels before accepting a decision.",
    signature: "IndecisiveButtonProps",
    props: "children, choices, interval, onDecision, Button props",
    example: '<IndecisiveButton>Decide</IndecisiveButton>',
    href: "#playground",
  },
  {
    name: "CountedClone",
    description: "A clone that reports how many children its element already has.",
    signature: "CountedCloneProps",
    props: "element",
    example: '<CountedClone element={<span>One child</span>} />',
    href: "#counted-clone-reference",
  },
  {
    name: "RepeatChildren",
    description: "A component that renders one child twice for no useful reason.",
    signature: "RepeatChildrenProps",
    props: "children",
    example: "<RepeatChildren><span>Again</span></RepeatChildren>",
    href: "#repeat-children-reference",
  },
  {
    name: "EqualChoice",
    description: "A double-click choice whose two destinations end in the same place.",
    signature: "EqualChoiceProps",
    props: "children",
    example: "<EqualChoice><span>Stay here</span></EqualChoice>",
    href: "#equal-choice-reference",
  },
  {
    name: "SplitLabel",
    description: "A label that must be split and personally reassembled.",
    signature: "SplitLabelProps",
    props: "label",
    example: '<SplitLabel label="Keep this together" />',
    href: "#split-label-reference",
  },
  {
    name: "FocusFade",
    description: "A focusable group that fades away and returns to confirm focus.",
    signature: "FocusFadeProps",
    props: "children",
    example: "<FocusFade><span>Focus me</span></FocusFade>",
    href: "#focus-fade-reference",
  },
  {
    name: "PressEscape",
    description: "A held button whose content flees and returns unchanged.",
    signature: "PressEscapeProps",
    props: "children",
    example: "<PressEscape>Hold this</PressEscape>",
    href: "#press-escape-reference",
  },
  {
    name: "KeystrokeStack",
    description: "A label that stacks one character at a time when you type.",
    signature: "KeystrokeStackProps",
    props: "label",
    example: '<KeystrokeStack label="Leave this alone" />',
    href: "#keystroke-stack-reference",
    isNew: true,
  },
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

      <section className="catalog-section" id="components">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / Components</p>
            <h2>All of them.<br />For some reason.</h2>
          </div>
          <p>
            The complete public surface of gra-ui, including the newest way to
            make a label stack one keystroke at a time for no reason.
          </p>
        </div>
        <div className="catalog-grid">
          {components.map((component) => (
            <article
              className="catalog-card"
              key={component.name}
            >
              <div className="catalog-card-heading">
                <h3>{component.name}</h3>
                {"isNew" in component && component.isNew ? (
                  <span className="new-badge">New</span>
                ) : null}
              </div>
              <p>{component.description}</p>
              <a href={component.href}>Read the example →</a>
              <dl>
                <div><dt>Signature</dt><dd><code>{component.signature}</code></dd></div>
                <div><dt>Props</dt><dd>{component.props}</dd></div>
                <div><dt>Example</dt><dd><code>{component.example}</code></dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="component-section" id="playground">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / Component</p>
            <h2>IndecisiveButton</h2>
          </div>
          <p>
            A button that considers every option before committing to the one
            under your cursor.
          </p>
        </div>
        <Playground />
      </section>

      <section className="component-section" id="button-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">03 / Component</p>
            <h2>Button</h2>
          </div>
          <p>A normal button, included so the unreasonable ones have something to use.</p>
        </div>
        <div className="clone-demo">
          <Button variant="outline">A regular button</Button>
        </div>
      </section>

      <section className="component-section" id="equal-choice-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">04 / Component</p>
            <h2>EqualChoice</h2>
          </div>
          <p>
            It asks you to choose a side, moves the content there, and restores
            the original position immediately afterward.
          </p>
        </div>
        <Playground kind="equal-choice" />
      </section>

      <section className="component-section" id="split-label-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">05 / Component</p>
            <h2>SplitLabel</h2>
          </div>
          <p>
            It separates a label, asks you to click both pieces, and reunites
            them exactly as they were.
          </p>
        </div>
        <Playground kind="split-label" />
      </section>

      <section className="component-section" id="focus-fade-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">06 / Component</p>
            <h2>FocusFade</h2>
          </div>
          <p>
            It fades focused content away, waits for the browser to notice, and
            restores the exact same content.
          </p>
        </div>
        <Playground kind="focus-fade" />
      </section>

      <section className="component-section counted-clone-section" id="counted-clone-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">07 / Component</p>
            <h2>CountedClone</h2>
          </div>
          <p>
            It counts an element&apos;s children and stores the answer on the
            element, where it will help nobody.
          </p>
        </div>
        <div className="clone-demo">
          <CountedClone element={<span className="clone-target">One child</span>} />
          <code>data-child-count=&quot;1&quot;</code>
        </div>
      </section>

      <section className="component-section" id="repeat-children-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">08 / Component</p>
            <h2>RepeatChildren</h2>
          </div>
          <p>
            It renders the same child twice, a task JSX already handles without
            a component.
          </p>
        </div>
        <div className="clone-demo">
          <RepeatChildren>
            <span className="clone-target">Again</span>
          </RepeatChildren>
          <code>child + child</code>
        </div>
      </section>

      <section className="component-section" id="press-escape-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">09 / Component</p>
            <h2>PressEscape</h2>
          </div>
          <p>
            It makes the content flee while pressed, then restores it when the
            button is released.
          </p>
        </div>
        <Playground kind="press-escape" />
      </section>

      <section className="component-section" id="keystroke-stack-reference">
        <div className="section-heading">
          <div>
            <p className="section-index">10 / Component</p>
            <h2>KeystrokeStack</h2>
          </div>
          <p>
            It counts your keystrokes, stacks the label one character at a time,
            and flattens it again after one extra key.
          </p>
        </div>
        <Playground kind="keystroke-stack" />
      </section>

      <section className="details-grid" id="usage">
        <article>
          <p className="section-index">11 / Usage</p>
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
            <p className="section-index">12 / API</p>
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
