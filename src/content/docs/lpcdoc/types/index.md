---
title: Types Overview
description: Overview of LPCDoc type annotations — primitives, composites, and driver-specific types for FluffOS and LDMud used in `@type`, `@param`, and `@returns` tags.
---

LPCDoc supports type annotations to improve clarity in documentation. Types are used in `@type`, `@param`, and `@returns` tags to indicate expected values.

## Basic Types

LPCDoc recognizes the following primitive types:

- `int` - An integer.
- `float` - A floating-point number.
- `string` - A sequence of characters.
- `object` - An instance of an LPC object.
- `mapping` - A key-value data structure.
- `mixed` - Represents a value that could be of any type.
- `function` <span class="pill pill--fluffos">FluffOS</span> - Represents a function value.
- `closure` <span class="pill pill--ldmud">LDMud</span> - Represents a closure value.
- `buffer` <span class="pill pill--fluffos">FluffOS</span> - A binary data buffer.
- `bytes` <span class="pill pill--ldmud">LDMud</span> - A byte sequence for raw binary data.
- `symbol` <span class="pill pill--ldmud">LDMud</span> - A quoted identifier for use with lambda closures.
- `lwobject` <span class="pill pill--ldmud">LDMud</span> - A lightweight object without persistent identity.
- `status` <span class="pill pill--ldmud">LDMud</span> - A historical alias for `int`.

## Modifiers

Modifiers are keywords or symbols that sit next to a type in a declaration. They
change how a value is passed, not what type it is, so they are not types
themselves.

- `&` <span class="pill pill--fluffos">FluffOS</span> - Marks a pass-by-reference parameter. The `ref` keyword or its `&` sugar follows the type in both places, so the annotation mirrors the signature — code `int & name` (or `int ref name`) pairs with `@param {int} & name`. See [Reference parameters](../tags/#reference-parameters).
- `...` - Marks a variadic (rest) parameter that accepts any number of trailing arguments. Prefix the type in the annotation — `@param {...int} rest`.

## Composite Types

To indicate more complex types, or to provide more details, use:

- `string*` - An array of strings. Append `*` to any type.
- `([ string: int ])` - A mapping where keys are strings and values are integers.
- `([ string: int | undefined ])` - A mapping where the keys are strings, but the values may be int or undefined.
- `([ string: int ])*` - An array of mappings where keys are strings and values are integers.
- `int | string` - A union type, meaning the value could be an int or a string.

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
