import { KeyboardKey, Operator, Sign } from "constants/enums";

export type EquationElement = number | Operator | Sign;
export type Equation = EquationElement[];

export type ExpressionElement = number | Operator;
export type Expression = ExpressionElement[];

export type Puzzle = {
  date: Date;
  problem: number[];
  solutions: string[];
};
