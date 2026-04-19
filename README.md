# spec.gesslar.dev

Source for [spec.gesslar.dev](https://spec.gesslar.dev), a [Starlight](https://starlight.astro.build/)
site that hosts specifications authored by @gesslar (LPML, LPCDoc, STUPID, ...).

## Local development

```bash
npm install
npm run dev      # astro dev
npm run build    # astro build
npm run preview  # preview the built site
```

## Adding a new spec

A "spec" is a top-level section with its own sidebar group and landing card.
The sidebar spec-switcher (`src/overrides/Sidebar.astro`) auto-discovers specs
from the sidebar groups in `astro.config.mjs`, so no override edits are needed.

### 1. Create the docs directory

Add content under `src/content/docs/{id}/`, starting with `index.md`:

```text
src/content/docs/{id}/
  index.md
  ...other pages
```

Starlight reads frontmatter (`title`, `description`, `sidebar`) from each page.

Every page **must** include a `description`. The Open Graph image route at
`src/pages/open-graph/[...slug].ts` generates a 1200×630 social card per
page using the frontmatter `title` and `description`. A page without a
description produces a card with an empty subtitle, which looks broken when
the URL is pasted into Discord, Slack, or any other site that unfurls OG
tags.

### 2. Register the sidebar group

In `astro.config.mjs`, append a group to the `sidebar` array:

```js
sidebar: [
  // ...existing specs
  {
    label: '{Display Name}',
    autogenerate: { directory: '{id}' },
  },
],
```

Use `items: [...]` instead of `autogenerate` if you want explicit ordering.

### 3. Add a homepage card

In `src/pages/index.astro`, append an entry to the `specs` array:

```js
{
  title: '{Display Name}',
  description: '{one-line description}',
  href: '/{id}/',
  icon: 'codicon-{name}',
},
```

Codicon reference: https://microsoft.github.io/vscode-codicons/dist/codicon.html

### 4. (Optional) Register a syntax-highlighting grammar

If the spec ships a TextMate grammar, install the package and add it to
`shikiConfig.langs` in `astro.config.mjs`:

```js
import myGrammar from '@scope/my-language-tmgrammar-hl'

markdown: {
  shikiConfig: {
    langs: [
      // ...existing
      { ...myGrammar, name: 'my-lang' },
    ],
  },
},
```

### 5. Verify

```bash
npm run build
```

The new spec should be reachable at `/{id}/` and appear both in the homepage
card grid and in the sidebar spec-switcher dropdown.

## Slug gotchas

A few things to watch out for when wiring sidebar entries and card `href`s:

- Slugs are content-collection paths, not filenames — never include `.md`
  or `.mdx` (e.g., `items: ["index.md"]` will fail with
  `The slug "index.md" specified in the Starlight sidebar config does not exist`).
- An `index.md` collapses to its directory slug. For
  `src/content/docs/{id}/index.md` the slug is `{id}`, not `{id}/index`.
- Slugs and URLs are lowercase. A directory named `STUPID/` routes at
  `/stupid/`, not `/STUPID/`. Keep directory names lowercase and use the
  sidebar `label` for display casing.
