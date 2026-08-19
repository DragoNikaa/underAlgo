import { algorithmVariableColors } from "../../config/variable-colors.ts";
import type { AlgorithmProps } from "../../types/algorithm-component.ts";
import List from "../DataStructures/List/List.tsx";

export default function BinarySearch({
  input,
  changedVariables,
  variables,
}: AlgorithmProps) {
  return (
    <List
      list={input["numbers"] as number[]}
      pointers={variables as Record<string, number>}
      changingPointers={changedVariables}
      colors={algorithmVariableColors["binary-search"]}
    />
  );
}
