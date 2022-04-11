import { assignPartial } from "../parser/util";
import { Color } from "./Color";
import { Dimension, LengthUnit, ZeroDimension } from "./Dimension";

export const borderStyleKeywords = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
] as const;

export type BorderStyle = typeof borderStyleKeywords[number];

export class Border {
  constructor(opts: Partial<Border> = {}) {
    assignPartial(this, opts);
  }

  width: Dimension<LengthUnit> | ZeroDimension | "thin" | "medium" | "thick" = "medium";
  style: BorderStyle | undefined = undefined;
  color: Color | undefined = undefined;

  toString(): string {
    return `${this.width?.toString() ?? ""} ${this.style ?? ""} ${this.color?.toString() ?? ""}`;
  }

  clone(): Border {
    return new Border(this);
  }
}

export const borderWidthKeywords = ["thin", "medium", "thick"] as const;
