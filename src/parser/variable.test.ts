import { Variable as Variable } from "../types/Variable";
import { varFunction } from "./variable";
import { expect, describe, it } from "vitest";

describe("varFunction", () => {
  it("parses variable reference", () => {
    expect(varFunction.tryParse(`var(--var-name)`)).toEqual(
      new Variable("--var-name")
    );
  });
});
