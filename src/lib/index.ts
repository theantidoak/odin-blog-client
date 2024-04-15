// place files you want to import through the `$lib` alias in this folder.
import cookie from 'cookie';
import _ from 'lodash';

export function getJWTCookie(response: any) {
  const jwtCookie = response.headers.get('Set-Cookie');
  const jwtCookieName = 'ob_secure_auth';
  if (!jwtCookie || !jwtCookie.includes(jwtCookieName)) {
    throw new Error(`No Cookie: ${response.status}`);
  }

  const parsedJWTCookie = cookie.parse(jwtCookie);
  
  const jwtCookieOptions = Object.assign({}, Object.fromEntries(Object.entries(parsedJWTCookie).map(([key, value]) => {
    const newKey = _.camelCase(key);
    switch (newKey) {
      case 'expires':
        return [newKey, new Date(value)];
      default:
        return [newKey, value];
    }
  })), { httpOnly: true, secure: true });

  return { jwtCookieName, jwtCookieOptions };
}