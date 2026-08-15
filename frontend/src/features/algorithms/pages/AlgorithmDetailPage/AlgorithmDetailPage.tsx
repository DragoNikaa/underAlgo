import { useParams } from "react-router-dom";

import { ValidationError } from "../../../../shared/api/errors.ts";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import Loader from "../../../../shared/components/Loader/Loader.tsx";
import { AlgorithmBadges } from "../../components/AlgorithmBadges/AlgorithmBadges.tsx";
import AlgorithmDescription from "../../components/AlgorithmDescription/AlgorithmDescription.tsx";
import AlgorithmTestCases from "../../components/AlgorithmTestCases/AlgorithmTestCases.tsx";
import { useAlgorithm, useExecution } from "../../hooks.ts";
import styles from "./AlgorithmDetailPage.module.css";

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  const { data: algorithm } = useAlgorithm(slug!);
  const { mutate: execute, isPending, isSuccess, error } = useExecution(slug!);

  if (error && !(error instanceof ValidationError)) {
    throw error;
  }

  return (
    <main>
      <article>
        <Heading>{algorithm.name}</Heading>

        <div className={styles.algorithmDetailPage}>
          {isPending && <Loader overlay />}

          {!isSuccess && (
            <AlgorithmTestCases
              testCases={algorithm.test_cases}
              execute={execute}
              executionError={error}
            />
          )}

          <AlgorithmDescription
            generalDescription={algorithm.general_description}
            inputDescription={algorithm.input_description}
            outputDescription={algorithm.output_description}
          />

          <AlgorithmBadges
            difficulty={algorithm.difficulty}
            categories={algorithm.categories}
            className={styles.algorithmBadges}
          />
        </div>
      </article>
    </main>
  );
}
