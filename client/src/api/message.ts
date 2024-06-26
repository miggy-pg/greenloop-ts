import http from "../services/httpService";
import { MessageProps } from "../types/message.type";

export const sendMessage = async (message: MessageProps) =>
  await http.post("/message", message);

export const updateHasReadMessage = async (messageId: string) =>
  await http.get(`/message/${messageId}`);

export const getMessage = async (
  conversationId: string,
  userId: string,
  receiverId: string
) => {
  const response = await http.get(
    `/messages/${conversationId}?senderId=${userId}&&receiverId=${receiverId}`
  );
  return response.data;
};
