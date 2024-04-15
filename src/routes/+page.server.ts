import dotenv from 'dotenv';
dotenv.config();

export const load = async () => {
  const loginURL = `http://localhost:3000/api/posts`;
  try {
    const response = await fetch(loginURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.APITOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return { props: { ...data } };
  } catch (err) {
    console.error(err);
    return { props: { err } };
  }
}