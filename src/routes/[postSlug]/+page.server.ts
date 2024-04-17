import { error } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

export const load = async ({fetch, params}) => {
  const { postSlug } = params;

  try {
    const response = await fetch(`/api/posts/${postSlug}`);
    const postsData = await response.json()
    const { targetPost: post, success } = postsData;

    if (!success) {
      error(401, 'Failed to get post from server');
    }

    return { status: 200, success, body: { post } };   
  } catch (err) {
    console.error(err);
    const errResponse: any = err;
    if ((errResponse)?.status === 401) {
      return { status: errResponse.status, success: false, body: { message: errResponse.body.message } };
    }

    throw err;
  }
}