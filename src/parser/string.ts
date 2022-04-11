import * as bnb from "bread-n-butter";
import { maybeWhitespace } from "./common";

// https://drafts.csswg.org/css-syntax-3/#string-token-diagram

const strEscape = bnb.choice(
  bnb.match(/\\u[0-9a-fA-F]{4}/).map((str) => {
    return String.fromCharCode(parseInt(str.slice(2), 16));
  }),
  bnb.text("\\b").map(() => "\b"),
  bnb.text("\\n").map(() => "\n"),
  bnb.text("\\f").map(() => "\f"),
  bnb.text("\\r").map(() => "\r"),
  bnb.text("\\t").map(() => "\t"),
  bnb.match(/\\./).map((str) => str.slice(1))
);

const doubleStrChunk = bnb.match(/[^"\\]+/);
const singleStrChunk = bnb.match(/[^'\\]+/);

const doubleStrBody = strEscape
  .or(doubleStrChunk)
  .repeat()
  .map((parts) => parts.join(""));
const singleStrBody = strEscape
  .or(singleStrChunk)
  .repeat()
  .map((parts) => parts.join(""));

const doubleString = doubleStrBody.trim(bnb.text('"')).trim(maybeWhitespace);

const singleString = singleStrBody.trim(bnb.text("'")).trim(maybeWhitespace);

export const string = doubleString.or(singleString).desc(["string"]);
