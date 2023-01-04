import { describe, it, expect } from "vitest";
import { getEquationResults, parseEquation } from "utils/math";

describe("get equation results", () => {
  it("should calculate the results correctly", () => {
    expect(getEquationResults(parseEquation(""))).toEqual([]);
    expect(getEquationResults(parseEquation("5+5=10"))).toEqual([10, 10]);
    expect(getEquationResults(parseEquation("5+5=10=2*5=50/5"))).toEqual([
      10, 10, 10, 10,
    ]);

    expect(getEquationResults(parseEquation("10+5=23*2"))).toEqual([15, 46]);
  });

  it("should not calculate invalid formats", () => {
    expect(getEquationResults(parseEquation(""))).toEqual([]);
    expect(getEquationResults(parseEquation("+++"))).toEqual([]);
    expect(getEquationResults(parseEquation("1+1"))).toEqual([]);
    expect(getEquationResults(parseEquation("1+1==2"))).toEqual([]);
    expect(getEquationResults(parseEquation("1-2=-1"))).toEqual([]);
    expect(getEquationResults(parseEquation("(1+2)*2=6"))).toEqual([]);
    expect(getEquationResults(parseEquation("1=01"))).toEqual([]);
    expect(getEquationResults(parseEquation("4*4="))).toEqual([]);
  });
});
