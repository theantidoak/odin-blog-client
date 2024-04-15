import dotenv from 'dotenv';
import { getJWTCookie } from '$lib';

dotenv.config();

export const load = async ({fetch, cookies}) => {
  const loginURL = `${process.env.APIENDPOINT}/api/login`;
  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.APITOKEN}`,
      },
      body: JSON.stringify({
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const { jwtCookieName, jwtCookieOptions } = getJWTCookie(response);
    cookies.set(jwtCookieName, jwtCookieOptions[jwtCookieName], jwtCookieOptions);

    const data = await response.json();
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { success: false }, err: (err as { message: string }).message };
  }
}