import { Sign } from "constants/enums";
import type { Equation, Expression } from "types";

export function getEquationExpressions(equation: Equation): Expression[] {
  const expressions = equation.reduce(
    (response: Expression[], element) => {
      // creates a new expression when a equal sign is found
      if (element === Sign.Equals) response.push([]);
      else response.at(-1)?.push(element);

      return response;
    },
    [[]]
  );

  return expressions;
}
