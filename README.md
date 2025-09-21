# `@seanchas116/cssvalue`

[![npm version](https://img.shields.io/npm/v/@seanchas116/cssvalue)](https://www.npmjs.com/package/@seanchas116/cssvalue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for parsing and serializing CSS property values with strong typing support.

**[🎨 Try the Interactive Demo →](https://cssvalue.vercel.app/)**

## Features

- **Parse CSS values** into strongly-typed JavaScript objects
- **Serialize back to CSS** with `toString()` methods
- **Full TypeScript support** with comprehensive type definitions
- **CSS spec compliant** parsing following official CSS specifications
- **Bidirectional transformation** - parse and serialize without data loss

## Installation

### Using npm/yarn/pnpm

```bash
npm install @seanchas116/cssvalue
# or
yarn add @seanchas116/cssvalue
# or
pnpm add @seanchas116/cssvalue
```

## Supported CSS Properties

- **Background** - Full support for complex background values including layers, gradients, and images
- **Border** - Parse border shorthand and individual border properties
- **Box Shadow** - Support for multiple shadows with blur, spread, and inset
- **Colors** - HEX, RGB, RGBA, HSL, HSLA, OKLCH, and CSS Color Module Level 5 color spaces
- **Dimensions** - Lengths, percentages, and calc() expressions
- **Font Family** - Parse font family lists with proper quoting
- **Gradients** - Linear and radial gradients with color stops
- **Position** - CSS position values with keywords and offsets
- **URLs** - Parse url() functions with proper escaping

## Usage

### Basic Example

```ts
import {
  cssParser,
  Background,
  BackgroundLayer,
  URL,
  Position,
  Dimension,
  HexColor,
} from "@seanchas116/cssvalue";

// Parse a complex background value
const background = cssParser.background.tryParse(
  'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")',
);

// Work with strongly-typed objects
const expected = new Background({
  layers: [
    new BackgroundLayer({
      position: new Position("center", "center"),
      size: "contain",
      repeatStyle: ["no-repeat"],
      image: new URL("foo.svg"),
    }),
    new BackgroundLayer({
      position: new Position(
        { from: "left", offset: new Dimension(35, "%") },
        "center",
      ),
      image: new URL("bar.png"),
    }),
  ],
  color: new HexColor("#eee"),
});

// Serialize back to CSS
background.toString(); // => 'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")'
```

### Parsing Colors

```ts
import {
  cssParser,
  RGBColor,
  HSLColor,
  OKLCHColor,
} from "@seanchas116/cssvalue";

// Parse different color formats
const rgb = cssParser.color.tryParse("rgb(255 128 0 / 0.5)");
const hsl = cssParser.color.tryParse("hsl(210deg 50% 40%)");
const oklch = cssParser.color.tryParse("oklch(0.7 0.2 150)");

// Create colors programmatically
const color = new RGBColor({ r: 1, g: 0.5, b: 0, a: 0.5 });
color.toString(); // => "rgba(255,128,0,0.5)"
```

### Working with Gradients

```ts
import { cssParser, LinearGradient, HexColor } from "@seanchas116/cssvalue";

const gradient = cssParser.gradient.tryParse(
  "linear-gradient(45deg, red 0%, blue 50%, green 100%)",
);

// Modify gradient stops
gradient.stops[0].color = new HexColor("#ff0000");
gradient.toString(); // => "linear-gradient(45deg, #ff0000 0%, blue 50%, green 100%)"
```

### Box Shadows

```ts
import {
  cssParser,
  BoxShadow,
  Dimension,
  RGBColor,
} from "@seanchas116/cssvalue";

const shadows = cssParser.boxShadow.tryParse(
  "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 2px 4px #00000020",
);

// Create shadows programmatically
const shadow = new BoxShadow({
  offsetX: new Dimension(0, "px"),
  offsetY: new Dimension(4, "px"),
  blurRadius: new Dimension(6, "px"),
  color: new RGBColor({ r: 0, g: 0, b: 0, a: 0.1 }),
});
```

## API Reference

### Parser Methods

All parsers are available through the `cssParser` object:

- `cssParser.background.tryParse(value: string)` - Parse CSS background
- `cssParser.border.tryParse(value: string)` - Parse CSS border
- `cssParser.boxShadow.tryParse(value: string)` - Parse CSS box-shadow
- `cssParser.color.tryParse(value: string)` - Parse CSS color
- `cssParser.dimension.tryParse(value: string)` - Parse CSS dimension
- `cssParser.gradient.tryParse(value: string)` - Parse CSS gradient
- `cssParser.fontFamily.tryParse(value: string)` - Parse CSS font-family
- `cssParser.position.tryParse(value: string)` - Parse CSS position

### Type Classes

Each CSS value type is represented by a class with a `toString()` method:

- `Background`, `BackgroundLayer` - Background properties
- `Border`, `BorderStyle` - Border properties
- `BoxShadow` - Box shadow effects
- `Color`, `HexColor`, `RGBColor`, `HSLColor`, `OKLCHColor` - Color values
- `Dimension` - Length and percentage values
- `LinearGradient`, `RadialGradient` - Gradient functions
- `Position` - Position values
- `URL` - URL references

## Development

This project uses PNPM workspaces and Turbo for monorepo management.

### Prerequisites

- Node.js 18+
- PNPM 8+

### Setup

```bash
# Install dependencies
pnpm install

# Run tests for all packages
pnpm test

# Run tests for a specific package
pnpm --filter @seanchas116/cssvalue test

# Run linter
pnpm lint

# Build all packages
pnpm build

# Build a specific package
pnpm --filter @seanchas116/cssvalue build
```

### Interactive Demo

Try the live demo at **[cssvalue.vercel.app](https://cssvalue.vercel.app/)** or run it locally:

```bash
# Start the demo development server
pnpm --filter demo dev

# Open http://localhost:5173 in your browser
```

The demo provides:

- Live parsing of CSS values as you type
- Support for all parser types (background, border, color, gradients, etc.)
- Pretty-printed output showing the parsed JavaScript objects
- Instant feedback on parsing errors

### Project Structure

```
.
├── packages/
│   ├── cssvalue/        # Main CSS value parsing library
│   └── demo/            # Interactive web demo (React + Vite)
├── pnpm-workspace.yaml  # PNPM workspace configuration
├── turbo.json          # Turbo build configuration
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - See [LICENSE](LICENSE) file for details

## Author

Ryohei Ikegami ([@seanchas116](https://github.com/seanchas116))
