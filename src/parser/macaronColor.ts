import { MacaronColor } from "../types/MacaronColor";
import { keyword } from "./common";
import { string } from "./string";

export const macaronColor = keyword("macaron-color(")
  .next(string)
  .skip(keyword(")"))
  .map((name) => new MacaronColor(name));
