import { DRFValidationError } from "../../../../shared/api/errors.ts";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import Input from "../../../../shared/components/Form/Input.tsx";
import Radio from "../../../../shared/components/Form/Radio.tsx";
import { getFieldErrors, ParseError } from "./errors.ts";
import styles from "./TestCases.module.css";
import { CUSTOM_TEST_CASE, type SelectedTestCase } from "./TestCases.tsx";

interface CustomTestCaseProps {
  fields: string[];
  selectedTestCase: SelectedTestCase;
  setSelectedTestCase: (value: SelectedTestCase) => void;
  customBody: Record<string, string>;
  updateCustomBody: (key: string, value: string) => void;
  error: ParseError | DRFValidationError | null;
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
          const fieldErrors = getFieldErrors(error, field);
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
