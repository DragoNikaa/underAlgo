import Input from "../../../../shared/components/Form/Input/Input.tsx";
import Radio from "../../../../shared/components/Form/Radio.tsx";
import type { TestCase } from "../../types/test-case.ts";
import styles from "./TestCases.module.css";
import type { SelectedTestCase } from "./TestCases.tsx";

interface PredefinedTestCasesProps {
  testCases: TestCase[];
  selectedTestCase: SelectedTestCase;
  setSelectedTestCase: (value: SelectedTestCase) => void;
}

export default function PredefinedTestCases({
  testCases,
  selectedTestCase,
  setSelectedTestCase,
}: PredefinedTestCasesProps) {
  return (
    <>
      {testCases.map((testCase, index) => (
        <Radio
          key={index}
          name="testCase"
          checked={selectedTestCase === index}
          onChange={() => setSelectedTestCase(index)}
        >
          <div className={styles.testCase}>
            {Object.entries(testCase.body).map(([key, value]) => (
              <Input
                key={key}
                value={JSON.stringify(value).replaceAll(",", ", ")}
                readOnly
                withoutLabel
              >
                <span className={styles.fieldName}>{key} =</span>
              </Input>
            ))}
          </div>
        </Radio>
      ))}
    </>
  );
}
