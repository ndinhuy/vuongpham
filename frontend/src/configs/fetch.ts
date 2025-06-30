"use server";

import { ACCESS_KEY, API_TOKEN_TYPE, REFRESH_KEY, WEB_BASE_API_URL } from "@app/constants";
import { getCookie, setAuthCookie } from "@app/data";

export const serverFetch = async (route: string, options?: RequestInit, retry: boolean = true): Promise<Response> => {
  const accessToken = await getCookie(ACCESS_KEY);

  const response: Response = await fetch(`${WEB_BASE_API_URL}${route}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `${API_TOKEN_TYPE} ${accessToken}`,
    },
  });

  if (response.status === 401 && retry) {
    const refreshToken = await getCookie(REFRESH_KEY);

    if (!refreshToken) return response;

    const refreshTokenResponse: Response = await fetch(`${WEB_BASE_API_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `${API_TOKEN_TYPE} ${refreshToken}`,
      },
    });

    if (refreshTokenResponse.ok) {
      const tokenPair: TokenPair = await refreshTokenResponse.json();
      await setAuthCookie(tokenPair);

      return await serverFetch(route, options, false);
    }
  }

  return response;
};
