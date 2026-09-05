import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import type { ProviderSignupData } from "../types/provider-signup.ts";
import type { Session } from "../types/session.ts";
import {
  AllauthValidationError,
  isAllauthValidationErrorResponse,
  isNotAuthenticatedErrorResponse,
} from "./errors.ts";

export async function getSession() {
  try {
    return await apiClient.get<Session>(ENDPOINTS.user.session);
  } catch (error) {
    if (isNotAuthenticatedErrorResponse(error)) {
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

export function getProviderSignupData() {
  return apiClient.get<ProviderSignupData>(ENDPOINTS.user.provider.signup);
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
    if (isNotAuthenticatedErrorResponse(error)) {
      return null;
    }
    throw error;
  }
}
