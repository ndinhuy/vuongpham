"use client";

import React, { FC, memo, useCallback, useEffect, useRef } from "react";

import { SendHorizonal } from "lucide-react";
import { Field, Form, Formik, FormikHelpers } from "formik";

import { useCustomerChat, useDebounceCallback } from "@app/common";
import InteractionWrapper from "./InteractionWrapper";
import { ChatRoomState } from "@app/context";
import ChatMessage from "./ChatMessage";
import Input from "./Input";
import { cn } from "@app/utils";

type CustomerChatBodyProps = {};

type InitialChatFormData = { message: string };

const initialChatFormValues: InitialChatFormData = { message: "" };

type InitialRoomFormData = { email: string };

const initialRoomFormValues: InitialRoomFormData = { email: "" };

const CustomerChatBody: FC<CustomerChatBodyProps> = ({}: CustomerChatBodyProps) => {
  const { messages, state, opponentTyping, onSendMessage, onTyping, onStopTyping, onStartRoom } = useCustomerChat();
  const { triggerStart, triggerEnd } = useDebounceCallback(onTyping, onStopTyping, 500);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, opponentTyping]);

  const onSubmitChatForm = useCallback(
    (values: InitialChatFormData, helpers: FormikHelpers<InitialChatFormData>) => {
      onSendMessage(values.message);

      helpers.resetForm();
    },
    [onSendMessage],
  );

  const onSubmitRoomForm = useCallback(
    (values: InitialRoomFormData, helpers: FormikHelpers<InitialRoomFormData>) => {
      console.log("started room");

      onStartRoom(values.email);

      helpers.resetForm();
    },
    [onStartRoom],
  );

  return (
    <>
      <div className="flex-1 max-w-full overflow-y-scroll custom-scroll py-3">
        {messages.map(({ _id, message, createdAt, from }) => {
          return (
            <ChatMessage key={_id} isMe={from === "CUSTOMER"} time={createdAt}>
              {message}
            </ChatMessage>
          );
        })}
        {opponentTyping && <ChatMessage typing isMe={false} />}
        <div ref={bottomRef} />
      </div>
      {state === ChatRoomState.LAUNCHING && (
        <span className="text-center text-xs text-gray-400 mb-2">
          Đang khởi tạo phòng chat
          <svg
            aria-hidden="true"
            className="inline w-3 h-3 text-gray-200 animate-spin fill-white ml-2"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </span>
      )}
      {state === ChatRoomState.READY && (
        <span className="text-center text-xs text-gray-400 mb-2">Phòng chat đang sẵn sàng</span>
      )}
      {state === ChatRoomState.PENDING && (
        <div className="flex flex-col items-center">
          <span className="text-center text-xs text-gray-400 mb-2">Nhập email để bắt đầu chat</span>
          <Formik initialValues={initialRoomFormValues} onSubmit={onSubmitRoomForm}>
            {() => (
              <Form className="flex flex-col items-center w-full px-4 mb-5">
                <Field className="w-full" name="email" component={Input} placeholder="Nhập email..." />
                <button type="submit" className="px-4 py-2 mt-2 rounded bg-black text-sm text-white font-medium">
                  Bắt đầu
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {state === ChatRoomState.UNAVAILABLE && (
        <span className="text-center text-xs mb-2 text-red-500">
          Dịch vụ chat hiện không khả dụng. vui lòng thử lại sau
        </span>
      )}
      <div className="border-t w-full px-3 py-2">
        <Formik initialValues={initialChatFormValues} onSubmit={onSubmitChatForm}>
          {({ values, setFieldValue }) => (
            <InteractionWrapper disabled={state != ChatRoomState.READY}>
              <Form className="flex gap-x-3 items-center relative border rounded-md overflow-hidden">
                <input
                  onChange={(e) => {
                    setFieldValue("message", e.target.value);
                    triggerStart();
                    triggerEnd();
                  }}
                  value={values.message}
                  className="w-full border-none pr-10 p-3 outline-none text-sm"
                  name="message"
                  placeholder="Nhập tin nhắn..."
                />
                <button
                  disabled={!!!values.message}
                  type="submit"
                  className={cn(
                    "px-3 flex items-center justify-center absolute right-0 top-0 bottom-0 rounded-md m-1 transition-all",
                    values.message.length > 0 ? "bg-black" : "bg-white",
                  )}
                >
                  <SendHorizonal
                    className="transition-all"
                    size={18}
                    color={values.message.length > 0 ? "white" : "black"}
                  />
                </button>
              </Form>
            </InteractionWrapper>
          )}
        </Formik>
      </div>
    </>
  );
};

export default memo(CustomerChatBody);
