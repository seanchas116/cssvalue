import {
  CurrentColor,
  HexColor,
  HSLColor,
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

describe("color", () => {
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
});
