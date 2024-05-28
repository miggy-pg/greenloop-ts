import http from "../services/httpService";

export type Credential = {
  username: string;
  password: string;
};

export type User = {
  companyName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationType: string;
  province: string;
  cityMunicipality: string;
};

export const login = async (credential: Credential) =>
  await http.post("/sign-in", credential);

export const register = async (user: User) => await http.post("/sign-up", user);

export const signout = async (companyId: string) =>
  http.patch(`/sign-out/${companyId}`);
