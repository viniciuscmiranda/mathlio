import { useContext } from "react";
import { BoardContext } from "contexts/board-context";

export const useBoard = () => useContext(BoardContext);
