// TODO: remove mocked data
import type { Puzzle } from "types";

export class PuzzleService {
  async getPuzzle(_date: Date): Promise<Puzzle> {
    const puzzle: Puzzle = {
      date: new Date(),
      problem: [1, 1, 2, 2, 5, 1, 0, 9, 3, 6],
      solutions: ["1+1=2", "2*5=10", "9-3=6"],
    };

    return new Promise<Puzzle>((resolve) => {
      setTimeout(() => {
        resolve(puzzle);
      }, 300);
    });
  }
}
