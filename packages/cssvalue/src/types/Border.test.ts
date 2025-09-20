import { NamedColor } from "./Color";
import { Border } from "./Border";
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
