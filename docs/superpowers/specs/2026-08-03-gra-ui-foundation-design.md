# gra-ui Foundation Design

## Goal

Initialize `gra-ui` as a React 19 component library that composes shadcn/ui primitives, publishes to npm, and ships a statically exported Next.js documentation site to GitHub Pages. The first release contains one original component, `IndecisiveButton`, and no test infrastructure or test files.

## Workspace Structure

The npm package remains at the repository root to preserve the simple publication model used by `greact-hooks`. The private documentation application lives in `apps/docs` and depends on the root package through the pnpm workspace.

```text
.
├── .github/workflows/publish.yml
├── apps/docs
│   ├── app
│   ├── components
│   ├── next.config.ts
│   └── package.json
├── docs/superpowers/specs
├── src
│   ├── components/ui/button.tsx
│   ├── components/indecisive-button.tsx
│   ├── lib/utils.ts
│   ├── styles.css
│   └── index.ts
├── components.json
├── package.json
├── pnpm-workspace.yaml
└── vite.config.ts
```

Turborepo is intentionally excluded. Root scripts coordinate the two builds directly with pnpm.

## Package Contract

The package name is `gra-ui`. Vite produces tree-shakeable ESM and CommonJS bundles, source maps, TypeScript declarations, and a compiled stylesheet. The public exports are:

- `gra-ui` for React components and their types.
- `gra-ui/styles.css` for the compiled component styles.

React and React DOM are peer dependencies requiring React 19 or newer. Runtime dependencies required by the shadcn/ui `Button` primitive, such as Slot and class-variance helpers, are regular package dependencies.

Consumers install the package and import its stylesheet explicitly. They do not need Tailwind CSS and do not need to configure source scanning. The emitted stylesheet includes only the package tokens and utilities needed by the components and does not include Tailwind's global preflight.

## IndecisiveButton

`IndecisiveButton` composes the local shadcn/ui `Button` primitive and preserves its size, variant, disabled state, ref, and native button attributes. It deliberately omits `asChild`, because replacing its own text is incompatible with Slot's requirement for an element child.

Its public API adds:

- `choices`: an optional readonly array of strings shown while the button is active, defaulting to `Maybe`, `Actually...`, and `Let's do it`.
- `interval`: an optional delay in milliseconds between label changes, defaulting to 900 ms.
- `onDecision`: an optional callback receiving the visible choice, its index, and the click event.
- `children`: the stable resting label and fallback when `choices` is empty.

Pointer hover or keyboard focus starts cycling through the choices. Leaving hover and focus returns the button to its resting label. Clicking keeps native `onClick` behavior and also invokes `onDecision` with the currently visible choice. Disabled buttons never start cycling or emit a decision.

The interval is normalized to a finite value with a minimum of 150 ms; invalid values use the 900 ms default. Empty choices fall back to `children`. Timers are cleaned up whenever activation state, props, or component lifetime changes. When the user prefers reduced motion, activation selects the first choice without continuous cycling. Label changes are exposed as button text and do not move or evade the pointer.

## Documentation Application

`apps/docs` uses the Next.js App Router and static export. The visual direction follows shadcn/ui: restrained zinc neutrals, compact typography, subtle borders, generous whitespace, and no decorative animation unrelated to the component.

The initial site is a responsive single-page component catalog containing:

- A compact header and package introduction.
- A large framed live preview of `IndecisiveButton`.
- Controls for choices, interval, shadcn variant, and disabled state.
- A visible record of the last decision emitted by the component.
- Installation instructions, stylesheet import, and a usage snippet.
- A concise API reference and accessibility notes.

Only the interactive playground is a client component. Static explanatory content remains server-rendered and is emitted as HTML during export. Mobile layout stacks preview and controls; desktop layout places them side by side where space permits.

The app imports `IndecisiveButton` from the workspace package rather than duplicating its implementation, ensuring the deployed example exercises the publishable package contract.

## Build And Deployment

The GitHub Actions workflow runs on manual dispatch and tags matching `v*.*.*`, mirroring `greact-hooks`.

The workflow performs these operations in order:

1. Check out the repository and install the pinned pnpm and Node versions.
2. Install dependencies with `--frozen-lockfile`.
3. Run lint and TypeScript checks.
4. Build the root npm package.
5. Publish `gra-ui` to npm using `NPM_TOKEN` and `--no-git-checks`.
6. Build the Next.js documentation application as a static export.
7. Upload `apps/docs/out` and deploy it with GitHub Pages Actions.

The docs build uses the repository path `/gra-ui` as its production `basePath` and asset prefix so client assets resolve on project Pages. Local development runs without that prefix.

Publishing and Pages deployment remain separate jobs, with deployment depending on successful npm publication. GitHub Pages permissions and environment URL reporting follow the existing `greact-hooks` workflow.

## Quality Gates

The repository contains no tests of any kind. It does not include test files, test scripts, test runners, testing libraries, test configuration, coverage configuration, or CI test steps.

Verification is limited to:

- ESLint for the library and documentation code.
- TypeScript checks for both workspaces.
- The Vite library build and declaration generation.
- The Next.js production static-export build.
- Inspection of package contents before publication.

These build-time checks must pass without weakening TypeScript or lint rules.

## Out Of Scope

- Additional gra-ui components.
- A shadcn registry or copy-based installation flow.
- Storybook or another component explorer.
- Theme switching, search, versioned docs, analytics, or a backend.
- Automated tests, visual regression tests, and browser tests.
