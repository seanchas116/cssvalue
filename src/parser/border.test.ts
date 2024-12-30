import { HexColor, NamedColor, RGBColor } from "../types/Color";
import { Border } from "../types/Border";
import { Dimension } from "../types/Dimension";
import { border, borderColor, borderStyle, borderWidth } from "./border";
import { expect, describe, it } from "vitest";

describe(Border, () => {
  describe("toString", () => {
    it("stringifies Border", () => {
      const border = new Border({
        width: "medium",
        style: "dashed",
        color: new NamedColor("green"),
      });
      expect(border.toString()).toEqual("medium dashed green");
    });
  });
});

describe("borderWidth", () => {
  it("parsed border-width", () => {
    expect(() => borderWidth.tryParse("hoge")).toThrow();
    expect(borderWidth.tryParse("thin")).toEqual(["thin"]);
    expect(borderWidth.tryParse(" medium")).toEqual(["medium"]);
    expect(borderWidth.tryParse("thick ")).toEqual(["thick"]);
    expect(borderWidth.tryParse("20px")).toEqual([{ value: 20, unit: "px" }]);
    expect(borderWidth.tryParse(" 100px 1.25em ")).toEqual([
      { value: 100, unit: "px" },
      { value: 1.25, unit: "em" },
    ]);
    expect(borderWidth.tryParse("10px 0.5em 1.2rem")).toEqual([
      { value: 10, unit: "px" },
      { value: 0.5, unit: "em" },
      { value: 1.2, unit: "rem" },
    ]);
    expect(borderWidth.tryParse("10px thin 1.2rem 5px")).toEqual([
      { value: 10, unit: "px" },
      "thin",
      { value: 1.2, unit: "rem" },
      { value: 5, unit: "px" },
    ]);
  });
});

describe("borderStyle", () => {
  it("parsed border-style", () => {
    expect(() => borderStyle.tryParse("hoge")).toThrow();
    expect(borderStyle.tryParse("none")).toEqual(["none"]);
    expect(borderStyle.tryParse("dotted")).toEqual(["dotted"]);
    expect(borderStyle.tryParse("dotted solid")).toEqual(["dotted", "solid"]);
    expect(borderStyle.tryParse("hidden double dashed")).toEqual([
      "hidden",
      "double",
      "dashed",
    ]);
    expect(borderStyle.tryParse("none solid dotted dashed")).toEqual([
      "none",
      "solid",
      "dotted",
      "dashed",
    ]);
  });
});

describe("borderColor", () => {
  it("parsed border-color", () => {
    expect(borderColor.tryParse("red rgb(240,30,50,.7) green")).toEqual([
      new NamedColor("red"),
      new RGBColor({ r: 240 / 255, g: 30 / 255, b: 50 / 255, a: 0.7 }),
      new NamedColor("green"),
    ]);
  });
});

describe("border", () => {
  it("parsed border", () => {
    expect(border.tryParse(" medium dashed green")).toEqual(
      new Border({
        width: "medium",
        style: "dashed",
        color: new NamedColor("green"),
      }),
    );
    expect(border.tryParse(" #f33 outset")).toEqual(
      new Border({ style: "outset", color: new HexColor("#f33") }),
    );
    expect(border.tryParse(" 0 #f33 outset ")).toEqual(
      new Border({
        width: new Dimension(0, ""),
        style: "outset",
        color: new HexColor("#f33"),
      }),
    );
    expect(border.tryParse("solid 1px rgba(231,39,39,0.9)")).toEqual(
      new Border({
        width: new Dimension(1, "px"),
        style: "solid",
        color: new RGBColor({ r: 231 / 255, g: 39 / 255, b: 39 / 255, a: 0.9 }),
      }),
    );
  });
});
