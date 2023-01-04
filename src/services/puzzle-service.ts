import type { Puzzle } from "types";

import { generatePuzzle } from "../../../mathlio-tests/src/lib/generate-puzzle";

export class PuzzleService {
  async getPuzzle(_date: Date): Promise<Puzzle> {
    const puzzles = [generatePuzzle(), generatePuzzle(), generatePuzzle()];

    return new Promise<Puzzle>((resolve) => {
      setTimeout(() => {
        resolve({
          date: new Date(),
          problem: puzzles.flatMap((puzzle) => puzzle.problem),
          solutions: puzzles.map((puzzle) => puzzle.solution),
        });
      }, 300);
    });
  }
}
