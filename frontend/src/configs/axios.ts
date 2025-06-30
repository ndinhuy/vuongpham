import axios, { AxiosInstance, AxiosResponse } from "axios";

import { ACCESS_KEY, API_REQUEST_TIMEOUT, API_TOKEN_TYPE, REFRESH_KEY, WEB_BASE_API_URL } from "@app/constants";
import { getCookie, setAuthCookie } from "@app/data";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: WEB_BASE_API_URL,
  timeout: API_REQUEST_TIMEOUT,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: WEB_BASE_API_URL,
  timeout: API_REQUEST_TIMEOUT,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getCookie(ACCESS_KEY);

  config.headers.Authorization = `${API_TOKEN_TYPE} ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error: any) => {
    const originalRequest = error.config;

    if (!originalRequest?.url.includes("auth/refresh-token") && error.response?.status === 401) {
      const refreshToken = await getCookie(REFRESH_KEY);

      try {
        const response: AxiosResponse<TokenPair> = await axiosPrivate.post(
          "/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `${API_TOKEN_TYPE} ${refreshToken}`,
            },
          },
        );

        const newTokenPair: TokenPair | null = response.data;

        if (!newTokenPair) return;

        setAuthCookie(newTokenPair);

        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const http = axiosInstance;
