# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library (`@seanchas116/cssvalue`) that provides CSS value parsing and serialization. It parses CSS property values (like `background`, `border`, `box-shadow`) into strongly-typed JavaScript objects and can serialize them back to CSS strings.

## Development Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build the library (outputs to lib/)
npm run build
```

## Architecture

The codebase follows a parser combinator pattern using the `bread-n-butter` library:

1. **`/src/types/`** - TypeScript classes representing CSS value types (Background, Border, Color, Dimension, etc.). Each class has a `toString()` method for serialization back to CSS.

2. **`/src/parser/`** - Parser implementations using bread-n-butter combinators:
   - `common.ts` contains reusable parser utilities like `doubleBar()` (for CSS `||` syntax) and `doubleAmpersand()` (for CSS `&&` syntax)
   - Each CSS property type has its own parser file (e.g., `background.ts`, `border.ts`)
   - Parsers are exported through `cssParser` object in `index.ts`

## Key Patterns

- **Parser Combinators**: Uses functional parsing with bread-n-butter. Complex CSS syntax is built by composing smaller parsers.
- **Bidirectional Transformation**: All parsed objects can serialize back to valid CSS via `toString()`.
- **CSS Spec Compliance**: Implementations follow CSS specifications (comments often reference spec URLs).

## Testing

Tests use Vitest and are located alongside source files as `*.test.ts`. Tests typically verify:

- Parsing CSS strings into expected object structures
- Serialization back to CSS strings
- Round-trip parsing/serialization
- Edge cases and invalid input handling

Run a single test file:

```bash
npm test -- src/parser/background.test.ts
```

## TypeScript Configuration

- Development: `tsconfig.json` (no emit, for IDE)
- Build: `tsconfig.build.json` (outputs to `/lib` with declarations)
