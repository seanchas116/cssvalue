import { NamedColor, HexColor } from "../types/Color";
import { Dimension } from "../types/Dimension";
import { ColorStop, LinearGradient, RadialGradient } from "../types/Gradient";
import { Position } from "../types/Position";
import { colorStop, linearGradient, radialGradient } from "./gradient";
import { expect, describe, it } from "vitest";

describe("colorStop", () => {
  it("parses color stop", () => {
    expect(colorStop.tryParse(" white 10% 20%")).toEqual(
      new ColorStop({
        color: new NamedColor("white"),
        position0: 0.1,
        position1: 0.2,
      }),
    );
  });
});

describe("linearGradient", () => {
  it("parsed linear-gradient()", () => {
    expect(
      linearGradient.tryParse(
        "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)",
      ),
    ).toEqual(
      new LinearGradient({
        direction: "left",
        stops: [
          new ColorStop({ color: new HexColor("#333") }),
          new ColorStop({ color: new HexColor("#333"), position0: 0.5 }),
          new ColorStop({ color: new HexColor("#eee"), position0: 0.75 }),
          new ColorStop({ color: new HexColor("#333"), position0: 0.75 }),
        ],
      }),
    );
    expect(
      linearGradient
        .tryParse(
          "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)",
        )
        .toString(),
    ).toEqual("linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)");

    expect(
      linearGradient.tryParse(
        "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
      ),
    ).toEqual(
      new LinearGradient({
        direction: new Dimension(0.25, "turn"),
        stops: [
          new ColorStop({ color: new HexColor("#3f87a6") }),
          new ColorStop({ color: new HexColor("#ebf8e1") }),
          new ColorStop({ color: new HexColor("#f69d3c") }),
        ],
      }),
    );
    expect(
      linearGradient
        .tryParse("linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)")
        .toString(),
    ).toEqual("linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)");

    expect(
      linearGradient.tryParse(
        "linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%)",
      ),
    ).toEqual(
      new LinearGradient({
        stops: [
          new ColorStop({ color: new NamedColor("red") }),
          new ColorStop({
            color: new NamedColor("orange"),
            position0: 0.1,
            position1: 0.3,
          }),
          new ColorStop({
            color: new NamedColor("yellow"),
            position0: 0.5,
            position1: 0.7,
          }),
          new ColorStop({ color: new NamedColor("green"), position0: 0.9 }),
        ],
      }),
    );
    expect(
      linearGradient
        .tryParse(
          "linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%)",
        )
        .toString(),
    ).toEqual(
      "linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%)",
    );

    expect(
      linearGradient.tryParse(
        "repeating-linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%)",
      ),
    ).toEqual(
      new LinearGradient({
        stops: [
          new ColorStop({ color: new NamedColor("red") }),
          new ColorStop({
            color: new NamedColor("orange"),
            position0: 0.1,
            position1: 0.3,
          }),
          new ColorStop({
            color: new NamedColor("yellow"),
            position0: 0.5,
            position1: 0.7,
          }),
          new ColorStop({ color: new NamedColor("green"), position0: 0.9 }),
        ],
        repeating: true,
      }),
    );
  });
});

describe("radialGradient", () => {
  it("parses radial-gradient", () => {
    expect(
      radialGradient.tryParse(
        "radial-gradient(5em circle at top left, yellow, blue) ",
      ),
    ).toEqual(
      new RadialGradient({
        endingShape: "circle",
        size: [new Dimension(5, "em")],
        position: new Position(
          { from: "left", offset: new Dimension(0, "") },
          { from: "top", offset: new Dimension(0, "") },
        ),
        stops: [
          new ColorStop({ color: new NamedColor("yellow") }),
          new ColorStop({ color: new NamedColor("blue") }),
        ],
      }),
    );
    expect(
      radialGradient.tryParse(
        "radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)",
      ),
    ).toEqual(
      new RadialGradient({
        size: "closest-side",
        stops: [
          new ColorStop({ color: new HexColor("#3f87a6") }),
          new ColorStop({ color: new HexColor("#ebf8e1") }),
          new ColorStop({ color: new HexColor("#f69d3c") }),
        ],
      }),
    );
    expect(radialGradient.tryParse("radial-gradient(yellow, blue) ")).toEqual(
      new RadialGradient({
        stops: [
          new ColorStop({ color: new NamedColor("yellow") }),
          new ColorStop({ color: new NamedColor("blue") }),
        ],
      }),
    );
    expect(
      radialGradient.tryParse("radial-gradient(10px, yellow, blue) "),
    ).toEqual(
      new RadialGradient({
        endingShape: "circle",
        size: [new Dimension(10, "px")],
        stops: [
          new ColorStop({ color: new NamedColor("yellow") }),
          new ColorStop({ color: new NamedColor("blue") }),
        ],
      }),
    );
    expect(
      radialGradient.tryParse("repeating-radial-gradient(yellow, blue) "),
    ).toEqual(
      new RadialGradient({
        stops: [
          new ColorStop({ color: new NamedColor("yellow") }),
          new ColorStop({ color: new NamedColor("blue") }),
        ],
        repeating: true,
      }),
    );
  });
});
