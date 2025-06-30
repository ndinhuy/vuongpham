"use client";

import { CLOUDFLARE_SITE_KEY } from "@app/constants";
import { Field, Form, Formik } from "formik";
import Turnstile from "react-turnstile";
import toast from "react-hot-toast";
import { FC } from "react";

import { Button, HttpErrorToast, InteractionWrapper } from "@app/components";
import { useResetPassword } from "@app/data";
import { cn } from "@app/utils";
import { resetPasswordSchema } from "@app/validations";

type ResetPasswordFormProps = {
  transactionId: string;
  userId: string;
};

type ResetPasswordFormData = Omit<ResetPasswordRequest, "transactionId" | "userId"> & {
  confirmPassword: string;
  isHuman: boolean;
};

const initialFormValues: ResetPasswordFormData = {
  otpCode: "",
  newPassword: "",
  confirmPassword: "",
  isHuman: false,
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ transactionId, userId }: ResetPasswordFormProps) => {
  const { mutate, isPending, error } = useResetPassword();

  const onResetPassword = (values: ResetPasswordFormData) => {
    const { isHuman, confirmPassword, ...payload } = values;

    if (!isHuman) {
      toast.error("Không thể xác minh bạn là con người. Vui lòng thử lại sau");
      return;
    }

    mutate({
      ...payload,
      userId,
      transactionId,
    });
  };

  return (
    <Formik validationSchema={resetPasswordSchema} initialValues={initialFormValues} onSubmit={onResetPassword}>
      {({ getFieldMeta, errors, setFieldValue }) => {
        return (
          <Form className="w-full lg:w-1/3">
            <InteractionWrapper disabled={isPending}>
              <Field
                type="password"
                name="newPassword"
                placeholder="Mật khẩu"
                className={cn(
                  "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                  getFieldMeta("newPassword").touched && errors.newPassword && "border-red-400",
                )}
              />
              {getFieldMeta("newPassword").touched && errors.newPassword && (
                <p className="text-red-400 text-sm mt-2 text-start">{errors.newPassword}</p>
              )}
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                className={cn(
                  "shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mt-5",
                  getFieldMeta("confirmPassword").touched && errors.confirmPassword && "border-red-400",
                )}
              />
              {getFieldMeta("confirmPassword").touched && errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-2 text-start">{errors.confirmPassword}</p>
              )}
              <Field
                type="text"
                name="otpCode"
                placeholder="Mã OTP"
                className={cn(
                  "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mt-5",
                  getFieldMeta("otpCode").touched && errors.otpCode && "border-red-400",
                )}
              />
              {getFieldMeta("otpCode").touched && errors.otpCode && (
                <p className="text-red-400 text-sm mt-2 text-start">{errors.otpCode}</p>
              )}
              <div className="my-5">
                <Turnstile sitekey={CLOUDFLARE_SITE_KEY} onVerify={() => setFieldValue("isHuman", true)} />
              </div>
              <Button className="py-3 w-full" type="submit" isLoading={isPending}>
                Khôi phục mật khẩu
              </Button>
              <HttpErrorToast error={error} />
            </InteractionWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;
