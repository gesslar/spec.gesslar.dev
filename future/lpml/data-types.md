---
title: Data Types
sidebar:
  order: 3
---

## Primitives

```lpml
{
  string: "text",
  number: 42,
  float: 3.14,
  boolean: true,
  null: null
}
```

## Arrays

```lpml
{
  array: [1, 2, 3],
  mixed: ["string", 42, true, null],
  nested: [[1, 2], [3, 4]],
  trailing: [1, 2, 3,]  // Trailing comma OK
}
```

## Objects (Mappings)

```lpml
{
  simple: { x: 1, y: 2 },
  nested: {
    stats: {
      str: 10,
      dex: 15
    }
  },
  trailing: { a: 1, b: 2, }  // Trailing comma OK
}
```

---

## Special Values

### Infinity and NaN

```lpml
{
  inf: Infinity,      // Maps to undefined in LPC
  negInf: -Infinity,  // Maps to undefined in LPC
  notANumber: NaN     // Maps to undefined in LPC
}
```

**Note:** LPC doesn't have native Infinity/NaN support, so these are converted to `undefined` (accessed as `([])[0]`).

### MAX_INT and MAX_FLOAT

```lpml
{
  maxInt: MAX_INT,       // LPC maximum integer value
  minInt: -MAX_INT,      // Negated MAX_INT
  maxFloat: MAX_FLOAT,   // LPC maximum float value
  minFloat: -MAX_FLOAT,  // Negated MAX_FLOAT
}
```

**Note:** These are LPC-specific constants. Signs (`+`/`-`) are supported.

---

## Escape Sequences

Standard JSON escape sequences are supported:

```lpml
{
  newline: "line1\nline2",
  tab: "col1\tcol2",
  quote: "He said \"hello\"",
  backslash: "path\\to\\file",
  unicode: "\u0041"  // 'A'
}
```

Supported escapes:
- `\"` - Double quote
- `\'` - Single quote
- `\\` - Backslash
- `\/` - Forward slash
- `\b` - Backspace
- `\f` - Form feed
- `\n` - Newline
- `\r` - Carriage return
- `\t` - Tab
- `\uXXXX` - Unicode code point