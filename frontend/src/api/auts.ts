import api from "./axios";
import type { ForgotPasswordRequest, ResetPasswordRequest } from "../types/auts";

// Forgot password
export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return await api.post("/user/forgot-password", data);
};

// Reset password
export const resetPassword = async (data: ResetPasswordRequest) => {
  return await api.post("/user/reset-password", data);
};