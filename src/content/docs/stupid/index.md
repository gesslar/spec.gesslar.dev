---
title: STUPID.md
sidebar:
  order: 1
---

A convention for documenting load-bearing workarounds in software projects.

---

## Purpose

`STUPID.md` is a project file that catalogues workarounds, patches, and
contortions that exist in a codebase not because they are correct, but because
 else is more wrong. It is distinct from setup documentation (which explains
 what is expected) and from general developer notes (which explain intent). Its
 specific domain is the unexpected: the thing a future maintainer would remove
 in a cleanup pass, break the build, and spend hours discovering why it was
 there.

The name is deliberately non-committal about whose fault any given entry is.
Some entries are upstream tools failing to handle a common case. Some are
missing flags that weren't found in time. Some are the author's own doing.
The file does not adjudicate blame — it documents cost.

---

## When to add an entry

An entry belongs in `STUPID.md` if all of the following are true:

- It is a workaround for something that should have been handled by an external
  tool, framework, or upstream dependency.
- It looks wrong, or surprising, or unnecessarily complicated to someone
  reading it cold.
- Removing it would break something, subtly or catastrophically.
- It is not covered by setup documentation (prerequisites, toolchain
  requirements, environment configuration).

If a future contributor might reasonably "clean it up," it belongs here.

---

## When not to add an entry

- Normal build prerequisites and toolchain setup — those belong in `BUILD.md`,
  `DEVELOPMENT.md`, or equivalent.
- Deliberate architectural decisions, even unusual ones — those belong in
  `ARCHITECTURE.md` or inline comments.
- Workarounds for your own deliberate design choices — that's architecture,
  not stupidity. `STUPID.md` is for problems imposed from outside the
  codebase's own decisions.
- Known bugs or planned improvements — those belong in your issue tracker.

---

## Entry format

Each entry is a level-3 heading followed by the fields below.

| Field | Required | Description |
|---|---|---|
| Heading | required | A short, plain-language description of what the workaround does. Not what caused it. |
| File reference | required | At least one `path/to/file:line` reference so the workaround can be located and verified. |
| Body | required | What the problem is, what tool or upstream is responsible (if known), and what the workaround does. Enough detail that a maintainer does not rediscover the problem from scratch. |
| Upstream reference | optional | A link to the issue, PR, or bug report that documents the upstream failure, if one exists. |

---

## Example entry

Fields appear in order: level-3 heading, file reference on its own line,
body paragraph, then a `See:` line for the optional upstream reference.

```markdown
### Blanket-disable WebKit's DMABUF renderer on Linux

`src-tauri/src/lib.rs:71-83`

The WebKit DMABUF renderer crashes on X11 + NVIDIA. We set
`WEBKIT_DISABLE_DMABUF_RENDERER=1` before Tauri spawns any threads,
because `std::env::set_var` is `unsafe` for exactly that reason.

See: [tauri-apps/tauri#8541](https://github.com/tauri-apps/tauri/issues/8541)
```

---

## Document structure

Entries should be grouped into sections if the project has distinct domains of
stupidity (e.g. build-time vs. runtime vs. packaging). A flat list is fine for
smaller projects. Sections use level-2 headings.

The file must include a `## Fixed` section at the bottom. When an upstream tool
resolves a problem and the workaround is removed, the entry moves here rather
than being deleted. Include the date the fix landed and what resolved it.
Fixes are worth celebrating.

---

## Tone

The file should be factual enough to be actionable. Tone is at the author's
discretion — dry, clinical, or gallows-humour are all fine — but each entry
must contain enough detail that a future maintainer can understand the problem
without reproducing it. Information without venting is fine; venting without
information is not.

---

## Relationship to other project files

| File | Domain |
|---|---|
| `BUILD` / `DEVELOPMENT` | Setup steps and prerequisites. Expected friction. Not stupid. |
| `CONTRIBUTING` | How to participate. Process, not workarounds. |
| `CHANGELOG` | What changed between versions. `STUPID.md` tracks what stays broken. |
| Inline comments | Explain intent at the call site. `STUPID.md` explains why the call site exists at all. |

---

## Contributing to STUPID.md

New entries require a file and line reference so the workaround can be
verified. Corrections are valid contributions: if an entry turns out to have a
cleaner solution (a flag that does it properly, an upstream fix that landed),
open a PR that moves the entry to `## Fixed` with the correction noted. "Hey,
there's a flag for that" is a perfectly good contribution.
