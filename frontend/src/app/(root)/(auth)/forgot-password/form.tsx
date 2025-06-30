"use client";

import { CLOUDFLARE_SITE_KEY } from "@app/constants";
import { Field, Form, Formik } from "formik";
import Turnstile from "react-turnstile";
import toast from "react-hot-toast";
import { FC } from "react";

import { Button, HttpErrorToast, InteractionWrapper } from "@app/components";
import { useForgotPassword } from "@app/data";
import { cn } from "@app/utils";
import { forgotPasswordSchema } from "@app/validations";

type ForgotPasswordFormProps = {};

type ForgotPasswordFormData = ForgotPasswordRequest & {
  isHuman: boolean;
};

const initialFormValues: ForgotPasswordFormData = {
  emailOrPhone: "",
  isHuman: false,
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({}: ForgotPasswordFormProps) => {
  const { mutate, isPending, error } = useForgotPassword();
  const onForgotPassword = (values: ForgotPasswordFormData) => {
    const { isHuman, ...payload } = values;

    if (!isHuman) {
      toast.error("Không thể xác minh bạn là con người. Vui lòng thử lại sau");
      return;
    }

    mutate(payload);
  };

  return (
    <Formik validationSchema={forgotPasswordSchema} initialValues={initialFormValues} onSubmit={onForgotPassword}>
      {({ getFieldMeta, errors, setFieldValue }) => {
        return (
          <Form className="w-full lg:w-1/3">
            <InteractionWrapper disabled={isPending}>
              <Field
                type="text"
                name="emailOrPhone"
                placeholder="Email / Số điện thoại..."
                className={cn(
                  "shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                  getFieldMeta("emailOrPhone").touched && errors.emailOrPhone && "border-red-400",
                )}
              />
              {getFieldMeta("emailOrPhone").touched && errors.emailOrPhone && (
                <p className="text-red-400 text-start text-sm mt-2">{errors.emailOrPhone}</p>
              )}
              <div className="my-5">
                <Turnstile sitekey={CLOUDFLARE_SITE_KEY} onVerify={() => setFieldValue("isHuman", true)} />
              </div>
              <Button className="py-3 w-full" type="submit" isLoading={isPending}>
                Gửi đi
              </Button>
              <HttpErrorToast error={error} />
            </InteractionWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;
