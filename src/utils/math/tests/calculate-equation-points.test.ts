import { describe, it, expect } from "vitest";
import { calculateEquationPoints, parseEquation } from "utils/math";
import { Operator } from "constants/enums";

describe("calculate equation points", () => {
  it("should calculate the points correctly", () => {
    expect(calculateEquationPoints(parseEquation("2+2=4"))).toBe(9);
    expect(calculateEquationPoints(parseEquation("2*2=4"))).toBe(16);
    expect(calculateEquationPoints(parseEquation("20/2*4=40"))).toBe(64);
  });

  it("should not add operator points if dividing by 1", () => {
    expect(calculateEquationPoints(parseEquation("10/1+2*2=14"))).toBe(64);
  });

  it("should not add operator points if multiplying by 1", () => {
    expect(calculateEquationPoints(parseEquation("1*3+10/5=5"))).toBe(49);
  });

  it("should not calculate equations resulting in 0", () => {
    expect(calculateEquationPoints(parseEquation("0=0"))).toBe(0);
    expect(calculateEquationPoints(parseEquation("5-5=0"))).toBe(0);
    expect(calculateEquationPoints(parseEquation("20-20=10+10-20"))).toBe(0);
  });

  it("should not calculate invalid equations", () => {
    expect(calculateEquationPoints([])).toBe(0);
    expect(calculateEquationPoints(parseEquation("1+1=3"))).toBe(0);
    expect(calculateEquationPoints([Operator.Multiplication])).toBe(0);
  });
});
