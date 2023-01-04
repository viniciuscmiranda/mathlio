import { createContext } from "react";
import type { Puzzle } from "types";

export interface PuzzleContextProps {
  puzzle?: Puzzle;
  isLoadingPuzzle: boolean;
  isPuzzleUpdate: boolean;
}

export const PuzzleContext = createContext({} as PuzzleContextProps);
