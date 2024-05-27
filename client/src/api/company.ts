import http from "../services/httpService";
import { User } from "./auth";

export const getCompany = async (companyId: string): Promise<void> =>
  http.get(`/users/${companyId}`);

export const getCompanies = async (): Promise<void> => http.get(`/users`);

export const updateCompany = async (companyId: string, user: User) =>
  http.put(`/users/${companyId}`, user);

export const createCompany = async (user: User) => http.post("/sign-up", user);

export const deleteCompany = async (companyId: string): Promise<void> =>
  http.delete(`/users/${companyId}`);

export const signOutCompany = async (companyId: string): Promise<void> =>
  http.patch(`/sign-out/${companyId}`);
