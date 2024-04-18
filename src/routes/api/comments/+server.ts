import { error } from "@sveltejs/kit";
import dotenv from 'dotenv';
import { json } from "@sveltejs/kit";
dotenv.config();

export async function POST(event: any) {
  const reqBody = await event.request.json();
  const body = typeof reqBody === 'string' ? reqBody : JSON.stringify(reqBody);

  const postResponse = await fetch(`${process.env.APIENDPOINT}/api/comments`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'APIToken': `Token ${process.env.APITOKEN}`
    },
    body
  });

  if (!postResponse.ok) {
    error(postResponse.status, `${postResponse.statusText}. Failed to reach the API.`);
  }

  const postData = await postResponse.json();
  const { success, message, result: comment } = postData;

  return json({ success, status: 201, comment });
}