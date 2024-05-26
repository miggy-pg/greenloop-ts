import axios from "redaxios";
import { envRoute } from "../utils/Helper";

export const signInUser = async (userData) => {
  return await axios.post(`${envRoute}/v1/sign-in`, userData);
};
