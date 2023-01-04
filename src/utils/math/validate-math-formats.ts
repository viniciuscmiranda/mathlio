import { Operator, Sign } from "constants/enums";
import { isOperator, equationToString, expressionToString } from "utils/math";
import type { Expression, Equation } from "types";

// verifies if the equation is formatted correctly
export function validateEquationFormat(equation: Equation): boolean {
  const equationString = equationToString(equation);

  return (
    hasEqualSign(equationString) &&
    hasNumbers(equationString) &&
    !hasInvalidChars(equationString) &&
    !hasSequentialOperators(equationString) &&
    !hasEdgeOperators(equationString) &&
    !hasLeadingZeros(equationString) &&
    !hasDivisionByZero(equationString)
  );
}

// verifies if the expression is formatted correctly
export function validateExpressionFormat(expression: Expression): boolean {
  const expressionString = expressionToString(expression);

  return (
    hasNumbers(expressionString) &&
    !hasEqualSign(expressionString) &&
    !hasInvalidChars(expressionString) &&
    !hasSequentialOperators(expressionString) &&
    !hasEdgeOperators(expressionString) &&
    !hasLeadingZeros(expressionString) &&
    !hasDivisionByZero(expressionString)
  );
}

function hasEqualSign(equation: string): boolean {
  return equation.indexOf(Sign.Equals) !== -1;
}

function hasNumbers(equation: string): boolean {
  return Boolean(equation.match(/\d/));
}

function hasInvalidChars(equation: string): boolean {
  return equation.split("").some((char) => {
    return Number.isNaN(Number(char)) && !isOperator(char);
  });
}

function hasSequentialOperators(equation: string): boolean {
  return Boolean(equation.match(/[^\d]{2}/));
}

function hasEdgeOperators(equation: string): boolean {
  const startsWithOperator = Boolean(equation.match(/^[^\d]/));
  const endsWithOperator = Boolean(equation.match(/[^\d]$/));

  return startsWithOperator || endsWithOperator;
}

function hasLeadingZeros(equation: string): boolean {
  return Boolean(equation.match(/[^\d]0\d/) || equation.match(/^0\d/));
}

function hasDivisionByZero(equation: string): boolean {
  return equation.indexOf(`${Operator.Division}0`) !== -1;
}
