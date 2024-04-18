import { error } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

export const load = async ({fetch, params, cookies}) => {
  try {
    const { postSlug } = params;
    const authCall = fetch(`/api/auth`);
    const postsCall = fetch(`/api/posts/${postSlug}`);
    const [ authResponse, postsResponse ] = await Promise.all([ authCall, postsCall ]);
    const [ authData, postsData ] = await Promise.all([ authResponse.json(), postsResponse.json()]);
    const { targetPost: post, success } = postsData;
    const { success: isAuthorized } = authData;

    if (!success) {
      error(401, 'Failed to get post from server');
    }

    const commentResponse = await fetch(`/api/posts/${post.slug}/comments?postId=${post._id}`);
    const commentData = await commentResponse.json();
    const { comments, success: commentSuccess } = commentData;

    if (!commentSuccess) {
      error(401, 'Failed to get post comments from server');
    }

    return { status: 200, success, body: { post, comments, isAuthorized } };   
  } catch (err) {
    console.error(err);
    const errResponse: any = err;
    if ((errResponse)?.status === 401) {
      return { status: errResponse.status, success: false, body: { message: errResponse.body.message } };
    }

    throw err;
  }
}