import clsx from "clsx";

import type { AlgorithmProps } from "../../types/algorithm-component.ts";
import styles from "./Algorithms.module.css";

export default function BinarySearch({
  changedVariables,
  variables,
}: AlgorithmProps) {
  const variableNames = ["left", "right", "middle"];

  return (
    <div>
      {variableNames.map((name) => {
        return (
          <div
            key={name}
            className={clsx(
              !(name in variables) && "invisible",
              changedVariables.includes(name) && styles.blink,
            )}
          >
            {name}&nbsp;=&nbsp;{String(variables[name])}
          </div>
        );
      })}
    </div>
  );
}
