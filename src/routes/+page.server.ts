import { error } from '@sveltejs/kit';

import dotenv from 'dotenv';

dotenv.config();

export const load = async ({fetch}) => {
  try {
    const response = await fetch('/api/posts');

    if (!response.ok) {
      error(401, 'Failed to get posts from server');
    }
    
    const postsData = await response.json()
    const { recentPosts: posts, success } = postsData;

    return { status: 200, success, body: { posts } };   
  } catch (err) {
    console.error(err);
    const errResponse: any = err;
    if ((errResponse)?.status === 401) {
      return { status: errResponse.status, success: false, body: { message: errResponse.body.message } };
    }

    throw err;
  }
}