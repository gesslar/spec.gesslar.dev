import React, {useState, useCallback} from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const specSnippets = [
  `expression     = term ((PLUS | MINUS) term)*
term           = factor ((STAR | SLASH) factor)*
factor         = NUMBER | LPAREN expression RPAREN
NUMBER         = [0-9]+
PLUS           = "+"
MINUS          = "-"`,

  `<element>  ::= "<" <name> <attributes> ">"
              <content>
              "</" <name> ">"
<name>     ::= <letter> (<letter> | <digit>)*
<content>  ::= <element> | <text>`,

  `message        = header CRLF body
header         = field-name ":" field-value
field-name     = token
field-value    = *( field-content )
body           = *OCTET`,

  `object     = "{" members? "}"
members    = pair ("," pair)*
pair       = string ":" value
value      = string | number | object
           | array | "true" | "false"`,

  `directive  = "%" name args? EOL
name       = ALPHA (ALPHA | DIGIT | "_")*
args       = arg ("," arg)*
arg        = DQUOTE value DQUOTE | value
value      = (VCHAR | SP)*`,

  `path       = "/" segment ("/" segment)*
segment    = pchar*
pchar      = unreserved | pct-encoded
unreserved = ALPHA | DIGIT | "-" | "."
pct-encoded = "%" HEXDIG HEXDIG`,

  `record     = field (COMMA field)* CRLF
field      = escaped | non-escaped
escaped    = DQUOTE (TEXTDATA | COMMA
           | CR | LF | DQDQ)* DQUOTE
non-escaped = TEXTDATA*`,

  `color      = "#" hex hex hex (hex hex hex)?
hex        = HEXDIG HEXDIG
HEXDIG     = DIGIT | "A"-"F" | "a"-"f"
opacity    = DIGIT+ ("." DIGIT+)?`,
];

const specs = [
  {
    title: 'LPML',
    description: 'LPC Markup Language — a human-friendly data serialization format designed for MUD configuration files.',
    href: '/lpml',
    icon: 'codicon-file-code',
  },
  {
    title: 'LPCDoc',
    description: 'A documentation format for LPC inspired by JSDoc, defining structured annotations for LPC source code.',
    href: '/lpcdoc',
    icon: 'codicon-book',
  },
];

const BLOCK_COUNT = 3;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const pickSnippet = () => {
  const source = specSnippets[Math.floor(Math.random() * specSnippets.length)];
  const lines = source.split('\n');
  const length = Math.max(4, Math.floor(randomBetween(5, 8)));
  const start = Math.floor(randomBetween(0, Math.max(lines.length - length, 1)));

  return lines.slice(start, start + length).join('\n');
};

const ALL_POSITIONS = [
  {top: '8%', left: '5%'},
  {top: '15%', right: '8%'},
  {top: '35%', left: '3%'},
  {top: '42%', right: '12%'},
  {top: '58%', left: '10%'},
  {top: '65%', right: '6%'},
  {top: '78%', left: '7%'},
  {top: '85%', right: '10%'},
  {top: '25%', left: '50%'},
  {top: '72%', right: '45%'},
];

const getRandomPosition = () => {
  return ALL_POSITIONS[Math.floor(Math.random() * ALL_POSITIONS.length)];
};

const getUnusedPosition = (usedPositions) => {
  const available = ALL_POSITIONS.filter(pos =>
    !usedPositions.some(used => used.top === pos.top && used.left === pos.left && used.right === pos.right)
  );
  return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : getRandomPosition();
};

const buildBlock = (index, usedPositions = []) => {
  const position = getUnusedPosition(usedPositions);
  return {
    id: index,
    ...position,
    snippet: pickSnippet(),
  };
};

export default function Home() {
  const [blocks, setBlocks] = useState(() => {
    const initialBlocks = [];
    for(let i = 0; i < BLOCK_COUNT; i++) {
      initialBlocks.push(buildBlock(i, initialBlocks));
    }

    return initialBlocks;
  });

  const handleAnimationIteration = useCallback((blockId) => {
    setBlocks(prev => {
      const otherBlocks = prev.filter(b => b.id !== blockId);
      const newPosition = getUnusedPosition(otherBlocks);
      return prev.map(block =>
        block.id === blockId
          ? {...block, ...newPosition, snippet: pickSnippet()}
          : block
      );
    });
  }, []);

  return (
    <Layout
      title="spec.gesslar.dev"
      description="spec.gesslar.dev — specification hosting and reference"
    >
      <main className={styles.page}>
        <div className={styles.matrixLayer} aria-hidden="true">
          {blocks.map((block, idx) => (
            <div
              key={block.id}
              className={styles.block}
              onAnimationIteration={() => handleAnimationIteration(block.id)}
              style={{
                top: block.top,
                left: block.left,
                right: block.right,
                animationDelay: `${idx * 1.2}s`,
              }}
            >
              <div className={styles.code}>{block.snippet}</div>
            </div>
          ))}
        </div>

        <section className={styles.hero}>
          <div className={styles.titleStack}>
            <h1 className={styles.title} data-text="spec.gesslar.dev">
              spec.gesslar.dev
            </h1>
          </div>
          <p className={styles.tagline}>
            Specifications define the rules, syntax, and behavior of languages,
            formats, and protocols. They serve as the authoritative reference for
            implementers and users alike — the single source of truth.
          </p>
        </section>

        <section className={styles.cards}>
          {specs.map(spec => (
            <a key={spec.title} href={spec.href} className={styles.card}>
              <div className={styles.cardHeader}>
                <i className={`codicon ${spec.icon} ${styles.cardIcon}`} />
                <h2 className={styles.cardTitle}>{spec.title}</h2>
              </div>
              <p className={styles.cardDescription}>{spec.description}</p>
              <span className={styles.cardLink}>
                View spec <i className="codicon codicon-arrow-right" />
              </span>
            </a>
          ))}
        </section>
      </main>
    </Layout>
  );
}
