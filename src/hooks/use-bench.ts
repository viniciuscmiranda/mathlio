import { useContext } from "react";
import { BenchContext } from "contexts/bench-context";

export const useBench = () => useContext(BenchContext);
