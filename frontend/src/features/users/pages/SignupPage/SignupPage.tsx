import { type SyntheticEvent, useState } from "react";

import Button from "../../../../shared/components/Button/Button.tsx";
import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import FormError from "../../../../shared/components/Form/FormError/FormError.tsx";
import Input from "../../../../shared/components/Form/Input/Input.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import { AllauthValidationError } from "../../api/errors.ts";
import { useSignup } from "../../hooks.ts";
import styles from "./SignupPage.module.css";

const fields = [
  {
    name: "username",
    label: "username",
    placeholder: "algoMaster96",
    type: "text",
  },
  {
    name: "email",
    label: "email address",
    placeholder: "you@somewhere.com",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "m@k3_1t_unbr3@k@bl3",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "confirm password",
    placeholder: "sameAsAbove",
    type: "password",
  },
] as const;

export default function SignupPage() {
  const { mutate: signup, error } = useSignup();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const confirmPasswordError =
    form.password !== form.confirmPassword
      ? "Passwords do not match."
      : undefined;

  if (error && !(error instanceof AllauthValidationError)) {
    throw error;
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (confirmPasswordError) return;

    signup({
      username: form.username,
      email: form.email,
      password: form.password,
    });
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
  }

  return (
    <Card className={styles.signupPage}>
      <Heading className={styles.heading}>sign up</Heading>

      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map(({ name, label, placeholder, type }) => {
          const errorId = `${name}Error`;
          const fieldError =
            name === "confirmPassword"
              ? confirmPasswordError
              : error?.errors[name];

          return (
            <div key={name}>
              <Input
                id={name}
                type={type}
                value={form[name]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    [name]: event.target.value,
                  }))
                }
                placeholder={placeholder}
                aria-invalid={!!fieldError}
                aria-describedby={fieldError ? errorId : undefined}
                column
              >
                <Heading as="h2" variant="secondary">
                  {label}
                </Heading>
              </Input>

              {fieldError && <FormError id={errorId}>{fieldError}</FormError>}
            </div>
          );
        })}

        <Button
          type="submit"
          oval
          color="blueInverse"
          className={styles.signupButton}
        >
          sign up
        </Button>
      </form>

      <div className={styles.loginPrompt}>
        <p>Already initialized?</p>

        <ButtonLink to={PATHS.user.login} oval color="blue">
          log in
        </ButtonLink>
      </div>
    </Card>
  );
}
