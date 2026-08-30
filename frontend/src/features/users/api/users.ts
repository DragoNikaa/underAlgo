import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import {
  AllauthValidationError,
  isAllauthValidationErrorResponse,
} from "./errors.ts";

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

export async function signup(body: SignupBody) {
  try {
    return await apiClient.post<void>(ENDPOINTS.user.signup, body);
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}
