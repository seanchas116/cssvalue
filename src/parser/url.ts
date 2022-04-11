import * as bnb from "bread-n-butter";
import { URL } from "../types/URL";
import { keyword } from "./common";
import { string } from "./string";

// https://drafts.csswg.org/css-syntax-3/#url-token-diagram

const urlEscape = bnb.match(/\\./).map((str) => str.slice(1));
// eslint-disable-next-line no-control-regex
const urlChunk = bnb.match(/[^"'\\()\x00-\x20]+/);

const urlBody = bnb
  .choice(urlEscape, urlChunk)
  .repeat()
  .map((parts) => parts.join(""));

const urlToken = keyword("url(").next(urlBody).skip(keyword(")"));

const urlQuoted = keyword("url(").next(string).skip(keyword(")"));

export const url: bnb.Parser<URL> = urlQuoted
  .or(urlToken)
  .desc(["url"])
  .map((url) => new URL(url));
