import { Metadata } from "next";
import { FC } from "react";

import { AssistantChatContent } from "@app/components";

export const metadata: Metadata = {
  title: "Trợ lý IVY | IVY fashion",
  description: "Fashion store",
};

type AiAssistantPageProps = {};

const AiAssistantPage: FC<AiAssistantPageProps> = ({}) => {
  return <AssistantChatContent />;
};

export default AiAssistantPage;
