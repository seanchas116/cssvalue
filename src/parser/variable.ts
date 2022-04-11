import * as bnb from "bread-n-butter";
import { Variable } from "../types/Variable";
import { ident, keyword } from "./common";

const varName = bnb.text("--").next(ident);

export const varFunction = keyword("var(")
  .next(varName)
  .skip(keyword(")"))
  .map((name) => new Variable("--" + name));
