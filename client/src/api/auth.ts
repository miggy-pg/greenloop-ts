import http from "../services/httpService";
import { CredentialProps } from "../types/auth.types";
import { UserProps } from "../types/user.types";

export const login = async (credential: CredentialProps) =>
  await http.post<void>("/sign-in", credential);

export const register = async (user: UserProps) =>
  await http.post<void>("/sign-up", user);

export const signout = async (companyId: string) =>
  await http.patch<void>(`/sign-out/${companyId}`);
