import { ValidationError } from "../../../../shared/api/errors.ts";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import Input from "../../../../shared/components/Form/Input/Input.tsx";
import Radio from "../../../../shared/components/Form/Radio.tsx";
import styles from "./AlgorithmTestCases.module.css";
import {
  CUSTOM_TEST_CASE,
  type SelectedTestCase,
} from "./AlgorithmTestCases.tsx";

interface CustomTestCaseProps {
  fields: string[];
  selectedTestCase: SelectedTestCase;
  setSelectedTestCase: (value: SelectedTestCase) => void;
  customBody: Record<string, string>;
  updateCustomBody: (key: string, value: string) => void;
  error: ValidationError | null;
}

export default function CustomTestCase({
  fields,
  selectedTestCase,
  setSelectedTestCase,
  customBody,
  updateCustomBody,
  error,
}: CustomTestCaseProps) {
  return (
    <Radio
      name="testCase"
      checked={selectedTestCase === CUSTOM_TEST_CASE}
      onChange={() => setSelectedTestCase(CUSTOM_TEST_CASE)}
    >
      <div className={styles.testCase}>
        {fields.map((field) => {
          const inputId = `testCase${field[0].toUpperCase() + field.slice(1)}`;
          const errorId = `${inputId}Error`;
          const fieldErrors = error?.getFieldErrors(field) ?? [];
          const hasError = fieldErrors.length > 0;

          return (
            <div key={field} className={styles.wrapper}>
              <Input
                id={inputId}
                value={customBody[field] ?? ""}
                onChange={(event) =>
                  updateCustomBody(field, event.target.value)
                }
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                withoutLabel
              >
                <span className={styles.fieldName}>{field} =</span>
              </Input>

              {hasError && (
                <div id={errorId} className={styles.error}>
                  {fieldErrors.map((message) => (
                    <FormError key={message}>{message}</FormError>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Radio>
  );
}
