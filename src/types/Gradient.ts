import { assignPartial } from "../parser/util";
import { Color } from "./Color";
import { Angle, Length, Percentage, ZeroDimension } from "./Dimension";
import { Position } from "./Position";

export class ColorStop {
  constructor(opts: { color: Color; position0?: number; position1?: number }) {
    this.color = opts.color;
    this.position0 = opts.position0;
    this.position1 = opts.position1;
  }
  color: Color;
  position0: number | undefined;
  position1: number | undefined;

  toString(): string {
    return [
      this.color.toString(),
      ...[this.position0, this.position1]
        .filter((p): p is number => p != null)
        .map((p) => `${p * 100}%`),
    ].join(" ");
  }
}

export const linearGradientDirectionKeywords = [
  "top",
  "right top",
  "right",
  "right bottom",
  "bottom",
  "left bottom",
  "left",
  "left top",
] as const;

export type LinearGradientDirectionKeyword = typeof linearGradientDirectionKeywords[number];

export class LinearGradient {
  constructor(opts: Partial<LinearGradient>) {
    assignPartial(this, opts);
  }

  direction: Angle | ZeroDimension | LinearGradientDirectionKeyword | undefined = undefined; // bottom by default
  stops: ColorStop[] = [];
  repeating = false;

  toString(): string {
    const name = this.repeating ? "repeating-linear-gradient" : "linear-gradient";
    const words: string[] = [];
    if (this.direction) {
      if (typeof this.direction === "string") {
        words.push(`to ${this.direction}`);
      } else {
        words.push(this.direction.toString());
      }
    }
    words.push(...this.stops.map((s) => s.toString()));

    return `${name}(${words.join(", ")})`;
  }
}

export class RadialGradient {
  constructor(opts: Partial<RadialGradient>) {
    assignPartial(this, opts);
    this.endingShape =
      opts.endingShape ?? (Array.isArray(opts.size) && opts.size.length === 1)
        ? "circle"
        : "ellipse";
  }

  endingShape: RadialGradientEndingShape;
  size: RadialGradientSizeKeyword | (Length | Percentage | ZeroDimension)[] = "farthest-corner";
  position: Position = new Position("center", "center");
  stops: ColorStop[] = [];
  repeating = false;
}

export type Gradient = LinearGradient | RadialGradient;

export const radialGradientEndingShapes = ["circle", "ellipse"] as const;

export type RadialGradientEndingShape = typeof radialGradientEndingShapes[number];

export const radialGradientSizeKeywords = [
  "closest-side",
  "farthest-side",
  "closest-corner",
  "farthest-corner",
];

export type RadialGradientSizeKeyword = typeof radialGradientSizeKeywords[number];

export function interpolateStops(originalStops: ColorStop[]): [Color, number][] {
  const stops: [Color, number | undefined][] = originalStops.flatMap((stop): [
    Color,
    number | undefined
  ][] => {
    if (stop.position0 != null && stop.position1 != null) {
      return [
        [stop.color, stop.position0],
        [stop.color, stop.position1],
      ];
    } else if (stop.position0 != null) {
      return [[stop.color, stop.position0]];
    } else {
      return [[stop.color, undefined]];
    }
  });

  const interpolated: [Color, number][] = [];
  let lastPos = 0;
  let lastIndex = -1;

  for (let i = 0; i < stops.length; ++i) {
    const [color, pos] = stops[i];
    if (pos != null) {
      interpolated[i] = [color, pos];
      if (lastIndex >= 0) {
        for (let j = lastIndex + 1; j < i; ++j) {
          interpolated[j] = [
            stops[j][0],
            lastPos + (pos - lastPos) * ((j - lastIndex) / (i - lastIndex)),
          ];
        }
      } else {
        for (let j = 0; j < i; ++j) {
          interpolated[j] = [stops[j][0], (pos * j) / i];
        }
      }
      lastPos = pos;
      lastIndex = i;
    }
  }

  if (lastIndex >= 0) {
    for (let j = lastIndex + 1; j < stops.length; ++j) {
      interpolated[j] = [
        stops[j][0],
        lastPos + (1 - lastPos) * ((j - lastIndex) / (stops.length - 1 - lastIndex)),
      ];
    }
  } else {
    for (let j = 0; j < stops.length; ++j) {
      interpolated[j] = [stops[j][0], j / (stops.length - 1)];
    }
  }

  return interpolated;
}
