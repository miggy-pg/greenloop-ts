import http from "../services/httpService";
import { UserProps, Users, User } from "../types/user.type";

export const getUser = async (userId: string) =>
  http.get<User>(`/users/${userId}`);

export const getUsers = async () => http.get<Users>(`/users`);

export const updateUsers = async (userId: string, user: UserProps) =>
  http.put<void>(`/users/${userId}`, user);

export const createUser = async (user: UserProps) =>
  http.post<void>("/sign-up", user);

export const deleteUser = async (userId: string) =>
  http.delete<void>(`/users/${userId}`);
