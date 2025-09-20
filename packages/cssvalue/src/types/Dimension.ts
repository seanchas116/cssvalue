export class Dimension<U extends string, N extends number = number> {
  constructor(
    public readonly value: N,
    public readonly unit: U,
  ) {}
  toString(): string {
    return `${this.value}${this.unit}`;
  }
}

export type ZeroDimension = Dimension<"", 0>;

// https://drafts.csswg.org/css-values-3/#lengths
export const lengthUnits = [
  "em",
  "ex",
  "ch",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
] as const;

export type LengthUnit = (typeof lengthUnits)[number];
export type Length = Dimension<LengthUnit>;

export type Percentage = Dimension<"%">;

export const angleUnits = ["deg", "grad", "rad", "turn"] as const;

export type AngleUnit = (typeof angleUnits)[number];
export type Angle = Dimension<AngleUnit>;

export function angleToTurn(angle: Angle | ZeroDimension): number {
  switch (angle.unit) {
    case "deg":
      return angle.value / 360;
    case "grad":
      return angle.value / 400;
    case "rad":
      return angle.value / (2 * Math.PI);
    case "":
    case "turn":
      return angle.value;
  }
}
