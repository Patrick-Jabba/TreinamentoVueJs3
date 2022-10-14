import { setGlobalLoading } from "@/store/global";
import axios from "axios";
import router from "../router";
import AuthService from "./auth";
import UsersService from "./users";
import FeedbakcsService from './feedbacks';

const API_ENVS = {
  production: "",
  development: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");

  if (token) {
     config.headers['Authorization'] = `Bearer ${token}`;
          return config;
    // config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use((response) => {
    setGlobalLoading(false);
    return response;
  }, (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }

    if (error.response.status === 401) {
      router.push({ name: "Home" });
    }

    setGlobalLoading(false);
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbakcsService(httpClient)
};
