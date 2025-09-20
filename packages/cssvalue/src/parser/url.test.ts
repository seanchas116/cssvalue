import { URL } from "../types/URL";
import { url } from "./url";
import { expect, describe, it } from "vitest";

describe("url", () => {
  it("parses url with double quotation", () => {
    expect(
      url.tryParse(`url("http://mysite.example.com/mycursor.png")`),
    ).toEqual(new URL(`http://mysite.example.com/mycursor.png`));
  });
  it("parses url with single quotation", () => {
    expect(
      url.tryParse(`url('http://mysite.example.com/mycursor.png')`),
    ).toEqual(new URL(`http://mysite.example.com/mycursor.png`));
  });
  it("parses url with no quotation", () => {
    expect(url.tryParse(`url(http://mysite.example.com/mycursor.png)`)).toEqual(
      new URL(`http://mysite.example.com/mycursor.png`),
    );
  });
});
