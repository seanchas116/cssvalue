import { familyName, fontFamily } from "./fontFamily";

describe("familyName", () => {
  it("parsers single font family name", () => {
    expect(familyName.tryParse("Arial")).toBe("Arial");
    expect(familyName.tryParse('"Helvetica Neue"')).toBe("Helvetica Neue");
    expect(familyName.tryParse("'Helvetica Neue'")).toBe("Helvetica Neue");
    expect(familyName.tryParse("Helvetica Neue")).toBe("Helvetica Neue");
    expect(familyName.tryParse("ＭＳ Ｐゴシック")).toBe("ＭＳ Ｐゴシック");
  });
});

describe("fontFamily", () => {
  it("parses font-family", () => {
    expect(
      fontFamily.tryParse(
        '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif'
      )
    ).toEqual([
      "游明朝",
      "YuMincho",
      "Hiragino Mincho ProN W3",
      "ヒラギノ明朝 ProN W3",
      "Hiragino Mincho ProN",
      "HG明朝E",
      "ＭＳ Ｐ明朝",
      "ＭＳ 明朝",
      "serif",
    ]);
  });
});
