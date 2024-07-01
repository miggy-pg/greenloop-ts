import http from "../services/httpService";
import { UserProps } from "../types/user.type";

export const getUser = async (userId: string) => {
  const response = await http.get<UserProps[]>(`/users/${userId}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await http.get<UserProps[]>(`/users`);
  return response.data;
};

export const updateUser = async (
  userId: string | undefined,
  user: UserProps
): Promise<void> => {
  await http.put<void>(`/users/${userId}`, user);
};

export const createUser = async (user: UserProps) =>
  await http.post<void>("/sign-up", user);

export const deleteUser = async (userId: string | undefined) =>
  await http.delete<void>(`/users/${userId}`);
