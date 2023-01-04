import { describe, it, expect } from "vitest";
import { isEquation, parseEquation, parseExpression } from "utils/math";
import { Sign } from "constants/enums";

describe("is equation", () => {
  it("should find valid equations", () => {
    expect(isEquation(parseEquation("1=1"))).toBe(true);
    expect(isEquation(parseEquation("2*2=4"))).toBe(true);
  });

  it("should find wrong equations", () => {
    expect(isEquation(parseEquation("4-4=99999"))).toBe(true);
    expect(isEquation(parseEquation("10*10=0"))).toBe(true);
  });

  it("should not find non equations", () => {
    expect(isEquation([])).toBe(false);
    expect(isEquation([Sign.Equals])).toBe(false);
    expect(isEquation(parseExpression("1+1"))).toBe(false);
    expect(isEquation(parseExpression("99="))).toBe(false);
    expect(isEquation(parseExpression("=1+99"))).toBe(false);
    expect(isEquation(parseExpression("3*10-48*3"))).toBe(false);
  });
});
