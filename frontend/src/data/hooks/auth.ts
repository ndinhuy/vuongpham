"use client";

import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";

import { clearAuthCookie, setAuthCookie } from "@app/data";
import { formatErrorMessage } from "@app/utils";
import { useAuth } from "@app/common";
import { http } from "@app/configs";

export const useSignIn = (): UseMutationResult<TokenPair, AxiosError<ErrorResponse, any>, SignInRequest, unknown> => {
  const { fetchUser } = useAuth();
  const router = useRouter();

  return useMutation<TokenPair, AxiosError<ErrorResponse, any>, SignInRequest>({
    mutationFn: async (request: SignInRequest): Promise<TokenPair> => {
      const { data, status }: AxiosResponse<TokenPair> = await http.post("/auth/sign-in", request);

      if (status === 200) {
        await setAuthCookie(data);
      }

      return data;
    },
    async onSuccess() {
      fetchUser();
      router.replace("/");
      toast.success("Đăng nhập thành công");
    },
  });
};

export const useSignUp = (): UseMutationResult<void, AxiosError<ErrorResponse, any>, SignUpRequest, unknown> => {
  const router = useRouter();

  return useMutation<void, AxiosError<ErrorResponse, any>, SignUpRequest>({
    mutationFn: async (request: SignUpRequest): Promise<void> => await http.post("/auth/sign-up", request),
    async onSuccess() {
      router.replace("/sign-in");
      toast.success("Đăng ký tài khoản thành công");
    },
  });
};

export const useSignUpAdmin = (): UseMutationResult<void, AxiosError<ErrorResponse, any>, SignUpRequest, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse, any>, SignUpRequest>({
    mutationFn: async (request: SignUpRequest): Promise<void> => await http.post("/auth/admin/sign-up", request),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["admin-list"],
      });

      toast.success("Đăng ký tài khoản quản trị viên thành công");
    },
  });
};

export const useSignOut = (): UseMutationResult<void, AxiosError, any, unknown> => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, AxiosError, any>({
    mutationFn: async (): Promise<void> => {
      sessionStorage.clear();
      return await http.post("/auth/sign-out");
    },
    async onSuccess() {
      await clearAuthCookie();
      await queryClient.resetQueries({
        queryKey: ["auth-user"],
      });
      router.replace("/sign-in");
      toast.success("Đăng xuất thành công");
    },
  });
};

export const useForgotPassword = (): UseMutationResult<
  ResetPasswordTransaction,
  AxiosError<ErrorResponse, any>,
  any,
  unknown
> => {
  const router = useRouter();

  return useMutation<ResetPasswordTransaction, AxiosError<ErrorResponse, any>, any>({
    mutationFn: async (request: ForgotPasswordRequest): Promise<ResetPasswordTransaction> => {
      const { data }: AxiosResponse<ResetPasswordTransaction> = await http.post("/auth/forgot-password", request);

      return data;
    },
    onSuccess(transaction: ResetPasswordTransaction) {
      router.push(`/reset-password/?trans=${transaction.transactionId}&uid=${transaction.userId}`);
    },
  });
};

export const useResetPassword = (): UseMutationResult<void, AxiosError<ErrorResponse, any>, any, unknown> => {
  const router = useRouter();
  return useMutation<void, AxiosError<ErrorResponse, any>, any>({
    mutationFn: async (request: ResetPasswordRequest): Promise<void> => {
      await http.post("/auth/reset-password", request);
    },
    onSuccess() {
      router.replace("/sign-in");
      toast.success("Khôi phục mật khẩu thành công");
    },
  });
};

export const useLockAccount = (): UseMutationResult<
  LockAccountResponse,
  AxiosError<ErrorResponse, any>,
  LockAccountPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<LockAccountResponse, AxiosError<ErrorResponse>, LockAccountPayload>({
    mutationFn: async ({ uid, page }: LockAccountPayload): Promise<LockAccountResponse> => {
      await http.post(`/auth/lock/${uid || ""}`);
      return { page };
    },
    onSuccess: async ({ page }) => {
      queryClient.fetchQuery({ queryKey: ["admin-list", `${page}`] });
      toast.success("Khóa tài khoản thành công");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message
        ? formatErrorMessage(error.response.data.message)
        : "Có lỗi xảy ra khi khóa tài khoản";
      toast.error(errorMessage);
    },
  });
};

export const useActiveAccount = (): UseMutationResult<
  LockAccountResponse,
  AxiosError<ErrorResponse>,
  LockAccountPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<LockAccountResponse, AxiosError<ErrorResponse>, LockAccountPayload>({
    mutationFn: async ({ uid, page }: LockAccountPayload): Promise<LockAccountResponse> => {
      await http.post(`/auth/active/${uid || ""}`);

      return { page };
    },
    onSuccess: async ({ page }) => {
      queryClient.fetchQuery({ queryKey: ["admin-list", `${page}`] });
      toast.success("Kích hoạt tài khoản thành công");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message
        ? formatErrorMessage(error.response.data.message)
        : "Có lỗi xảy ra khi kích hoạt tài khoản";
      toast.error(errorMessage);
    },
  });
};
