import {
  HSLColor,
  HWBColor,
  LABColor,
  OKLABColor,
  LCHColor,
  OKLCHColor,
  ColorFunction,
  RGBColor,
} from "./Color";
import { expect, describe, it } from "vitest";

describe(RGBColor, () => {
  describe("toString", () => {
    it("returns rgb() format", () => {
      expect(
        new RGBColor({ r: 100 / 255, g: 150 / 255, b: 200 / 255 }).toString(),
      ).toEqual("rgb(100,150,200)");
      expect(
        new RGBColor({
          r: 100 / 255,
          g: 150 / 255,
          b: 200 / 255,
          a: 0.5,
        }).toString(),
      ).toEqual("rgba(100,150,200,0.5)");
    });
  });
});

describe(HSLColor, () => {
  describe("toString", () => {
    it("returns hsv() format", () => {
      expect(new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5 }).toString()).toEqual(
        "hsl(100,40%,50%)",
      );
      expect(
        new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5, a: 0.6 }).toString(),
      ).toEqual("hsla(100,40%,50%,0.6)");
    });
  });
});

describe(HWBColor, () => {
  describe("toString", () => {
    it("returns hwb() format", () => {
      expect(new HWBColor({ h: 180 / 360, w: 0.2, b: 0.3 }).toString()).toEqual(
        "hwb(180 20% 30%)",
      );
      expect(
        new HWBColor({ h: 90 / 360, w: 0.1, b: 0.4, a: 0.5 }).toString(),
      ).toEqual("hwb(90 10% 40% / 0.5)");
    });
  });
});

describe(LABColor, () => {
  describe("toString", () => {
    it("returns lab() format", () => {
      expect(new LABColor({ l: 50, a: 25, b: -25 }).toString()).toEqual(
        "lab(50% 25 -25)",
      );
      expect(
        new LABColor({ l: 70, a: -10, b: 30, alpha: 0.8 }).toString(),
      ).toEqual("lab(70% -10 30 / 0.8)");
    });
  });
});

describe(OKLABColor, () => {
  describe("toString", () => {
    it("returns oklab() format", () => {
      expect(new OKLABColor({ l: 0.6, a: 0.1, b: -0.08 }).toString()).toEqual(
        "oklab(60% 0.1 -0.08)",
      );
      expect(
        new OKLABColor({ l: 0.4, a: -0.05, b: 0.02, alpha: 0.5 }).toString(),
      ).toEqual("oklab(40% -0.05 0.02 / 0.5)");
    });
  });
});

describe(LCHColor, () => {
  describe("toString", () => {
    it("returns lch() format", () => {
      expect(new LCHColor({ l: 50, c: 35, h: 180 / 360 }).toString()).toEqual(
        "lch(50% 35 180)",
      );
      expect(
        new LCHColor({ l: 70, c: 20, h: 90 / 360, a: 0.6 }).toString(),
      ).toEqual("lch(70% 20 90 / 0.6)");
    });
  });
});

describe(OKLCHColor, () => {
  describe("toString", () => {
    it("returns oklch() format", () => {
      expect(
        new OKLCHColor({ l: 0.401, c: 0.123, h: 21.57 / 360 }).toString(),
      ).toEqual("oklch(40.1% 0.123 21.57)");
      expect(
        new OKLCHColor({
          l: 0.5969,
          c: 0.156,
          h: 49.77 / 360,
          a: 0.5,
        }).toString(),
      ).toEqual("oklch(59.7% 0.156 49.77 / 0.5)");
    });
  });
});

describe(ColorFunction, () => {
  describe("toString", () => {
    it("returns color() format", () => {
      expect(
        new ColorFunction({
          space: "display-p3",
          c1: 1,
          c2: 0.5,
          c3: 0,
        }).toString(),
      ).toEqual("color(display-p3 1 0.5 0)");
      expect(
        new ColorFunction({
          space: "srgb",
          c1: 0.5,
          c2: 0.2,
          c3: 0.7,
          a: 0.8,
        }).toString(),
      ).toEqual("color(srgb 0.5 0.2 0.7 / 0.8)");
    });
  });
});
