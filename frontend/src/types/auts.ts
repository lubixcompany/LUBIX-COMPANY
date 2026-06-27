export interface RegisterRequest {
  fullName: string;
  email: string;
  tell: string;
  password: string;
}


export interface VerifyEmail {
  email: string;
  code: string;
}

// types/auth.ts
export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    verified: boolean;
    token?: string;
  };
}

export interface ResendVerificationRequest {
  email: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role: string;
  user_id: string;
  full_name: string;
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  new_password: string;
}
