import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL:
    "https://script.google.com/macros/s/AKfycbwQu9rDG5zUP3cB_QdHTFzKj-06OgMso6AjPevcBG10RXS0yr2k0lRo0sgWJZcVOW5k/exec",
  timeout: 3000,
  headers: {
    "Content-Type": "text/plain",
  },
});

// requestに関する前処理
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  // if (config.headers !== undefined) {
  //   console.log("requestに関する前処理", config.headers);
  // }
  return config;
});

// responseに関する前処理
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("responeseに関する前処理", response);
    const statusCode = response.data.statusCode;
    switch (statusCode) {
      case 200:
        return response;
      default:
        return Promise.reject(response.data);
    }
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      default:
        console.log("errorによる振り分け", error.response?.status);
        break;
    }
    return Promise.reject(error);
  }
);
