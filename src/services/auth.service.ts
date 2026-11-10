import api from "@/lib/api";
import { setStoredUser, setToken } from "@/lib/auth";

export interface LoginResponseData {
  user: Record<string, unknown>;
  token: string;
  token_type: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: LoginResponseData;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/v1/auth/login", {
    email,
    password,
  });

  const token = response.data?.data?.token;
  if (token) {
    setToken(token);
  }
  const user = response.data?.data?.user;
  if (user) {
    setStoredUser(user);
    localStorage.setItem("username", String(user.name ?? ""));
    localStorage.setItem("avatar_url", String(user.avatar_url ?? ""));
    localStorage.setItem("job_title", String(user.job_title ?? ""));
  }

  return response.data;
}

export async function forgotPassword(email: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/v1/auth/forgot-password", {
    email,
  });
  return response.data;
}

export async function verifyResetOtp(
  email: string,
  otp: string,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/v1/auth/verify-reset-otp", {
    email,
    otp,
  });
  return response.data;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/api/v1/auth/reset-password",
    payload,
  );
  return response.data;
}