import http from "../services/httpService";
import { UserProps, Users, User } from "../types/user.type";

export const getUser = async (userId: string) => {
  const response = await http.get<User>(`/users/${userId}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await http.get<Users>(`/users`);
  return response.data;
};

export const updateUsers = async (userId: string, user: UserProps) =>
  await http.put<void>(`/users/${userId}`, user);

export const createUser = async (user: UserProps) =>
  await http.post<void>("/sign-up", user);

export const deleteUser = async (userId: string) =>
  await http.delete<void>(`/users/${userId}`);
