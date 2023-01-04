import {
  validateEquationFormat,
  evaluateExpression,
  getEquationExpressions,
} from "utils/math";
import type { Equation } from "types";

// validates if the equation results matches
export function getEquationResults(equation: Equation): number[] {
  if (!validateEquationFormat(equation)) return [];

  // splits by equals operators to get the expressions
  const expressions = getEquationExpressions(equation);

  const results = expressions.map((expression) => {
    return evaluateExpression(expression);
  });

  return results;
}
