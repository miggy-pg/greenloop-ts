import { useQuery } from "@tanstack/react-query";
import { getWastes } from "../api/waste";

export const useGetWastes = () => {
  const {
    data: wastes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wastes"],
    queryFn: getWastes,
  });

  return { wastes, isLoading, error };
};
