# Component Catalog Documentation Design

## Goal

Replace the current single long documentation page with a focused landing page and a browsable component catalog. Every public component must have its own URL, demo, usage example, and API reference. The catalog must provide persistent component navigation similar to the shadcn documentation while retaining the existing gra-ui visual identity.

## Scope

This change covers only the documentation application in `apps/docs`. It does not change the public component library API, package exports, or component behavior.

The documented public components are:

- Button
- IndecisiveButton
- CountedClone
- RepeatChildren
- EqualChoice
- SplitLabel
- FocusFade
- PressEscape
- KeystrokeStack

## Information Architecture

### Landing page: `/`

The landing page contains:

- The existing site header and wordmark.
- A shorter hero with the product statement, installation command, and a primary link to the catalog.
- A featured preview of three components using lightweight cards.
- A concise footer.

The landing page does not contain full demos, prop signatures, API tables, or all component cards.

### Catalog overview: `/components`

The overview uses the documentation shell and contains:

- A short catalog introduction.
- One lightweight card for every public component.
- Links from every card to the component's dedicated page.

### Component pages: `/components/[slug]`

Every component page contains, in this order:

- A breadcrumb back to the catalog.
- The component name and description.
- A framed interactive or static demo.
- A usage code example.
- An API table based on the component's actual public props.

Unknown slugs call Next.js `notFound()`.

## Navigation

A nested layout under `/components` owns the documentation shell.

On desktop, the shell has a sticky left sidebar containing:

- An Overview link.
- All components in a stable order.
- A visible active state and `aria-current="page"` on the current destination.

On mobile, the same links become a compact horizontally scrollable row above the page content. This avoids a client-side drawer and keeps navigation available without additional state or JavaScript.

The global header links to Components and GitHub. Links use real routes rather than page anchors.

## Content Model

A central TypeScript registry is the single source of truth for documentation metadata. Each entry contains:

- Display name.
- URL slug.
- Short and full descriptions.
- Usage source code.
- API rows.
- Optional featured and new flags.
- A demo identifier.

The registry drives:

- Featured landing cards.
- Catalog cards.
- Sidebar navigation.
- Static route generation.
- Page metadata.
- Component page content.

Demo rendering remains separate from the data registry. A focused demo renderer maps the demo identifier to a React demo component. This keeps JSX and client-side behavior out of the metadata file.

## Demo Behavior

The existing interactive demos for IndecisiveButton, EqualChoice, SplitLabel, FocusFade, PressEscape, and KeystrokeStack are preserved. Their existing controls and explanatory mechanisms remain available on their dedicated pages.

Button, CountedClone, and RepeatChildren receive static previews presented in the same framed demo style. Only demos that need state are client components.

All demos remain usable with keyboard navigation and continue to respect reduced-motion preferences inherited from the existing styles and components.

## Visual Design

The redesign keeps the established visual language:

- Light neutral page and white panels.
- Fine gray borders.
- Editorial serif display headings.
- Sans-serif interface copy.
- Green status accent.
- Dark code panels.

The documentation shell introduces a narrower reading column and clear sidebar separation. Component pages use consistent vertical spacing and section labels. Catalog cards remove the verbose signatures and examples currently displayed on the landing page.

Responsive behavior must work at desktop and mobile widths. Content, code samples, API tables, and navigation may scroll horizontally where necessary but must not force the document viewport wider than the screen.

## Rendering And Errors

Component pages are statically generated from the registry with `generateStaticParams`. Page titles and descriptions are generated per component. The registry lookup happens on the server; no global client state or data fetching is introduced.

Missing registry entries return the standard 404 page. The documentation has no runtime network dependency and therefore requires no loading or request error states.

## Accessibility

The implementation must include:

- Named global and catalog navigation landmarks.
- One clear page-level heading per route.
- Logical heading hierarchy for demo, usage, and API sections.
- `aria-current="page"` for active navigation entries.
- Keyboard-accessible links, controls, and horizontally scrollable navigation.
- Existing reduced-motion behavior.
- Sufficient color contrast using the existing palette.

## Validation

The implementation is complete when:

- `/` contains only the compact landing content and three featured components.
- `/components` lists all nine public components.
- Every component has a working dedicated route.
- The desktop sidebar and compact mobile navigation expose all components.
- Every component page includes a demo, usage example, and API reference.
- Unknown component slugs return 404.
- `pnpm lint` passes.
- Library and documentation typechecks pass.
- The package and documentation production builds pass.

The repository currently has no automated test suite. No new test framework is introduced for this documentation-only restructuring.
