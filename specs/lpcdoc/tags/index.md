---
title: Tags Reference
hide_title: true
toc_max_heading_level: 2
---

Tags are special LPCDoc annotations prefixed with `@` that provide structured
information about code elements. They are placed within doc comments (`/** */`),
after the descriptive text.

```c
/**
 * Description of the element.
 *
 * @tag ...
 */
```

---

## `@param`

Documents a function parameter. The `{type}` can be any
[primitive](../types/primitives), [composite](../types/composites), or
[special](../types/special) type.

**Syntax:** `@param {type} name - Description`

```c
/**
 * @param {int} attack - The attack power value.
 * @param {string} target - The name of the target.
 */
```

### Optional parameters

Wrap the parameter name in brackets to indicate it is optional.

```c
/**
 * @param {mapping} [options] - Optional configuration settings.
 */
```

### Default values

Append `=value` inside the brackets to document a default.

```c
/**
 * @param {string} [which="door"] - The specific door to unlock.
 */
int unlock(string which) {
  which = which || "door";
}
```

### Reference parameters

In FluffOS, parameters passed by reference can be documented with `&`.

```c
/**
 * @param {int} &value - A reference to an integer that will be modified.
 */
void increment(int ref value) {
  value++;
}
```

## `@returns`

Documents the return value of a function. The `{type}` can be any
[primitive](../types/primitives), [composite](../types/composites), or
[special](../types/special) type.

**Syntax:** `@returns {type} Description`

```c
/**
 * @returns {int} The calculated damage amount.
 */
```

When a function may return different types depending on conditions, use a union
type.

```c
/**
 * @returns {object | string} The entity if found, or an error message.
 */
```

### Type Predicates

A special form of `@returns` enables **type narrowing** in conditional
branches. Instead of documenting a return type, it declares that the function
acts as a type guard for one of its parameters.

**Syntax:** `@returns {paramName is type}`

Where `paramName` is the name of a parameter in the function signature and
`type` is the type it should be narrowed to when the function returns a truthy
value.

```c
/**
 * @param {mixed} arg
 * @returns {arg is string}
 */
int stringp(mixed arg);
```

When this function is called inside a conditional, the language server narrows
the tested variable to the predicate type within the true branch:

```c
void test() {
    mixed o;
    if(stringp(o)) {
        // o is narrowed to string here
        string s = o; // OK
    }
}
```

The type predicate does not change the function's actual return type. The
function still returns its declared type (e.g., `int`); the predicate only
informs the language server's flow analysis.

Type predicates work with any valid type, including primitives, composites, and
object file paths:

```c
/**
 * @param {mixed} arg
 * @returns {arg is mixed*}
 */
int pointerp(mixed arg);

/**
 * @param {mixed} o
 * @returns {o is "/std/living.c"}
 */
int is_living(mixed o);
```

Type predicates are not limited to simple type-checking functions. Any function
that returns a truthy or falsy value can use a predicate to narrow a parameter.
A description may follow the predicate to document the return value for human
readers:

```c
/**
 * Returns the original object if it is a user, otherwise 0.
 *
 * @param {object} ob - Some object.
 * @returns {ob is "/std/user.c"} The original object if it is a user, or 0.
 */
object get_user(object ob) {
    return ob->is_user() ? ob : 0;
}
```

```c
void test() {
    object thing = find_object("/some/npc");
    if(get_user(thing)) {
        // thing is narrowed to "/std/user.c" here
        thing->send_message("Hello!");
    }
}
```

Preprocessor defines are resolved in type predicates, so you can use macros
as the target type:

```c
#define STD_USER "/std/user.c"

/**
 * @param {object} ob - Some object.
 * @returns {ob is STD_USER} 1 if ob is a user object.
 */
int is_user(object ob);
```

## `@throws`

Documents conditions that cause a `throw()`. A `throw()` is a soft error — it
can be intercepted by `catch()` and does not generate a stack trace. This is the
mechanism for recoverable exceptions.

**Syntax:** `@throws Description of the condition`

```c
/**
 * @throws If the configuration file was not found.
 */
```

Multiple `@throws` tags can be used when a function has several throw
conditions.

## `@errors`

Documents conditions that trigger a hard error — `error()` in FluffOS or
`raise_error()` in LDMud. Unlike `throw()`, a hard error generates a full
stack trace and is expensive. LPC distinguishes between soft errors (`throw()`)
and hard errors where languages like JavaScript do not, and `@errors` exists to
document that distinction.

**Syntax:** `@errors Description of the condition`

```c
/**
 * @errors If the crafter lacks required skills.
 * @errors If components are missing or of insufficient quality.
 */
```

:::note
Language server support for this tag is pending — a PR has been opened to add
recognition for `@errors`.
:::

## `@type`

Documents the type of a variable or expression.

**Syntax:** `@type {type}`

### Variable annotation

```c
/**
 * @type {int} Maximum health points for a player.
 */
int MAX_PLAYER_HP = 1000;

/**
 * @type {([ string: int ])} Mapping of damage types to resistance values.
 */
mapping resistances = ([ "fire": 10, "cold": 5, "physical": 3 ]);
```

### Inline expression casting

You can annotate an expression inline to assert its type.

```c
object p = /** @type {"/std/player.c"} */(get_player());
```

## `@var`

Documents the type of an inherited variable. Use this when a variable is
declared in a parent object and you want to provide type information in the
inheriting file.

