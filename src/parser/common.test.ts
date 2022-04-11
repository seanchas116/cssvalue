import * as bnb from "bread-n-butter";
import { doubleAmpersand, doubleBar, ident, maybeWhitespace } from "./common";
import { length } from "./dimension";

describe("ident", () => {
  it("parses CSS identifier", () => {
    expect(ident.tryParse("foo123_-あいうえお")).toBe("foo123_-あいうえお");
    expect(ident.tryParse("文字列")).toBe("文字列");
    expect(() => ident.tryParse("foo123,あいうえお")).toThrow();
  });
});

describe("doubleBar", () => {
  it("parses CSS double bar", () => {
    const parser = doubleBar({
      foo: bnb.text("foo").trim(maybeWhitespace),
      bar: bnb.text("bar").trim(maybeWhitespace),
      baz: bnb.text("baz").trim(maybeWhitespace),
    });
    expect(parser.tryParse("bar")).toEqual({
      bar: "bar",
    });
    expect(parser.tryParse("bar baz")).toEqual({
      bar: "bar",
      baz: "baz",
    });
    expect(parser.tryParse("baz bar foo")).toEqual({
      foo: "foo",
      bar: "bar",
      baz: "baz",
    });
    expect(() => parser.tryParse("baz bar baz")).toThrow();
    expect(() => parser.tryParse("")).toThrow();
  });
});

describe("doubleAmpersand", () => {
  it("parses CSS double ampersand", () => {
    const parser = doubleAmpersand({
      foo: bnb.text("foo").trim(maybeWhitespace),
      bar: length,
      baz: bnb.text("baz").trim(maybeWhitespace),
    });
    expect(parser.tryParse("baz foo 10px")).toEqual({
      foo: "foo",
      bar: { value: 10, unit: "px" },
      baz: "baz",
    });
    expect(parser.tryParse("10px foo baz")).toEqual({
      foo: "foo",
      bar: { value: 10, unit: "px" },
      baz: "baz",
    });
    expect(() => parser.tryParse("10px foo")).toThrow();
  });
  it("parses CSS double ampersand with optional", () => {
    const parser = doubleAmpersand(
      {
        foo: bnb.text("foo").trim(maybeWhitespace),
        bar: length,
      },
      {
        baz: bnb.text("baz").trim(maybeWhitespace),
      }
    );
    expect(parser.tryParse("baz foo 10px")).toEqual({
      foo: "foo",
      bar: { value: 10, unit: "px" },
      baz: "baz",
    });
    expect(parser.tryParse("10px foo")).toEqual({
      foo: "foo",
      bar: { value: 10, unit: "px" },
    });
  });
});
