# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing the TypeScript library `@seanchas116/cssvalue` that provides CSS value parsing and serialization. It parses CSS property values (like `background`, `border`, `box-shadow`) into strongly-typed JavaScript objects and can serialize them back to CSS strings.

## Monorepo Structure

- `/packages/cssvalue/` - The main CSS value parsing library
- `/packages/demo/` - Interactive web demo for testing CSS value parsing
- `/pnpm-workspace.yaml` - PNPM workspace configuration
- `/turbo.json` - Turbo configuration for build orchestration

## Development Commands

```bash
# Install dependencies (using PNPM)
pnpm install

# Run tests for all packages
pnpm test

# Run tests for cssvalue package only
pnpm --filter @seanchas116/cssvalue test

# Run linter
pnpm lint

# Build all packages
pnpm build

# Build cssvalue package only
pnpm --filter @seanchas116/cssvalue build

# Run the demo locally
pnpm --filter demo dev
```

## Demo Application

The demo (`/packages/demo/`) is a React + Vite application that provides an interactive interface for testing the CSS parser:

- **Live parsing** - Shows parse results as you type
- **Multiple property types** - Quick switching between different CSS properties
- **Visual feedback** - Success/error states with detailed output
- **Pretty-printed results** - Uses `pretty-format` for readable object display

## Architecture

The cssvalue library follows a parser combinator pattern using the `bread-n-butter` library:

1. **`/packages/cssvalue/src/types/`** - TypeScript classes representing CSS value types (Background, Border, Color, Dimension, etc.). Each class has a `toString()` method for serialization back to CSS.

2. **`/packages/cssvalue/src/parser/`** - Parser implementations using bread-n-butter combinators:
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
pnpm --filter @seanchas116/cssvalue test -- src/parser/background.test.ts
```

## TypeScript Configuration

The cssvalue package has:

- Development: `packages/cssvalue/tsconfig.json` (no emit, for IDE)
- Build: `packages/cssvalue/tsconfig.build.json` (outputs to `/packages/cssvalue/lib` with declarations)

## NPM Package Release Process

To release a new version of `@seanchas116/cssvalue`:

1. **Update the version** in `/packages/cssvalue/package.json`:
   ```bash
   # Edit packages/cssvalue/package.json and bump the version number
   ```

2. **Build the package**:
   ```bash
   pnpm --filter @seanchas116/cssvalue build
   ```

3. **Run tests** to ensure everything works:
   ```bash
   pnpm --filter @seanchas116/cssvalue test
   ```

4. **Publish to npm** (from the cssvalue package directory):
   ```bash
   cd packages/cssvalue
   npm publish
   ```

5. **Commit the version bump**:
   ```bash
   git add -A
   git commit -m "chore: release vX.X.X"
   ```

6. **Create a git tag** (optional but recommended):
   ```bash
   git tag vX.X.X -m "Release version X.X.X"
   ```

7. **Push to remote** (if needed):
   ```bash
   git push origin main --tags
   ```

Note: The package is configured with `"access": "public"` in publishConfig, so it will be published publicly to npm.
