import { useParams } from "react-router-dom";

import { ValidationError } from "../../../../shared/api/errors.ts";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import AlgorithmTestCases from "../../components/AlgorithmTestCases/AlgorithmTestCases.tsx";
import { useAlgorithm, useExecution } from "../../hooks.ts";
import styles from "./AlgorithmDetailPage.module.css";

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  const { data: algorithm } = useAlgorithm(slug!);
  const { mutate: execute, isSuccess, error } = useExecution(slug!);

  if (error && !(error instanceof ValidationError)) {
    throw error;
  }

  return (
    <article>
      <Heading>{algorithm.name}</Heading>

      <div className={styles.algorithmDetailPage}>
        {!isSuccess && (
          <AlgorithmTestCases
            testCases={algorithm.test_cases}
            execute={execute}
            executionError={error}
          />
        )}
      </div>
    </article>
  );
}
