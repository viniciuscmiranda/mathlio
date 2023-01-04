import { createContext } from "react";

export interface BenchContextData {
  readonly benchNumbers: number[];
  placeBenchNumber: (number: number, position?: number) => void;
  pushBenchNumbers: (numbers: number[]) => void;
  removeBenchNumber: (position: number) => void;
  shuffleBench: () => void;
  moveBenchNumber: (currentPosition: number, nextPosition: number) => void;
}

export const BenchContext = createContext({} as BenchContextData);
