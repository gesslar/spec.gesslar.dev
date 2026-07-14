---
title: Special Type Annotations
description: Special LPCDoc type annotations — such as `undefined` — that don't map to LPC primitives but are useful for distinguishing cases like "not found" from a real value.
---

This section covers special type annotations used in LPCDoc that don't directly
correspond to LPC primitive types but are useful for documentation purposes.

## Undefined (`undefined`)

In LPC, accessing a non-existent key in a mapping or a non-existent index in an
array returns `0`, which is an integer value. However, when documenting
functions, it's often important to distinguish between a legitimate `0` return
value and a "not found" or "undefined" result.

The `undefined` annotation helps document this special case.

### Annotation Usage

```lpc
/**
 * @param {mapping} data - A mapping of player information.
 * @param {string} player_name - The name of the player to look up.
 * @returns {int | undefined} The score for the player, or undefined if player not found.
 */
int get_score(mapping data, string player_name) {
    return data[player_name]["score"];
}
```

```lpc
/**
 * @param {mapping} items - A mapping of item names to quantities.
 * @param {string} item_name - The name of the item to check.
 * @returns {int | undefined} The quantity of the item, or undefined if not in inventory.
 */
int check_inventory(mapping items, string item_name) {
    return items[item_name];
}
```

## Void (`void`)

Although `void` is not a type that can be assigned to a variable in LPC, it's
used in function declarations to indicate that the function does not return a
value. When documenting functions with `@returns`, it's useful to explicitly
state when a function doesn't return anything.

### Annotation Usage

```lpc
/**
 * @param {string} message - The message to display.
 * @returns {void} This function does not return a value.
 */
void log_message(string message) {
    write_file("/log/system.log", message + "\n");
}
```

## Multiple Return Types

Sometimes functions can return different types depending on their inputs or
conditions. LPCDoc uses [union types](composites#union-types) to indicate
multiple possible return types.

### Annotation Usage

```lpc
/**
 * @param {string} identifier - An entity identifier.
 * @returns {object | string} The entity object if found, or an error message string if not found.
 */
mixed find_entity(string identifier) {
    object entity = find_object(identifier);
    if (!entity) {
        return "Entity not found: " + identifier;
    }
    return entity;
}
```

## Optional Types

For parameters or return values that might not always be present, LPCDoc uses
optional type notation, surrounding the variable name with `[]`.

### Annotation Usage

```lpc
/**
 * @param {string} name - The name to look up.
 * @param {mapping} [options] - Optional settings for the lookup.
 * @returns {object} The found entity.
 */
object find_by_name(string name, mapping options) {
    // Implementation
}
```

To specify a value that is used as a default, either because the driver permits
default parameters, or one is set within the function body upon detection of an
undefined argument, you may add `=value`.

```lpc
/**
 * @param {string} [which="door"] - The specific door to unlock.
 * @returns {int} 1 if successful, otherwise 0.
 */
int unlock(string which) {
  which = which || "door";
}
```

To document a value that may hold **any** type, use [`mixed`](primitives#mixed).
LPCDoc has no separate "any" annotation — a bare `*` is the array suffix, not a
wildcard — so `mixed` is the way to express it.

These special type annotations help document code behavior accurately even when
the underlying language might not have a dedicated type for these concepts.
