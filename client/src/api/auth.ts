import axios from "redaxios";
import http from "../services/httpService";
import { envRoute } from "../utils";

type credentials {
  username: string;
  password: string;
}

type signUpPayload {
  cityMunicipality: string;
  companyName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  organizationType: string;
  province: string;
}

export const signInUser = async (payload: credentials) =>
  await http.post(`${envRoute}/v1/sign-in`, payload);

export const signUpUser = async (payload: credentials) =>
  await axios.post(`${envRoute}/v1/sign-up`, payload);
