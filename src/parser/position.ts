import * as bnb from "bread-n-butter";
import { Dimension } from "../types/Dimension";
import { Position, PositionX, PositionY } from "../types/Position";
import { doubleAmpersand, doubleBar, keywords } from "./common";
import { lengthPercentage } from "./dimension";

// https://drafts.csswg.org/css-values-3/#typedef-position

export const position = bnb.choice(
  doubleAmpersand({
    x: bnb.all(keywords(["left", "right"] as const), lengthPercentage),
    y: bnb.all(keywords(["top", "bottom"] as const), lengthPercentage),
  }).map(
    ({ x, y }) =>
      new Position(
        {
          from: x[0],
          offset: x[1],
        },
        {
          from: y[0],
          offset: y[1],
        }
      )
  ),
  bnb
    .all(
      keywords(["left", "center", "right"] as const).or(lengthPercentage),
      keywords(["top", "center", "bottom"] as const)
        .or(lengthPercentage)
        .or(bnb.ok(undefined))
    )
    .map(([x, y]) => {
      let xValue: PositionX | "center";
      if (typeof x === "object") {
        xValue = { from: "left", offset: x };
      } else if (x === "center") {
        xValue = "center";
      } else {
        xValue = { from: x, offset: new Dimension(0, "") };
      }

      let yValue: PositionY | "center" | undefined;
      if (y == null) {
        yValue = undefined;
      } else if (typeof y === "object") {
        yValue = { from: "top", offset: y };
      } else if (y === "center") {
        yValue = "center";
      } else {
        yValue = { from: y, offset: new Dimension(0, "") };
      }

      return new Position(xValue, yValue);
    }),
  doubleBar({
    x: keywords(["left", "center", "right"] as const),
    y: keywords(["top", "center", "bottom"] as const),
  }).map(
    ({ x, y }) =>
      new Position(
        x == null
          ? undefined
          : x === "center"
          ? "center"
          : { from: x, offset: new Dimension(0, "") },
        y == null
          ? undefined
          : y === "center"
          ? "center"
          : { from: y, offset: new Dimension(0, "") }
      )
  )
);
