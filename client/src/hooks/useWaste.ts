import { useQuery } from "@tanstack/react-query";
import { getWastes } from "../api/waste";

export const useWastes = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wastes"],
    queryFn: getWastes,
  });

  return { data, isLoading, error };
};
