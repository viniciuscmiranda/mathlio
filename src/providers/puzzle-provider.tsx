import { useCallback, useState, useLayoutEffect, useMemo, useRef } from "react";
import { usePersistentState } from "hooks/use-persistent-state";
import { PuzzleContext } from "contexts/puzzle-context";
import { PuzzleService } from "services/puzzle-service";
import { STORAGE_DAILY_PUZZLE } from "constants/storage";
import { isSameDate, getToday } from "../utils/dates";
import type { Puzzle } from "types";

export const PuzzleProvider = (props: React.PropsWithChildren) => {
  const dailyPuzzleService = useRef(new PuzzleService());

  const [dailyPuzzle, setDailyPuzzle, deleteDailyPuzzle] =
    usePersistentState<Puzzle>(STORAGE_DAILY_PUZZLE);

  const isDailyPuzzleUpdated = useMemo(() => {
    if (!dailyPuzzle) return false;

    const today = getToday();
    return isSameDate(dailyPuzzle?.date, today);
  }, [dailyPuzzle]);

  const [isLoadingDailyPuzzle, setIsLoadingDailyPuzzle] = useState(
    !isDailyPuzzleUpdated
  );

  const fetchDailyPuzzle = useCallback(async () => {
    setIsLoadingDailyPuzzle(true);

    const today = getToday();
    const response = await dailyPuzzleService.current.getPuzzle(today);

    setDailyPuzzle(response);
    setIsLoadingDailyPuzzle(false);
  }, [setDailyPuzzle]);

  useLayoutEffect(() => {
    if (!isDailyPuzzleUpdated) {
      deleteDailyPuzzle();
      fetchDailyPuzzle();
    }
  }, []);

  return (
    <PuzzleContext.Provider
      {...props}
      value={{
        puzzle: dailyPuzzle,
        isLoadingPuzzle: isLoadingDailyPuzzle,
        isPuzzleUpdate: isDailyPuzzleUpdated,
      }}
    />
  );
};
