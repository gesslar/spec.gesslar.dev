---
title: Syntax
sidebar_position: 2
---

# Syntax

## Base Syntax (JSON5)

LPML is built on JSON5, which extends JSON with:

### Comments
```lpml
// Single-line comments
/* Multi-line
   comments */
```

### Unquoted Keys
```lpml
{
  name: "Gesslar",           // Simple identifier
  my cool key: "value",      // Spacey keys (YAML-style)
  additional ids: [1, 2, 3], // Works great!
  'quoted-key': "value"      // Use quotes when needed
}
```

**Spacey Keys:** LPML supports YAML-style keys with spaces - just write the key naturally and end it with `:`. The parser reads everything until the colon as the key name.

### Trailing Commas
```lpml
{
  foo: "bar",
  baz: 42,  // ← trailing comma is fine
}
```

### Single-Quoted Strings
```lpml
name: 'single quotes work too'
```

### Number Formats
```lpml
{
  hex: 0xFF,           // Hexadecimal
  octal: 0o77,         // Octal
  binary: 0b1010,      // Binary
  decimal: 3.14,       // Standard
  leadingDot: .5,      // Leading decimal point
  trailingDot: 5.,     // Trailing decimal point
  positive: +42        // Plus sign allowed
}
```

---

## LPML Extensions

### Spacey Keys (YAML-style)

Unlike JSON5, LPML allows keys with spaces without requiring quotes:

```lpml
{
  // All of these are valid:
  simple: "value",
  two words: "value",
  multiple word key: "value",
  crafting material: "leather",

  // Still works with quotes if you need them:
  "key: with colon": "value",
  'single quoted': "value"
}
```

**How it works:**
- The parser reads everything from the start of the key until it finds `:`
- Leading and trailing whitespace is trimmed
- Works alongside traditional identifiers and quoted keys

**Examples:**
```lpml
{
  // Character data with natural keys
  hit points: 100,
  mana points: 50,
  experience points: 1500,

  // Crafting materials
  crafting material: "yes",
  material type: "leather",
  quality level: "high"
}
```

### String Concatenation

Adjacent strings are automatically concatenated with intelligent spacing:

```lpml
// Concatenation with spaces (default)
bio: "A seasoned adventurer"
     "from the West."
// Result: "A seasoned adventurer from the West."

// Preserve newlines when strings end with \n
poem: "Line 1\n"
      "Line 2\n"
      "Line 3"
// Result: "Line 1\nLine 2\nLine 3"

// Mixed mode
text: "First paragraph."
      "Second sentence.\n"
      "New paragraph."
// Result: "First paragraph. Second sentence.\nNew paragraph."
```

**Rules:**
1. If a string ends with `\n`, the next string concatenates **without** adding a space
2. Otherwise, strings are joined with a single space
3. Works with any quote style: `"..."`, `'...'`

### Multiline Strings

Strings can span multiple lines in the source:

```lpml
// Source spans multiple lines
description: "This is a long
              description that spans
              multiple lines."
// Result: "This is a long description that spans multiple lines."
```

**Folding behavior:**
- Actual newlines in the source (pressing Enter) are converted to spaces
- Escape sequences like `\n` are preserved as actual newlines

### File Includes

:::note
File includes are an optional feature of LPML. This section describes the syntax and expected semantics, but the actual behavior depends on the implementation. An implementation may choose not to support file includes, or may resolve them differently.
:::

A string value beginning with `#` followed by a path denotes a file include:

```lpml
{
  // Absolute path
  config: "#/home/user/config.lpml",

  // Relative path
  stats: "#./stats.lpml",
  parent: "#../shared.lpml",
}
```

**Specified behavior:**
1. A conforming implementation SHOULD replace the `#path` value with the parsed contents of the referenced file
2. Included files SHOULD be recursively processed (supporting nested includes)
3. How relative paths are resolved is implementation-defined
4. If a file cannot be found, an implementation SHOULD keep the include string as its literal value (graceful degradation)
5. Include syntax works with both double and single quotes

**Escaping includes:**
```lpml
{
  channel: "\#general"  // → "#general" (literal)
}
```

The `\#` escape prevents include processing and produces a literal `#` in the resulting string.
