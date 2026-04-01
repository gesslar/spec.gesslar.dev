---
title: Types Overview
---

LPCDoc supports type annotations to improve clarity in documentation. Types are used in `@type`, `@param`, and `@returns` tags to indicate expected values.

## Basic Types

LPCDoc recognizes the following primitive types:

- `int` - An integer.
- `float` - A floating-point number.
- `string` - A sequence of characters.
- `char` - A single character value.
- `object` - An instance of an LPC object.
- `mapping` - A key-value data structure.
- `mixed` - Represents a value that could be of any type.
- `function` <span class="pill pill--fluffos">FluffOS</span> - Represents a function value.
- `closure` <span class="pill pill--ldmud">LDMud</span> - Represents a closure value.
- `buffer` <span class="pill pill--fluffos">FluffOS</span> - A binary data buffer.
- `bytes` <span class="pill pill--ldmud">LDMud</span> - A byte sequence for raw binary data.
- `symbol` <span class="pill pill--ldmud">LDMud</span> - A quoted identifier for use with lambda closures.
- `lwobject` <span class="pill pill--ldmud">LDMud</span> - A lightweight object without persistent identity.
- `coroutine` <span class="pill pill--ldmud">LDMud</span> - A suspendable, resumable function.
- `lpctype` <span class="pill pill--ldmud">LDMud</span> - A first-class type value.
- `quotedarray` <span class="pill pill--ldmud">LDMud</span> - A quoted array for use in lambda closures.
- `status` <span class="pill pill--ldmud">LDMud</span> - A historical alias for `int`.
- `ref` <span class="pill pill--fluffos">FluffOS</span> - A pass-by-reference type modifier.

## Composite Types

To indicate more complex types, or to provide more details, use:

- `string*` - An array of strings. Append `*` to any type.
- `([ string: int ])` - A mapping where keys are strings and values are integers.
- `([ string: int | undefined ])` - A mapping where the keys are strings, but the values may be int or undefined.
- `([ string: int ])*` - An array of mappings where keys are strings and values are integers.
- `int | string` - A union type, meaning the value could be an int or a string.
- `({ "/std/weapon.c", "/std/room.c" })` - A tuple of objects, prototyped as a weapon and a room.

## Special Cases

- `void` - Used for functions that do not return a value.
- `undefined` - Used to indicate a value that is not set or not found.

## Examples

```lpc
/**
 * Converts a number to a string.
 *
 * @param {int} num - The number to convert.
 * @returns {string} The number as a string.
 */
string to_string(int num) {
    return sprintf("%d", num);
}

/**
 * Retrieves an item from a lookup table.
 *
 * @param { ([ string: mixed ]) } table - The lookup table.
 * @param {string} key - The key to look up.
 * @returns {mixed} The value associated with the key.
 */
mixed get_item(mapping table, string key) {
    return table[key];
}
```