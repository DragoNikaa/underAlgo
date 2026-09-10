import type { InputType } from "../../../../shared/components/Form/Input/Input.tsx";

type FieldName = "username" | "email" | "password" | "confirmPassword";

export interface Field {
  name: FieldName;
  label?: string;
  readOnly?: boolean;
}

interface FieldConfig {
  label: string;
  placeholder: string;
  type?: InputType;
}

export const FIELDS: Record<FieldName, FieldConfig> = {
  username: {
    label: "username",
    placeholder: "algoMaster96",
  },

  email: {
    label: "email address",
    placeholder: "you@somewhere.com",
    type: "email",
  },

  password: {
    label: "password",
    placeholder: "m@k3_1t_unbr3@k@bl3",
    type: "password",
  },

  confirmPassword: {
    label: "confirm password",
    placeholder: "sameAsAbove",
    type: "password",
  },
};

export type FieldErrors = Partial<Record<FieldName, string>>;

export type Form = Partial<Record<FieldName, string>>;
