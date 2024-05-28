import http from "../services/httpService";

type Message = {
  conversationId: string;
  senderId: string;
  message: string;
  receiverId: string;
  image?: string;
};

export const sendMessage = async (message: Message) =>
  http.post("/message", message);

export const updateHasReadMessage = async (messageId: string) =>
  http.get(`/message/${messageId}`);
