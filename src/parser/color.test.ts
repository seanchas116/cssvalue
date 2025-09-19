import {
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
import { MacaronColor } from "../types/MacaronColor";
import { color } from "./color";
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

describe("color", () => {
  it("parses case-insensitive color functions", () => {
    expect(color.tryParse("RGB(255,0,0)")).toEqual(
      new RGBColor({ r: 1, g: 0, b: 0, a: 1 }),
    );
    expect(color.tryParse("HSL(0, 100%, 50%)")).toEqual(
      new HSLColor({ h: 0, s: 1, l: 0.5, a: 1 }),
    );
  });
  it("parses hex color", () => {
    expect(color.tryParse("#123")).toEqual(new HexColor("#123"));
    expect(color.tryParse("#1234")).toEqual(new HexColor("#1234"));
    expect(color.tryParse("#00FF11")).toEqual(new HexColor("#00FF11"));
    expect(color.tryParse("#AABBCCDD")).toEqual(new HexColor("#AABBCCDD"));
  });
  it("parses named color", () => {
    expect(color.tryParse("white")).toEqual(new NamedColor("white"));
    expect(color.tryParse("black")).toEqual(new NamedColor("black"));
  });
  it("parses currentColor", () => {
    expect(color.tryParse("currentcolor")).toEqual(new CurrentColor());
    expect(color.tryParse("currentColor")).toEqual(new CurrentColor());
  });
  it("parses slash rgb", () => {
    expect(color.tryParse("rgb(100 150 200)")).toEqual(
      new RGBColor({ r: 100 / 255, g: 150 / 255, b: 200 / 255 }),
    );
    expect(color.tryParse("rgb(100 150 200 / 50%)")).toEqual(
      new RGBColor({ r: 100 / 255, g: 150 / 255, b: 200 / 255, a: 0.5 }),
    );
  });
  it("parses comma rgb", () => {
    expect(color.tryParse("rgb(100, 150, 200)")).toEqual(
      new RGBColor({ r: 100 / 255, g: 150 / 255, b: 200 / 255, a: 1 }),
    );
    expect(color.tryParse("rgba(40%, 50%, 60%, 70%)")).toEqual(
      new RGBColor({ r: 0.4, g: 0.5, b: 0.6, a: 0.7 }),
    );
  });
  it("parses slash hsl", () => {
    expect(color.tryParse("hsl(100deg 40% 50%)")).toEqual(
      new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5, a: 1 }),
    );
    expect(color.tryParse("hsl(100deg 40% 50% / 0.6)")).toEqual(
      new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5, a: 0.6 }),
    );
  });
  it("parses comma hsl", () => {
    expect(color.tryParse("hsl(100, 40% , 50%)")).toEqual(
      new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5, a: 1 }),
    );
    expect(color.tryParse("hsla(100, 40%, 50%,  0.6)")).toEqual(
      new HSLColor({ h: 100 / 360, s: 0.4, l: 0.5, a: 0.6 }),
    );
  });
  it("parses macaron-color", () => {
    expect(color.tryParse(`macaron-color("someVariable")`)).toEqual(
      new MacaronColor("someVariable"),
    );
  });
  it("parses hwb", () => {
    expect(color.tryParse("hwb(180 20% 30%)")).toEqual(
      new HWBColor({ h: 180 / 360, w: 0.2, b: 0.3 }),
    );
    expect(color.tryParse("hwb(90deg 10% 40% / 0.5)")).toEqual(
      new HWBColor({ h: 90 / 360, w: 0.1, b: 0.4, a: 0.5 }),
    );
    expect(color.tryParse("hwb(0.5turn 50% 25%)")).toEqual(
      new HWBColor({ h: 0.5, w: 0.5, b: 0.25 }),
    );
    // Edge cases
    expect(color.tryParse("hwb(0 0% 0%)")).toEqual(
      new HWBColor({ h: 0, w: 0, b: 0 }),
    );
    expect(color.tryParse("hwb(360 100% 100%)")).toEqual(
      new HWBColor({ h: 1, w: 1, b: 1 }),
    );
    expect(color.tryParse("HWB(270 50% 50% / 1)")).toEqual(
      new HWBColor({ h: 270 / 360, w: 0.5, b: 0.5, a: 1 }),
    );
  });
  it("parses lab", () => {
    expect(color.tryParse("lab(50% 25 -25)")).toEqual(
      new LABColor({ l: 50, a: 25, b: -25 }),
    );
    expect(color.tryParse("lab(70% -10 30 / 0.8)")).toEqual(
      new LABColor({ l: 70, a: -10, b: 30, alpha: 0.8 }),
    );
    expect(color.tryParse("lab(100% 0 0)")).toEqual(
      new LABColor({ l: 100, a: 0, b: 0 }),
    );
    // Percentage values for a and b axes
    expect(color.tryParse("lab(50% 50% -50%)")).toEqual(
      new LABColor({ l: 50, a: 62.5, b: -62.5 }),
    );
    expect(color.tryParse("LAB(0% -50 50 / 0%)")).toEqual(
      new LABColor({ l: 0, a: -50, b: 50, alpha: 0 }),
    );
  });
  it("parses oklab", () => {
    expect(color.tryParse("oklab(60% 0.1 -0.08)")).toEqual(
      new OKLABColor({ l: 0.6, a: 0.1, b: -0.08 }),
    );
    expect(color.tryParse("oklab(40% -0.05 0.02 / 0.5)")).toEqual(
      new OKLABColor({ l: 0.4, a: -0.05, b: 0.02, alpha: 0.5 }),
    );
    expect(color.tryParse("oklab(100% 0 0)")).toEqual(
      new OKLABColor({ l: 1, a: 0, b: 0 }),
    );
    // Percentage values for a and b
    expect(color.tryParse("oklab(50% 100% -100%)")).toEqual(
      new OKLABColor({ l: 0.5, a: 0.4, b: -0.4 }),
    );
    expect(color.tryParse("OKLAB(0% 0% 0% / 100%)")).toEqual(
      new OKLABColor({ l: 0, a: 0, b: 0, alpha: 1 }),
    );
  });
  it("parses lch", () => {
    expect(color.tryParse("lch(50% 35 180)")).toEqual(
      new LCHColor({ l: 50, c: 35, h: 180 / 360 }),
    );
    expect(color.tryParse("lch(70% 20 90deg / 0.6)")).toEqual(
      new LCHColor({ l: 70, c: 20, h: 90 / 360, a: 0.6 }),
    );
    expect(color.tryParse("lch(100% 0 0)")).toEqual(
      new LCHColor({ l: 100, c: 0, h: 0 }),
    );
    // Percentage chroma values
    expect(color.tryParse("lch(50% 50% 270)")).toEqual(
      new LCHColor({ l: 50, c: 75, h: 270 / 360 }),
    );
    expect(color.tryParse("LCH(25% 100% 1turn / 25%)")).toEqual(
      new LCHColor({ l: 25, c: 150, h: 1, a: 0.25 }),
    );
    expect(color.tryParse("lch(0% 0% 0.5turn)")).toEqual(
      new LCHColor({ l: 0, c: 0, h: 0.5 }),
    );
  });
  it("parses oklch", () => {
    expect(color.tryParse("oklch(40.1% 0.123 21.57)")).toEqual(
      new OKLCHColor({ l: 0.401, c: 0.123, h: 21.57 / 360 }),
    );
    expect(color.tryParse("oklch(59.69% 0.156 49.77 / 0.5)")).toEqual(
      new OKLCHColor({ l: 0.5969, c: 0.156, h: 49.77 / 360, a: 0.5 }),
    );
    expect(color.tryParse("oklch(70% 0.2 120deg)")).toEqual(
      new OKLCHColor({ l: 0.7, c: 0.2, h: 120 / 360 }),
    );
    expect(color.tryParse("oklch(50% 50% 180)")).toEqual(
      new OKLCHColor({ l: 0.5, c: 0.2, h: 180 / 360 }),
    );
  });
  it("parses color() function", () => {
    expect(color.tryParse("color(display-p3 1 0.5 0)")).toEqual(
      new ColorFunction({ space: "display-p3", c1: 1, c2: 0.5, c3: 0 }),
    );
    expect(color.tryParse("color(srgb 0.5 0.2 0.7 / 0.8)")).toEqual(
      new ColorFunction({ space: "srgb", c1: 0.5, c2: 0.2, c3: 0.7, a: 0.8 }),
    );
    expect(color.tryParse("color(rec2020 0% 50% 100%)")).toEqual(
      new ColorFunction({ space: "rec2020", c1: 0, c2: 0.5, c3: 1 }),
    );
    expect(color.tryParse("color(xyz-d65 0.2 0.4 0.6)")).toEqual(
      new ColorFunction({ space: "xyz-d65", c1: 0.2, c2: 0.4, c3: 0.6 }),
    );
    // Additional color spaces
    expect(color.tryParse("color(srgb-linear 0 1 0.5)")).toEqual(
      new ColorFunction({ space: "srgb-linear", c1: 0, c2: 1, c3: 0.5 }),
    );
    expect(color.tryParse("color(a98-rgb 100% 0% 50% / 50%)")).toEqual(
      new ColorFunction({ space: "a98-rgb", c1: 1, c2: 0, c3: 0.5, a: 0.5 }),
    );
    expect(color.tryParse("color(prophoto-rgb 0.3 0.7 0.9)")).toEqual(
      new ColorFunction({ space: "prophoto-rgb", c1: 0.3, c2: 0.7, c3: 0.9 }),
    );
    expect(color.tryParse("color(xyz 0.5 0.5 0.5)")).toEqual(
      new ColorFunction({ space: "xyz", c1: 0.5, c2: 0.5, c3: 0.5 }),
    );
    expect(color.tryParse("color(xyz-d50 25% 50% 75% / 0.1)")).toEqual(
      new ColorFunction({
        space: "xyz-d50",
        c1: 0.25,
        c2: 0.5,
        c3: 0.75,
        a: 0.1,
      }),
    );
  });
});
