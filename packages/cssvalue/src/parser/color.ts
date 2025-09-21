import * as bnb from "bread-n-butter";
import {
  Color,
  colorNames,
  CurrentColor,
  HexColor,
  HSLColor,
  HWBColor,
  LABColor,
  OKLABColor,
  LCHColor,
  OKLCHColor,
  ColorFunction,
  NamedColor,
  RGBColor,
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
  Percentage | Dimension<"">,
  Dimension<""> | Percentage | ZeroDimension,
  Angle | Dimension<"">,
  Percentage | Dimension<""> | undefined,
]) {
  return new OKLCHColor({
    l: l.unit === "%" ? l.value / 100 : l.value,
    c: c.unit === "%" ? (c.value / 100) * 0.4 : c.value,
    h: h.unit === "" ? h.value / 360 : angleToTurn(h),
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const oklchSlash = slashColor(
  bnb.match(/oklch/i),
  percentageOrNumber,
  percentageOrNumber,
  angleOrNumber,
).map(buildOKLCH);

function buildHWB([h, w, b, a]: [
  Angle | Dimension<"">,
  Percentage | ZeroDimension,
  Percentage | ZeroDimension,
  Percentage | Dimension<""> | undefined,
]) {
  return new HWBColor({
    h: h.unit === "" ? h.value / 360 : angleToTurn(h),
    w: w.value / 100,
    b: b.value / 100,
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const hwbSlash = slashColor(
  bnb.match(/hwb/i),
  angleOrNumber,
  percentage,
  percentage,
).map(buildHWB);

function buildLAB([l, a, b, alpha]: [
  Percentage | Dimension<"">,
  Dimension<""> | Percentage,
  Dimension<""> | Percentage,
  Percentage | Dimension<""> | undefined,
]) {
  return new LABColor({
    l: l.unit === "%" ? l.value : l.value,
    a: a.unit === "%" ? a.value * 1.25 : a.value,
    b: b.unit === "%" ? b.value * 1.25 : b.value,
    alpha:
      alpha != null
        ? alpha.unit === "%"
          ? alpha.value / 100
          : alpha.value
        : 1,
  });
}

const labSlash = slashColor(
  bnb.match(/lab/i),
  percentageOrNumber,
  percentageOrNumber,
  percentageOrNumber,
).map(buildLAB);

function buildOKLAB([l, a, b, alpha]: [
  Percentage | Dimension<"">,
  Dimension<""> | Percentage,
  Dimension<""> | Percentage,
  Percentage | Dimension<""> | undefined,
]) {
  return new OKLABColor({
    l: l.unit === "%" ? l.value / 100 : l.value,
    a: a.unit === "%" ? a.value * 0.004 : a.value,
    b: b.unit === "%" ? b.value * 0.004 : b.value,
    alpha:
      alpha != null
        ? alpha.unit === "%"
          ? alpha.value / 100
          : alpha.value
        : 1,
  });
}

const oklabSlash = slashColor(
  bnb.match(/oklab/i),
  percentageOrNumber,
  percentageOrNumber,
  percentageOrNumber,
).map(buildOKLAB);

function buildLCH([l, c, h, a]: [
  Percentage | Dimension<"">,
  Dimension<""> | Percentage,
  Angle | Dimension<"">,
  Percentage | Dimension<""> | undefined,
]) {
  return new LCHColor({
    l: l.unit === "%" ? l.value : l.value,
    c: c.unit === "%" ? c.value * 1.5 : c.value,
    h: h.unit === "" ? h.value / 360 : angleToTurn(h),
    a: a != null ? (a.unit === "%" ? a.value / 100 : a.value) : 1,
  });
}

const lchSlash = slashColor(
  bnb.match(/lch/i),
  percentageOrNumber,
  percentageOrNumber,
  angleOrNumber,
).map(buildLCH);

function buildColorFunction([space, c1, c2, c3, a]: [
  string,
  Percentage | Dimension<"">,
  Percentage | Dimension<"">,
  Percentage | Dimension<"">,
  Percentage | Dimension<""> | undefined,
]) {
  const toValue = (v: Percentage | Dimension<"">) =>
    v.unit === "%" ? v.value / 100 : v.value;

  return new ColorFunction({
    space,
    c1: toValue(c1),
    c2: toValue(c2),
    c3: toValue(c3),
    a: a != null ? toValue(a) : 1,
  });
}

const colorSpaceId = bnb
  .match(
    /srgb-linear|srgb|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz-d50|xyz-d65|xyz/,
  )
  .trim(maybeWhitespace);

const colorFunctionSlash = bnb
  .all(
    colorSpaceId,
    percentageOrNumber,
    percentageOrNumber,
    percentageOrNumber,
    bnb.choice(bnb.text("/").next(percentageOrNumber), bnb.ok(undefined)),
  )
  .wrap(bnb.text("color("), bnb.text(")"))
  .trim(maybeWhitespace)
  .map(buildColorFunction);

export const color: bnb.Parser<Color> = bnb.choice(
  hexColor,
  namedColor,
  currentColor,
  rgbComma,
  rgbSlash,
  hslComma,
  hslSlash,
  hwbSlash,
  labSlash,
  oklabSlash,
  lchSlash,
  oklchSlash,
  colorFunctionSlash,
  macaronColor,
);
