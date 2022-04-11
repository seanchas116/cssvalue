import * as bnb from "bread-n-butter";

import { Color } from "../types/Color";
import {
  Attachment,
  attachments,
  Box,
  boxes,
  BackgroundSize,
  RepeatStyle,
  BackgroundLayer,
  Background,
  Image,
} from "../types/Background";
import { Dimension } from "../types/Dimension";
import { Position } from "../types/Position";

import { color } from "./color";
import { doubleAmpersand, doubleBar, keyword, keywords, repeatToken } from "./common";
import { lengthPercentage } from "./dimension";
import { gradient } from "./gradient";
import { url } from "./url";

// https://drafts.csswg.org/css-backgrounds-3/#typedef-attachment

const attachment: bnb.Parser<Attachment> = keywords(attachments);

// https://drafts.csswg.org/css-backgrounds-3/#typedef-box

const box: bnb.Parser<Box> = keywords(boxes);

// https://drafts.csswg.org/css-images-3/#typedef-image

const image: bnb.Parser<Image> = bnb.choice(url, gradient);

// https://drafts.csswg.org/css-backgrounds-3/#typedef-bg-size

const bgSize: bnb.Parser<BackgroundSize> = bnb.choice(
  repeatToken(lengthPercentage.or(keyword("auto")), 2),
  keywords(["cover", "contain"] as const)
);

// https://drafts.csswg.org/css-backgrounds-3/#typedef-repeat-style

const repeatStyle: bnb.Parser<RepeatStyle> = bnb.choice(
  keywords(["repeat-x", "repeat-y"] as const),
  repeatToken(keywords(["repeat", "space", "round", "no-repeat"] as const), 2)
);

// https://drafts.csswg.org/css-backgrounds-3/#typedef-bg-image

const bgImage: bnb.Parser<Image | undefined> = image.or(keyword("none").map(() => undefined));

// https://drafts.csswg.org/css-backgrounds-3/#typedef-bg-position

const bgPosition1: bnb.Parser<Position> = keywords([
  "left",
  "center",
  "right",
  "top",
  "bottom",
] as const)
  .or(lengthPercentage)
  .map((value) => {
    if (typeof value === "object") {
      return new Position({ from: "left", offset: value }, "center");
    }
    switch (value) {
      case "left":
      case "right":
        return new Position({ from: value, offset: new Dimension(0, "") }, "center");
      case "center":
        return new Position("center", "center");
      case "top":
      case "bottom":
        return new Position("center", {
          from: value,
          offset: new Dimension(0, ""),
        });
    }
  });

const bgPosition2: bnb.Parser<Position> = bnb
  .all(
    keywords(["left", "center", "right"] as const).or(lengthPercentage),
    keywords(["top", "center", "bottom"] as const).or(lengthPercentage)
  )
  .map(([x, y]) => {
    let xValue: Position["x"];
    if (typeof x === "object") {
      xValue = { from: "left", offset: x };
    } else if (x === "center") {
      xValue = "center";
    } else {
      xValue = { from: x, offset: new Dimension(0, "") };
    }

    let yValue: Position["y"];
    if (typeof y === "object") {
      yValue = { from: "top", offset: y };
    } else if (y === "center") {
      yValue = "center";
    } else {
      yValue = { from: y, offset: new Dimension(0, "") };
    }

    return new Position(xValue, yValue);
  });

const bgPosition34: bnb.Parser<Position> = doubleAmpersand({
  x: keyword("center").or(
    bnb.all(keywords(["left", "right"] as const), lengthPercentage.or(bnb.ok(new Dimension(0, ""))))
  ),
  y: keyword("center").or(
    bnb.all(keywords(["top", "bottom"] as const), lengthPercentage.or(bnb.ok(new Dimension(0, ""))))
  ),
}).map(({ x, y }) => {
  return new Position(
    x === "center" ? "center" : { from: x[0], offset: x[1] },
    y === "center" ? "center" : { from: y[0], offset: y[1] }
  );
});

export const bgPosition: bnb.Parser<Position> = bnb.choice(bgPosition34, bgPosition2, bgPosition1);

// https://drafts.csswg.org/css-backgrounds-3/#typedef-bg-layer

export const bgLayer: bnb.Parser<BackgroundLayer> = doubleBar({
  image: bgImage,
  positionSize: bnb.all(bgPosition, keyword("/").next(bgSize).or(bnb.ok(undefined))),
  repeatStyle: repeatStyle,
  attachment: attachment,
  origin: box,
  clip: box,
}).map(({ image, positionSize, repeatStyle, attachment, origin, clip }) => {
  return new BackgroundLayer({
    image,
    position: positionSize?.[0],
    size: positionSize?.[1],
    repeatStyle,
    attachment,
    origin,
    clip,
  });
});

export const finalBgLayer: bnb.Parser<[BackgroundLayer[], Color?]> = doubleBar({
  color: color,
  image: bgImage,
  positionSize: bnb.all(bgPosition, keyword("/").next(bgSize).or(bnb.ok(undefined))),
  repeatStyle: repeatStyle,
  attachment: attachment,
  box: box,
  clipBox: box,
}).map(({ color, image, positionSize, repeatStyle, attachment, box, clipBox }) => {
  if (!image && !positionSize && !repeatStyle && !attachment && !box && !clipBox) {
    return [[], color];
  }
  return [
    [
      new BackgroundLayer({
        image,
        position: positionSize?.[0],
        size: positionSize?.[1],
        repeatStyle,
        attachment,
        origin: box,
        clip: clipBox,
      }),
    ],
    color,
  ];
});

export const background: bnb.Parser<Background> = bnb
  .all(bgLayer.skip(keyword(",")).repeat(0), finalBgLayer)
  .map(([layers, [final, color]]) => {
    return new Background({ layers: [...layers, ...final], color });
  });
