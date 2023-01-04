import { Sign } from "constants/enums";
import type { Equation } from "types";

export function isEquation(equation: Equation): equation is Equation {
  return (
    equation.includes(Sign.Equals) &&
    equation[0] !== Sign.Equals &&
    equation.at(-1) !== Sign.Equals
  );
}
