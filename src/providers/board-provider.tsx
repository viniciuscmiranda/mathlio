import { useCallback, useMemo, useLayoutEffect, useState } from "react";
import { GAME_BOARD_ROWS, GAME_MIN_RESULT } from "constants/game";
import { STORAGE_BOARD_STATE } from "constants/storage";
import { usePersistentState } from "hooks/use-persistent-state";
import { usePuzzle } from "hooks/use-puzzle";
import { BoardContext, type BoardContextData } from "contexts/board-context";
import {
  placeArrayElement,
  removeArrayIndex,
  replaceArrayElement,
  moveArrayIndex,
} from "utils/arrays";
import {
  getEquationResults,
  isEquation,
  parseEquation,
  validateEquation,
} from "utils/math";
import { BoardRowStatus } from "constants/enums";
import type { Equation } from "types";

export const BoardProvider = (props: React.PropsWithChildren) => {
  const { isPuzzleUpdate: isDailyPuzzleUpdated } = usePuzzle();

  const [boardRows, setBoardRows, deleteBoardRows] = usePersistentState<
    Equation[]
  >(STORAGE_BOARD_STATE, getInitialBoardRows());

  const boardRowStatuses: BoardRowStatus[] = useMemo(() => {
    return boardRows.map((rowEquation) => {
      if (isEquation(rowEquation)) {
        // this will join the adjacent numbers
        const equation = parseEquation(rowEquation);

        const isValid = validateEquation(equation);

        if (isValid) {
          const results = getEquationResults(equation);

          if (results.some((result) => result < GAME_MIN_RESULT)) {
            return BoardRowStatus.Zero;
          }

          return BoardRowStatus.Valid;
        } else {
          return BoardRowStatus.Invalid;
        }
      }

      return BoardRowStatus.None;
    });
  }, [boardRows]);

  function getInitialBoardRows(rows = GAME_BOARD_ROWS) {
    return Array(rows).fill([]);
  }

  useLayoutEffect(() => {
    if (!isDailyPuzzleUpdated) deleteBoardRows();
  }, [isDailyPuzzleUpdated, deleteBoardRows]);

  const setRow = useCallback(
    (rowIndex: number, rowData: (prevRow: Equation) => Equation) => {
      setBoardRows((prevRows) => {
        const nextRow = rowData(prevRows[rowIndex]);

        return replaceArrayElement(prevRows, nextRow, rowIndex);
      });
    },
    []
  );

  const placeBoardElement = useCallback<BoardContextData["placeBoardElement"]>(
    (element, rowIndex, position) => {
      setRow(rowIndex, (prevRow) => {
        const res = placeArrayElement(prevRow, element, position);
        return res;
      });
    },
    [setRow]
  );

  const removeBoardElement = useCallback<
    BoardContextData["removeBoardElement"]
  >(
    (rowIndex, position) => {
      setRow(rowIndex, (prevRow) => {
        return removeArrayIndex(prevRow, position);
      });
    },
    [setRow]
  );

  const moveBoardElement = useCallback<BoardContextData["moveBoardElement"]>(
    (currentRowIndex, nextRowIndex, currentPosition, nextPosition) => {
      setBoardRows((prevRows) => {
        const nextRows = [...prevRows];
        const element = nextRows[currentRowIndex][currentPosition];

        if (element != null) {
          if (nextRowIndex === currentRowIndex) {
            const nextRow = moveArrayIndex(
              nextRows[currentRowIndex],
              currentPosition,
              nextPosition
            );

            nextRows.splice(nextRowIndex, 1, nextRow);
          } else {
            const currentRow = removeArrayIndex(
              nextRows[currentRowIndex],
              currentPosition
            );

            const nextRow = placeArrayElement(
              nextRows[nextRowIndex],
              element,
              nextPosition
            );

            nextRows.splice(currentRowIndex, 1, currentRow);
            nextRows.splice(nextRowIndex, 1, nextRow);
          }
        }

        return nextRows;
      });
    },
    []
  );

  const clearBoardRow = useCallback<BoardContextData["clearBoardRow"]>(
    (rowIndex) => {
      setRow(rowIndex, () => []);
    },
    [setRow]
  );

  const clearBoard = useCallback<BoardContextData["clearBoard"]>(() => {
    setBoardRows(getInitialBoardRows());
  }, []);

  const getBoardRowStatus = useCallback<BoardContextData["getBoardRowStatus"]>(
    (rowIndex) => {
      return boardRowStatuses[rowIndex];
    },
    [boardRowStatuses]
  );

  return (
    <BoardContext.Provider
      {...props}
      value={{
        boardRows,
        placeBoardElement,
        removeBoardElement,
        moveBoardElement,
        clearBoardRow,
        clearBoard,
        getBoardRowStatus,
      }}
    />
  );
};
