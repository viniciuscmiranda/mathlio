import type { Equation } from "types";
import { isOperator, getEquationResults, validateEquation } from "utils/math";
import {
  GAME_DIGIT_POINTS_VALUE,
  GAME_MIN_ADJACENT_NUMBER_TO_ADD_OPERATOR_POINTS,
  GAME_OPERATORS_POINTS_VALUE,
  GAME_MIN_RESULT,
  GAME_POWER_POINTS,
} from "constants/game";

export function calculateEquationPoints(equation: Equation): number {
  if (!validateEquation(equation)) return 0;

  const results = getEquationResults(equation);

  if (results.some((result) => result < GAME_MIN_RESULT)) return 0;

  const flatPoints = equation.reduce((acc: number, element, index) => {
    if (isOperator(element)) {
      const nextNumber = equation[index + 1];
      const prevNumber = equation[index - 1];

      const canAddOperatorPoints =
        nextNumber >= GAME_MIN_ADJACENT_NUMBER_TO_ADD_OPERATOR_POINTS &&
        prevNumber >= GAME_MIN_ADJACENT_NUMBER_TO_ADD_OPERATOR_POINTS;

      if (canAddOperatorPoints) {
        const operatorPoints = GAME_OPERATORS_POINTS_VALUE[element];
        acc += operatorPoints;
      }
    } else {
      const numberSize = String(element).length;
      acc += GAME_DIGIT_POINTS_VALUE * numberSize;
    }

    return acc;
  }, 0);

  return flatPoints ** GAME_POWER_POINTS;
}
