import http from "../services/httpService";

export const getMessage = async (
  conversationId: string,
  companyId: string,
  receiverId: string
): Promise<void> =>
  http.get(
    `messages/${conversationId}?senderId=${companyId}&&receiverId=${receiverId}`
  );
