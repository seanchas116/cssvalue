import * as bnb from "bread-n-butter";

// https://drafts.csswg.org/css-syntax-3/#typedef-number-token

const sign = bnb.match(/[+-]/).or(bnb.ok(""));
const int = bnb.match(/[0-9]+/);
const frac = bnb.match(/\.[0-9]+/);
const intFrac = bnb.all(int, frac).map(([int, frac]) => int + frac);
const exp = bnb.match(/e[+-]?[0-9]+/i).or(bnb.ok(""));

export const number = bnb
  .all(sign, bnb.choice(intFrac, int, frac), exp)
  .map(([sign, intFrac, exp]) => Number(sign + intFrac + exp));
