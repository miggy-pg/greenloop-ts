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

export const signInUser = async (credential: Credential): Promise<void> =>
  await http.post("/sign-in", credential);

export const signUpUser = async (user: User): Promise<void> =>
  await http.post("/sign-up", user);
