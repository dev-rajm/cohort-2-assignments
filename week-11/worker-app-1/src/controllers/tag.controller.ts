import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

enum StatusCode {
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  Ok = 200,
  INTERNALSERVERERROR = 500,
}

export const getTags = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const tags = await prisma.tags.findMany();

    if (tags.length == 0) {
      return c.body('No tags available. Please create one.', StatusCode.Ok);
    }

    return c.json({
      tags: tags,
    });
  } catch (error) {
    return c.body('Internal server error', StatusCode.INTERNALSERVERERROR);
  }
};

export const getPostByTag = async (c: Context) => {};
