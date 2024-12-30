import { Background, BackgroundLayer } from "../types/Background";
import { NamedColor, HexColor } from "../types/Color";
import { Dimension } from "../types/Dimension";
import { RadialGradient, ColorStop } from "../types/Gradient";
import { Position } from "../types/Position";
import { URL } from "../types/URL";
import { background, bgPosition } from "./background";
import { expect, describe, it } from "vitest";

describe("bgPosition", () => {
  it("parses single background-position with 1 value", () => {
    expect(bgPosition.tryParse("left")).toEqual(
      new Position({ from: "left", offset: new Dimension(0, "") }, "center"),
    );
    expect(bgPosition.tryParse("right")).toEqual(
      new Position({ from: "right", offset: new Dimension(0, "") }, "center"),
    );
    expect(bgPosition.tryParse("top")).toEqual(
      new Position("center", { from: "top", offset: new Dimension(0, "") }),
    );
    expect(bgPosition.tryParse("bottom")).toEqual(
      new Position("center", {
        from: "bottom",
        offset: new Dimension(0, ""),
      }),
    );
    expect(bgPosition.tryParse("center")).toEqual(
      new Position("center", "center"),
    );
  });
  it("parses single background-position with 2 values", () => {
    expect(bgPosition.tryParse("right bottom")).toEqual(
      new Position(
        { from: "right", offset: new Dimension(0, "") },
        { from: "bottom", offset: new Dimension(0, "") },
      ),
    );
    expect(bgPosition.tryParse("10px top")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(10, "px") },
        { from: "top", offset: new Dimension(0, "") },
      ),
    );
  });
  it("parses single background-position with 3 values", () => {
    expect(bgPosition.tryParse("right bottom")).toEqual(
      new Position(
        { from: "right", offset: new Dimension(0, "") },
        { from: "bottom", offset: new Dimension(0, "") },
      ),
    );
    expect(bgPosition.tryParse("righttop 15px")).toEqual(
      new Position(
        { from: "right", offset: new Dimension(0, "") },
        { from: "top", offset: new Dimension(15, "px") },
      ),
    );
  });
  it("parses single background-position with 4 values", () => {
    expect(bgPosition.tryParse("left 10px top 15px")).toEqual(
      new Position(
        { from: "left", offset: new Dimension(10, "px") },
        { from: "top", offset: new Dimension(15, "px") },
      ),
    );
  });
});

describe("background", () => {
  it("parses simple color", () => {
    expect(background.tryParse("green")).toEqual(
      new Background({
        color: new NamedColor("green"),
      }),
    );
  });
  it("parses single layer", () => {
    expect(
      background.tryParse("content-box radial-gradient(crimson, skyblue)"),
    ).toEqual(
      new Background({
        layers: [
          new BackgroundLayer({
            image: new RadialGradient({
              stops: [
                new ColorStop({ color: new NamedColor("crimson") }),
                new ColorStop({ color: new NamedColor("skyblue") }),
              ],
            }),
            origin: "content-box",
          }),
        ],
      }),
    );
  });
  it("parses multiple layer", () => {
    expect(
      background.tryParse(
        'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")',
      ),
    ).toEqual(
      new Background({
        layers: [
          new BackgroundLayer({
            position: new Position("center", "center"),
            size: "contain",
            repeatStyle: ["no-repeat"],
            image: new URL("foo.svg"),
          }),
          new BackgroundLayer({
            position: new Position(
              { from: "left", offset: new Dimension(35, "%") },
              "center",
            ),
            image: new URL("bar.png"),
          }),
        ],
        color: new HexColor("#eee"),
      }),
    );
  });
});
