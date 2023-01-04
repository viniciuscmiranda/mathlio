import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { usePersistentState } from "hooks/use-persistent-state";
import { PuzzleContext } from "contexts/puzzle-context";
import { PuzzleService } from "services/puzzle-service";
import { STORAGE_BOARD_STATE, STORAGE_PUZZLE } from "constants/storage";
import { isSameDate, getToday } from "../utils/dates";
import type { Puzzle } from "types";

export const PuzzleProvider = (props: React.PropsWithChildren) => {
  const puzzleService = useRef(new PuzzleService());

  const [puzzle, setPuzzle] = usePersistentState<Puzzle>(STORAGE_PUZZLE);

  const isPuzzleUpdated = Boolean(
    puzzle && isSameDate(puzzle.date, getToday())
  );

  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(!isPuzzleUpdated);

  const fetchPuzzle = useCallback(async () => {
    setIsLoadingPuzzle(true);

    const today = getToday();
    const response = await puzzleService.current.getPuzzle(today);

    setPuzzle(response);
    setIsLoadingPuzzle(false);
  }, [setPuzzle]);

  useEffect(() => {
    if (!isPuzzleUpdated) {
      localStorage.removeItem(STORAGE_PUZZLE);
      localStorage.removeItem(STORAGE_BOARD_STATE);
      fetchPuzzle();
    }
  }, []);

  return (
    <PuzzleContext.Provider
      {...props}
      value={{
        puzzle,
        isLoadingPuzzle,
      }}
    />
  );
};
