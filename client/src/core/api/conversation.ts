import http from "../core/services/httpService";

type Conversation = {
  senderId: string;
  receiverId: string;
};

export const getConversation = async (companyId: string) => {
  const response = await http.get(`/conversations/${companyId}`);
  return response.data;
};

export const createConversation = async (conversation: Conversation) =>
  await http.post(`/conversations`, conversation);
