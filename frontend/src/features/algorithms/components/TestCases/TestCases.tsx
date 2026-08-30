import { type SyntheticEvent, useState } from "react";

import { DRFValidationError } from "../../../../shared/api/errors.ts";
import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import type { TestCase } from "../../types/test-case.ts";
import CustomTestCase from "./CustomTestCase.tsx";
import { ParseError } from "./errors.ts";
import PredefinedTestCases from "./PredefinedTestCases.tsx";
import styles from "./TestCases.module.css";
import { parseBody } from "./utils.ts";

export const CUSTOM_TEST_CASE = "custom";
export type SelectedTestCase = number | typeof CUSTOM_TEST_CASE;

interface AlgorithmTestCasesProps {
  testCases: TestCase[];
  execute: (body: Record<string, unknown>) => void;
  executionError: DRFValidationError | null;
}

export default function TestCases({
  testCases,
  execute,
  executionError,
}: AlgorithmTestCasesProps) {
  const [selectedTestCase, setSelectedTestCase] = useState<SelectedTestCase>(0);
  const [customBody, setCustomBody] = useState<Record<string, string>>({});
  const [parseError, setParseError] = useState<ParseError | null>(null);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setParseError(null);

    try {
      execute(getBody());
    } catch (error) {
      if (error instanceof ParseError) {
        setParseError(error);
      } else {
        throw error;
      }
    }
  }

  function getBody() {
    return selectedTestCase === CUSTOM_TEST_CASE
      ? parseBody(customBody)
      : testCases[selectedTestCase].body;
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
            error={parseError ?? executionError}
          />

          <Button type="submit">execute</Button>
        </form>
      </Card>
    </section>
  );
}
