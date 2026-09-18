import {
  type ComponentPropsWithoutRef,
  type SyntheticEvent,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import { DRFValidationError } from "../../../../shared/api/errors.ts";
import Button from "../../../../shared/components/Button/Button.tsx";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import TextArea from "../../../../shared/components/Form/TextArea.tsx";
import { useCreateComment } from "../../hooks.ts";
import styles from "./Form.module.css";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  parentCommentId?: number;
}

export default function Form({ parentCommentId, className }: FormProps) {
  const { slug } = useParams();
  const {
    mutate: createComment,
    isPending,
    error,
  } = useCreateComment(slug!, parentCommentId);
  const [comment, setComment] = useState("");

  if (error && !(error instanceof DRFValidationError)) {
    throw error;
  }

  const errorId =
    (parentCommentId ? `replyTo${parentCommentId}` : "comment") + "Error";

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    createComment(comment, {
      onSuccess: () => setComment(""),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={styles.form}>
        <TextArea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={`Write your ${parentCommentId ? "reply" : "comment"} here...`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />

        <Button type="submit" disabled={isPending}>
          {parentCommentId ? "reply" : "comment"}
        </Button>
      </div>

      {error && (
        <FormError id={errorId}>{error.getFieldErrors("body")}</FormError>
      )}
    </form>
  );
}
