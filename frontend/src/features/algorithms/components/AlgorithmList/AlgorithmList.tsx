import type { AlgorithmListItem } from "../../types/algorithm.ts";
import { AlgorithmCard } from "../AlgorithmCard/AlgorithmCard.tsx";
import styles from "./AlgorithmList.module.css";

interface AlgorithmListProps {
  algorithms: AlgorithmListItem[];
}

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
  return (
    <section>
      <ul className={styles.algorithmList}>
        {algorithms.map((algorithm) => (
          <li key={algorithm.slug}>
            <AlgorithmCard algorithm={algorithm} />
          </li>
        ))}
      </ul>
    </section>
  );
}
