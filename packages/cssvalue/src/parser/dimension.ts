import * as bnb from "bread-n-butter";
import { angleUnits, Dimension, lengthUnits } from "../types/Dimension";
import { maybeWhitespace, texts } from "./common";
import { number } from "./number";

// https://drafts.csswg.org/css-values-3/#lengths

const lengthUnit = texts(lengthUnits);
export const zero = bnb
  .text("0")
  .trim(maybeWhitespace)
  .map(() => new Dimension(0, ""));

export const lengthOnly = bnb
  .all(number, lengthUnit)
  .trim(maybeWhitespace)
  .map(([number, unit]) => new Dimension(number, unit));
export const length = lengthOnly.or(zero);

export const percentageOnly = bnb
  .all(number, bnb.text("%"))
  .trim(maybeWhitespace)
  .map(([value]) => new Dimension(value, "%"));
export const percentage = percentageOnly.or(zero);

export const lengthPercentage = bnb.choice(lengthOnly, percentageOnly, zero);

export const angleOnly = bnb
  .all(number, texts(angleUnits))
  .trim(maybeWhitespace)
  .map(([value, unit]) => {
    return new Dimension(value, unit);
  });
export const angle = angleOnly.or(zero);
