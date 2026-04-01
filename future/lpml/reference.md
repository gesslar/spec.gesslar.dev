---
title: Reference
sidebar:
  order: 5
---

## File Extension

Recommended: `.lpml`

Alternative: `.json` or `.json5` for editor syntax highlighting

---

## Differences from JSON5

| Feature | JSON5 | LPML |
|---------|-------|------|
| Comments | ✓ | ✓ |
| Trailing commas | ✓ | ✓ |
| Unquoted keys | ✓ | ✓ |
| Spacey keys | ✗ | ✓ |
| Single quotes | ✓ | ✓ |
| Hex numbers | ✓ | ✓ |
| Octal/binary numbers | ✗ | ✓ |
| MAX_INT/MAX_FLOAT | ✗ | ✓ |
| String concatenation | ✗ | ✓ |
| File includes | ✗ | ✓ |
| Multiline folding | ✗ | ✓ |

---

## Grammar Summary

```
value       ::= object | array | string | number | boolean | null
                | 'undefined' | 'Infinity' | 'NaN' | 'MAX_INT' | 'MAX_FLOAT'
object      ::= '{' members? '}'
members     ::= pair (',' pair)* ','?
pair        ::= key ':' value
key         ::= identifier | spacey_key | string
spacey_key  ::= (char - ':')+ ':'           // trimmed, unquoted key with spaces
array       ::= '[' elements? ']'
elements    ::= value (',' value)* ','?
string      ::= '"' chars '"' | "'" chars "'" | string string  // concatenation
number      ::= hex | octal | binary | decimal
boolean     ::= 'true' | 'false'
null        ::= 'null'
comment     ::= '//' [^\n]* | '/*' .*? '*/'
```

---

## Credits

Created by Gesslar. Based on the [JSON5 specification](https://json5.org/).

## License

[Unlicense](https://unlicense.org/) — public domain.