---
title: Examples
sidebar:
  order: 4
---

## Character Configuration

```lpml
// character.lpml
{
  name: "Gesslar",
  title: "Wielder of Sharp Things",

  // File includes (if supported by the implementation)
  stats: "#./stats.lpml",
  inventory: "#./inventory.lpml",

  // Spacey keys for natural language
  hit points: 100,
  max hit points: 120,
  experience points: 1500,

  bio: "A seasoned adventurer from the West."
       "Known for incredible fashion sense."
       "Has a pet dragon named Sparky.",

  skills: {
    combat: 85,
    magic: 60,
    social: 75,
  },
}
```

## Item/Loot Configuration

```lpml
// cat_fur.lpml
{
  id: ["fur"],
  additional ids: ["hide", "piece"],  // Spacey key!
  adj: ["cat", "soft"],
  name: "cat fur",
  short: "a piece of cat fur",
  long: "This is a soft piece of fur from a wild cat."
        "It could be useful for crafting.",
  mass: 20,
  material: ["fur"],
  properties: {
    autovalue: "yes",
    crafting material: "yes",  // Spacey key!
  }
}
```

## Multi-line Text with Formatting

```lpml
{
  // Paragraph with auto-folding
  description: "This is a long description that"
               "spans multiple lines in the source"
               "but will be a single paragraph.",

  // Preserve line breaks with \n
  poem: "Roses are red,\n"
        "Violets are blue,\n"
        "LPML is awesome,\n"
        "And so are you.",

  // Mix folding and newlines
  help: "Usage: command [options]\n"
        "\n"
        "This command does something useful."
        "It has multiple paragraphs.\n"
        "\n"
        "See 'help topics' for more info."
}
```

## Modular Configuration

**main.lpml:**
```lpml
{
  game: {
    name: "My MUD",
    port: 4000,

    // File includes (if supported by the implementation)
    database: "#./db-config.lpml",
    features: "#./features.lpml",
    discord: "#./discord-config.lpml"
  }
}
```

**db-config.lpml:**
```lpml
{
  host: "localhost",
  port: 5432,
  name: "mud_db",
  pool_size: 10
}
```