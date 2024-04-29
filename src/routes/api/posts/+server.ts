import { error } from "@sveltejs/kit";
import dotenv from 'dotenv';
import { json } from "@sveltejs/kit";
import he from 'he';
import * as cheerio from 'cheerio';
dotenv.config();

function getExcerpt(postContent: string) {
  if (!postContent) return '';
  return postContent.replace(/(<([^>]+)>)/ig, '').slice(0, 40);
}

function getImageSrc(postContent: string) {
  const $ = cheerio.load(postContent);
  const img = $('img').attr('src');
  return img ?? '';
}

export async function GET(event:any) {
  const getResponse = await fetch(`${process.env.APIENDPOINT}/api/posts`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'APIToken': `Token ${process.env.APITOKEN}`
    },
  });

  if (!getResponse.ok) {
    error(getResponse.status, `${getResponse.statusText} Failed to reach the API`);
  }

  const postsData = await getResponse.json()
  const { posts, success } = postsData;

  if (!success) {
    error(401, 'Failed to get posts from backend');
  }

  const recentPosts = posts ? posts.map((post: any) => ({
    ...post,
    image: getImageSrc(he.decode(post.content)),
    excerpt: getExcerpt(he.decode(post.content)),
  })) : [];

  return json({ success, status: getResponse.status, recentPosts });
}