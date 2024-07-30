import { UserProps } from "./user.type";

export type MessageProps = {
  conversationId: string;
  senderId: string;
  message: string;
  receiverId: string;
  image?: string;
};

interface Image {
  url: string;
}

interface Conversation {
  id: string;
}

interface Messages {
  // user: { image: Image };
  // message: Conversation;
  // conversationId: string;
  id: string;
  message: string;
  image: { url: string };
}

interface UserMessage
  extends Pick<UserProps, "fullName" | "image" | "id" | "email"> {}

export interface Message {
  user: UserMessage;
  conversationId: string;
  hasRead: boolean;
  // id: string;
  // _id?: string;
  message: Messages;
  // user: { fullName: string };
}
