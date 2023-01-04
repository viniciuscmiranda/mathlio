import { useState, useMemo } from "react";
import { GameContext } from "contexts/game-context";
import { useBoard } from "hooks/use-board";
import { calculateEquationPoints } from "utils/math";
import { BoardRowStatus } from "constants/enums";

export const GameProvider = (props: React.PropsWithChildren) => {
  const { boardRows, getBoardRowStatus } = useBoard();

  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const points: number = useMemo(() => {
    const pointsPerRow = boardRows.map((row, rowIndex) => {
      const rowStatus = getBoardRowStatus(rowIndex);

      if (rowStatus === BoardRowStatus.Valid) {
        return calculateEquationPoints(row);
      } else {
        return 0;
      }
    });

    return pointsPerRow.reduce((acc, curr) => acc + curr, 0);
  }, [boardRows, getBoardRowStatus]);

  return (
    <GameContext.Provider
      {...props}
      value={{
        points,
        selectedRowIndex,
        setSelectedRowIndex,
      }}
    />
  );
};
