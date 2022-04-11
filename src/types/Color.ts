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

export type Color = HexColor | NamedColor | CurrentColor | RGBColor | HSLColor | MacaronColor;

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

export type ColorName = typeof colorNames[number];
