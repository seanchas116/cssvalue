import { assignPartial } from "../parser/util";
import { Color, NamedColor } from "./Color";
import { Dimension, LengthUnit, ZeroDimension } from "./Dimension";

export class BoxShadow {
  constructor(opts: Partial<BoxShadow>) {
    assignPartial(this, opts);
  }

  inset = false;
  offsetX: Dimension<LengthUnit> | ZeroDimension = new Dimension(0, "");
  offsetY: Dimension<LengthUnit> | ZeroDimension = new Dimension(0, "");
  blurRadius: Dimension<LengthUnit> | ZeroDimension = new Dimension(0, "");
  spreadRadius: Dimension<LengthUnit> | ZeroDimension = new Dimension(0, "");
  color: Color = new NamedColor("transparent");

  clone(): BoxShadow {
    return new BoxShadow(this);
  }

  toString(): string {
    return [
      ...(this.inset ? ["inset"] : []),
      this.offsetX,
      this.offsetY,
      this.blurRadius,
      this.spreadRadius,
      this.color,
    ].join(" ");
  }
}
