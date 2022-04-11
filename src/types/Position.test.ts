import { Dimension } from "./Dimension";
import { Position } from "./Position";

describe(Position, () => {
  describe("toString", () => {
    it("serializes keywords", () => {
      expect(
        new Position(undefined, {
          from: "top",
          offset: new Dimension(0, ""),
        }).toString()
      ).toEqual("top");
      expect(
        new Position(
          {
            from: "left",
            offset: new Dimension(0, ""),
          },
          undefined
        ).toString()
      ).toEqual("left");
      expect(
        new Position(
          {
            from: "left",
            offset: new Dimension(0, ""),
          },
          {
            from: "top",
            offset: new Dimension(0, ""),
          }
        ).toString()
      ).toEqual("left top");
    });
    it("serializes two dimension", () => {
      expect(
        new Position(
          { from: "right", offset: new Dimension(20, "px") },
          { from: "bottom", offset: new Dimension(10, "px") }
        ).toString()
      ).toEqual("right 20px bottom 10px");
    });
  });
});
