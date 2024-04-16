import { error } from '@sveltejs/kit';
import { POST } from './api/login/+server.js';
import dotenv from 'dotenv';

dotenv.config();

async function handlePosts(fetch: any, jwtCookie: string) {
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
    error(getResponse.status, `${getResponse.statusText} Failed to fetch posts`);
  }

  return await getResponse.json();
}

export const load = async ({fetch, cookies}) => {
  try {
    const jwtCookieName = 'ob_secure_auth';
    const jwtCookie = cookies.get(jwtCookieName);

    if (!jwtCookie) {
      error(400, `Failed to get cookie`);
    }

    const postsData = await handlePosts(fetch, jwtCookie);
    return { ...postsData };
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}