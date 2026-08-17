import { useState } from "react";
import { useParams } from "react-router-dom";

import { ValidationError } from "../../../../shared/api/errors.ts";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import Loader from "../../../../shared/components/Loader/Loader.tsx";
import { AlgorithmBadges } from "../../components/AlgorithmBadges/AlgorithmBadges.tsx";
import AlgorithmCode from "../../components/AlgorithmCode/AlgorithmCode.tsx";
import AlgorithmDescription from "../../components/AlgorithmDescription/AlgorithmDescription.tsx";
import AlgorithmExplanation from "../../components/AlgorithmExplanation/AlgorithmExplanation.tsx";
import AlgorithmTestCases from "../../components/AlgorithmTestCases/AlgorithmTestCases.tsx";
import { useAlgorithm, useExecution } from "../../hooks.ts";
import styles from "./AlgorithmDetailPage.module.css";

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  const { data: algorithm } = useAlgorithm(slug!);
  const {
    mutate: execute,
    data: execution,
    isPending,
    isSuccess,
    error,
  } = useExecution(slug!);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = execution?.steps[currentStepIndex];

  if (error && !(error instanceof ValidationError)) {
    throw error;
  }

  return (
    <main>
      <article>
        <Heading>{algorithm.name}</Heading>

        <div className={styles.algorithmDetailPage}>
          {isPending && <Loader overlay />}

          <div className={styles.layout}>
            <div className={styles.column}>
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
            </div>

            <div className={styles.column}>
              <AlgorithmCode
                code={algorithm.code}
                currentLine={currentStep?.line}
              />

              {currentStep && (
                <AlgorithmExplanation explanation={currentStep.explanation} />
              )}
            </div>
          </div>

          <AlgorithmBadges
            difficulty={algorithm.difficulty}
            categories={algorithm.categories}
          />
        </div>
      </article>
    </main>
  );
}
