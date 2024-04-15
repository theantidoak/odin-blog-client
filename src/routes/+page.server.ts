import dotenv from 'dotenv';
import { getJWTCookie } from '$lib';

dotenv.config();

export const load = async ({fetch, cookies}) => {
  try {
    const postResponse = await fetch(`${process.env.APIENDPOINT}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'APIToken': `Token ${process.env.APITOKEN}`
      },
      body: JSON.stringify({
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      })
    });

    const { jwtCookieName, jwtCookieOptions } = getJWTCookie(postResponse);
    cookies.set(jwtCookieName, jwtCookieOptions[jwtCookieName], jwtCookieOptions);

    const jwtCookie = cookies.get('ob_secure_auth');

    const getResponse = await fetch(`${process.env.APIENDPOINT}/api/posts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'APIToken': `Token ${process.env.APITOKEN}`,
        'Authorization': `Bearer ${jwtCookie}`
      },
    });

    if (!postResponse.ok || !getResponse.ok) {
      throw new Error(`Failed to fetch: post: ${postResponse.status} get: ${getResponse.status}`);
    }

    const getJson = await getResponse.json();
    const postJson = await postResponse.json();

    const data = Object.assign({}, { post: postJson }, { get: getJson } );
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { success: false }, err: (err as { message: string }).message };
  }
}