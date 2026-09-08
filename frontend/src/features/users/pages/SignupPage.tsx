import { type SyntheticEvent, useState } from "react";

import ButtonLink from "../../../shared/components/Button/ButtonLink.tsx";
import { PATHS } from "../../../shared/paths.ts";
import { AllauthValidationError } from "../api/errors.ts";
import AuthCard from "../components/AuthCard/AuthCard.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../components/AuthCard/fields.ts";
import ProviderButton from "../components/ProviderButton/ProviderButton.tsx";
import { useSignup } from "../hooks.ts";
import styles from "./AuthPages.module.css";
import { getPasswordMatchError } from "./utils.ts";

const fields: Field[] = [
  { name: "username" },
  { name: "email" },
  { name: "password" },
  { name: "confirmPassword" },
];

export default function SignupPage() {
  const { mutate: signup, isPending, error } = useSignup();
  const [form, setForm] = useState<Form>({
    username: "",
    email: "",
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
    username: error?.errors.username,
    email: error?.errors.email,
    password: error?.errors.password,
    confirmPassword: passwordMatchError,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordMatchError) return;

    signup({
      username: form.username!,
      email: form.email!,
      password: form.password!,
    });

    setForm((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  }

  return (
    <AuthCard
      heading="sign up"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
      submitButtonColor="blueInverse"
    >
      <div className={styles.divider}>or</div>

      <div className={styles.providerButtons}>
        <ProviderButton authMode="signup" provider="google" />
        <ProviderButton authMode="signup" provider="github" />
      </div>

      <div className={styles.loginPrompt}>
        <p>Already initialized?</p>

        <ButtonLink to={PATHS.user.login} oval color="blue">
          log in
        </ButtonLink>
      </div>
    </AuthCard>
  );
}
