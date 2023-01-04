import { createContext } from "react";
import type { SetState } from "types/utils";

export interface GameContextProps {
  selectedRowIndex: number;
  setSelectedRowIndex: SetState<number>;
  points: number;
}

export const GameContext = createContext({} as GameContextProps);
