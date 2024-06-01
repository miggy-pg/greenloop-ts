import http from "../services/httpService";

type Conversation = {
  senderId: string;
  receiverId: string;
};

export const getConversation = async (companyId: string) =>
  await http.get(`/conversations/${companyId}`);

export const createConversation = async (conversation: Conversation) =>
  await http.post(`/conversations`, conversation);
