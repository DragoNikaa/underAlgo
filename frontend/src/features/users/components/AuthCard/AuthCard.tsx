import type {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from "react";

import Button, {
  type ButtonColor,
} from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import Input from "../../../../shared/components/Form/Input/Input.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import styles from "./AuthCard.module.css";
import { type Field, type FieldErrors, FIELDS, type Form } from "./fields.ts";

interface AuthCardProps extends ComponentPropsWithoutRef<"div"> {
  heading: string;
  fields: Field[];
  fieldErrors: FieldErrors;
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  onFormSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submitButtonLabel?: string;
  submitButtonColor?: ButtonColor;
}

export default function AuthCard({
  heading,
  fields,
  fieldErrors,
  form,
  setForm,
  onFormSubmit,
  isSubmitting,
  submitButtonLabel = heading,
  submitButtonColor = "blue",
  children,
}: AuthCardProps) {
  return (
    <main>
      <Card className={styles.authCard}>
        <Heading className={styles.heading}>{heading}</Heading>

        <form onSubmit={onFormSubmit} className={styles.form}>
          {fields.map(({ name, label, readOnly }) => {
            const errorId = `${name}Error`;
            const fieldError = fieldErrors[name];

            return (
              <div key={name}>
                <Input
                  id={name}
                  type={FIELDS[name].type}
                  value={form[name]}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      [name]: event.target.value,
                    }))
                  }
                  placeholder={FIELDS[name].placeholder}
                  readOnly={readOnly}
                  aria-invalid={!!fieldError}
                  aria-describedby={fieldError ? errorId : undefined}
                  column
                >
                  <Heading as="h2" variant="secondary">
                    {label ?? FIELDS[name].label}
                  </Heading>
                </Input>

                {fieldError && <FormError id={errorId}>{fieldError}</FormError>}
              </div>
            );
          })}

          <Button
            type="submit"
            disabled={isSubmitting}
            oval
            color={submitButtonColor}
            className={styles.submitButton}
          >
            {submitButtonLabel}
          </Button>
        </form>

        {children}
      </Card>
    </main>
  );
}
