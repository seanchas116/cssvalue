import { BoxShadow } from "./BoxShadow";
import { NamedColor } from "./Color";
import { Dimension } from "./Dimension";
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
