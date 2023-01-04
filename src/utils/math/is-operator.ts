import { Operator, Sign } from "constants/enums";

// verifies if the string is an operator
export function isOperator(value: unknown): value is Operator {
  const operators = [...Object.values(Operator), ...Object.values(Sign)];

  return operators.some((operator) => value === operator);
}
