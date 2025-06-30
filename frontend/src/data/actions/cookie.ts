"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { decrypt, encrypt } from "@app/utils";
import { ACCESS_KEY, REFRESH_KEY } from "@app/constants";

export async function getCookie(key?: string): Promise<string | undefined> {
  const cookieStore = cookies();

  if (key) {
    const cookieEntry = cookieStore.get(key);

    if (!cookieEntry || !cookieEntry.value) return;

    return decrypt(cookieEntry.value);
  }

  return cookieStore.toString();
}

export async function setAuthCookie(tokenPair: TokenPair) {
  const pair = {
    [ACCESS_KEY]: tokenPair.accessToken,
    [REFRESH_KEY]: tokenPair.refreshToken,
  };

  const cookieStore = cookies();

  Object.entries(pair).forEach(([key, value]) => {
    const encryptedToken = encrypt(value);

    cookieStore.set({
      name: key,
      value: encryptedToken,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(value).exp! * 1000),
    });
  });
}

export async function clearAuthCookie() {
  const cookieStore = cookies();

  cookieStore.delete(ACCESS_KEY);
  cookieStore.delete(REFRESH_KEY);
}
