import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// requestに関する前処理
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers !== undefined) {
    console.log("request");
    console.log(config.headers);
  }
  return config;
});

// responseに関する前処理
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("responese");
    console.log(response);
    return response;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      default:
        console.log("error");
        console.log(error.response?.status);
        break;
    }
    return Promise.reject(error);
  }
);
