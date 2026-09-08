import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import type { ProviderSignupData } from "../types/provider-signup.ts";
import type { ResetPasswordData } from "../types/reset-password.ts";
import type { Session } from "../types/session.ts";
import {
  AllauthValidationError,
  isAllauthValidationErrorResponse,
  isConflictError,
  isNotAuthenticatedError,
} from "./errors.ts";

export async function getSession() {
  try {
    return await apiClient.get<Session>(ENDPOINTS.user.session);
  } catch (error) {
    if (isNotAuthenticatedError(error)) {
      return null;
    }
    throw error;
  }
}

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

export async function signup(body: SignupBody) {
  try {
    await apiClient.post<void>(ENDPOINTS.user.signup, body);
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}

export async function getProviderSignupData() {
  try {
    return await apiClient.get<ProviderSignupData>(
      ENDPOINTS.user.provider.signup,
    );
  } catch (error) {
    if (isConflictError(error)) {
      return null;
    }
    throw error;
  }
}

export async function completeProviderSignup(username: string, email: string) {
  try {
    await apiClient.post<void>(ENDPOINTS.user.provider.signup, {
      username,
      email,
    });
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}

interface LoginBody {
  username: string;
  password: string;
}

export async function login(body: LoginBody) {
  try {
    await apiClient.post<void>(ENDPOINTS.user.login, body);
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}

export async function logout() {
  try {
    await apiClient.delete<void>(ENDPOINTS.user.session);
  } catch (error) {
    if (isNotAuthenticatedError(error)) {
      return null;
    }
    throw error;
  }
}

export async function requestPassword(email: string) {
  try {
    await apiClient.post<void>(ENDPOINTS.user.password.request, { email });
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}

export async function getResetPasswordData(key: string) {
  try {
    return await apiClient.get<ResetPasswordData>(
      ENDPOINTS.user.password.reset,
      undefined,
      { "X-Password-Reset-Key": key },
    );
  } catch (error) {
    if (isAllauthValidationErrorResponse(error) || isConflictError(error)) {
      return null;
    }
    throw error;
  }
}

export async function resetPassword(key: string, password: string) {
  try {
    await apiClient.post<void>(ENDPOINTS.user.password.reset, {
      key,
      password,
    });
  } catch (error) {
    if (isAllauthValidationErrorResponse(error)) {
      throw new AllauthValidationError(error.data.errors);
    }
    throw error;
  }
}
