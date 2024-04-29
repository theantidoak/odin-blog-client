import { error } from '@sveltejs/kit';
import he from 'he';
import dotenv from 'dotenv';

dotenv.config();

export const load = async ({fetch, params }) => {
  try {
    const postsResponse = await fetch(`/api/posts/${params.postSlug}`);
    const postsData = await postsResponse.json();
    const { targetPost: post, success } = postsData;

    if (!success) {
      error(401, 'Failed to get post from server');
    }

    const commentResponse = await fetch(`/api/posts/${post.slug}/comments?postId=${post._id}`);
    const commentData = await commentResponse.json();
    const { comments, success: commentSuccess } = commentData;

    if (!commentSuccess) {
      error(401, 'Failed to get post comments from server');
    }

    return { status: 200, success, body: { post: {...post, content: he.decode(post.content) }, comments } };   
  } catch (err) {
    console.error(err);
    const errResponse: any = err;
    if ((errResponse)?.status === 401) {
      return { status: errResponse.status, success: false, body: { message: errResponse.body.message } };
    }

    throw err;
  }
}