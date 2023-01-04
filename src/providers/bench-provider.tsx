import { useCallback, useState } from "react";
import { usePuzzle } from "hooks/use-puzzle";
import { useBoard } from "hooks/use-board";
import { BenchContext, type BenchContextData } from "contexts/bench-context";
import { isNumber } from "utils/math";
import {
  shuffleArray,
  moveArrayIndex,
  placeArrayElement,
  removeArrayIndex,
} from "utils/arrays";

export const BenchProvider = (props: React.PropsWithChildren) => {
  const { puzzle } = usePuzzle();
  const { boardRows } = useBoard();

  const [benchNumbers, setBenchNumbers] = useState<number[]>(getInitialBench());

  function getInitialBench(): number[] {
    const placedNumbers = boardRows.flat().filter(isNumber);

    // removes numbers that are placed in the board
    const initialBench = puzzle?.problem.filter((number) => {
      const placedNumberIndex = placedNumbers.indexOf(number);

      if (placedNumberIndex !== -1) {
        placedNumbers.splice(placedNumberIndex, 1);
        return false;
      }

      return true;
    });

    return initialBench || [];
  }

  const placeBenchNumber = useCallback<BenchContextData["placeBenchNumber"]>(
    (number, position) => {
      setBenchNumbers((prevNumbers) => {
        return placeArrayElement(prevNumbers, number, position);
      });
    },
    []
  );

  const pushBenchNumbers = useCallback<BenchContextData["pushBenchNumbers"]>(
    (numbers) => {
      setBenchNumbers((prevNumbers) => {
        return [...prevNumbers, ...numbers];
      });
    },
    []
  );

  const removeBenchNumber = useCallback<BenchContextData["removeBenchNumber"]>(
    (position) => {
      setBenchNumbers((prevNumbers) => {
        return removeArrayIndex(prevNumbers, position);
      });
    },
    []
  );

  const shuffleBench = useCallback<BenchContextData["shuffleBench"]>(() => {
    setBenchNumbers((prevNumbers) => {
      return shuffleArray(prevNumbers);
    });
  }, []);

  const moveBenchNumber = useCallback<BenchContextData["moveBenchNumber"]>(
    (currentPosition, nextPosition) => {
      setBenchNumbers((prevNumbers) => {
        return moveArrayIndex(prevNumbers, currentPosition, nextPosition);
      });
    },
    []
  );

  return (
    <BenchContext.Provider
      {...props}
      value={{
        benchNumbers,
        placeBenchNumber,
        removeBenchNumber,
        shuffleBench,
        moveBenchNumber,
        pushBenchNumbers,
      }}
    />
  );
};
