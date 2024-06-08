import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../api/user";

export const useGetUser = (companyId: string) => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(companyId),
  });

  return { data, isLoading, error };
};
