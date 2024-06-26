import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../api/user";

export const useGetUser = (companyId: string) => {
  const {
    data: user = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(companyId),
  });

  return { user, isLoading, error };
};

export const useGetUsers = () => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { users, isLoading, error };
};