**Syntax:** `@var {type} Description`

```c
/**
 * @var {([ string: int ])} Inherited mapping of skill names to levels.
 */
```

## `@typedef`

Defines a named type alias or a structured shape. This is useful for
documenting complex data structures — like the expected shape of a mapping —
without needing a `class` or `struct` definition. The language server resolves
object paths in `@typedef` tags and provides IntelliSense for the defined type.

**Syntax:** `@typedef {type} Name` or `@typedef Name` followed by `@property`
tags

### Simple type alias

```c
/**
 * @typedef {int | string} Identifier
 */
```

### Structured shape with properties

Use `@property` tags to define the members of the type. This is the "shape
definer" — it lets you describe what keys a mapping or data structure is
expected to have, along with their types.

```c
/**
 * @typedef PlayerData
 * @property {string} name - The player's display name.
 * @property {int} level - Current experience level.
 * @property {"/std/guild.c"} guild - The player's guild object.
 * @property {int} hp - Current hit points.
 * @property {int} max_hp - Maximum hit points.
 */
```

You can then use the typedef name in other annotations:

```c
/**
 * @param {string} player_name - The name to look up.
 * @returns {PlayerData} The player's data record.
 */
mapping get_player_data(string player_name) {
  // Implementation
}
```

### Object path resolution

Object paths used within `@typedef` are resolved by the language server,
giving you full IntelliSense when referencing those types:

```c
/**
 * @typedef PartyMember
 * @property {"/std/player.c"} player - The player object.
 * @property {string} role - Role in the party (tank, healer, etc.).
 * @property {int} joined - Timestamp when they joined.
 */
```

## `@callback`

Documents a function that is passed as an argument to another function. Use
this to describe the expected signature of callback parameters.

**Syntax:** `@callback name`

```c
/**
 * @callback sort_func
 * @param {mixed} a - The first element to compare.
 * @param {mixed} b - The second element to compare.
 * @returns {int} Negative, zero, or positive comparison result.
 */
```

## `@property`

Documents a property of a class or struct. Used in the doc comment immediately
above the class/struct definition.

**Syntax:** `@property {type} name - Description`

```c
/**
 * Represents an item available for purchase.
 *
 * @property {string} short - Display name shown in shop menus.
 * @property {string} file - Full path to the item's source file.
 * @property {int} cost - Purchase price.
 * @property {int} stock - Current quantity available.
 */
class ShopItem {
  string short;
  string file;
  int cost;
  int stock;
}
```

## `@example`

Provides an example code snippet demonstrating usage.

**Syntax:** `@example` followed by code on subsequent lines

```c
/**
 * Transfers items between two containers.
 *
 * @example
 * int moved = transfer_items(player, chest, "gold_coin", 100);
 * if (moved < 100) {
 *     write("Could only move " + moved + " coins.");
 * }
 */
```

## `@deprecated`

Marks a function, variable, or other element as deprecated. Include a
description of what to use instead.

**Syntax:** `@deprecated Description or replacement`

```c
/**
 * @deprecated Use query_experience() instead.
 */
int get_exp(string player_name) {
  return find_player(player_name)->query_experience();
}
```

## `@file`

Provides file-level documentation. Placed at the top of a file to describe its
purpose.

**Syntax:** `@file path/to/file.c`

```c
/**
 * @file /d/area/monsters/dragon.c
 *
 * Implements the elder dragon NPC with fire-breath attacks
 * and treasure hoarding behavior.
 */
```

## `@see`

Creates a reference to another function, file, or resource.

**Syntax:** `@see reference`

```c
/**
 * @see check_crafting_skills
 * @see /std/container.c
 */
```

## `@override`

Indicates that a function overrides an inherited definition.

```c
/**
 * @override
 * @param {string} msg - The message to receive.
 */
void receive_message(string msg) {
  // Custom implementation
}
```

## `@inheritdoc`

Indicates that a function's documentation should be inherited from the parent
definition. When the language server encounters this tag, it pulls the
description, parameters, and return documentation from the inherited function.

This is particularly useful in LPC where `inherit` is common — rather than
duplicating documentation across overrides, you can inherit it and only
document what changes.

```c
/**
 * @inheritdoc
 */
void create() {
  ::create();
  // Additional setup
}
```

You can also add to the inherited documentation. Your description and any
additional tags are merged with the parent's:

```c
/**
 * @inheritdoc
 * Also initialises the combat subsystem.
 */
void create() {
  ::create();
  init_combat();
}
```

## `@author`

Identifies the author of the code.

**Syntax:** `@author name`

```c
/**
 * @author Wizard
 */
```

## `@version`

Specifies the version of the code.

**Syntax:** `@version version`

```c
/**
 * @version 1.2.0
 */
```

## `@since`

Indicates when a feature was introduced.

**Syntax:** `@since version or date`

```c
/**
 * @since 2.0
 */
```

## `@private` / `@protected` / `@public`

Documents the visibility of a function or variable. These tags are useful when
the visibility cannot be inferred from the code or when you want to be
explicit.

```c
/**
 * @private
 * @param {string} name - The name to validate.
 * @returns {int} 1 if valid, 0 if invalid.
 */
static int is_valid_name(string name) {
  // Implementation
}
```

## `@link`

Creates an inline link to another element. Used within descriptions, wrapped
in `{@link ...}`.

**Syntax:** `{@link reference}`

```c
/**
 * This method works like {@link other_function} but has improved performance.
 */
```
