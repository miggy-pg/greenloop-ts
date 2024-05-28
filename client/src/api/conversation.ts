import http from "../services/httpService";

type Conversation = {
  senderId: string;
  receiverId: string;
};

export const getMessage = async (
  conversationId: string,
  companyId: string,
  receiverId: string
) =>
  http.get(
    `/messages/${conversationId}?senderId=${companyId}&&receiverId=${receiverId}`
  );

export const getCompanyConversation = async (companyId: string) =>
  http.get(`/conversations/${companyId}`);

export const createConversation = async (conversation: Conversation) =>
  http.post(`/conversations`, conversation);
