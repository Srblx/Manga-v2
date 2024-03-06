import axios from "axios";

const ApiAxios = axios.create({baseURL: 'http://localhost:3000/api/v1/'})

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
