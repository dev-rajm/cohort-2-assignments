import { Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signInSchema, signUpSchema } from '../schemas/user.schema';

enum StatusCode {
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  INTERNALSERVERERROR = 500,
}

// Signup controller
export const signUpHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: { username: string; email: string; password: string } =
      await c.req.json();

    const { success } = signUpSchema.safeParse(body);
    if (!success) {
      return c.body('Invalid user input', StatusCode.BADREQUEST);
    }

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (user) {
      return c.body('Email already exist', StatusCode.BADREQUEST);
    }

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const userId = newUser.id;
    const token = await Jwt.sign({ userId }, c.env.JWT_SECRET);

    return c.json({
      message: 'User created successfully',
      token: token,
      user: {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Signin controller
export const signInHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: { email: string; password: string } = await c.req.json();

    const { success } = signInSchema.safeParse(body);
    if (!success) {
      return c.body('Invalid user input', StatusCode.BADREQUEST);
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      return c.body('User not found', StatusCode.NOTFOUND);
    }

    const userId = user.id;
    const token = await Jwt.sign({ userId }, c.env.JWT_SECRET);

    return c.json({
      message: 'Logged in successfully',
      token: token,
      user: {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return c.body(
      `Interval server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Get a specific user profile
export const userProfile = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(c.req.param('id')),
      },
      include: {
        posts: true,
      },
    });
    if (!user) {
      return c.body('User not found', StatusCode.NOTFOUND);
    }

    return c.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        posts: user.posts,
      },
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};

// Get all users
export const getAllUsers = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findMany();
    return c.json({
      users: res.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  }
};
