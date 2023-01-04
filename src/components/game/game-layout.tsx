import { useBench } from "hooks/use-bench";
import { useBoard } from "hooks/use-board";
import { useGame } from "hooks/use-game";
import { isOperator } from "utils/math/is-operator";
import { BoardRowStatus, Operator, Sign } from "constants/enums";

export const Game = () => {
  const { benchNumbers } = useBench();
  const { boardRows, getBoardRowStatus } = useBoard();
  const { selectedRowIndex, setSelectedRowIndex, points } = useGame();

  return (
    <div>
      <h1>mathlio</h1>
      <br />
      <h2>Board</h2>
      <h3>{points} Points</h3>
      <div>
        {boardRows.map((boardRow, rowIndex) => {
          const status = getBoardRowStatus(rowIndex);

          const icons = {
            [BoardRowStatus.None]: "",
            [BoardRowStatus.Invalid]: "❌",
            [BoardRowStatus.Valid]: "✅",
            [BoardRowStatus.Zero]: "0️⃣",
          };

          return (
            <div
              onClick={() => setSelectedRowIndex(rowIndex)}
              key={rowIndex}
              style={{
                cursor: "pointer",
                width: "500px",
                height: "40px",
                fontSize: "20px",
                alignItems: "center",
                display: "flex",
                padding: "0 8px",
                fontFamily: "sans-serif",
                position: "relative",
                backgroundColor:
                  selectedRowIndex === rowIndex ? "#ddd" : "#eee",
                borderBottom: "1px solid darkgray",
              }}
            >
              <span style={{ position: "absolute", right: "4px" }}>
                {icons[status]}
              </span>
              {boardRow.map((rowElement, elementIndex) => (
                <span
                  key={elementIndex}
                  style={{
                    color: isOperator(rowElement) ? "gray" : "black",
                    margin: isOperator(rowElement) ? "0 4px" : "0",
                  }}
                >
                  {String(rowElement)}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <br />
      <h2>Operators</h2>
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          gap: "4px",
          fontFamily: "sans-serif",
        }}
      >
        {[...Object.values(Operator), Object.values(Sign)].map(
          (operator, numberIndex) => (
            <span key={numberIndex}>{operator}</span>
          )
        )}
      </div>

      <br />
      <h2>Bench</h2>
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          gap: "4px",
          fontFamily: "sans-serif",
        }}
      >
        {benchNumbers.map((benchNumber, numberIndex) => (
          <span key={numberIndex}>{String(benchNumber)}</span>
        ))}
      </div>
    </div>
  );
};
