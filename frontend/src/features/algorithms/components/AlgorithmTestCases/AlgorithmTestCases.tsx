import { type SyntheticEvent, useState } from "react";

import { ValidationError } from "../../../../shared/api/errors.ts";
import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import type { TestCase } from "../../types/test-case.ts";
import styles from "./AlgorithmTestCases.module.css";
import CustomTestCase from "./CustomTestCase.tsx";
import PredefinedTestCases from "./PredefinedTestCases.tsx";
import { parseBody } from "./utils.ts";

export const CUSTOM_TEST_CASE = "custom";
export type SelectedTestCase = number | typeof CUSTOM_TEST_CASE;

interface AlgorithmTestCasesProps {
  testCases: TestCase[];
  execute: (body: Record<string, unknown>) => void;
  error: ValidationError | null;
}

export default function AlgorithmTestCases({
  testCases,
  execute,
  error,
}: AlgorithmTestCasesProps) {
  const [selectedTestCase, setSelectedTestCase] = useState<SelectedTestCase>(0);
  const [customBody, setCustomBody] = useState<Record<string, string>>({});

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const body =
      selectedTestCase === CUSTOM_TEST_CASE
        ? parseBody(customBody)
        : testCases[selectedTestCase].body;

    execute(body);
  }

  return (
    <section>
      <Card>
        <Heading as="h2" variant="secondary">
          test case
        </Heading>

        <form onSubmit={handleSubmit} className={styles.form}>
          <PredefinedTestCases
            testCases={testCases}
            selectedTestCase={selectedTestCase}
            setSelectedTestCase={setSelectedTestCase}
          />

          <CustomTestCase
            fields={Object.keys(testCases[0]?.body ?? {})}
            selectedTestCase={selectedTestCase}
            setSelectedTestCase={setSelectedTestCase}
            customBody={customBody}
            updateCustomBody={(key, value) =>
              setCustomBody((prev) => ({
                ...prev,
                [key]: value,
              }))
            }
            error={error}
          />

          <Button type="submit">execute</Button>
        </form>
      </Card>
    </section>
  );
}
