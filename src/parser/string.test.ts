import { string } from "./string";
import { expect, describe, it } from "vitest";

describe("string", () => {
  it("parses string with quotation", () => {
    expect(string.tryParse(`"this is a string."`)).toEqual(`this is a string.`);
    expect(string.tryParse(`"this is a \\"string\\"."`)).toEqual(
      `this is a "string".`
    );
    expect(string.tryParse(`'this is a string.'`)).toEqual(`this is a string.`);
    expect(string.tryParse(`'this is a \\'string\\'.'`)).toEqual(
      `this is a 'string'.`
    );
  });
});
