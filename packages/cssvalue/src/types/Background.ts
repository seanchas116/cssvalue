import { compact } from "lodash";
import { assignPartial } from "../parser/util";
import { Color } from "./Color";
import { Dimension, Length, Percentage, ZeroDimension } from "./Dimension";
import { Gradient } from "./Gradient";
import { Position } from "./Position";
import { URL } from "./URL";

export const attachments = ["scroll", "fixed", "local"] as const;
export type Attachment = (typeof attachments)[number];

export const boxes = ["border-box", "padding-box", "content-box"] as const;
export type Box = (typeof boxes)[number];

export const clipBoxes = [...boxes, "text", "border-area"] as const;
export type ClipBox = (typeof clipBoxes)[number];

export type Image = URL | Gradient;

export type BackgroundSize =
  | (Length | Percentage | ZeroDimension | "auto")[]
  | "cover"
  | "contain";

export type RepeatStyle =
  | "repeat-x"
  | "repeat-y"
  | ("repeat" | "space" | "round" | "no-repeat")[];

export class BackgroundLayer {
  constructor(opts: Partial<BackgroundLayer>) {
    assignPartial(this, opts);
  }

  image: Image | undefined = undefined;
  position: Position = new Position(
    {
      from: "left",
      offset: new Dimension(0, "%"),
    },
    {
      from: "top",
      offset: new Dimension(0, "%"),
    },
  );
  size: BackgroundSize = ["auto", "auto"];
  repeatStyle: RepeatStyle = ["repeat"];
  attachment: Attachment = "scroll";
  origin: Box = "padding-box";
  clip: ClipBox = "border-box";

  toString(): string {
    if (!this.image) {
      return "none";
    }

    const imageString = this.image.toString();
    const sizeString =
      typeof this.size === "string" ? this.size : this.size.join(" ");
    const repeatString =
      typeof this.repeatStyle === "string"
        ? this.repeatStyle
        : this.repeatStyle.join(" ");

    let positionSizeString: string | undefined;
    if (this.position.toString() === "left top" && sizeString === "auto auto") {
      positionSizeString = undefined;
    } else if (sizeString === "auto auto") {
      positionSizeString = this.position.toString();
    } else {
      positionSizeString = `${this.position.toString()} / ${sizeString}`;
    }

    return compact([
      imageString,
      positionSizeString,
      repeatString !== "repeat" ? repeatString : undefined,
      this.attachment !== "scroll" ? this.attachment : undefined,
      this.origin !== "padding-box" ? this.origin : undefined,
      this.clip !== "border-box" ? this.clip : undefined,
    ]).join(" ");
  }
}

export class Background {
  constructor(options: Partial<Background> = {}) {
    assignPartial(this, options);
  }

  layers: BackgroundLayer[] = [];
  color: Color | undefined = undefined;

  toString(): string {
    if (this.layers.length === 0) {
      return this.color?.toString() || "none";
    }

    const strs: string[] = [];
    for (let i = 0; i < this.layers.length; ++i) {
      if (this.color && i === this.layers.length - 1) {
        strs.push(this.layers[i].toString() + " " + this.color.toString());
      } else {
        strs.push(this.layers[i].toString());
      }
    }
    return strs.join(",");
  }

  get isEmpty(): boolean {
    return !this.color && this.layers.length === 0;
  }
}
