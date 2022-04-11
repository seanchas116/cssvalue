import * as bnb from "bread-n-butter";
import {
  ColorStop,
  LinearGradient,
  radialGradientEndingShapes,
  radialGradientSizeKeywords,
  RadialGradient,
  LinearGradientDirectionKeyword,
} from "../types/Gradient";
import { color } from "./color";
import { doubleBar, keyword, keywords, maybeWhitespace, repeatToken } from "./common";
import { angle, lengthPercentage, percentage } from "./dimension";
import { position } from "./position";

export const colorStop = bnb.all(color, percentage.repeat()).map(([color, positions]) => {
  return new ColorStop({
    color,
    position0: positions[0] && positions[0].value / 100,
    position1: positions[1] && positions[1].value / 100,
  });
});

export const colorStopList = colorStop.sepBy(bnb.text(","), 1);

const sideOrCorner: bnb.Parser<LinearGradientDirectionKeyword> = doubleBar({
  x: keyword("left").or(keyword("right")),
  y: keyword("top").or(keyword("bottom")),
}).map((xy) => {
  if (!xy.x && xy.y === "top") {
    return "top";
  }
  if (!xy.x && xy.y === "bottom") {
    return "bottom";
  }
  if (xy.x === "left" && !xy.y) {
    return "left";
  }
  if (xy.x === "left" && xy.y === "top") {
    return "left top";
  }
  if (xy.x === "left" && xy.y === "bottom") {
    return "left bottom";
  }
  if (xy.x === "right" && !xy.y) {
    return "right";
  }
  if (xy.x === "right" && xy.y === "top") {
    return "right top";
  }
  if (xy.x === "right" && xy.y === "bottom") {
    return "right bottom";
  }

  return "bottom";
});

const linearGradientLine = angle
  .or(keyword("to").next(sideOrCorner))
  .skip(keyword(","))
  .skip(maybeWhitespace);

// https://drafts.csswg.org/css-images-3/#linear-gradients

export const linearGradient = bnb
  .all(
    bnb.choice(
      keyword("repeating-linear-gradient(").map(() => true),
      keyword("linear-gradient(").map(() => false)
    ),
    linearGradientLine.or(bnb.ok(undefined)),
    colorStopList
  )
  .skip(keyword(")"))
  .map(([repeating, direction, stops]) => new LinearGradient({ direction, stops, repeating }));

const radialGradientEndingShape = keywords(radialGradientEndingShapes);

const radialGradientSize = bnb.choice(
  keywords(radialGradientSizeKeywords),
  repeatToken(lengthPercentage, 2)
);

// https://drafts.csswg.org/css-images-3/#radial-gradients

export const radialGradient = bnb
  .all(
    bnb.choice(
      keyword("repeating-radial-gradient(").map(() => true),
      keyword("radial-gradient(").map(() => false)
    ),
    bnb.choice(
      bnb
        .all(
          doubleBar({
            endingShape: radialGradientEndingShape,
            size: radialGradientSize,
          }).or(bnb.ok({ endingShape: undefined, size: undefined })),
          bnb.choice(keyword("at").next(position), bnb.ok(undefined))
        )
        .skip(keyword(",")),
      bnb.ok([{ endingShape: undefined, size: undefined }, undefined] as const)
    ),
    colorStopList
  )
  .skip(keyword(")"))
  .map(([repeating, [{ endingShape, size }, position], stops]) => {
    return new RadialGradient({
      endingShape,
      size,
      position,
      stops,
      repeating,
    });
  });

// TODO: Add conic gradient
export const gradient = bnb.choice(linearGradient, radialGradient);
