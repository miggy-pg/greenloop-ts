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
  user: { image: Image };
  message: Conversation;
  conversationId: string;
  id: string;
  msg: string;
  msgImage: { url: string };
}

export interface Message {
  _id?: string;
  message: Messages;
  conversationId: string;
  user: { fullName: string };
}
