import { type SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";

import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { AllauthValidationError } from "../../api/errors.ts";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../../components/AuthForm/fields.ts";
import AuthLayout from "../../components/AuthLayout/AuthLayout.tsx";
import {
  usePasswordReset,
  usePasswordResetKeyValidation,
} from "../../hooks.ts";
import { getPasswordMatchError } from "../utils.ts";

const fields: Field[] = [
  { name: "password", label: "new password" },
  { name: "confirmPassword", label: "confirm new password" },
];

export default function PasswordResetPage() {
  const { key } = useParams();
  usePasswordResetKeyValidation(key!);
  const { mutate: resetPassword, isPending, error } = usePasswordReset(key!);
  const [form, setForm] = useState<Form>({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  const passwordMatchError = getPasswordMatchError(
    form.password,
    form.confirmPassword,
  );

  const fieldErrors: FieldErrors = {
    password: error?.errors.password,
    confirmPassword: passwordMatchError,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordMatchError) return;

    resetPassword(form.password!, {
      onError: () =>
        setForm({
          password: "",
          confirmPassword: "",
        }),
      onSuccess: () => setSuccess(true),
    });
  }

  return success ? (
    <AuthLayout>
      <Heading variant="secondary">password reset</Heading>

      <p>
        Password reset successfully. Now you can get back to the important stuff
        – algorithms!
      </p>
    </AuthLayout>
  ) : (
    <AuthForm
      heading="reset password"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
      submitButtonLabel="reset"
    />
  );
}
