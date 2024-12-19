import { Dimension } from "../types/Dimension";
import { angle, length, percentage } from "./dimension";
import { expect, describe, it } from "vitest";

describe("length", () => {
  it("parses CSS length", () => {
    expect(length.tryParse("0")).toEqual(new Dimension(0, ""));
    expect(length.tryParse("123px")).toEqual(new Dimension(123, "px"));
    expect(length.tryParse("-456px")).toEqual(new Dimension(-456, "px"));
    expect(length.tryParse("123em")).toEqual(new Dimension(123, "em"));
    expect(length.tryParse("123rem")).toEqual(new Dimension(123, "rem"));
    expect(length.tryParse("123vh")).toEqual(new Dimension(123, "vh"));
    expect(length.tryParse("123vw")).toEqual(new Dimension(123, "vw"));
    expect(() => length.tryParse("123%")).toThrow();
    expect(() => length.tryParse("aaa123px")).toThrow();
  });
});

describe("percentage", () => {
  it("parses CSS percentage", () => {
    expect(percentage.tryParse("50%")).toEqual(new Dimension(50, "%"));
  });
});

describe("angle", () => {
  it("parses CSS angle", () => {
    expect(angle.tryParse("123deg")).toEqual(new Dimension(123, "deg"));
    expect(angle.tryParse("-456.78rad")).toEqual(new Dimension(-456.78, "rad"));
  });
});
