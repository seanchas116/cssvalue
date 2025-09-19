import { MacaronColor } from "./MacaronColor";

export class HexColor {
  constructor(public value: string) {}
  toString(): string {
    return this.value;
  }
  clone(): HexColor {
    return new HexColor(this.value);
  }
}

export class NamedColor {
  constructor(public value: ColorName) {}
  toString(): string {
    return this.value;
  }
  clone(): NamedColor {
    return new NamedColor(this.value);
  }
}

export class CurrentColor {
  constructor() {}
  toString(): string {
    return "currentColor" as const;
  }
  clone(): CurrentColor {
    return new CurrentColor();
  }
}

export class RGBColor {
  constructor(opts: { r: number; g: number; b: number; a?: number }) {
    this.r = opts.r;
    this.g = opts.g;
    this.b = opts.b;
    this.a = opts.a ?? 1;
  }
  r: number;
  g: number;
  b: number;
  a: number;

  toString(): string {
    const [r, g, b] = [this.r, this.g, this.b].map((x) => Math.round(x * 255));
    if (this.a === 1) {
      return `rgb(${r},${g},${b})`;
    }
    return `rgba(${r},${g},${b},${this.a})`;
  }
  clone(): RGBColor {
    return new RGBColor(this);
  }
}

export class HSLColor {
  constructor(opts: { h: number; s: number; l: number; a?: number }) {
    this.h = opts.h;
    this.s = opts.s;
    this.l = opts.l;
    this.a = opts.a ?? 1;
  }

  h: number;
  s: number;
  l: number;
  a: number;

  toString(): string {
    const h = Math.round(this.h * 360);
    const s = Math.round(this.s * 100);
    const l = Math.round(this.l * 100);

    if (this.a === 1) {
      return `hsl(${h},${s}%,${l}%)`;
    }
    return `hsla(${h},${s}%,${l}%,${this.a})`;
  }

  clone(): HSLColor {
    return new HSLColor(this);
  }
}

export class HWBColor {
  constructor(opts: { h: number; w: number; b: number; a?: number }) {
    this.h = opts.h;
    this.w = opts.w;
    this.b = opts.b;
    this.a = opts.a ?? 1;
  }

  h: number;
  w: number;
  b: number;
  a: number;

  toString(): string {
    const h = Math.round(this.h * 360);
    const w = Math.round(this.w * 100);
    const b = Math.round(this.b * 100);

    if (this.a === 1) {
      return `hwb(${h} ${w}% ${b}%)`;
    }
    return `hwb(${h} ${w}% ${b}% / ${this.a})`;
  }

  clone(): HWBColor {
    return new HWBColor(this);
  }
}

export class LABColor {
  constructor(opts: { l: number; a: number; b: number; alpha?: number }) {
    this.l = opts.l;
    this.a = opts.a;
    this.b = opts.b;
    this.alpha = opts.alpha ?? 1;
  }

  l: number;
  a: number;
  b: number;
  alpha: number;

  toString(): string {
    const l = Math.round(this.l * 10) / 10;
    const a = Math.round(this.a * 10) / 10;
    const b = Math.round(this.b * 10) / 10;

    if (this.alpha === 1) {
      return `lab(${l}% ${a} ${b})`;
    }
    return `lab(${l}% ${a} ${b} / ${this.alpha})`;
  }

  clone(): LABColor {
    return new LABColor(this);
  }
}

export class OKLABColor {
  constructor(opts: { l: number; a: number; b: number; alpha?: number }) {
    this.l = opts.l;
    this.a = opts.a;
    this.b = opts.b;
    this.alpha = opts.alpha ?? 1;
  }

  l: number;
  a: number;
  b: number;
  alpha: number;

  toString(): string {
    const l = `${Math.round(this.l * 1000) / 10}%`;
    const a = Math.round(this.a * 1000) / 1000;
    const b = Math.round(this.b * 1000) / 1000;

    if (this.alpha === 1) {
      return `oklab(${l} ${a} ${b})`;
    }
    return `oklab(${l} ${a} ${b} / ${this.alpha})`;
  }

  clone(): OKLABColor {
    return new OKLABColor(this);
  }
}

export class LCHColor {
  constructor(opts: { l: number; c: number; h: number; a?: number }) {
    this.l = opts.l;
    this.c = opts.c;
    this.h = opts.h;
    this.a = opts.a ?? 1;
  }

  l: number;
  c: number;
  h: number;
  a: number;

  toString(): string {
    const l = Math.round(this.l * 10) / 10;
    const c = Math.round(this.c * 10) / 10;
    const h = Math.round(this.h * 360 * 100) / 100;

    if (this.a === 1) {
      return `lch(${l}% ${c} ${h})`;
    }
    return `lch(${l}% ${c} ${h} / ${this.a})`;
  }

  clone(): LCHColor {
    return new LCHColor(this);
  }
}

export class OKLCHColor {
  constructor(opts: { l: number; c: number; h: number; a?: number }) {
    this.l = opts.l;
    this.c = opts.c;
    this.h = opts.h;
    this.a = opts.a ?? 1;
  }

  l: number;
  c: number;
  h: number;
  a: number;

  toString(): string {
    const l = `${Math.round(this.l * 1000) / 10}%`;
    const c = Math.round(this.c * 1000) / 1000;
    const h = Math.round(this.h * 360 * 100) / 100;

    if (this.a === 1) {
      return `oklch(${l} ${c} ${h})`;
    }
    return `oklch(${l} ${c} ${h} / ${this.a})`;
  }

  clone(): OKLCHColor {
    return new OKLCHColor(this);
  }
}

export class ColorFunction {
  constructor(opts: { space: string; c1: number; c2: number; c3: number; a?: number }) {
    this.space = opts.space;
    this.c1 = opts.c1;
    this.c2 = opts.c2;
    this.c3 = opts.c3;
    this.a = opts.a ?? 1;
  }

  space: string;
  c1: number;
  c2: number;
  c3: number;
  a: number;

  toString(): string {
    if (this.a === 1) {
      return `color(${this.space} ${this.c1} ${this.c2} ${this.c3})`;
    }
    return `color(${this.space} ${this.c1} ${this.c2} ${this.c3} / ${this.a})`;
  }

  clone(): ColorFunction {
    return new ColorFunction(this);
  }
}

export type Color =
  | HexColor
  | NamedColor
  | CurrentColor
  | RGBColor
  | HSLColor
  | HWBColor
  | LABColor
  | OKLABColor
  | LCHColor
  | OKLCHColor
  | ColorFunction
  | MacaronColor;

export const colorNames = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",

  "transparent",
] as const;

export type ColorName = (typeof colorNames)[number];
