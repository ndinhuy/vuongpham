"use client";

import { useCancelOrder } from "@app/data";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC } from "react";
import * as Yup from "yup";

type CancelOrderFormProps = {
  orderId: string;
  page: number;
};

type CancelOrderFormType = { accept: boolean; reason: string };

const initialValues: CancelOrderFormType = {
  accept: true,
  reason: "",
};

const CancelOrderForm: FC<CancelOrderFormProps> = ({ orderId, page }) => {
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => cancelOrder({ orderId, page, ...values })}>
      {({}) => (
        <Form className="space-y-4 p-5">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="accept">
              Trạng thái huỷ
            </label>
            <Field
              type="checkbox"
              id="accept"
              name="accept"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <ErrorMessage name="accept" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="reason">
              Lý do huỷ đơn hàng
            </label>
            <Field
              as="textarea"
              id="reason"
              name="reason"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
            />
            <ErrorMessage name="reason" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CancelOrderForm;
