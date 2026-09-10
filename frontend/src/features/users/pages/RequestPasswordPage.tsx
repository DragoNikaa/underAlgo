import { type SyntheticEvent, useState } from "react";

import { AllauthValidationError } from "../api/errors.ts";
import AuthCard from "../components/AuthCard/AuthCard.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../components/AuthCard/fields.ts";
import { usePasswordRequest } from "../hooks.ts";

const fields: Field[] = [{ name: "email" }];

export default function RequestPasswordPage() {
  const { mutate: requestPassword, isPending, error } = usePasswordRequest();
  const [form, setForm] = useState<Form>({ email: "" });

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  const fieldErrors: FieldErrors = {
    email: error?.errors.email,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    requestPassword(form.email!);
  }

  return (
    <AuthCard
      heading="forgot password"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
      submitButtonLabel="send reset email"
    />
  );
}
