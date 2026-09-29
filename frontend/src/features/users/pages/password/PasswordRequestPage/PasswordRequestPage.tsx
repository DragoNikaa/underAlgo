import { ArrowLeft } from "lucide-react";
import { type SyntheticEvent, useState } from "react";

import ButtonLink from "../../../../../shared/components/Button/ButtonLink.tsx";
import Heading from "../../../../../shared/components/Heading/Heading.tsx";
import { PATHS } from "../../../../../shared/paths.ts";
import { AllauthValidationError } from "../../../api/errors.ts";
import AuthForm from "../../../components/AuthForm/AuthForm.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../../../components/AuthForm/fields.ts";
import AuthLayout from "../../../components/AuthLayout/AuthLayout.tsx";
import { usePasswordRequest } from "../../../hooks.ts";
import styles from "./PasswordRequestPage.module.css";

const fields: Field[] = [{ name: "email" }];

export default function PasswordRequestPage() {
  const { mutate: requestPassword, isPending, error } = usePasswordRequest();
  const [form, setForm] = useState<Form>({ email: "" });
  const [success, setSuccess] = useState(false);

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  const fieldErrors: FieldErrors = {
    email: error?.errors.email,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    requestPassword(form.email!, {
      onSuccess: () => setSuccess(true),
    });
  }

  return success ? (
    <AuthLayout>
      <Heading variant="secondary">check your inbox</Heading>

      <p>
        Your reset link is on its way. Check your inbox and get ready to explore
        some algorithms again!
      </p>
    </AuthLayout>
  ) : (
    <AuthForm
      heading="forgot password"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
      submitButtonLabel="send reset link"
    >
      <ButtonLink
        to={PATHS.user.login}
        size="small"
        className={styles.backButton}
      >
        <ArrowLeft /> back to login
      </ButtonLink>
    </AuthForm>
  );
}
