import * as bnb from "bread-n-butter";
import { BoxShadow } from "../types/BoxShadow";
import { Dimension } from "../types/Dimension";
import { color } from "./color";
import { doubleAmpersand, keyword, repeatToken } from "./common";
import { length } from "./dimension";

export const singleBoxShadow: bnb.Parser<BoxShadow> = doubleAmpersand(
  {
    // TODO: inset
    length: repeatToken(length, 4), // TODO: min count should be 2
    color: color,
  },
  {
    inset: keyword("inset").map(() => true),
  },
).map((result): BoxShadow => {
  return new BoxShadow({
    inset: !!result.inset,
    offsetX: result.length[0] ?? new Dimension(0, ""),
    offsetY: result.length[1] ?? new Dimension(0, ""),
    blurRadius: result.length[2] ?? new Dimension(0, ""),
    spreadRadius: result.length[3] ?? new Dimension(0, ""),
    color: result.color,
  });
});

export const boxShadow: bnb.Parser<BoxShadow[]> = keyword("none")
  .map(() => [])
  .or(singleBoxShadow.sepBy(keyword(","), 1));
