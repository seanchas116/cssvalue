import { number } from "./number";
import { expect, describe, it } from "vitest";

describe("number", () => {
  it("parses CSS number", () => {
    expect(number.tryParse("12")).toEqual(12);
    expect(number.tryParse("34.56")).toEqual(34.56);
    expect(number.tryParse(".789")).toEqual(0.789);
    expect(number.tryParse("34.56e10")).toEqual(34.56e10);
    expect(() => number.tryParse("0.")).toThrow();
    expect(() => number.tryParse("abbc")).toThrow();
  });
});
