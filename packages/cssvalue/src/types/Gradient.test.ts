import { toBeDeepCloseTo, toMatchCloseTo } from "jest-matcher-deep-close-to";
import { HexColor } from "./Color";
import { ColorStop, interpolateStops } from "./Gradient";

import { expect, describe, it } from "vitest";
import { IterableObject } from "jest-matcher-deep-close-to/lib/types";

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe(interpolateStops, () => {
  it("interpolates gradient stops with no position value", () => {
    const stops = [
      new ColorStop({ color: new HexColor("#000") }),
      new ColorStop({ color: new HexColor("#111") }),
      new ColorStop({ color: new HexColor("#222") }),
    ];

    const interpolated = interpolateStops(stops);

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(interpolated).toBeDeepCloseTo([
      [new HexColor("#000"), 0],
      [new HexColor("#111"), 0.5],
      [new HexColor("#222"), 1],
    ] as IterableObject);
  });
  it("interpolates gradient stops", () => {
    const stops = [
      new ColorStop({ color: new HexColor("#000") }),
      new ColorStop({ color: new HexColor("#111") }),
      new ColorStop({ color: new HexColor("#222") }),
      new ColorStop({ color: new HexColor("#333") }),
      new ColorStop({ color: new HexColor("#444"), position0: 0.4 }),
      new ColorStop({ color: new HexColor("#555") }),
      new ColorStop({ color: new HexColor("#666") }),
      new ColorStop({ color: new HexColor("#777") }),
      new ColorStop({ color: new HexColor("#888"), position0: 0.8 }),
      new ColorStop({ color: new HexColor("#999") }),
      new ColorStop({ color: new HexColor("#AAA") }),
    ];

    const interpolated = interpolateStops(stops);

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(interpolated).toBeDeepCloseTo([
      [new HexColor("#000"), 0],
      [new HexColor("#111"), 0.1],
      [new HexColor("#222"), 0.2],
      [new HexColor("#333"), 0.3],
      [new HexColor("#444"), 0.4],
      [new HexColor("#555"), 0.5],
      [new HexColor("#666"), 0.6],
      [new HexColor("#777"), 0.7],
      [new HexColor("#888"), 0.8],
      [new HexColor("#999"), 0.9],
      [new HexColor("#AAA"), 1],
    ] as IterableObject);
  });
});
