import { createContext } from "react";
import { BoardRowStatus } from "constants/enums";
import type { Equation, EquationElement } from "types";

export interface BoardContextData {
  readonly boardRows: Equation[];
  getBoardRowStatus: (rowIndex: number) => BoardRowStatus;
  placeBoardElement: (
    element: EquationElement,
    rowIndex: number,
    position?: number
  ) => void;
  removeBoardElement: (rowIndex: number, position?: number) => void;
  moveBoardElement: (
    currentRowIndex: number,
    nextRowIndex: number,
    currentPosition: number,
    nextPosition?: number
  ) => void;
  clearBoardRow: (rowIndex: number) => void;
  clearBoard: () => void;
}

export const BoardContext = createContext({} as BoardContextData);
