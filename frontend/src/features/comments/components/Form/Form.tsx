import { type ComponentPropsWithoutRef, type SyntheticEvent } from "react";

import { DRFValidationError } from "../../../../shared/api/errors.ts";
import Button from "../../../../shared/components/Button/Button.tsx";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import TextArea from "../../../../shared/components/Form/TextArea.tsx";
import styles from "./Form.module.css";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  comment: string;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  error: Error | null;
  errorId: string;
  placeholder: string;
  buttonLabel: string;
}

export default function Form({
  comment,
  onCommentChange,
  onSubmit,
  isPending,
  error,
  errorId,
  placeholder,
  buttonLabel,
  className,
}: FormProps) {
  if (error && !(error instanceof DRFValidationError)) {
    throw error;
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={styles.form}>
        <TextArea
          value={comment}
          onChange={(event) => onCommentChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />

        <Button type="submit" disabled={isPending}>
          {buttonLabel}
        </Button>
      </div>

      {error && (
        <FormError id={errorId}>{error.getFieldErrors("body")}</FormError>
      )}
    </form>
  );
}
