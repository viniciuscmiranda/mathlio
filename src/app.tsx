import { useLayoutEffect } from "react";
import { BoardProvider } from "providers/board-provider";
import { BenchProvider } from "providers/bench-provider";
import { PuzzleProvider } from "providers/puzzle-provider";
import { GameProvider } from "providers/game-provider";
import { KeyboardManager } from "managers/keyboard-manager";
import { PuzzleContext } from "contexts/puzzle-context";
import { Game } from "components/game";
import { Splash } from "components/splash";
import { initGlobalStyles } from "styles/init-global-styles";

export const App = () => {
  useLayoutEffect(() => {
    initGlobalStyles();
  }, []);

  return (
    <PuzzleProvider>
      <PuzzleContext.Consumer>
        {({ isLoadingPuzzle: isLoadingDailyPuzzle }) => {
          if (isLoadingDailyPuzzle) {
            return <Splash />;
          }

          return (
            <BenchProvider>
              <BoardProvider>
                <GameProvider>
                  <Game />
                  <KeyboardManager />
                </GameProvider>
              </BoardProvider>
            </BenchProvider>
          );
        }}
      </PuzzleContext.Consumer>
    </PuzzleProvider>
  );
};
