import { getEquationResults } from "utils/math";
import type { Equation } from "types";

// validates if the equation results matches
export function validateEquation(equation: Equation): boolean {
  const results = getEquationResults(equation);

  if (!results.length) return false;

  // checks if all results are equals and greater than the min
  return results.every((result) => {
    return result === results[0];
  });
}
