import type { Equation, Expression } from "types";

export function equationToString(equation: Equation): string {
  return equation.join("");
}

export function expressionToString(expression: Expression): string {
  return expression.join("");
}
