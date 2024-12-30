import { BoxShadow } from "../types/BoxShadow";
import { NamedColor, HexColor } from "../types/Color";
import { Dimension } from "../types/Dimension";
import { boxShadow, singleBoxShadow } from "./boxShadow";
import { expect, describe, it } from "vitest";

describe(BoxShadow, () => {
  describe("toString", () => {
    it("stringifies BoxShadow", () => {
      const boxShadow0 = new BoxShadow({
        offsetX: new Dimension(3, "px"),
        offsetY: new Dimension(3, "px"),
        color: new NamedColor("red"),
      });
      expect(boxShadow0.toString()).toEqual("3px 3px 0 0 red");

      const boxShadow1 = new BoxShadow({
        inset: true,
        offsetX: new Dimension(-1, "em"),
        offsetY: new Dimension(0, ""),
        blurRadius: new Dimension(0.4, "em"),
        spreadRadius: new Dimension(0, ""),
        color: new NamedColor("olive"),
      });
      expect(boxShadow1.toString()).toEqual("inset -1em 0 0.4em 0 olive");
    });
  });
});

describe("singleBoxShadow", () => {
  it("parsed single boxshadow", () => {
    expect(singleBoxShadow.tryParse("3px 3px red")).toEqual(
      new BoxShadow({
        offsetX: new Dimension(3, "px"),
        offsetY: new Dimension(3, "px"),
        blurRadius: new Dimension(0, ""),
        spreadRadius: new Dimension(0, ""),
        color: new NamedColor("red"),
      }),
    );
  });
});

describe("boxShadow", () => {
  it("parsed box-shadow", () => {
    expect(boxShadow.tryParse("none")).toEqual([]);
    expect(boxShadow.tryParse("3px 3px red, inset -1em 0 0.4em olive")).toEqual(
      [
        new BoxShadow({
          offsetX: new Dimension(3, "px"),
          offsetY: new Dimension(3, "px"),
          blurRadius: new Dimension(0, ""),
          spreadRadius: new Dimension(0, ""),
          color: new NamedColor("red"),
        }),
        new BoxShadow({
          inset: true,
          offsetX: new Dimension(-1, "em"),
          offsetY: new Dimension(0, ""),
          blurRadius: new Dimension(0.4, "em"),
          spreadRadius: new Dimension(0, ""),
          color: new NamedColor("olive"),
        }),
      ],
    );
  });
  expect(boxShadow.tryParse("0 0 10px 0 #000000")).toEqual([
    new BoxShadow({
      offsetX: new Dimension(0, ""),
      offsetY: new Dimension(0, ""),
      blurRadius: new Dimension(10, "px"),
      spreadRadius: new Dimension(0, ""),
      color: new HexColor("#000000"),
    }),
  ]);
});
