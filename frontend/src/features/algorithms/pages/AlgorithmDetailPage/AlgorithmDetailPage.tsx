import { useState } from "react";
import { useParams } from "react-router-dom";

import { DRFValidationError } from "../../../../shared/api/errors.ts";
import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import Loader from "../../../../shared/components/Loader/Loader.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import Animation from "../../components/Animation/Animation.tsx";
import Badges from "../../components/Badges/Badges.tsx";
import Code from "../../components/Code/Code.tsx";
import Description from "../../components/Description/Description.tsx";
import Explanation from "../../components/Explanation/Explanation.tsx";
import TestCases from "../../components/TestCases/TestCases.tsx";
import { useAlgorithm, useExecution } from "../../hooks.ts";
import styles from "./AlgorithmDetailPage.module.css";

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  const { data: algorithm } = useAlgorithm(slug!);
  const {
    mutate: execute,
    data: execution,
    isPending,
    error,
  } = useExecution(slug!);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = execution?.steps[currentStepIndex];

  if (error && !(error instanceof DRFValidationError)) {
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
              <div className={styles.animation}>
                {!currentStep ? (
                  <TestCases
                    testCases={algorithm.test_cases}
                    execute={execute}
                    executionError={error}
                  />
                ) : (
                  <Animation
                    step={currentStepIndex}
                    lastStep={execution.steps.length - 1}
                    input={execution.input}
                    changedVariables={currentStep.changed_variables}
                    variables={currentStep.variables}
                    output={execution.output}
                    onPrevious={() => setCurrentStepIndex((prev) => prev - 1)}
                    onNext={() => setCurrentStepIndex((prev) => prev + 1)}
                  />
                )}
              </div>

              <div className={styles.description}>
                <Description
                  generalDescription={algorithm.general_description}
                  inputDescription={algorithm.input_description}
                  outputDescription={algorithm.output_description}
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.code}>
                <Code code={algorithm.code} currentLine={currentStep?.line} />
              </div>

              {currentStep && (
                <div className={styles.explanation}>
                  <Explanation explanation={currentStep.explanation} />
                </div>
              )}
            </div>
          </div>

          <Badges
            difficulty={algorithm.difficulty}
            categories={algorithm.categories}
          />
        </div>
      </article>

      <div className={styles.bottomBar}>
        <ButtonLink to={PATHS.algorithm.comments(slug!)}>comments</ButtonLink>
      </div>
    </main>
  );
}
