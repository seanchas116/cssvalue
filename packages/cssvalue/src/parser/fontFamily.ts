import * as bnb from "bread-n-butter";
import { ident, keyword } from "./common";
import { string } from "./string";

// https://drafts.csswg.org/css-fonts-3/#family-name-value

export const familyName = bnb.choice(
  ident.repeat(1).map((idents) => idents.join(" ")),
  string,
);

export const fontFamily = familyName.sepBy(keyword(","));
