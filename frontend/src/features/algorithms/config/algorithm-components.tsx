import type { ComponentType } from "react";

import BinarySearch from "../components/Algorithms/BinarySearch.tsx";
import type { AlgorithmProps } from "../types/algorithm-component.ts";

export const algorithmComponents: Record<
  string,
  ComponentType<AlgorithmProps>
> = {
  "binary-search": BinarySearch,
};
