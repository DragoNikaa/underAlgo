import { type SyntheticEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { PATHS } from "../../../shared/paths.ts";
import { AllauthValidationError } from "../api/errors.ts";
import AuthCard from "../components/AuthCard/AuthCard.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../components/AuthCard/fields.ts";
import { useResetPassword, useResetPasswordData } from "../hooks.ts";
import { getPasswordMatchError } from "./utils.ts";

const fields: Field[] = [
  { name: "password", label: "new password" },
  { name: "confirmPassword", label: "confirm new password" },
];

export default function ResetPassword() {
  const { key } = useParams();
  const { data: resetPasswordData } = useResetPasswordData(key!);
  const { mutate: resetPassword, isPending, error } = useResetPassword(key!);
  const [form, setForm] = useState<Form>({
    password: "",
    confirmPassword: "",
  });

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

    resetPassword(form.password!);
    setForm({
      password: "",
      confirmPassword: "",
    });
  }

  return resetPasswordData ? (
    <AuthCard
      heading="reset password"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
      submitButtonLabel="reset"
    />
  ) : (
    <Navigate to={PATHS.algorithm.list} replace />
  );
}
