import { describe, it, expect } from "vitest";
import { parseEquation, parseExpression } from "utils/math";
import { Operator, Sign } from "constants/enums";
import { Equation, Expression } from "types";

describe("string to equation", () => {
  it("should mount the equation correctly", () => {
    expect(parseEquation("1+1=2")).toEqual([
      1,
      Operator.Addition,
      1,
      Sign.Equals,
      2,
    ]);
  });

  it("should mount wrong equations", () => {
    expect(parseEquation("5*10=99-1=7")).toEqual([
      5,
      Operator.Multiplication,
      10,
      Sign.Equals,
      99,
      Operator.Subtraction,
      1,
      Sign.Equals,
      7,
    ]);
  });

  it("should not mount bad formatted equations", () => {
    expect(parseEquation("+++")).toEqual([]);
    expect(parseEquation("1-99=-98")).toEqual([]);
    expect(parseEquation("+1=2")).toEqual([]);
    expect(parseEquation("2=")).toEqual([]);
    expect(parseEquation("1+1")).toEqual([]);
  });

  it("should accept an expression as a parameter", () => {
    const equation: Equation = [2, Operator.Multiplication, 2, Sign.Equals, 4];
    expect(parseEquation(equation)).toEqual(equation);
  });

  it("should join adjacent numbers", () => {
    const equation: Equation = [
      3,
      2,
      1,
      Operator.Addition,
      1,
      2,
      3,
      Sign.Equals,
      4,
      4,
      4,
    ];

    expect(parseEquation(equation)).toEqual([
      321,
      Operator.Addition,
      123,
      Sign.Equals,
      444,
    ]);
  });
});

describe("string to expression", () => {
  it("should mount the expression correctly", () => {
    expect(parseExpression("1+1")).toEqual([1, Operator.Addition, 1]);
    expect(parseExpression("238*10/5")).toEqual([
      238,
      Operator.Multiplication,
      10,
      Operator.Division,
      5,
    ]);
  });

  it("should not mount bad formatted expressions", () => {
    expect(parseExpression("+++")).toEqual([]);
    expect(parseExpression("1-99=-98")).toEqual([]);
    expect(parseExpression("+1=2")).toEqual([]);
    expect(parseExpression("2=")).toEqual([]);
    expect(parseExpression("1+1=2")).toEqual([]);
  });

  it("should accept an equation as a parameters", () => {
    const expression: Expression = [2, Operator.Multiplication, 2];
    expect(parseExpression(expression)).toEqual(expression);
  });

  it("should join adjacent numbers", () => {
    const expression: Expression = [1, 1, Operator.Addition, 23, 4];
    expect(parseExpression(expression)).toEqual([11, Operator.Addition, 234]);
  });
});
