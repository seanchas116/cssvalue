import * as bnb from "bread-n-butter";
import {
  borderWidthKeywords,
  borderStyleKeywords,
  Border,
} from "../types/Border";
import { color } from "./color";
import { doubleBar, keywords, repeatToken } from "./common";
import { length } from "./dimension";

export const singleBorderWidth = keywords(borderWidthKeywords).or(length);

export const borderWidth = repeatToken(singleBorderWidth, 4);

export const singleBorderStyle = keywords(borderStyleKeywords);

export const borderStyle = repeatToken(singleBorderStyle, 4);

export const borderColor = repeatToken(color, 4);

export const border: bnb.Parser<Border> = doubleBar({
  width: singleBorderWidth,
  style: singleBorderStyle,
  color: color,
}).map((opts) => new Border(opts));
