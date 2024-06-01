import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../api/conversation";

export const useConversation = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversation(userId),
  });

  const conversations = data?.data;

  return { conversations, isLoading, error };
};
