import { useContext } from "react";
import { PuzzleContext } from "contexts/puzzle-context";

export const usePuzzle = () => useContext(PuzzleContext);
