import { Operator } from "constants/enums";
import { validateExpressionFormat } from "utils/math";
import type { Expression } from "types";

// evaluates the expression in the math priority order
export function evaluateExpression(expression: Expression): number {
  if (!validateExpressionFormat(expression)) return NaN;

  const firstPriorityEvaluation = evaluate(expression, [
    Operator.Multiplication,
    Operator.Division,
  ]);

  const secondPriorityEvaluation = evaluate(firstPriorityEvaluation, [
    Operator.Addition,
    Operator.Subtraction,
  ]);

  // the result from the second evaluation should be an array with a single element
  // which is expected to be a number, since all possible operations will be calculated
  const evaluation = secondPriorityEvaluation;

  return Number(evaluation);
}

// evaluates the first found valid operation contained in the expression recursively
function evaluate(expression: Expression, operations: Operator[]): Expression {
  const exp = [...expression];

  for (const char of exp) {
    if (typeof char === "number") continue;
    // if the char is a valid operator, operates
    if (operations.includes(char)) {
      const index = exp.indexOf(char);

      const n1 = Number(exp[index - 1]);
      const n2 = Number(exp[index + 1]);

      const result = operate(char, n1, n2);
      // replaces the numbers and the operator for the obtained result
      // 3 items to be removed in total, starting from the first number
      exp.splice(index - 1, 3, result);

      // keeps evaluating until no valid operation is found
      return evaluate(exp, operations);
    }
  }

  // stops if the operations were not found
  return expression;
}

// calculates an operation result
function operate(operator: Operator, n1: number, n2: number): number {
  switch (operator) {
    case Operator.Multiplication:
      return n1 * n2;
    case Operator.Division:
      return n1 / n2;
    case Operator.Addition:
      return n1 + n2;
    case Operator.Subtraction:
      return n1 - n2;
    default:
      return Number.NaN;
  }
}
