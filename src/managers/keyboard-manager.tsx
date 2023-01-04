import { useLayoutEffect, useCallback } from "react";
import { useBench } from "hooks/use-bench";
import { useBoard } from "hooks/use-board";
import { useGame } from "hooks/use-game";
import { isOperator } from "utils/math";
import { moveArrayIndex } from "utils/arrays";
import { Operator, Sign, KeyboardKey } from "constants/enums";
import { isNumber } from "../utils/math/is-number";

const NAVIGATE_BOARD_ROWS_DIRECTIONS_KEYS = {
  [KeyboardKey.ArrowUp]: -1,
  [KeyboardKey.ArrowDown]: 1,
} as const;

export const KeyboardManager = () => {
  const { selectedRowIndex, setSelectedRowIndex } = useGame();

  const {
    boardRows,
    placeBoardElement,
    moveBoardElement,
    removeBoardElement,
    clearBoardRow,
  } = useBoard();

  const {
    benchNumbers,
    removeBenchNumber,
    placeBenchNumber,
    pushBenchNumbers,
  } = useBench();

  const navigateBoardRows = useCallback(
    (direction: 1 | -1) => {
      setSelectedRowIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;
        if (nextIndex < 0) return boardRows.length - 1;
        else if (nextIndex > boardRows.length - 1) return 0;
        return nextIndex;
      });
    },
    [boardRows]
  );

  const onNumberPressed = useCallback(
    (number: number) => {
      const numberBenchIndex = benchNumbers.indexOf(number);
      if (numberBenchIndex !== -1) {
        removeBenchNumber(numberBenchIndex);
        placeBoardElement(number, selectedRowIndex);
      } else {
        const sortedBoardRows = moveArrayIndex(boardRows, selectedRowIndex);

        // gets number from other rows
        for (const row of sortedBoardRows) {
          const boardRowIndex = boardRows.indexOf(row);

          const numberRowIndex = row.indexOf(number);

          if (numberRowIndex !== -1) {
            moveBoardElement(boardRowIndex, selectedRowIndex, numberRowIndex);
            break;
          }
        }
      }
    },
    [
      boardRows,
      selectedRowIndex,
      benchNumbers,
      removeBenchNumber,
      removeBenchNumber,
      moveBoardElement,
    ]
  );

  const onOperatorPressed = useCallback(
    (operator: Operator | Sign) => {
      placeBoardElement(operator, selectedRowIndex);
    },
    [selectedRowIndex, placeBoardElement]
  );

  const onBackspacePressed = useCallback(() => {
    const lastSelectedRowElement = boardRows[selectedRowIndex].at(-1);

    removeBoardElement(selectedRowIndex);

    if (typeof lastSelectedRowElement === "number") {
      placeBenchNumber(lastSelectedRowElement);
    }
  }, [removeBoardElement, selectedRowIndex, boardRows]);

  const onDeletePressed = useCallback(() => {
    const selectedRowNumbers = boardRows[selectedRowIndex].filter(isNumber);

    clearBoardRow(selectedRowIndex);
    pushBenchNumbers(selectedRowNumbers);
  }, [boardRows, selectedRowIndex]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const isInteger = Number.isInteger(Number(event.key));

      if (isInteger) {
        event.preventDefault();
        onNumberPressed(Number(key));
      } else if (isOperator(key)) {
        event.preventDefault();
        onOperatorPressed(key);
      } else {
        switch (key) {
          case KeyboardKey.ArrowUp:
          case KeyboardKey.ArrowDown:
            event.preventDefault();
            navigateBoardRows(NAVIGATE_BOARD_ROWS_DIRECTIONS_KEYS[key]);
            break;

          case KeyboardKey.Backspace:
            event.preventDefault();
            onBackspacePressed();
            break;

          case KeyboardKey.Delete:
            event.preventDefault();
            onDeletePressed();
            break;
        }
      }
    },
    [onNumberPressed, onBackspacePressed, onDeletePressed, navigateBoardRows]
  );

  useLayoutEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return null;
};
