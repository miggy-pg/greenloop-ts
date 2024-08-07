import http from "../core/services/httpService";
import { CredentialProps } from "../types/auth.type";
import { UserProps } from "../types/user.type";

export const login = async (credential: CredentialProps): Promise<any> =>
  await http.post<void>("/sign-in", credential);

export const register = async (user: UserProps) =>
  await http.post<void>("/sign-up", user);

export const logout = async (companyId: string) =>
  await http.patch<void>(`/sign-out/${companyId}`);
