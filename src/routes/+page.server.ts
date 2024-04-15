import dotenv from 'dotenv';

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

    if (!postResponse.ok) {
      throw new Error(`Failed to fetch. post: ${postResponse.status}`);
    }

    const postJson = await postResponse.json();

    const jwtCookieName = 'ob_secure_auth';
    const { cookie: jwtCookieOptions } = postJson;
    jwtCookieOptions.expires = new Date(jwtCookieOptions.expires);
    cookies.set(jwtCookieName, jwtCookieOptions[jwtCookieName], jwtCookieOptions);

    const jwtCookie = cookies.get(jwtCookieName);

    const getResponse = await fetch(`${process.env.APIENDPOINT}/api/posts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'APIToken': `Token ${process.env.APITOKEN}`,
        'Authorization': `Bearer ${jwtCookie}`
      },
    });

    if (!getResponse.ok) {
      throw new Error(`Failed to fetch: post: ${getResponse.status}`);
    }

    const getJson = await getResponse.json();

    const data = Object.assign({}, { post: postJson }, { get: getJson } );
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { success: false }, err: (err as { message: string }).message };
  }
}