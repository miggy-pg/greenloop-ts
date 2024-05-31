import http from "../services/httpService";
import { Company } from "../types";
import { Auth } from "../types";

export const login = async (credential: Auth.CredentialProps) =>
  await http.post("/sign-in", credential);

export const register = async (company: Company.CompanyProps) =>
  await http.post("/sign-up", company);

export const signout = async (companyId: string) =>
  http.patch(`/sign-out/${companyId}`);
