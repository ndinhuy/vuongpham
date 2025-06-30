declare type SignInRequest = {
  email: string;
  password: string;
};

declare type SignUpRequest = Partial<User>;

declare type ForgotPasswordRequest = {
  emailOrPhone: string;
};

declare type ResetPasswordTransaction = {
  userId: string;
  transactionId: string;
};

declare type ResetPasswordRequest = {
  userId: string;
  transactionId: string;
  otpCode: string;
  newPassword: string;
};

declare type LockAccountPayload = { uid?: string; page: number };
declare type LockAccountResponse = { page: number };
