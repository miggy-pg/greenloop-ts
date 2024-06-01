import { useQuery } from "@tanstack/react-query";
import { getMessage } from "../api/message";

export const useMessage = (
  conversationId: string,
  userId: string,
  receiverId: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessage(conversationId, userId, receiverId),
  });

  return { data, isLoading, error };
};
