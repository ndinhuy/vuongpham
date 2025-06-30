"use client";

import React, { FC, useState } from "react";

import ChatRoomListing from "./ChatRoomListing";
import AdminChatBody from "./AdminChatBody";
import { cn } from "@app/utils";

interface IProps {
  className?: string;
}

const AdminChatBox: FC<IProps> = ({ className }) => {
  const [activeEmail, setActiveEmail] = useState("");

  return (
    <div className={cn("grid grid-cols-12 gap-3", className)}>
      <ChatRoomListing activeEmail={activeEmail} setActiveEmail={setActiveEmail} />
      <AdminChatBody activeEmail={activeEmail} />
    </div>
  );
};

export default AdminChatBox;
