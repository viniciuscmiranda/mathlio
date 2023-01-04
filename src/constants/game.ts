import { Operator } from "constants/enums";

export const GAME_ROW_LENGTH = 7;
export const GAME_BOARD_ROWS = 3;
export const GAME_MIN_RESULT = 1;
export const GAME_DIGIT_POINTS_VALUE = 1;
export const GAME_POWER_POINTS = 2;
export const GAME_MIN_ADJACENT_NUMBER_TO_ADD_OPERATOR_POINTS = 2;

export const GAME_OPERATORS_POINTS_VALUE = {
  [Operator.Multiplication]: 1,
  [Operator.Division]: 1,
  [Operator.Addition]: 0,
  [Operator.Subtraction]: 0,
};
