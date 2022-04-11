import { Dimension, Length, Percentage, ZeroDimension } from "./Dimension";

export type PositionX = {
  offset: Length | Percentage | ZeroDimension;
  from: "left" | "right";
};
export type PositionY = {
  offset: Length | Percentage | ZeroDimension;
  from: "top" | "bottom";
};

export class Position {
  constructor(
    public x: PositionX | "center" | undefined,
    public y: PositionY | "center" | undefined
  ) {}

  get computedX(): PositionX {
    if (!this.x || this.x === "center") {
      return { from: "left", offset: new Dimension(50, "%") };
    }
    return this.x;
  }

  get computedY(): PositionY {
    if (!this.y || this.y === "center") {
      return { from: "top", offset: new Dimension(50, "%") };
    }
    return this.y;
  }

  get xKeyword(): "left" | "center" | "right" | undefined {
    if (!this.x || this.x === "center") {
      return "center";
    }
    if (this.x.offset.value === 0) {
      return this.x.from;
    }
  }

  get yKeyword(): "top" | "center" | "bottom" | undefined {
    if (!this.y || this.y === "center") {
      return "center";
    }
    if (this.y.offset.value === 0) {
      return this.y.from;
    }
  }

  toString(): string {
    const { xKeyword, yKeyword } = this;
    if (xKeyword && yKeyword) {
      if (xKeyword === "center") {
        return yKeyword;
      } else if (yKeyword === "center") {
        return xKeyword;
      } else {
        return `${xKeyword} ${yKeyword}`;
      }
    }
    const { computedX, computedY } = this;
    return `${computedX.from} ${computedX.offset.toString()} ${
      computedY.from
    } ${computedY.offset.toString()}`;
  }
}
