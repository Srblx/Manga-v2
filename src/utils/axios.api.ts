import axios from "axios";
import { URL_BASE_NEST_SKELETON } from "./routeApi.utils";

const ApiAxios = axios.create({ baseURL: URL_BASE_NEST_SKELETON });

ApiAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default ApiAxios;
