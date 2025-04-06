import { Next, Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';

enum StatusCode {
  FORBIDDEN = 401,
  INTERNALSERVERERROR = 500,
}

type Token = string | undefined;

async function authMiddleware(c: Context, next: Next) {
  try {
    const token: Token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return c.body('You are unauthorized user', StatusCode.FORBIDDEN);
    }

    const decoded = await Jwt.verify(token, c.env.JWT_SECRET);
    if (decoded) {
      c.set('userId', decoded);
      await next();
    } else {
      return c.body('Sorry you are unauthorized user', StatusCode.FORBIDDEN);
    }
  } catch (error) {
    return c.body('Internal server error', StatusCode.INTERNALSERVERERROR);
  }
}

export default authMiddleware;
