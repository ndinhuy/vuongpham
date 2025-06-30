"use client";

import React, { FC, useState } from "react";
import { Field, Form, Formik } from "formik";
import RichTextEditor from "react-quill";

import { Button, Input, Modal, Pagination } from ".";

interface IProps {}

const initialFormValues: SendEmailPayload = {
  to: "",
  subject: "",
  content: "",
};

const EmailContacts: FC<IProps> = (props) => {
  const [users, setUsers] = useState<Partial<User>[]>([]);

  const handleonChangePage = (number: number) => {};
  const handleSendEmail = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id} className="bg-white border-b   hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user._id}
                </th>
                <td className="px-6 py-4">{`${user.lastName} ${user.firstName}`}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 flex gap-x-3">
                  <Modal
                    title={`Gửi email đến ${user.email}`}
                    size="lg"
                    toggle={
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                      >
                        Liên hệ
                      </button>
                    }
                  >
                    <div className="p-5 relative">
                      <Formik initialValues={initialFormValues} onSubmit={handleSendEmail}>
                        {({}) => (
                          <Form className="relative w-full h-full">
                            <label htmlFor="subject" className="font-semibold">
                              Tiêu đề
                            </label>
                            <Field
                              id="subject"
                              component={Input}
                              name="subject"
                              className="w-full h-20 mb-3"
                              placeholder="Nhập tiêu đề..."
                            />
                            <label htmlFor="content" className="font-semibold">
                              Nội dung
                            </label>
                            <div className="w-full h-[300px]">
                              <RichTextEditor theme="snow" />
                            </div>
                            <Button type="submit" className="ms-auto mt-5">
                              Gửi
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-end mt-10">
        <Pagination currentPage={1} onChangePage={handleonChangePage} pageCount={10} />
      </div>
    </>
  );
};

export default EmailContacts;
