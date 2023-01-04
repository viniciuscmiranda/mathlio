import { Operator, Sign } from "constants/enums";
import {
  isOperator,
  validateExpressionFormat,
  validateEquationFormat,
} from "utils/math";
import { splitArray, joinArray } from "utils/arrays";
import type { Equation, Expression } from "types";

export function parseEquation(value: string | Equation): Equation {
  const splitted =
    typeof value === "string"
      ? value.split(Sign.Equals)
      : (splitArray(value, Sign.Equals) as Expression[]);

  const expressions = splitted.map((expression) => {
    return parseExpression(expression);
  });

  const equation = joinArray(expressions, Sign.Equals);

  const isValid = validateEquationFormat(equation);
  return isValid ? equation : [];
}

export function parseExpression(value: string | Expression): Expression {
  const chars: string[] = [];

  let currentCharIndex = 0;
  for (let element of value) {
    const currentDigit = chars[currentCharIndex] ?? "";

    // when an operator is found, push it and go to the next character
    if (isOperator(element)) {
      chars.push(String(element));
      // since the operator is also pushed, adds two to current index
      currentCharIndex += 2;
    } else {
      chars[currentCharIndex] = currentDigit.concat(String(element));
    }
  }

  const expression: Expression = chars.map((char) => {
    if (isOperator(char)) {
      return char;
      // avoids leading zeros
    } else if (!(char.startsWith("0") && char !== "0")) {
      return Number(char);
    } else {
      return Number.NaN;
    }
  });

  const isValid = validateExpressionFormat(expression);

  return isValid ? expression : [];
}
