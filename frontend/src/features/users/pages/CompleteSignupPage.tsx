import { type SyntheticEvent, useState } from "react";

import { AllauthValidationError } from "../api/errors.ts";
import AuthCard from "../components/AuthCard/AuthCard.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../components/AuthCard/fields.ts";
import { useCompleteProviderSignup, useProviderSignupData } from "../hooks.ts";

const fields: Field[] = [
  { name: "username" },
  { name: "email", readOnly: true },
];

export default function CompleteSignupPage() {
  const { data: signupData } = useProviderSignupData();
  const email = signupData.data.email[0].email;

  const [form, setForm] = useState<Form>({
    username: signupData.data.user.username ?? "",
    email: email,
  });

  const { mutate: completeSignup, error } = useCompleteProviderSignup(email);

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  const fieldErrors: FieldErrors = {
    username: error?.errors.username,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    completeSignup(form.username!);
  }

  return (
    <AuthCard
      heading="complete sign up"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      submitButtonLabel="sign up"
    />
  );
}
