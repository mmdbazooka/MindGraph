# Architecture

## Boundaries

- `src/app`: App Router pages, metadata, layouts, and the Tailwind theme.
- `src/components`: accessible UI primitives, app shell, and preference context.
- `src/features/notes`: domain schemas, initial examples, feature components, and workspace provider.
- `src/lib`: validated persistence and small browser utilities.
- `tests`: Playwright user journeys; domain unit tests sit next to their model.

The dashboard layout owns one workspace provider. All pages share its in-memory snapshot. Writes are validated with Zod and committed to localStorage immediately; no save effect overwrites an unread or corrupt snapshot. A storage event refreshes other tabs. Quota/access failures preserve the in-memory workspace and show an export reminder. Schema version 1 is the import/export contract. Preferences use a separate key so data restoration does not change language or theme.

The note model extracts wiki links and resolves edges by normalized title. The editor separates safe Markdown rendering from editing controls. The graph uses deterministic positions, bounded visible nodes, and keyboard-accessible SVG links; it does not need a canvas engine or external graph service.

## Internationalization

A typed preference context supplies `t(english, persian)`, locale, and theme controls. Product text is paired at its call site. `lang`, `dir`, and theme tokens update at the document root; logical CSS properties make the same component support RTL and LTR. User-created content and imported API responses are never automatically translated.

## Deployment

No application database or secret is needed. The production output is served by Next.js. Local fonts avoid runtime font-service dependencies. Standard security headers disable framing and MIME sniffing and suppress cross-origin referrer transmission. There are no analytics scripts.

## Scope

No multi-user collaboration, cloud sync, full-text search service, attachment store, automatic link rewriting on rename, or offline PWA cache.
