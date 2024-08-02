import axios from "axios";
import { envRoute } from "../utils";

const axiosInstance = axios.create({
  baseURL: `${envRoute}/v1`,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use{
// (res) => res,
//   (error)=> {
//     return Promise.reject(error)
//   }
// }

const httpService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};

export default httpService;
