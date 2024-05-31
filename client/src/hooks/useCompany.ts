import { useQuery, QueryOptions } from "@tanstack/react-query";
import { getCompany, getCompanies } from "../api/company";
import { Company } from "../types";

interface CompanyProps {
  companyData?: Company.CompanyProps[];
  isLoading: boolean;
  error: string;
}

export const useGetCompany = (companyId: string) => {
  const {
    data: companyData = [],
    isLoading,
    error,
  } = useQuery<Company.CompanyProps>({
    queryKey: ["company"],
    queryFn: () => getCompany(companyId),
  });

  return { companyData, isLoading, error };
};
