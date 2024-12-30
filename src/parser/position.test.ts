import { Dimension } from "../types/Dimension";
import { Position } from "../types/Position";
import { position } from "./position";
import { expect, describe, it } from "vitest";

describe("position", () => {
  it("parses single keywords", () => {
    expect(position.tryParse("top")).toEqual(
      new Position(undefined, { from: "top", offset: new Dimension(0, "") }),
    );
    expect(position.tryParse("bottom")).toEqual(
      new Position(undefined, { from: "bottom", offset: new Dimension(0, "") }),
    );
    expect(position.tryParse("left")).toEqual(
      new Position({ from: "left", offset: new Dimension(0, "") }, undefined),
    );
    expect(position.tryParse("right")).toEqual(
      new Position({ from: "right", offset: new Dimension(0, "") }, undefined),
    );
  });
  it("parses single dimension", () => {
    expect(position.tryParse("10px")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(10, "px") },
        undefined,
      ),
    );
  });
  it("parses two length/percentages", () => {
    expect(position.tryParse("10ch 75%")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(10, "ch") },
        { from: "top", offset: new Dimension(75, "%") },
      ),
    );
  });
  it("parses length with keyword", () => {
    expect(position.tryParse("75em top")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(75, "em") },
        { from: "top", offset: new Dimension(0, "") },
      ),
    );
  });
  it("parses offsets from edges", () => {
    expect(position.tryParse("bottom left")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(0, "") },
        { from: "bottom", offset: new Dimension(0, "") },
      ),
    );
    expect(position.tryParse("center center")).toEqual(
      new Position("center", "center"),
    );
    expect(position.tryParse("bottom 10px right 20px")).toEqual(
      new Position(
        { from: "right", offset: new Dimension(20, "px") },
        { from: "bottom", offset: new Dimension(10, "px") },
      ),
    );
    expect(position.tryParse("right 3em top 10px")).toEqual(
      new Position(
        { from: "right", offset: new Dimension(3, "em") },
        { from: "top", offset: new Dimension(10, "px") },
      ),
    );
  });
});
