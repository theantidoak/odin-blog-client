import dotenv from 'dotenv';
import { getJWTCookie } from '$lib';

dotenv.config();

export const load = async ({fetch, cookies}) => {
  try {
    const postResponse = fetch(`${process.env.APIENDPOINT}/api/login`, {
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

    const response = await postResponse
    const { jwtCookieName, jwtCookieOptions } = getJWTCookie(response);
    console.log(jwtCookieName, jwtCookieOptions);
    cookies.set(jwtCookieName, jwtCookieOptions[jwtCookieName], jwtCookieOptions);

    // const getResponse = fetch(`${process.env.APIENDPOINT}/api/${api}`, {
    //   method: method,
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.APITOKEN}`,
    //   },
    // });

    // const verifyResponse = await getResponse;

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    // const verifyData = await verifyResponse.json();
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { success: false }, err: (err as { message: string }).message };
  }
}