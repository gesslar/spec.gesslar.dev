---
title: Composite Types
---

This section describes composite types in LPC and how to document them using
LPCDoc annotations.

## Typed Arrays

To annotate an array of a specific type, append `*` to the element type. This
is the most common composite annotation in LPCDoc.

**Syntax:** `{type*}`

### Annotation Usage

```c
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

```c
/**
 * @param {("/std/player.c")*} players - An array of player objects.
 * @param {([ string: int ])*} score_maps - An array of score mappings.
 * @param {class ShopItem*} items - An array of ShopItem instances.
 */
```

For an array that can hold any type, use `mixed*`:

```c
/**
 * @returns {mixed*} An array containing various types of values.
 */
mixed *get_mixed_data() {
  return ({ "text", 42, this_object() });
}
```

## Mappings with Specific Key-Value Types

Mappings are key-value data structures. The basic mapping type is annotated as `mapping`, but you can provide more detail using the `([ keytype: valuetype ])` notation.

### Annotation Usage

```c
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

## Union Types

Union types indicate that a value could be one of several specified types, separated by the pipe (`|`) character.

### Annotation Usage

```c
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

## Parenthesized Union Arrays

To annotate an array whose elements can be one of several types, wrap the
union in parentheses and apply the `*` postfix.

**Syntax:** `{(type1 | type2)*}`

### Annotation Usage

```c
/**
 * @type {(int | string)*}
 */
mixed *ids;

/**
 * @param {(STD_ARMOR | STD_CLOTHING)*} equipment - An array of equipment objects.
 * @returns {int} The total armor class.
 */
int calculate_ac(object *equipment) {
    int ac = 0;
    foreach (object item in equipment) {
        ac += item->query_ac();
    }
    return ac;
}
```

Parentheses can also be used without `*` to group types for clarity:

```c
/**
 * @type {(int | string)}
 */
mixed val;
```

## Nested Composite Types

More complex data structures can be documented using nested type annotations.

### Annotation Usage

```c
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

## Tuples

Tuples represent fixed-size collections of elements with potentially different types.

### Annotation Usage

```c
/**
 * @returns {({ string, int, object })} A tuple containing name, age, and object reference.
 */
mixed *get_player_data() {
    object player = this_player();
    return ({ player->query_name(), player->query_age(), player });
}
```

## Function References

Function references can be annotated with their parameter and return types.

### Annotation Usage

```c
/**
 * @param {function(int, int): int} callback - A function that takes two integers and returns an integer.
 * @returns {int} The result of applying the callback to 10 and 20.
 */
int apply_callback(function callback) {
    return evaluate(callback, 10, 20);
}
```

For a closure:

```c
/**
 * @returns {function(string): void} A function that displays a message.
 */
function get_display_function() {
    return (: write :);
}
```
