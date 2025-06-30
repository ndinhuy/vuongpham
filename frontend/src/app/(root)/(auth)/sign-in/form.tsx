"use client";

import { Formik, Field, Form } from "formik";
import { FC, useCallback } from "react";

import { Button, HttpErrorToast, InteractionWrapper } from "@app/components";
import { useSignIn } from "@app/data";
import Link from "next/link";

type SignInFormProps = {};

type SignInFormData = SignInRequest & {
  isSavePassword: boolean;
};

const initialFormValues: SignInFormData = {
  email: "",
  password: "",
  isSavePassword: false,
};

const SignInForm: FC<SignInFormProps> = ({}: SignInFormProps) => {
  const { mutate, error, isPending } = useSignIn();

  const onSignIn = useCallback(
    async (values: SignInFormData) => {
      const { isSavePassword, ...payload } = values;

      return mutate(payload);
    },
    [mutate],
  );

  return (
    <>
      <Formik initialValues={initialFormValues} onSubmit={onSignIn}>
        <InteractionWrapper disabled={isPending}>
          <Form>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Email..."
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Mật khẩu..."
                required
              />
            </div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center h-5">
                <Field
                  id="remember"
                  type="checkbox"
                  name="isSavePassword"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-blue-300"
                />
                <label htmlFor="remember" className="ms-2 text-sm font-medium">
                  Ghi nhớ tài khoản
                </label>
              </div>

              <div className="flex items-center h-5">
                <Link href="/forgot-password" className="text-sm font-medium">
                  Quên mật khẩu
                </Link>
              </div>
            </div>
            <Button className="py-3 w-full" type="submit" isLoading={isPending}>
              Đăng nhập
            </Button>

            <HttpErrorToast error={error} />
          </Form>
        </InteractionWrapper>
      </Formik>
    </>
  );
};

export default SignInForm;
