---
title: Composite Types
description: Composite LPC types — typed arrays, typed mappings, classes, and unions — and how to annotate them using LPCDoc type syntax.
---

This section describes composite types in LPC and how to document them using
LPCDoc annotations.

## Typed Arrays

To annotate an array of a specific type, append `*` to the element type. This
is the most common composite annotation in LPCDoc.

**Syntax:** `{type*}`

### Annotation Usage

```lpc
/**
 * @param {string*} names - An array of player names.
 * @returns {int} The number of names in the array.
 */
int count_names(string *names) {
  return sizeof(names);
}
```

Typed arrays work with any type — primitives, named objects, classes, and
other composites:

```lpc
/**
 * @param {"/std/player.c"*} players - An array of player objects.
 * @param {([ string: int ])*} score_maps - An array of score mappings.
 * @param {class ShopItem*} items - An array of ShopItem instances.
 */
```

The array marker works with every [named object](../primitives/#object-object)
spelling — a quoted path, LD's `object` prefix, or a macro:

```lpc
/**
 * @param {"/std/player.c"*} a - Quoted path.
 * @param {object "/std/player.c"*} b - Named object syntax.
 * @param {object STD_PLAYER*} c - Named object syntax with a macro.
 */
```

For an array that can hold any type, use `mixed*`:

```lpc
/**
 * @returns {mixed*} An array containing various types of values.
 */
mixed *get_mixed_data() {
  return ({ "text", 42, this_object() });
}
```

## Mappings with Specific Key-Value Types

Mappings are key-value data structures. The basic mapping type is annotated as `mapping`, but you can provide more detail using the `([ keytype: valuetype ])` notation.

**Syntax:** `{([ keytype: valuetype ])}`

The value may be any type, including an array, a union, or another mapping.
When a value can be one of several types, use a union:
`([ string: int | float ])`.

### Annotation Usage

```lpc
/**
 * @param {([ string: int ])} scores - A mapping of player names to their scores.
 * @returns {int} The total score.
 */
int calculate_total_score(mapping scores) {
    int total = 0;
    foreach (string player, int score in scores) {
        total += score;
    }
    return total;
}
```

A mapping annotation refines a declared `mapping`. The `mapping` keyword can't
describe keys or values, so the annotation supplies them, the same way
`{"/std/room.c"}` refines a declared `object`. Reading an entry, whether with
`m[key]`, FluffOS's `m.key`, or a `foreach` value variable, gives the
annotated value type.

## Mapping Shapes

A mapping often holds a fixed set of named keys, each with its own type, like
a record. List the entries, separated by commas, to describe that **shape**:

**Syntax:** `{([ "key1": type1, "key2": type2 ])}`

```lpc
/**
 * @type {([ "name": string, "hp": int, "skills": string* ])}
 */
mapping player;

void show() {
    string name = player["name"]; // string
    int hp = player.hp;           // int (FluffOS dot access)
}
```

Shapes are **open**. A shape describes the keys it lists and doesn't rule out
others:

- A listed key reads as its own type (`player["name"]` is `string`).
- A key that isn't listed reads as `mixed`.
- A computed key, where the key isn't known until runtime, reads as the union
  of every listed value type (`player[k]` is `string | int | string*`).

### Key kinds

The key position of an entry accepts:

| Key                            | Meaning                                                  |
| ------------------------------ | -------------------------------------------------------- |
| A type — `string`, `int`, ...  | Any key of that type.                                    |
| A string literal — `"name"`    | That exact key.                                          |
| An integer literal — `5`       | That exact key.                                          |
| A path — `"/std/user.c"`       | A [named object](../primitives/#object-object) used as the key.  |

A string literal that looks like a path (it contains a `/`) is read as a named
object, not as a key name. Paths always contain a separator, so the two can't
be confused. Macros work in key position too, so
`([ STD_USER: float ])` is a mapping keyed by user objects.

Paths and path macros resolve anywhere inside a mapping type, not only as a
bare key or value. `([ string: STD_USER* ])`, `([ string: int | STD_USER ])`,
and `([ string: (STD_USER | STD_NPC)* ])` all resolve to named objects.

Entries with type keys can be mixed in a single annotation, such as
`([ string: int, int: string ])`.

### Nested shapes

Shapes and mapping types nest in either position, and reads pass through each
level:

```lpc
/**
 * @type {([ string: ([ "roles": string*, "inherits": string* ]) ])}
 */
mapping access_rules;

void check() {
    string *roles = access_rules["wiz"]["roles"]; // string*
}
```

### Naming a shape

To reuse a shape, give it a name with [`@typedef {mapping}`](../../tags/#typedef)
and one `@property` per key. Reading a key from a named shape gives the same
type as reading it from the equivalent inline shape.

```lpc
/**
 * @typedef {mapping} Person
 * @property {string} name - The person's name.
 * @property {int} hp - Current hit points.
 */

/**
 * @param {Person} who - The person to describe.
 */
void describe(mapping who) {
    write(who["name"] + " has " + who["hp"] + " hp.\n");
}
```

### Multi-value mappings <span class="pill pill--ldmud">LDMud</span>

In an LDMud mapping, one key can hold several value columns. As in mapping
literals, the columns are separated with `;`:

```lpc
/**
 * @type {([ string: int; float ])}
 */
mapping stats;
```

A single mapping type can't express more than one value column, so the
language server treats this annotation as a plain `mapping`. Don't separate
columns with `,`. A comma separates **entries**.

## Union Types

Union types indicate that a value could be one of several specified types, separated by the pipe (`|`) character.

### Annotation Usage

```lpc
/**
 * @param {int | string} value - Either a numeric ID or a string name.
 * @returns {object} The found entity.
 */
object find_entity(mixed value) {
    if (intp(value)) {
        return find_entity_by_id(value);
    }
    return find_entity_by_name(value);
}
```

### Arrays of unions

`*` binds to the type just before it, so `int | string*` is an `int` or an
array of strings. To describe an array whose elements may be either type, wrap
the union in parentheses:

```lpc
/**
 * @param {(int | string)*} ids - Numeric IDs, names, or a mix of both.
 */
```

## Nested Composite Types

More complex data structures can be documented using nested type annotations.

### Annotation Usage

```lpc
/**
 * @param {([ string: ([ string: int ]) ])} nested_data - Player categories with player names and scores.
 * @returns {([ string: int ])} Average scores by category.
 */
mapping calculate_category_averages(mapping nested_data) {
    mapping averages = ([]);
    foreach (string category, mapping players in nested_data) {
        int total = 0;
        int count = 0;
        foreach (string player, int score in players) {
            total += score;
            count++;
        }
        averages[category] = count ? total / count : 0;
    }
    return averages;
}
```
