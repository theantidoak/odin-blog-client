import dotenv from 'dotenv';
import { getJWTCookie } from '$lib';

dotenv.config();

export const load = async ({fetch, cookies}) => {
  const api = 'login';
  const method = 'POST';
  try {
    const postResponse = fetch(`${process.env.APIENDPOINT}/api/${api}`, {
      method: method,
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

    const getResponse = fetch(`${process.env.APIENDPOINT}/api/${api}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.APITOKEN}`,
      },
    });

    const response = method === 'POST' ? await postResponse : await getResponse;

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    if (api === 'login') {
      const { jwtCookieName, jwtCookieOptions } = getJWTCookie(response);
      cookies.set(jwtCookieName, jwtCookieOptions[jwtCookieName], jwtCookieOptions);
    }

    const data = await response.json();
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { success: false }, err: (err as { message: string }).message };
  }
}