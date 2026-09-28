import { type SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import { AllauthValidationError } from "../../api/errors.ts";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {
  Field,
  FieldErrors,
  Form,
} from "../../components/AuthForm/fields.ts";
import ProviderButton from "../../components/ProviderButton/ProviderButton.tsx";
import { useLogin } from "../../hooks.ts";
import styles from "./AuthPages.module.css";

const fields: Field[] = [{ name: "username" }, { name: "password" }];

export default function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  });

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  const fieldErrors: FieldErrors = {
    username: error?.errors.username,
    password: error?.errors.password,
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    login(
      {
        username: form.username!,
        password: form.password!,
      },
      {
        onError: () =>
          setForm((prev) => ({
            ...prev,
            password: "",
          })),
      },
    );
  }

  return (
    <AuthForm
      heading="log in"
      fields={fields}
      fieldErrors={fieldErrors}
      form={form}
      setForm={setForm}
      onFormSubmit={handleSubmit}
      isSubmitting={isPending}
    >
      <Link
        to={PATHS.user.password.reset}
        className={styles.forgotPasswordLink}
      >
        forgot password?
      </Link>

      <div className={styles.divider}>or</div>

      <div className={styles.providerButtons}>
        <ProviderButton authMode="login" provider="google" />
        <ProviderButton authMode="login" provider="github" />
      </div>

      <div className={styles.signupPrompt}>
        <p>Haven't initialized yet?</p>

        <ButtonLink to={PATHS.user.signup} oval color="blueInverse">
          sign up
        </ButtonLink>
      </div>
    </AuthForm>
  );
}
