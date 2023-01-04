import { describe, it, expect } from "vitest";
import { isOperator } from "utils/math";
import { Operator, Sign } from "constants/enums";

describe("is operator", () => {
  it("should find operators", () => {
    Object.values(Operator).forEach((operator) => {
      expect(isOperator(operator)).toBe(true);
    });
  });

  it("should find signs", () => {
    Object.values(Sign).forEach((operator) => {
      expect(isOperator(operator)).toBe(true);
    });
  });

  it("should not find invalid characters", () => {
    expect(isOperator("")).toBe(false);
    expect(isOperator("  ")).toBe(false);
    expect(isOperator("++")).toBe(false);
    expect(isOperator("abc")).toBe(false);
    expect(isOperator("123123")).toBe(false);
    expect(isOperator("===")).toBe(false);
  });
});
