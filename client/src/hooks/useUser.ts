import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../api/user";

export const useGetUser = (companyId: string) => {
  const {
    data: companyData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => getUser(companyId),
  });

  return { companyData, isLoading, error };
};
