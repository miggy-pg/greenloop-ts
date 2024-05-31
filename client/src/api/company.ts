import http from "../services/httpService";
import { User } from "./auth";

export const getCompany = async (companyId: string) =>
  http.get(`/users/${companyId}`);

export const getCompanies = async () => http.get(`/users`);

export const updateCompany = async (companyId: string, user: User) =>
  http.put(`/users/${companyId}`, user);

export const createCompany = async (user: User) => http.post("/sign-up", user);

export const deleteCompany = async (companyId: string) =>
  http.delete(`/users/${companyId}`);
