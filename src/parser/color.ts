import * as bnb from "bread-n-butter";
import {
  Color,
  colorNames,
  CurrentColor,
  HexColor,
  HSLColor,
  NamedColor,
  RGBColor,
  OKLCHColor,
} from "../types/Color";
import {
  Dimension,
  Percentage,
  Angle,
  ZeroDimension,
  angleToTurn,
} from "../types/Dimension";
import { keyword, keywords, maybeWhitespace } from "./common";
import { angleOnly, percentage, percentageOnly } from "./dimension";
import { macaronColor } from "./macaronColor";
import { number } from "./number";

// https://www.w3.org/TR/css-color-4/#color-syntax

const hex3Color = bnb.match(/#[0-9a-f]{3}/i);
const hex4Color = bnb.match(/#[0-9a-f]{4}/i);
const hex6Color = bnb.match(/#[0-9a-f]{6}/i);
const hex8Color = bnb.match(/#[0-9a-f]{8}/i);

const hexColor = bnb
  .choice(hex8Color, hex6Color, hex4Color, hex3Color)
  .trim(maybeWhitespace)
  .map((s) => new HexColor(s));

const namedColor = keywords(colorNames).map((s) => new NamedColor(s));

const currentColor = keyword("currentColor").map(() => new CurrentColor());

const percentageOrNumber = bnb.choice(
  percentageOnly,
  number.trim(maybeWhitespace).map((n) => new Dimension(n, "")),
);

const angleOrNumber = bnb.choice(
  angleOnly,
  number.trim(maybeWhitespace).map((n) => new Dimension(n, "")),
);

function commaColor<T0, T1, T2>(
  funcName: bnb.Parser<unknown>,
  value0: bnb.Parser<T0>,
  value1: bnb.Parser<T1>,
  value2: bnb.Parser<T2>,
) {
  return bnb
    .all(
      value0,
      bnb.text(",").next(value1),
      bnb.text(",").next(value2),
      bnb.text(",").next(percentageOrNumber).or(bnb.ok(undefined)),
    )
    .wrap(funcName.skip(bnb.text("(")), bnb.text(")"))
    .trim(maybeWhitespace);
}

function slashColor<T0, T1, T2>(
  funcName: bnb.Parser<unknown>,
  value0: bnb.Parser<T0>,
  value1: bnb.Parser<T1>,
  value2: bnb.Parser<T2>,
) {
  return bnb
    .all(
      value0,
      value1,
      value2,
      bnb.choice(bnb.text("/").next(percentageOrNumber), bnb.ok(undefined)),
    )
    .wrap(funcName.skip(bnb.text("(")), bnb.text(")"))
    .trim(maybeWhitespace);
}

function buildRGB([r, g, b, a]: [
  Percentage | Dimension<"">,
  Percentage | Dimension<"">,
  Percentage | Dimension<"">,
  Percentage | Dimension<""> | undefined,
]) {
  return new RGBColor({
    r: r.unit === "%" ? r.value / 100 : r.value / 255,
    g: g.unit === "%" ? g.value / 100 : g.value / 255,
    b: b.unit === "%" ? b.value / 100 : b.value / 255,
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const rgbComma = commaColor(
  bnb.match(/rgba?/i),
  percentageOrNumber,
  percentageOrNumber,
  percentageOrNumber,
).map(buildRGB);

const rgbSlash = slashColor(
  bnb.match(/(rgba?)/i),
  percentageOrNumber,
  percentageOrNumber,
  percentageOrNumber,
).map(buildRGB);

function buildHSL([h, s, l, a]: [
  Angle | Dimension<"">,
  Percentage | ZeroDimension,
  Percentage | ZeroDimension,
  Percentage | Dimension<""> | undefined,
]) {
  return new HSLColor({
    h: h.unit === "" ? h.value / 360 : angleToTurn(h),
    s: s.value / 100,
    l: l.value / 100,
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const hslComma = commaColor(
  bnb.match(/(hsla?)/i),
  angleOrNumber,
  percentage,
  percentage,
).map(buildHSL);

const hslSlash = slashColor(
  bnb.match(/(hsla?)/i),
  angleOrNumber,
  percentage,
  percentage,
).map(buildHSL);

function buildOKLCH([l, c, h, a]: [
  Percentage | ZeroDimension,
  Dimension<""> | Percentage | ZeroDimension,
  Angle | Dimension<"">,
  Percentage | Dimension<""> | undefined,
]) {
  return new OKLCHColor({
    l: l.value / 100,
    c: c.unit === "%" ? c.value / 100 * 0.4 : c.value,
    h: h.unit === "" ? h.value / 360 : angleToTurn(h),
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const chromaValue = bnb.choice(
  percentageOnly,
  number.map((n) => new Dimension(n, "")),
).trim(maybeWhitespace);

const oklchSlash = slashColor(
  bnb.match(/oklch/i),
  percentage,
  chromaValue,
  angleOrNumber,
).map(buildOKLCH);

export const color: bnb.Parser<Color> = bnb.choice(
  hexColor,
  namedColor,
  currentColor,
  rgbComma,
  rgbSlash,
  hslComma,
  hslSlash,
  oklchSlash,
  macaronColor,
);
