declare type MessageFrom = "ADMIN" | "CUSTOMER";

declare type Room = BaseModel &
  TimeStampModel & {
    email: string;
    messages: Message[];
  };

declare type Message = BaseModel &
  TimeStampModel & {
    from: MessageFrom;
    message: string;
  };

declare type AdminMessageResponse = {
  roomEmail: string;
  message: Message;
};

declare type CreateMessagePayload = {
  email: string;
  message: string;
  from?: MessageFrom;
};

declare type SendEmailPayload = {
  to: string;
  subject: string;
  content: string;
};
