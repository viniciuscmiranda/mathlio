import { useCallback, useLayoutEffect } from "react";
import { STORAGE_BENCH_STATE } from "constants/storage";
import { usePersistentState } from "hooks/use-persistent-state";
import { usePuzzle } from "hooks/use-puzzle";
import { BenchContext, type BenchContextData } from "contexts/bench-context";
import {
  shuffleArray,
  moveArrayIndex,
  placeArrayElement,
  removeArrayIndex,
} from "utils/arrays";

export const BenchProvider = (props: React.PropsWithChildren) => {
  const { puzzle: dailyPuzzle, isPuzzleUpdate: isDailyPuzzleUpdated } =
    usePuzzle();

  const [benchNumbers, setBenchNumbers, deleteBenchNumbers] =
    usePersistentState<number[]>(
      STORAGE_BENCH_STATE,
      dailyPuzzle?.problem || []
    );

  useLayoutEffect(() => {
    if (!isDailyPuzzleUpdated) deleteBenchNumbers();
  }, [isDailyPuzzleUpdated, deleteBenchNumbers]);

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
