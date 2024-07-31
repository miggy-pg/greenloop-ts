import { UserProps } from "./user.type";

export type MessageProps = {
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  image?: string;
};

// socketmessage
// {
//     "senderId": "6619fee4a725d3c1ff21a859",
//     "message": "heyyy",
//     "conversationId": "665c73f196de408ea6935f15",
//     "company": {
//         "id": "6619fee4a725d3c1ff21a859",
//         "email": "lguquezon@gmail.com"
//     }
// }

interface Message {
  // user: { image: Image };
  // message: Conversation;
  // conversationId: string;
  id: string;
  message: string;
  image: { url: string };
}

interface UserMessage
  extends Pick<UserProps, "fullName" | "image" | "id" | "email"> {}

export interface ResponseMessage {
  conversationId: string;
  user: UserMessage;
  hasRead: boolean;
  message: Message;
  _id?: string;
}
